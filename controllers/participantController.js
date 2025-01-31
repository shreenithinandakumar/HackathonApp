const Registration = require('../models/Registration');
const Hackathon = require('../models/Hackathon');

// Controller: Register for a hackathon
const registerForHackathon = async (req, res) => {
  try {
    console.log("User from token:", req.user); // Debugging line

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. No user found in request." });
    }

    const { hackathonId } = req.params;
    const { teamName, teamMembers , pptLink} = req.body;

    // Check if all required fields are provided
    if (!teamName || !teamMembers || !pptLink) {
      return res.status(400).json({ error: 'All fields (teamName, teamMembers, pptLink) are required.' });
    }

    // Check if teamMembers is an array
    if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
      return res.status(400).json({ error: 'At least one team member is required.' });
    }

    // Check if the hackathon exists
    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }
    // Create the registration
    const registration = await Registration.create({
      hackathonId,
      participantId: req.user.id, // Extracted from `verifyToken`, fixed 
      teamName,
      teamMembers,
      pptLink
    });

    res.status(201).json({ message: 'Registered successfully', registration });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error registering for hackathon' });
  }
};

// Controller: View participant's registration
const viewRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findById(registrationId)
      .populate('hackathonId', 'title date')
      .populate('participantId', 'name email');

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json({ registration });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching registration details' });
  }
};
// Controller: Update registration details
const updateRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { teamName, teamMembers, pptLink } = req.body;

    const updatedRegistration = await Registration.findByIdAndUpdate(
      registrationId,
      { teamName, teamMembers, pptLink },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json({ message: 'Registration updated successfully', updatedRegistration });
  } catch (error) {
    res.status(500).json({ error: 'Error updating registration' });
  }
};


const getMyRegistrations = async (req, res) => {
  try {
    console.log("Getting registrations for participant:", req.user.id);
    const participantId = req.user.id;

    const registrations = await Registration.find({ participantId })
      .populate("hackathonId", "title date venue")  // Populate hackathon details
      .populate("participantId", "name email")  // Populate participant details
      .populate("teamMembers", "name email")  // Populate team members
      .lean();  // Convert to plain JavaScript objects

    if (!registrations.length) {
      return res.status(404).json({ error: "No registrations found for this participant" });
    }

    // Ensure all fields exist
    const sanitizedRegistrations = registrations.map(reg => ({
      ...reg,
      hackathonId: reg.hackathonId || { title: "Unknown", venue: "N/A", date: "N/A" },
      teamMembers: reg.teamMembers || [],
      pptLink: reg.pptLink || "No PPT submitted",
    }));

    res.status(200).json({ registrations: sanitizedRegistrations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching registrations" });
  }
};




module.exports = { registerForHackathon, viewRegistration, updateRegistration, getMyRegistrations };

