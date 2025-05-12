import React, { useState } from "react";
import useFrom from "../../hooks/useFrom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const apiUrl = process.env.REACT_APP_API_URL;
export default function AddProjects() {
  const query = useQueryClient();
  const { values, handleChange, resetForm } = useFrom({
    projectName: "",
    clientName: "",
    description: "",
  });

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
    },
    onError: (error) => {
      console.error("Error adding projects:", error.message);
    },
  });
  const { mutate, isPending } = mutation;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting form..");
    mutate();
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
            {isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
