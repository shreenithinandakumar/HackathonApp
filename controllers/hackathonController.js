const Hackathon = require('../models/Hackathon');

// Controller: Create a new hackathon
const createHackathon = async (req, res) => {
  try {
    const { title, venue, date, themes, maxParticipants, deadline } = req.body;

    const hackathon = await Hackathon.create({
        title,
        venue,
        date,
        themes,
        maxParticipants,
        deadline
    });

    res.status(201).json({ message: 'Hackathon created successfully', hackathon });
  } catch (error) {
    res.status(500).json({ error: 'Error creating hackathon' });
  }
};

// Controller: Update hackathon details
const updateHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const { title, venue, date, themes, maxParticipants, deadline } = req.body;

    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      hackathonId,
      { title, venue, date, themes, maxParticipants, deadline  },
      { new: true }
    );

    if (!updatedHackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    res.status(200).json({ message: 'Hackathon updated successfully', updatedHackathon });
  } catch (error) {
    res.status(500).json({ error: 'Error updating hackathon' });
  }
};

// Controller: Delete a hackathon
const deleteHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.params;

    const deletedHackathon = await Hackathon.findByIdAndDelete(hackathonId);
    if (!deletedHackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    res.status(200).json({ message: 'Hackathon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting hackathon' });
  }
};

// Controller: Get all hackathons
const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.status(200).json({ hackathons });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching hackathons' });
  }
};

// Controller: Get a specific hackathon by ID
const getHackathonById = async (req, res) => {
  try {
    const { hackathonId } = req.params;

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    res.status(200).json({ hackathon });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching hackathon details' });
  }
};

module.exports = { createHackathon, updateHackathon, deleteHackathon, getAllHackathons, getHackathonById };
