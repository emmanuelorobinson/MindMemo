import React from "react";
import ProjectItem from "./ProjectItem";
import AddButton from "../AddButton";
import { useNavigate } from "react-router-dom";

const ProjectList = ({projectList, reFetch}) => {

  const navigate = useNavigate();

  const onAddClick = () => {
    // navigate("/project/create");
    navigate("/project/create");


  };

  return (
    <div className="bg-white p-6 pl-10 mt-5 border border-[#E7E7E9] rounded-lg">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-start text-left">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Projects
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Create a project from scratch
          </p>
        </div>
        <div className="flex justify-end">
          <AddButton onAddClick={onAddClick} />
        </div>
      </div>
      <div className="mt-6 flow-root">
        <ul role="list" className="divide-y divide-gray-100">
          {projectList.map((project) => (
            <li key={project.project_id} className="flex justify-between gap-x-6 py-5">
              <ProjectItem data={project} reFetch={reFetch} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
