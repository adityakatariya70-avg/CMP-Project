const complaintModel =require("../models/complaintModel");

const getallComplaints= async (req,res)=>{
    try{
  const allComplaints= await complaintModel.find();

  if(allComplaints.length===0){
    return res.status(404).json({
        message:"No Complaints Found"
    })
  }
  return res.status(200).json({
    message:"All Complaints",
    Complaints: allComplaints
  })
    }
    catch(error){
 return res.status(500).json({
    message:"Server not Working"
 })
    }
}

const getsingleComplaint= async (req,res)=>{
    try{


        const {complaintId}=req.params;
        const complaint = await complaintModel.findOne({complaintId});
        if(!complaint){
         return res.status(404).json({
            message:"Complaint Not Found"
         })

        }
        return res.status(200).json({
            message:"Complaint Details",
            complaint:complaint
        })
    }
    catch(error){
    return res.status(500).json({
        message:"Internal Server Error"
    })
    }
}


const updatecomplaintStatus= async (req,res)=>{
    try{
 const {complaintId}=req.params;
 const {status}=req.body;
 const updatedComplaint= await complaintModel.findOneAndUpdate({complaintId},{status},{new:true});
 
 if(!updatedComplaint){
    return res.status(404).json({
        message:"Complaint Not Found"
    })
 }
 return res.status(200).json({
    message:"Complaint Updated Successfully",
    updateComplaint:updatedComplaint
 })
    }
    catch(error){
return res.status(500).json({
    message:"Internal Server Error"
})
    }
}



module.exports={getallComplaints,getsingleComplaint,updatecomplaintStatus}