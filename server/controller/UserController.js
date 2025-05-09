const mongoose = require("mongoose");
const admin = require("../firebaseAdmin");
const User = require("../model/User");

const addUser = async (req, res) => {
  const { token, name } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { uid, email } = decoded;

    //Store in MongoDB
    const savedUser = await User.findOneAndUpdate(
      { uid },
      { name, email, uid },
      { upsert: true, new: true }
    );
    res.status(200).json({message:'user saved to MongoDB',user:savedUser})
  } catch (error) {
    console.log(`error occured:${error.messsage}`);
  }
};
module.exports = addUser;
