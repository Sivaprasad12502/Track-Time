const express=require('express')
const firebaseAuth = require('../middleware/firebaseAuth')
const { addWorktime, fetchWorkTime } = require('../controller/workcontroller')
const workRouter=express.Router()

workRouter.get('/',firebaseAuth,fetchWorkTime)
workRouter.post('/addWork',firebaseAuth,addWorktime)

module.exports=workRouter