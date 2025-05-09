import React from "react";
import { Link } from "react-router-dom";
import ProjectList from "../../component/projectList";

export default function Projects() {
  return (
    <div>
      <div className="flex justify-end">
        <Link className="underline" to={'/projects/AddProjects'}>AddProjects</Link>
      </div>
      <div>
        <ProjectList/>
      </div>
    </div>
  );
}
