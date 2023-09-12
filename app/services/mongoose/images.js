const Image = require("../../api/v1/images/model");

const createImage = async (req) => {
  const result = await Image.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/arnold-purnomo.png",
  });

  return result;
};

module.exports = { createImage };
