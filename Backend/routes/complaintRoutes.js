const express = require("express");
const router = express.Router();
const { registerComplaint } = require("../controllers/complaintController");
const upload=require("../middleware/upload");
const { trackComplaint } = require("../controllers/trackController");

router.post("/register",upload.single("image"), registerComplaint);
router.post("/track", trackComplaint);
module.exports=router;