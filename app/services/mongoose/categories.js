const Categories = require("../../api/v1/categories/model");

const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });

  return result;
};
const createCategory = async (req) => {
  const { name } = req.body;
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
  });
  if (check) throw new BadRequestError("Category already exists");

  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });
  return result;
};

const getOneCategory = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result) throw new NotFoundError("Category not found");

  return result;
};

const updateCategory = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });
  if (check) {
    throw new BadRequestError("Category already exists");
  }

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );
  if (!result) throw new NotFoundError("Category not found");

  return result;
};

const deleteCategory = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOneAndDelete({
    _id: id,
    organizer: req.user.organizer,
  });

  return result;
};

const checkingCategory = async (id) => {
  const result = await Categories.findOne({
    _id: id,
  });
  if (!result) {
    throw new NotFoundError("Category not found");
  }

  return result;
};

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  checkingCategory,
};
