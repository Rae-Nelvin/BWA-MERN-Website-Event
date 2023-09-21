const Events = require("../../api/v1/events/model");
const { checkingImage } = require("./images");
const { checkingCategory } = require("./categories");
const { checkingTalent } = require("./talents");

const { NotFoundError, BadRequestError } = require("../../errors");

const getAllEvents = async (req) => {
  const { keyword, category, talent, status } = req.query;
  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  if (["Draft", "Published"].includes(status)) {
    condition = {
      ...condition,
      statusEvent: status,
    };
  }

  const result = await Events.find(condition)
    .populate({ path: "image", select: "_id name" })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id  name" },
    });

  return result;
};

const createEvent = async (req) => {
  const {
    title,
    date,
    about,
    tagLine,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategory(category);
  await checkingTalent(talent);
  const check = await Events.findOne({ title });
  if (check) throw new BadRequestError("Title already exist");

  const result = await Events.create({
    title,
    date,
    about,
    tagLine,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({ path: "image", select: "_id name" })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id  name" },
    });
  if (!result) throw new NotFoundError("Event not found");

  return result;
};

const updateEvent = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagLine,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategory(category);
  await checkingTalent(talent);
  const checkEvent = await Events.findOne({ _id: id });
  if (!checkEvent) throw new NotFoundError("Event not found");

  const check = await Events.findOne({
    title,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });
  if (check) throw new BadRequestError("Title already exist");

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagLine,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      organizer: req.user.organizer,
    },
    { new: true, runValidators: true }
  );
  if (!result) throw new NotFoundError("Event not found");

  return result;
};

const deleteEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOneAndDelete({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result) throw new NotFoundError("Event not found");

  return result;
};

const changeStatusEvents = async (req) => {
  const { id } = req.params;
  const { statusEvent } = req.body;
  if (!["Draft", "Published"].includes(statusEvent)) {
    throw new BadRequestError("Status harus Draft atau Published");
  }

  const checkEvent = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!checkEvent) {
    throw new Error("Event not found");
  }

  checkEvent.statusEvent = statusEvent;
  await checkEvent.save();
  return checkEvent;
};

module.exports = {
  getAllEvents,
  createEvent,
  getOneEvent,
  updateEvent,
  deleteEvent,
  changeStatusEvents,
};
