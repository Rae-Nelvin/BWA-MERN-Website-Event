const User = require("../../api/v1/users/model");
const Organizer = require("../../api/v1/organizers/model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const createOrganizer = async (req) => {
  const { organizer, email, password, confirmPassword, name, role } = req.body;
  if (password !== confirmPassword) {
    throw new BadRequestError("Password not match");
  }

  const result = await Organizer.create({ organizer });

  const check = await User.findOne({ email });
  if (check) {
    throw new BadRequestError("Email already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
    organizer: result._id,
    role,
  });

  delete user._doc.password;

  return user;
};

module.exports = {
  createOrganizer,
};
