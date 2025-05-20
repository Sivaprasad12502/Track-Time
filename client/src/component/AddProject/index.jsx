import React, { use, useEffect, useState } from "react";
import useFrom from "../../hooks/useFrom";
import { getAuth, getIdToken } from "firebase/auth";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
export default function AddProjects() {
  const [isEdit, setIsEdit] = useState(false);
  const [projectId, setProjectId] = useState(null);
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
  const updateProjectMutation = useMutation({
    mutationFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("user is not logged in");
      }
      const token = await user.getIdToken();
      await axios.put(`${apiUrl}/projects/update/${projectId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["projects"],
      });
      resetForm();
      setIsEdit(false);
      setProjectId(null);
      navigate("/projects");
    },
    onError: (error) => {
      console.error("Error updating projects", error.message);
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting form..");
    if (isEdit) {
      console.log("Updating project...");
      updateProjectMutation.mutate();
    } else {
      console.log("Adding project...");
      mutation.mutate();
    }
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
      setProjectId(getcurrentProject._id);
      setIsEdit(true);
      setValues({
        projectName: getcurrentProject.projectName,
        clientName: getcurrentProject.clientName,
        description: getcurrentProject.description,
      });
    }
  }, []);
  const isPending = mutation.isPending || updateProjectMutation.isPending;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex h-screen flex-col justify-center gap-3 p-2 md:max-w-[768px] mx-auto md:px-24">
          <label className="font-bold">ProjecName</label>
          <input
            className="bg-[#e5e5e5] border border-[#c1ff72] text-center rounded-md p-2 focus:border-[2px] focus:border-[#9181f4] outline-none"
            type="text"
            placeholder="Enter Project name"
            name="projectName"
            value={values.projectName}
            onChange={handleChange}
          />
          <label className="font-bold">ClientName</label>
          <input
            className="bg-[#e5e5e5] border border-[#c1ff72] text-center rounded-md p-2 focus:border-[2px] focus:border-[#9181f4] outline-none"
            type="text"
            placeholder="Enter clientname name"
            name="clientName"
            value={values.clientName}
            onChange={handleChange}
          />
          <label className="font-bold">About The Project</label>
          <textarea
            className="bg-[#e5e5e5] border border-[#c1ff72] text-center rounded-md p-2 h-1/2 focus:border-[2px] focus:border-[#9181f4] outline-none"
            name="description"
            placeholder="About the project"
            value={values.description}
            onChange={handleChange}
          ></textarea>
          <div className="flex justify-center">
            <button
              className="text-[#c1ff72] font-bold border bg-[black] w-[10rem] rounded-md p-1"
              type="submit"
            >
              {isPending
                ? isEdit
                  ? "Updating..."
                  : "Adding..."
                : isEdit
                ? "Update"
                : "Add"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
