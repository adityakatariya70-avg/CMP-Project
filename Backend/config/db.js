const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        console.log(process.env.MongoDB);
        await mongoose.connect(process.env.MongoDB);
        console.log("Mongo DB Connected Successfully");
    }
    catch(error){
    console.log("Mongo DB Connection Failed!!");
    console.log(error.message);
    process.exit(1);
    }

}
module.exports=connectDB;