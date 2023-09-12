const Events = require("../../api/v1/events/model");
const { checkingImage } = require("./images");
const { checkingCategory } = require("./categories");
const { checkingTalent } = require("./talents");

const { NotFoundError, BadRequestError } = require("../../errors");

const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  const result = await Events.find(condition)
    .populate({ path: "image", select: "_id name" })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name",
      populate: {
        path: "image",
        select: "_id name",
      },
    })
    .select("_id name category talent image");

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
  });

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id })
    .populate({ path: "image", select: "_id name" })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name",
      populate: {
        path: "image",
        select: "_id name",
      },
    })
    .select("_id name category talent image");
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
  const check = await Events.findOne({ title, _id: { $ne: id } });
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
    },
    { new: true, runValidators: true }
  );
  if (!result) throw new NotFoundError("Event not found");

  return result;
};

const deleteEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOneAndDelete({ _id: id });

  return result;
};

module.exports = {
  getAllEvents,
  createEvent,
  getOneEvent,
  updateEvent,
  deleteEvent,
};
