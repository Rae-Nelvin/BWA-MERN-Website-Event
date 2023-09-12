const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

const createImage = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/arnold-purnomo.png",
  });

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  if (!result) {
    throw new NotFoundError("Image not found");
  }

  return result;
};

module.exports = { createImage, checkingImage };
