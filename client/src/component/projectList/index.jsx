import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL is:", API_URL);
export default function ProjectList() {
  const queryClient = useQueryClient();
  const navigate=useNavigate()
  const fetchProjects = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }
    const token = await user.getIdToken();
    const response = await axios.get(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const deleteProjects = useMutation({
    mutationFn: async (projectId) => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }
      const token = await user.getIdToken();

      const url = `${API_URL}/projects/delete/${projectId}`;
      console.log("Deleting:", url);
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("error delelting project", error);
    },
  });

  if (isLoading) {
    return <h1>Loading...please wait!!</h1>;
  }
  if (isError) {
    console.log("Error fetching projects:", error);
  }

  if (isSuccess) {
    console.log(data);
  }
  function handleEdit(getcurrentProject) {
   
    navigate('/projects/AddProjects',{state:{getcurrentProject}})
  }
  return (
    <div>
      <div className="flex  flex-col gap-4 p-2 text-center ">
        {data?.length == 0 ? (
          <h1>no bolges added</h1>
        ) : (
          data.map((projectItem) => (
            <div
              key={projectItem._id}
              className="flex flex-col border border-red-500"
            >
              <span>{projectItem?._id}</span>
              <span>{projectItem?.clientName}</span>
              <span>{projectItem?.projectName}</span>
              <span>{projectItem?.description}</span>

              <FaEdit size={30} onClick={() => handleEdit(projectItem)} />
              <FaTrash
                size={30}
                onClick={() => deleteProjects.mutate(projectItem._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
