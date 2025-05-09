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
module.exports = { fetchListOfProjects, addNewProject };
