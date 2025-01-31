const express = require('express');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');
const {
  createHackathon,
  updateHackathon,
  deleteHackathon,
  getAllHackathons,
  getHackathonById,
} = require('../controllers/hackathonController');

const router = express.Router();

// Admin routes
router.post('/', verifyToken, authorizeRole('admin'), createHackathon);
router.put('/:hackathonId', verifyToken, authorizeRole('admin'), updateHackathon);
router.delete('/:hackathonId', verifyToken, authorizeRole('admin'), deleteHackathon);

// Participant routes
router.get('/', verifyToken, getAllHackathons);
router.get('/:hackathonId', verifyToken, getHackathonById);

module.exports = router;
