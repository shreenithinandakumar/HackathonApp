const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAllHackathons,
  getParticipantsForHackathon,
  addHackathon,
  cancelHackathon,
  removeParticipant
} = require("../controllers/adminController");

const router = express.Router();

// Apply admin authentication middleware to all routes
router.use(verifyToken, isAdmin);

// Routes for admin operations
router.get("/hackathons", getAllHackathons); // View all hackathons
router.get("/hackathons/:hackathonId/participants", getParticipantsForHackathon); // View participants of a hackathon
router.post("/hackathons", addHackathon); // Add a new hackathon
router.delete("/hackathons/:hackathonId", cancelHackathon); // Soft delete a hackathon
router.delete("/hackathons/:hackathonId/participants/:participantId", removeParticipant); // Remove a participant

module.exports = router;
