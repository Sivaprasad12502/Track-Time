const mongoose = require("mongoose");
const Task = require("../model/Task");

const fetchTasks = async (req, res) => {
  let currenTasks;
  try {
    currenTasks = await Task.find({ userId: req.user.uid });
  } catch (e) {
    console.log(e);
  }
  if (!currenTasks) {
    return res.status(404).json({ message: "message is not found" });
  }
  return res.status(200).json( currenTasks );
};
const addNewTask = async (req, res) => {
  const { task, userId, } = req.body;
  let currentDate = new Date();
  const newTasks = new Task({
    task,
    Day: currentDate,
    userId: req.user.uid,
  });
  try {
    await newTasks.save();
    return res.status(200).json({ newTasks });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Failed to create message" });
  }
};
const completeTask=async(req,res)=>{
  try{
    const taskId=req.params.id
    const task= await Task.findById(taskId)
    if(!task) return res.status(404).send("Task not found")
    
    task.completed=!task.completed
    await task.save()
    res.status(200).json(task)

  }catch(e){
    console.log(e.message)
    res.status(500).json({message:"error in completing"})
  }
}
const deleteTaks = async (req, res) => {
  const id = req.params.id;
  try {
    const currenTask = await Task.findByIdAndDelete(id);
    if (!currenTask) {
      return res.status(404).json({ message: "taks is not found" });
    }
    return res.status(200).json({ message: "suscessfully Deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "unable to delelte" });
  }
};
module.exports = { fetchTasks, addNewTask, deleteTaks,completeTask };
