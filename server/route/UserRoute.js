const express=require("express")
const UserRouter=express.Router()
const addUser=require("../controller/UserController")
UserRouter.post('/register',addUser)

module.exports=UserRouter