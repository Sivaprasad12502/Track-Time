import React from "react";
import useFrom from "../../hooks/useFrom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
    isError: (error) => {
      console.log(error);
    },
    isSuccess: () => {
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
      await axios.post(`${API_URL}/actvities/add`, values, {
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
  if(isLoading){
    <h1>Please wait Loadingg</h1>
  }
  if(isSuccess){
    console.log(data)
  }
  return (
    <div className="flex flex-col gap-4 text-center ">
      <h3>Enter Your Daily Tasks</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter here "
          name="task"
          value={values.task}
          onChange={handleChange}
        />
        <button type="submit">ADD Tasks</button>
      </form>
      <div>
        {data?.length == 0 ? (
          <h1>no taks added</h1>
        ) : (
          data?.map((taskItem) => (
            <div>
              <h1>{data.task}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
