require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors"); // 👈 AQUI

const app = express();

require("./config/firebase");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Static assets */
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
app.use(
  "/img",
  express.static(path.join(__dirname, "..", "frontend", "public", "img")),
);

const toughtsRoutes = require("./routes/toughtsRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);
app.use("/toughts", toughtsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
