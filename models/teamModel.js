const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../db.json");

function readDB() {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

exports.getTeams = () => {
  const db = readDB();
  return db.teams || [];
};

exports.getTeamById = (id) => {
  const teams = exports.getTeams();
  return teams.find((t) => t.id == id);
};

exports.createTeam = (team) => {
  const db = readDB();
  const teams = db.teams || [];
  team.id = Date.now().toString();
  teams.push(team);
  db.teams = teams;
  writeDB(db);
  return team;
};

exports.updateTeam = (id, newTeam) => {
  const db = readDB();
  let teams = db.teams || [];
  const index = teams.findIndex((t) => t.id == id);
  if (index === -1) return null;
  teams[index] = { ...teams[index], ...newTeam };
  db.teams = teams;
  writeDB(db);
  return teams[index];
};

exports.deleteTeam = (id) => {
  const db = readDB();
  let teams = db.teams || [];
  const index = teams.findIndex((t) => t.id == id);
  if (index === -1) return false;
  teams.splice(index, 1);
  db.teams = teams;
  writeDB(db);
  return true;
};