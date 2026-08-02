const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        console.log(process.env.MONGODB_ATLAS);
        await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log("Mongo DB Connected Successfully");
    }
    catch(error){
    console.log("Mongo DB Connection Failed!!");
    console.log(error.message);
    process.exit(1);
    }

}
module.exports=connectDB;