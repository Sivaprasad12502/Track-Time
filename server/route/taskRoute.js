const express=require('express')
const taskRouter=express.Router()
const {addNewTask, fetchTasks, deleteTaks}=require('../controller/TaskController')
const firebaseAuth=require('../middleware/firebaseAuth')

taskRouter.get('/',firebaseAuth,fetchTasks)
taskRouter.post('/add',firebaseAuth,addNewTask)
taskRouter.delete('/delete/:id',firebaseAuth,deleteTaks)

module.exports=taskRouter