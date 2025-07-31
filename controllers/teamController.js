const teamModel = require("../models/teamModel");

exports.getAllTeams = (req, res) => {
  const teams = teamModel.getTeams();
  res.json(teams);
};

exports.getTeamById = (req, res) => {
  const team = teamModel.getTeamById(req.params.id);
  if (!team) return res.status(404).json({ message: "Team not found" });
  res.json(team);
};

exports.createTeam = (req, res) => {
  const newTeam = teamModel.createTeam(req.body);
  res.status(201).json(newTeam);
};

exports.updateTeam = (req, res) => {
  const updated = teamModel.updateTeam(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Team not found" });
  res.json(updated);
};

exports.deleteTeam = (req, res) => {
  const success = teamModel.deleteTeam(req.params.id);
  if (!success) return res.status(404).json({ message: "Team not found" });
  res.json({ message: "Team deleted" });
};