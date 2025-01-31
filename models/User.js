const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["participant", "admin"], default: "participant" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
