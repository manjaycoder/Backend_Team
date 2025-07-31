const teamModel = require("../models/teamModel");

// Helper function to validate team data
const validateTeam = (team) => {
  if (!team || typeof team !== 'object') {
    return { valid: false, message: "Invalid team data format" };
  }
  if (!team.name || typeof team.name !== 'string' || team.name.trim() === '') {
    return { valid: false, message: "Team name is required and must be a non-empty string" };
  }
  return { valid: true };
};

exports.getAllTeams = (req, res) => {
  try {
    const teams = teamModel.getTeams();
    res.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Failed to retrieve teams" });
  }
};

exports.getTeamById = (req, res) => {
  try {
    const team = teamModel.getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ message: "Failed to retrieve team" });
  }
};

exports.createTeam = (req, res) => {
  try {
    const validation = validateTeam(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const newTeam = teamModel.createTeam(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    
    // Handle specific errors from the model
    if (error.message === "Invalid team data") {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: "Failed to create team" });
  }
};

exports.updateTeam = (req, res) => {
  try {
    // Validate only if name is provided (partial update)
    if (req.body.name !== undefined) {
      const validation = validateTeam(req.body);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
      }
    }

    const updated = teamModel.updateTeam(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error updating team:", error);
    
    // Handle specific errors from the model
    if (error.message === "Invalid update data") {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: "Failed to update team" });
  }
};

exports.deleteTeam = (req, res) => {
  try {
    const success = teamModel.deleteTeam(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ message: "Failed to delete team" });
  }
};