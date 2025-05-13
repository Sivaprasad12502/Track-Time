const express=require('express')
const taskRouter=express.Router()
const {addNewTask, fetchTasks, deleteTaks, completeTask}=require('../controller/TaskController')
const firebaseAuth=require('../middleware/firebaseAuth')
const { app } = require('firebase-admin')

taskRouter.get('/',firebaseAuth,fetchTasks)
taskRouter.post('/add',firebaseAuth,addNewTask)
taskRouter.delete('/delete/:id',firebaseAuth,deleteTaks)
taskRouter.put('/toggle-complete/:id',firebaseAuth,completeTask)

module.exports=taskRouter