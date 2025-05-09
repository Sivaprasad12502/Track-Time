const express=require("express")
const cors=require('cors')
const UserRouter = require("./route/UserRoute")
require("./db")
const app=express()
app.use(cors())
app.use(express.json())

app.use('/api/',UserRouter)
app.get("/",(req,res)=>{
    res.send('HOME')
})
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    return console.log(`Sever running on ${PORT}`)
})