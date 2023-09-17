const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let organizerSchema = new mongoose.Schema(
  {
    organizer: {
      type: String,
      required: [true, "Please input organizer name"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organizer", organizerSchema);
