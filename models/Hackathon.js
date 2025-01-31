const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const hackathonSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    themes: [{ type: String }],
    maxParticipants: { type: Number },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hackathon", hackathonSchema);
