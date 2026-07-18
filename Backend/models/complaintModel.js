
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase:true,
      trim:true,
    },
    mobile: {
      type: String,
      required: true,
      trim:true,
    },
    category: {
      type:String,
      enum: [
        "Electricity",
        "Water Supply",
        "Road & Infrastructure",
        "Sanitation",
        "Street Light",
        "Public Transport",
        "Government Office",
        "Other",
      ],
      required:true,
    },

    description: {
      type: String,
      required:true,
      trim:true,
    },
    location: {
      type:String,
      required: true,
      trim:true
    },
    image: {
      type:String,
      default: "",
    },
    
    status:{
        type:String,
        enum:["Pending","In Progress","Resolved","Rejected"],
        default:"Pending",
    },
  },
  {
    timestamps: true,
  },
);

const Complaint=mongoose.model("Complaint",complaintSchema);
module.exports=Complaint;