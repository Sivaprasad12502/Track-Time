import React, { use, useEffect, useState } from "react";
import useFrom from "../../hooks/useFrom";
import { getAuth, getIdToken } from "firebase/auth";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
export default function AddProjects() {
  const [isEdit, setIsEdit] = useState(false);
  const [projectId,setProjectId]=useState(null)
  const query = useQueryClient();
  const { values, setValues, handleChange, resetForm } = useFrom({
    projectName: "",
    clientName: "",
    description: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useMutation({
    mutationFn: async () => {
      console.log("Starting mutation...");
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("user not logged in");
      }
      const token = await user.getIdToken();
      console.log("Making request to apil...");
      await axios.post(
        `${apiUrl}/projects/add`,
        {
          projectName: values.projectName,
          clientName: values.clientName,
          description: values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["projects"],
      });
      console.log("project added");
      resetForm();
      // window.location.href='/projects'
      navigate("/projects");
    },
    onError: (error) => {
      console.error("Error adding projects:", error.message);
    },
  });
  const updateProjectMutation=useMutation({
    mutationFn:async()=>{
      const auth=getAuth()
      const user=auth.currentUser
      if(!user){
        throw new Error("user is not logged in")
      }
      const token= await user.getIdToken()
      await axios.put(`${apiUrl}/projects/update/${projectId}`,values,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

    },onSuccess:()=>{
      query.invalidateQueries({
        queryKey:["projects"]
      })
      resetForm()
      setIsEdit(false)
      setProjectId(null)
      navigate('/projects')
    },
    onError:(error)=>{
      console.error("Error adding projects",error.message)
    }
  })
  

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting form..");
    isEdit?updateProjectMutation.mutate():mutation.mutate()
    // try{
    //   const auth=getAuth()
    //   const user=auth.currentUser
    //   if(!user){
    //     throw new Error('User not logged in')
    //   }
    //   const token=await user.getIdToken()
    //   await axios.post(`${apiUrl}/projects/add`,{
    //     projectName:values.projectName,
    //     clientName:values.clientName,
    //     description:values.description
    //   },{
    //     headers:{
    //       Authorization:`Bearer ${token}`
    //     }
    //   })
    //   console.log("project added")
    //   resetForm();
    // }catch(e){
    //   console.error("error adding project:",e.message)
    // }
  }
  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getcurrentProject } = location.state;
      setProjectId(getcurrentProject._id)
      setIsEdit(true);
      setValues({
        projectName: getcurrentProject.projectName,
        clientName: getcurrentProject.clientName,
        description: getcurrentProject.description,
      });
    }
  }, []);
  const {isPending} = mutation.isPending||updateProjectMutation.isPending
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex h-screen flex-col justify-center items-center gap-3">
          <input
            className="border border-black rounded-sm p-3"
            type="text"
            placeholder="Enter Project name"
            name="projectName"
            value={values.projectName}
            onChange={handleChange}
          />
          <input
            className="border border-black rounded-sm p-3"
            type="text"
            placeholder="Enter clientname name"
            name="clientName"
            value={values.clientName}
            onChange={handleChange}
          />
          <textarea
            className="border border-black rounded-sm p-3"
            name="description"
            placeholder="About the project"
            value={values.description}
            onChange={handleChange}
          ></textarea>
          <button className="border border-black rounded-sm p-3" type="submit">
            {isPending ?(isEdit?"updating..":"adding"):isEdit?"update":"add"}
          </button>
        </div>
      </form>
    </div>
  );
}
