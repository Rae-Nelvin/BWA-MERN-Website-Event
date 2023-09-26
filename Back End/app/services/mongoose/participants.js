const Participant = require("../../api/v1/participants/model");
const Event = require("../../api/v1/events/model");
const Order = require("../../api/v1/orders/model");
const Payment = require("../../api/v1/payments/model");

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../..//errors");
const { otpMail } = require("../mail");
const { createJWT, createTokenParticipant } = require("../../utils");

const signupParticipant = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  let result = await Participant.findOne({ email, status: "tidak aktif" });
  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await Participant.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }

  await otpMail(email, result);

  delete result._doc.password;
  //   delete result._doc.otp; => Klo prod harus dihapus

  return result;
};

const activateParticipant = async (req) => {
  const { otp, email } = req.body;
  const check = await Participant.findOne({
    email,
  });
  if (!check) {
    throw new NotFoundError("Email not found");
  }

  if (check && check.otp != otp) {
    throw new UnauthorizedError("OTP is invalid");
  }

  const result = await Participant.findByIdAndUpdate(
    check._id,
    {
      status: "aktif",
    },
    { new: true, runValidators: true }
  );

  delete result._doc.password;
  //   delete result._doc.otp; => Klo prod harus dihapus

  return result;
};

const signinParticipant = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const result = await Participant.findOne({ email });
  if (!result) {
    throw new NotFoundError("Invalid Credentials");
  }

  if (result.status === "tidak aktif") {
    throw new UnauthorizedError("Please activate your account");
  }

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = createJWT({
    payload: createTokenParticipant(result),
  });

  return token;
};

const getAllEvents = async (req) => {
  const result = await Event.find({ statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const result = await Event.findOne({ _id: id })
    .populate("category")
    .populate("talent")
    .populate("image");
  if (!result) {
    throw new NotFoundError("Event not found");
  }

  return result;
};

const getAllOrders = async (req) => {
  const result = await Order.find({ participant: req.participant.id });
  return result;
};

const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body;
  const checkingEvent = await Event.findOne({ _id: event });
  if (!checkingEvent) {
    throw new NotFoundError("Event not found");
  }

  const checkingPayment = await Payment.findOne({ _id: payment });
  if (!checkingPayment) {
    throw new NotFoundError("Payment not found");
  }

  let totalPay = 0,
    totalOrderTicket = 0;
  await tickets.forEach((tic) => {
    checkingEvent.tickets.forEach((ticket) => {
      if (tic.ticketCategories.type === ticket.type) {
        if (tic.sumTicket > ticket.stock) {
          throw new BadRequestError("Stock is not enough");
        } else {
          ticket.stock -= tic.sumTicket;
          totalOrderTicket += tic.sumTicket;
          totalPay += tic.ticketCategories.price * tic.sumTicket;
        }
      }
    });
  });
  await checkingEvent.save();

  const historyEvent = {
    title: checkingEvent.title,
    date: checkingEvent.date,
    about: checkingEvent.about,
    tagline: checkingEvent.tagline,
    keyPoint: checkingEvent.keyPoint,
    venueName: checkingEvent.venueName,
    tickets: tickets,
    image: checkingEvent.image,
    category: checkingEvent.category,
    talent: checkingEvent.talent,
    organizer: checkingEvent.organizer,
  };

  const result = new Order({
    date: new Date(),
    personalDetail: personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.participant.id,
    event,
    historyEvent,
    payment,
  });

  await result.save();
  return result;
};

module.exports = {
  signupParticipant,
  activateParticipant,
  signinParticipant,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
};
