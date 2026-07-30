const express=require("express");
const router= express.Router();
const {contactSave,allContacts, singleContact,deleteContact, markasRead}= require("../controllers/adminContactController");
const adminAuth= require("../middleware/adminAuth");

router.post("/",contactSave);
router.get("/",adminAuth,allContacts);
router.get("/:id", adminAuth,singleContact);
router.delete("/:id",adminAuth,deleteContact);
router.put("/:id/read",adminAuth,markasRead);

module.exports=router;