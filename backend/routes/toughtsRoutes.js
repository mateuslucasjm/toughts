const express = require("express");
const router = express.Router();

const ToughtController = require("../controllers/ToughtController");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/", ToughtController.getAll);
router.get("/dashboard", authMiddleware, ToughtController.dashboard);
router.get("/:id", ToughtController.getById);
router.post("/", authMiddleware, ToughtController.create);
router.delete("/:id", authMiddleware, ToughtController.remove);
router.put("/:id", authMiddleware, ToughtController.update);

module.exports = router;
