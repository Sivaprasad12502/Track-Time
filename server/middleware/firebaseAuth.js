const admin = require("../firebaseAdmin");
const firebaseAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthrized:No token provided" });
  }
  const token=authHeader.split(' ')[1]
  try{
    const decodedToken=await admin.auth().verifyIdToken(token)
    req.user=decodedToken;
    next()
  }catch(err){
    console.log('token verification error:',err)
    return res.status(403).json({message:'invalid token'})
  }
};
module.exports=firebaseAuth
