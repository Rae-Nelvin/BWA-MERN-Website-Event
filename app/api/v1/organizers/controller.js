const { StatusCodes } = require("http-status-codes");

const { createOrganizer } = require("../../../services/mongoose/users");

const create = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
