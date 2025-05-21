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
import { useNavigate } from "react-router-dom";
import { BarLoader, ClipLoader } from "react-spinners";
const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL is:", API_URL);
export default function ProjectList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    return (
      <div className=" flex h-full  items-center justify-center bg-gray">
        <ClipLoader />
      </div>
    );
  }
  if (isError) {
    console.log("Error fetching projects:", error);
  }

  if (isSuccess) {
    console.log(data);
  }
  function handleEdit(getcurrentProject) {
    navigate("/projects/AddProjects", { state: { getcurrentProject } });
  }
  return (
    <div className="h-full">
      <div className="items-center justify-center flex bg-[#e5e5e5] flex-col gap-4 p-2 text-center sm:grid grid-cols-2 sm:p-4 md:grid-cols-3 md:p-6 lg:grid-cols-4 lg:p-8">
        {data?.length == 0 ? (
          <div className="col-start-2 lg:col-span-4 ">
            <h1 className=" text-3xl">No Projects Added</h1>
          </div>
        ) : (
          data?.map((projectItem) => (
            <div
              key={projectItem._id}
              className="flex flex-col drop-shadow-shadowBox   gap-1 p-4  text-[black] bg-[#fff] rounded-[20px] transition-transform duration-300 ease-linear  hover:translate-y-[-3px] w-full  h-full  border-b-[3px] border-[black] border"
            >
              <div className="bg-white flex flex-col gap-2 rounded-md p-2 justify-between h-full">
                <div className="flex gap-2 break-words w-full ">
                  {" "}
                  <span className="font-bold">ClientName:</span>{" "}
                  <span className="uppercase break-words w-full">
                    {projectItem?.clientName}
                  </span>{" "}
                </div>
                <div className="flex gap-2 break-words w-full">
                  {" "}
                  <span className="font-bold">ProjectName:</span>{" "}
                  <span className="uppercase">{projectItem?.projectName}</span>{" "}
                </div>
                <div className="flex flex-col break-words w-full ">
                  <span className="font-bold underline">About the Project</span>{" "}
                  <span>{projectItem?.description}</span>
                </div>

                <div className="flex items-center bg-[#c1ff72] w-fit">
                  <FaEdit size={30} onClick={() => handleEdit(projectItem)} />
                  <FaTrash
                    size={30}
                    onClick={() => deleteProjects.mutate(projectItem._id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
