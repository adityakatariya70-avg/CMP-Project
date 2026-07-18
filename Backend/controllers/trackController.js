const Complaint = require("../models/complaintModel");


const trackComplaint = async (req,res)=>{
    try{
    const {complaintId,mobile}=req.body;
    if(!complaintId||!mobile){
        return res.status(400).json({
            message:"All fields are Required"
        })
    }
    const isMatch= await Complaint.findOne({complaintId,mobile});
    if(!isMatch){
        return res.status(404).json({
    message:"Complaint Not Found"
   })
    }
    return res.status(200).json({
        message:"Complaint Found",
        complaint:isMatch
    })
    }
    catch(error){
    return res.status(500).json({
        message:"Internal Server Error"
    })
    }
}
module.exports={trackComplaint};