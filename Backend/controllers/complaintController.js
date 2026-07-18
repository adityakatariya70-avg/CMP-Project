const Complaint = require("../models/complaintModel");

const registerComplaint= async (req, res)=>{
    try{
 const { name,email,mobile,category,description,location,image}=req.body;
   if(!name||!email||!mobile||!category||!description||!location)
    return res.status(400).json({
message:"All fields are Required"
})

let complaintId;
let existingId;

do{
    complaintId= "CMP" + Math.floor(Math.random()*10000).toString().padStart(4,"0");
    existingId= await Complaint.findOne({complaintId});
}
while(existingId);

const newComplaint = new Complaint({
    complaintId,
    name,
    email,
    mobile,
    category,
    description,
    location,
    image,
   
});

await newComplaint.save();
return res.status(201).json({
    message:"Complaint Saved Successfully",
    complaintId: newComplaint.complaintId,
});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal Server Error",
        });
    }
}

module.exports={registerComplaint};