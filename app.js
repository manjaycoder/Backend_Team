const express = require("express");
const cors = require("cors");
const teamRoutes = require("./routes/teamRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/teams", teamRoutes);

module.exports = app;