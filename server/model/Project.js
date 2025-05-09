const mongoose=require('mongoose')
const projectSchema=new mongoose.Schema({
    projectName: {
        type:String,
        required:true
    },
    clientName: {
        type:String,
        required:true
    },
    description: {
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Project",projectSchema)
