const express = require("express");
const router = express.Router();
const { registerComplaint } = require("../controllers/complaintController");
const { trackComplaint } = require("../controllers/trackController");

router.post("/register", registerComplaint);
router.post("/track", trackComplaint);
module.exports=router;