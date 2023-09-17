const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

let eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: 3,
      maxLength: 50,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    about: {
      type: String,
    },
    tagLine: {
      type: String,
      required: [true, "Tagline is required"],
    },
    venueName: {
      type: String,
      required: [true, "Venue name is required"],
    },
    keyPoint: {
      type: [String],
    },
    statusEvent: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: "Talent",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
