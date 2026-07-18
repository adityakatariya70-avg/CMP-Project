const express =require("express");
const router = express.Router();
const {getallComplaints,getsingleComplaint}= require("../controllers/adminComplaintController");
const adminAuth =require("../middleware/adminAuth");

router.get("/complaints",adminAuth, getallComplaints);
router.get("/complaints/:complaintId", adminAuth,getsingleComplaint);

module.exports=router;

