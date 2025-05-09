const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://sivaprasad:wUBMCZFXAVTlcVLO@cluster0.a1i70jg.mongodb.net/"
  )
  .then(() => console.log("connected Mongo Db"))
  .catch((e) => console.log(e));

