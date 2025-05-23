const mongoose=require('mongoose')
const TaskSchema= new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    Day:{
        type:Date,
        default:Date.now()
    }

})
module.exports=mongoose.model('Task',TaskSchema)