const express =require("express");
const router = express.Router();
const {getallComplaints,getsingleComplaint, updatecomplaintStatus,dashboardStats}= require("../controllers/adminComplaintController");
const adminAuth =require("../middleware/adminAuth");

router.get("/complaints",adminAuth, getallComplaints);
router.get("/complaints/dashboard", adminAuth, dashboardStats);
router.get("/complaints/:complaintId", adminAuth,getsingleComplaint);
router.put("/complaints/:complaintId",adminAuth,updatecomplaintStatus);


module.exports=router;

