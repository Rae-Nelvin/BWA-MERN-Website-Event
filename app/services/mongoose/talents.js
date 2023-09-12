const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");

const { NotFoundError, BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;
  let condition = {};
  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};

const createTalent = async (req) => {
  const { name, role, image } = req.body;
  await checkingImage(image);
  const check = await Talents.findOne({ name });
  if (check) {
    throw new BadRequestError("Name already exist");
  }

  const result = await Talents.create({ name, role, image });

  return result;
};

const getOneTalent = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");
  if (!result) {
    throw new NotFoundError("Talent not found");
  }

  return result;
};

const updateTalent = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;
  await checkingImage(image);
  const check = await Talents.findOne({ name, _id: { $ne: id } });
  if (check) {
    throw new BadRequestError("Name already exist");
  }

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, role, image },
    { new: true, runValidators: true }
  );
  if (!result) {
    throw new NotFoundError("Talent not found");
  }

  return result;
};

const deleteTalent = async (req) => {
  const { id } = req.params;
  const result = await Talents.findOneAndRemove({ _id: id });

  return result;
};

const checkingTalent = async (id) => {
  const result = await Talents.findOne({ _id: id });
  if (!result) {
    throw new NotFoundError("Talent not found");
  }

  return result;
};

module.exports = {
  getAllTalents,
  createTalent,
  getOneTalent,
  updateTalent,
  deleteTalent,
  checkingTalent,
};
