const express=require('express')
const projectRouter=express.Router()
const {fetchListOfProjects,addNewProject, deleteProjects}=require('../controller/projectController')
const firebaseAuth = require('../middleware/firebaseAuth')

projectRouter.get('/',firebaseAuth,fetchListOfProjects)
projectRouter.post('/add',firebaseAuth,addNewProject)
projectRouter.delete("/delete/:id", firebaseAuth, (req, res, next) => {
  console.log("Delete route matched:", req.params.id);
  next();
}, deleteProjects);


module.exports=projectRouter