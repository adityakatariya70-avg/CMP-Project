const jwt=require("jsonwebtoken");

const adminAuth= (req,res,next)=>{
    try{
 const authHeader=req.headers.authorization;

 if(!authHeader){
    return res.status(401).json({
        message:"Access denied Token Missing!!"
    })
 }
 if(!authHeader.startsWith("Bearer ")){
    return res.status(401).json({
        message:"Invalid Token Format"
    })
 }
 const token=authHeader.split(" ")[1];
 const decoded=jwt.verify(
    token, process.env.JWT_SECRET
 );

req.admin=decoded;
next();
    }
    catch(error){
    return res.status(401).json({
    message:"Invalid Token"
})
    }
}
module.exports=adminAuth;
