const express = require("express");
const router = express.Router();
const { registerComplaint } = require("../controllers/complaintController");

router.post("/register", registerComplaint);

module.exports=router;