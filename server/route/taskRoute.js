const express=require('express')
const taskRouter=express.Router()
const {addNewTask, fetchTasks, deleteTaks}=require('../controller/TaskController')
const firebaseAuth=require('../middleware/firebaseAuth')

taskRouter.get('/',firebaseAuth,fetchTasks)
taskRouter.get('/add',firebaseAuth,addNewTask)
taskRouter.get('/delete/:id',firebaseAuth,deleteTaks)

module.exports=taskRouter