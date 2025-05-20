import React from "react";
import { Link } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";
import ProjectList from "../../component/projectList";

export default function Projects() {
  return (
    <div className="flex flex-col gap-1 bg-[#e5e5e5] h-screen">
      <div className="flex justify-end w-full  p-2 text-white font-normal ">
        <Link
          className="flex items-center rounded-md  bg-[black] p-2 w-fit"
          to={"/projects/AddProjects"}
        >
          {" "}
          <MdNoteAdd size={15} />
          New
        </Link>
      </div>
      <div className="">
        <ProjectList />
      </div>
    </div>
  );
}
