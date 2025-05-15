const mongoose=require('mongoose')
const WorkingSchema=new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true
    },
    hoursWorked:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model("WorkTime",WorkingSchema)