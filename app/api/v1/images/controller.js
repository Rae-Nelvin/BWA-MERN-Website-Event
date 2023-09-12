const { StatusCodes } = require("http-status-codes");
const { createImage } = require("../../../services/mongoose/images");

const create = async (req, res, next) => {
  try {
    console.log(req.file);
    const result = await createImage(req);

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
