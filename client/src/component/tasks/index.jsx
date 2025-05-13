import React, { useState } from "react";
import useFrom from "../../hooks/useFrom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { getAuth } from "firebase/auth";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export default function Tasks() {
  const query = useQueryClient();
 
  const { values, handleChange, resetForm } = useFrom({ task: "" });

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User is not logged in");
      }
      const token = await user.getIdToken();
      const response = await axios.get(`${API_URL}/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log(data);
    },
  });
  const addTasks = useMutation({
    mutationFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Useer is not logged in");
      }
      const token = await user.getIdToken();
      await axios.post(`${API_URL}/activities/add`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["tasks"],
      });
      console.log("task added");
      resetForm();
    },
    onError: (error) => {
      console.error("Error adding tasks:", error.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    addTasks.mutate();
  }
  if (isLoading) {
    return <h1>Please wait Loadingg</h1>;
  }
  async function  Taskcompleted (currentItem) {
    const addTask=useMutation({
      mutationFn:async ()=>{
        const auth=getAuth()
        const user=auth.currentUser
        if(!user){
          console.log('user is not logged')
        }
        const token=user.getIdToken()
        axios.put(`${API_URL}/activities/toggle-complete/${currentItem._id}`,null,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      },onSuccess:()=>{
        query.invalidateQueries({
          queryKey:['tasks']
          
        })
        console.log('completed')
      },onError:(error)=>{
        console.error(error ,'error in complete')
      }
    })
  }
  console.log(completed);
  return (
    <div className="flex flex-col gap-4 text-center ">
      <h3 className="text-xl font-bold">Enter Your Daily Tasks</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-3">
        <input
          className={`border rounded-sm border-black text-center`}
          type="text"
          placeholder="enter here "
          name="task"
          value={values.task}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-black text-white   border rounded-md border-black text-center"
        >
          {addTasks.isPending ? "adding" : "addTasks"}
        </button>
      </form>
      <div className=" flex flex-col gap-2 p-3">
        {data?.length == 0 ? (
          <h1>no taks added</h1>
        ) : (
          data.map((taskItem) => (
            <div
              key={taskItem._id}
              className={`border rounded-sm border-black text-center  flex items-center justify-between gap-2 p-3 ${
                taskItem.completed
                  ? "border-green-500 line-through"
                  : ""
              }`}
            >
              <h1>{taskItem.task}</h1>
              <div className="flex gap-2">
                <button
                  className="border border-green-500 p-1"
                  onClick={() => Taskcompleted(taskItem)}
                >
                  {taskItem.completed ? (
                    <MdCheckBox />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </button>
                <button className="border border-red-500 p-1">
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
