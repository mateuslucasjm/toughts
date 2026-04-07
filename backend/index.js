require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

require("./config/firebase");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const toughtsRoutes = require("./routes/toughtsRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);
app.use("/toughts", toughtsRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
