const mongoose = require("mongoose");
const Project = require("../model/Project");

const fetchListOfProjects = async (req, res) => {
  let ProjectList;
  try {
    ProjectList = await Project.find({userId:req.user.uid});
  } catch (e) {
    console.log(e);
  }
  if (!ProjectList) {
    return res.status(404).json({ message: "No project Found" });
  }
  return res.status(200).json(ProjectList);
};
const addNewProject = async (req, res) => {
  const { projectName, clientName, description, userId } = req.body;
  const currentDate = new Date();
  const newlyCreatedProject = new Project({
    projectName,
    clientName,
    description,
    userId:req.user.uid,
    date: currentDate,
  });
  try {
    await newlyCreatedProject.save();
    return res.status(200).json({ newlyCreatedProject });
} catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Failed to create project" });
  }
};
const deleteProjects=async(req,res)=>{
  const id=req.params.id;
 

  try{
    const findCurrenProject=await Project.findByIdAndDelete(id);
    console.log(findCurrenProject)
    if(!findCurrenProject){
      console.log("Project not found in db.",id)
      return res.status(404).json({message:'Project is not found'})
    }
    return res.status(200).json({message:'Successfully deleted'})

  }catch(e){
    console.log("error deleting",e)
    return res.status(500).json({message:"unable to delete!Please try again"})
  }
}
module.exports = { fetchListOfProjects, addNewProject,deleteProjects };
