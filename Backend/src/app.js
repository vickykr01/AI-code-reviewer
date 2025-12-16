const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/ai", aiRoutes);

module.exports = app;
