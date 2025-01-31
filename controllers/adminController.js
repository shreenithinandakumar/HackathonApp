const Hackathon = require("../models/Hackathon");
const Registration = require("../models/Registration");

// 1️⃣ Get all hackathons
const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ error: "Error fetching hackathons" });
  }
};

// 2️⃣ Get all participants for a hackathon
const getParticipantsForHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const participants = await Registration.find({ hackathonId }).populate("participantId", "name email");
    
    if (!participants.length) {
      return res.status(404).json({ message: "No participants found for this hackathon" });
    }

    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: "Error fetching participants" });
  }
};

// 3️⃣ Add a new hackathon
const addHackathon = async (req, res) => {
  try {
    const { title, venue, date, themes, deadline } = req.body;

    // Validate input
    if (!title || !venue || !date || !deadline) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    // Create a new hackathon entry
    const hackathon = await Hackathon.create({
      title,
      venue,
      date: new Date(date),
      themes: themes.split(",").map((theme) => theme.trim()),  // Split themes by commas
      deadline: new Date(deadline),
    });

    res.status(201).json({ message: "Hackathon added successfully", hackathon });
  } catch (error) {
    console.error("Error adding hackathon:", error);
    res.status(500).json({ error: "Error adding hackathon" });
  }
};


// 4️⃣ Cancel (soft delete) a hackathon
const cancelHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const hackathon = await Hackathon.findByIdAndDelete(hackathonId, { isCancelled: true }, { new: true });

    if (!hackathon) {
      return res.status(404).json({ error: "Hackathon not found" });
    }

    res.status(200).json({ message: "Hackathon cancelled successfully", hackathon });
  } catch (error) {
    res.status(500).json({ error: "Error cancelling hackathon" });
  }
};

// 5️⃣ Remove a participant from a hackathon
const removeParticipant = async (req, res) => {
  try {
    const { hackathonId, participantId } = req.params;
    const deletedRegistration = await Registration.findOneAndDelete({ hackathonId, participantId });

    if (!deletedRegistration) {
      return res.status(404).json({ error: "Participant not found in this hackathon" });
    }

    res.status(200).json({ message: "Participant removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error removing participant" });
  }
};

module.exports = {
  getAllHackathons,
  getParticipantsForHackathon,
  addHackathon,
  cancelHackathon,
  removeParticipant
};


