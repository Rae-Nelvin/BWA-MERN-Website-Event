const mongoose = require("mongoose");

const PaymentScheme = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Payment type is required"],
      minlength: [3, "Payment type must be at least 3 characters long"],
      maxlength: [50, "Payment type must be at most 50 characters long"],
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: [true, "Payment image is required"],
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: [true, "Organizer is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentScheme);
