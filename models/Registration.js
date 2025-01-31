const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const registrationSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 }, // Use UUID as the primary key
    hackathonId: { type: String, ref: "Hackathon", required: true }, // UUID reference to Hackathon
    participantId: { type: String, ref: "User", required: true }, // UUID reference to User
    teamName: { type: String, required: true },
    teamMembers: [{ type: String }],
    pptLink: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
