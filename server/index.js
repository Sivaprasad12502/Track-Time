require('dotenv').config()
const express=require("express")
const cors=require('cors')
const UserRouter = require("./route/UserRoute")
const projectRouter = require("./route/projectRoute")
require("./db")
const app=express()
app.use(cors())
app.use(express.json())

const PORT=process.env.PORT||3001;
app.use('/api/',UserRouter)
app.use("/api/projects",projectRouter)
app.get("/",(req,res)=>{
    res.send('HOME')
})
app.listen(PORT,()=>{
    return console.log(`Sever running on ${PORT}`)
})