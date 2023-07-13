import React from "react";
import { Link } from "react-router-dom";
import MenuDropdown from "../MenuDropdown";

const colorScheme = (status) => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 border-yellow-800";
    case "Completed":
      return "bg-green-100 text-green-800 border-green-800";
    case "Overdue":
      return "bg-red-100 text-red-800 border-red-800";
    default:
  }
};

const ProjectItem = ({ data }) => {
  console.log(data);

  const onEditClick = () => {
    console.log("edit");
  };

  const onDeleteClick = () => {
    console.log("delete");
  };


  return (
    <>
      <div className="gap-x-4">
        <div className="min-w-0 flex-auto text-left">
          <div className="flex flex-row gap-x-2">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {data.name}
            </p>
            <div className="flex flex-row gap-x-2">
              <span
                className={`inline-flex items-center px-2 py-0 rounded-full text-xs font-medium leading-4 ${colorScheme(
                  data.status
                )}`}
              >
                {data.status}
              </span>
            </div>
          </div>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            Due on {data.due} - Created by {data.createdBy}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-row gap-x-4 sm:items-end">
        {/* view project button and 3 dots to pop up a menu */}
        <div>
          <Link to={`/project/activity?id=${data.id}`}>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Project
            </button>
          </Link>
        </div>
        <div className="mt-2">
          <MenuDropdown onEdit={onEditClick} onDelete={onDeleteClick} />
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
