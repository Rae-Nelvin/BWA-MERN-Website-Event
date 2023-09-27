const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please input user name"],
      minlength: [3, "Name min 3 character"],
      maxLength: [50, "Name max 50 character"],
    },
    email: {
      type: String,
      required: [true, "Please input user email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please input user password"],
      minlength: [6, "Password min 6 character"],
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

// Hooks mongoose. Sebelum di simpen ke database, passwordnya di modifikasi dulu agar di hash.
userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

// Methods agar bisa digunakan secara global di file lain.
userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
