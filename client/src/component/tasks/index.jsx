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
import { ClipLoader } from "react-spinners";

const API_URL = process.env.REACT_APP_API_URL;
export default function Tasks() {
  const query = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);
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
    onSuccess: () => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
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

  const completeTask = useMutation({
    mutationFn: async (currentItem) => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("user is not logged");
      }
      const token = await user.getIdToken();
      await axios.put(
        `${API_URL}/activities/toggle-complete/${currentItem._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["tasks"],
      });
      console.log("completed");
    },
    onError: (error) => {
      console.error(error, "error in complete");
    },
  });
  const deleteTask = useMutation({
    mutationFn: async (taskId) => {
      setDeleteId(taskId);
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("user is not logged in");
      }
      const token = await user.getIdToken();

      await axios.delete(`${API_URL}/activities/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["tasks"],
      });
      console.log("Task deleted");
      setDeleteId(null);
    },
    onError: (error) => {
      setDeleteId(null);
      console.error(error.message);
    },
  });

  return (
    <div className="flex flex-col gap-4 text-center ">
      <h3 className="text-xl font-bold">Enter Your Daily Tasks</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-3">
        <input
          className={` rounded-md bg-gray text-center p-2`}
          type="text"
          placeholder="enter here "
          name="task"
          value={values.task}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-[#c1ff72] font-bold border bg-[black]  rounded-md p-1"
        >
          {addTasks.isPending ? "Adding..." : "Add"}
        </button>
      </form>
      {isLoading ? (
        <div className="flex justify-center">
          <ClipLoader />
        </div>
      ) : (
        <div className=" flex flex-col gap-2 p-3">
          {data?.length == 0 ? (
            <h1 className="text-3xl">No Tasks Added</h1>
          ) : (
            data.map((taskItem) => (
              <div
                key={taskItem._id}
                className={`rounded-md bg-gray text-center   flex items-center justify-between gap-2 p-3 border-b-[2px] border-[black] ${
                  taskItem.completed ? "bg-neonGreen line-through" : ""
                }`}
              >
                <h1>{taskItem.task}</h1>
                <div className="flex gap-2">
                  <button
                    className="border border-green-500 p-1"
                    onClick={() => completeTask.mutate(taskItem)}
                  >
                    {taskItem.completed ? (
                      <MdCheckBox />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </button>
                  <button
                    className="border border-red-500 p-1 flex items-center justify-center"
                    onClick={() => deleteTask.mutate(taskItem._id)}
                  >
                    {deleteId === taskItem._id ? (
                      <ClipLoader color="red" size={5}/>
                    ) : (
                      <FaTrash className="text-red-500" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
