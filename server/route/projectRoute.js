const express=require('express')
const projectRouter=express.Router()
const {fetchListOfProjects,addNewProject}=require('../controller/projectController')
const firebaseAuth = require('../middleware/firebaseAuth')

projectRouter.get('/',firebaseAuth,fetchListOfProjects)
projectRouter.post('/add',firebaseAuth,addNewProject)

module.exports=projectRouter