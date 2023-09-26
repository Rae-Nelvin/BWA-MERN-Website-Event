const { StatusCodes } = require("http-status-codes");

const {
  getAllPayments,
  createPayment,
  getOnePayment,
  updatePayment,
  deletePayment,
} = require("../../../services/mongoose/payments");

const create = async (req, res, next) => {
  try {
    const result = await createPayment(req);

    res.status(StatusCodes.CREATED).json({ result });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllPayments(req);

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOnePayment(req);

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updatePayment(req);

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deletePayment(req);
    console.log("deleted");

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
