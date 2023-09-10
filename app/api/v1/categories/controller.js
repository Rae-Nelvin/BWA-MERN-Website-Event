const Categories = require("./model");

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new Categories({ name });
    await category.save();
    res.status(201).json({ category });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const categories = await Categories.find().select("_id name");
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Categories.findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await Categories.findByIdAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Categories.findByIdAndRemove(id);
    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  find,
  create,
  update,
  destroy,
};
