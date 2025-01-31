const express = require('express');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');
const {
  registerForHackathon,
  viewRegistration,
  updateRegistration,
  getMyRegistrations, 
} = require('../controllers/participantController');

const router = express.Router();

// Route: Register for a hackathon
router.post('/hackathons/:hackathonId/register', verifyToken, authorizeRole('participant'), registerForHackathon);

// Route: View participant's registration details
router.get('/registrations/:registrationId', verifyToken, authorizeRole('participant'), viewRegistration);

// Route: Update participant's registration details
router.put('/registrations/:registrationId', verifyToken, authorizeRole('participant'), updateRegistration);

// Route: Get all hackathons the participant has registered for
router.get('/my-registrations', verifyToken, authorizeRole('participant'), getMyRegistrations); // New route

module.exports = router;
