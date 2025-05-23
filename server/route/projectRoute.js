const express = require("express");
const projectRouter = express.Router();
const {
  fetchListOfProjects,
  addNewProject,
  deleteProjects,
  updateProject,
} = require("../controller/projectController");
const firebaseAuth = require("../middleware/firebaseAuth");

projectRouter.get("/", firebaseAuth, fetchListOfProjects);
projectRouter.post("/add", firebaseAuth, addNewProject);
projectRouter.put("/update/:id", firebaseAuth, updateProject);
projectRouter.delete("/delete/:id", firebaseAuth, deleteProjects);

module.exports = projectRouter;
