const Categories = require("../../api/v1/categories/model");

const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find();

  return result;
};
const createCategory = async (req) => {
  const { name } = req.body;
  const check = await Categories.findOne({ name });
  if (check) throw new BadRequestError("Category already exists");

  const result = await Categories.create({ name });
  return result;
};

const getOneCategory = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id });
  if (!result) throw new NotFoundError("Category not found");

  return result;
};

const updateCategory = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const check = await Categories.findOne({ name, _id: { $ne: id } });
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
  const result = await Categories.findOneAndDelete({ _id: id });

  return result;
};

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
