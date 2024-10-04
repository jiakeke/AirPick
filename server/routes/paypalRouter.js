const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const {
  paypalCreateOrder,
  paypalCaptureOrder,
} = require("../controllers/paypalControllers");

router.post("/paypalCreateOrder", authenticateToken, paypalCreateOrder);

router.post("/paypalCaptureOrder", authenticateToken, paypalCaptureOrder);

module.exports = router;
