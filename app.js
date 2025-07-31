const express = require("express");
const cors = require("cors");
const teamRoutes = require("./routes/teamRoutes");
const app = express();

const express = require('express');
const adapter = new FileSync('./db.json');
const db = low(adapter);
const employeeRoutes = require('./routes/employeeRoutes');
db.defaults({ 
  employeesData: [], 
  trainingData: [], 
  employeeAttendances: [] 
}).write();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

app.use(cors());
app.use(express.json());
app.use('/api', employeeRoutes);

app.use("/api/teams", teamRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
module.exports = app;