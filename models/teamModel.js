const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../db.json");

// Initialize DB file if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ teams: [] }, null, 2));
}

function readDB() {
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return { teams: [] }; // Fallback to empty database
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database:", error);
    throw new Error("Database update failed");
  }
}

exports.getTeams = () => {
  const db = readDB();
  return db.teams || [];
};

exports.getTeamById = (id) => {
  const teams = exports.getTeams();
  return teams.find((t) => t.id === String(id));
};

exports.createTeam = (team) => {
  if (!team || typeof team !== 'object') {
    throw new Error("Invalid team data");
  }
  
  const db = readDB();
  const teams = db.teams || [];
  const newTeam = { ...team, id: Date.now().toString() };
  teams.push(newTeam);
  db.teams = teams;
  writeDB(db);
  return newTeam;
};

exports.updateTeam = (id, newTeam) => {
  if (!newTeam || typeof newTeam !== 'object') {
    throw new Error("Invalid update data");
  }
  
  const db = readDB();
  let teams = db.teams || [];
  const teamId = String(id);
  const index = teams.findIndex((t) => t.id === teamId);
  
  if (index === -1) return null;
  
  // Prevent ID updates and merge data
  const { id: _, ...updateData } = newTeam;
  teams[index] = { ...teams[index], ...updateData };
  db.teams = teams;
  writeDB(db);
  return teams[index];
};

exports.deleteTeam = (id) => {
  const db = readDB();
  let teams = db.teams || [];
  const teamId = String(id);
  const index = teams.findIndex((t) => t.id === teamId);
  
  if (index === -1) return false;
  
  teams.splice(index, 1);
  db.teams = teams;
  writeDB(db);
  return true;
};