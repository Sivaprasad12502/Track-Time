import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";
import ProjectList from "../../component/projectList";
import BackButton from "../../component/BackSwitch";

export default function Projects() {
  const navigate = useNavigate();
  return (
    <div className="max-h-[90vh] ">
      <BackButton/>
      <div className="flex flex-col gap-1 h-full">
        <div className="drop-shadow-shadowBox flex justify-end w-full fixed p-2 z-[100] text-white font-normal">
          <Link
            className="flex items-center rounded-md  bg-[black] p-2 w-fit"
            to={"/projects/AddProjects"}
          >
            {" "}
            <MdNoteAdd size={15} />
            New
          </Link>
        </div>
        <div className="h-full mt-[4rem]">
          <ProjectList />
        </div>
      </div>
    </div>
  );
}
