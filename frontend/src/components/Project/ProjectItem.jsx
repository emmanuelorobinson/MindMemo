import React from "react";
import { Link } from "react-router-dom";
import MenuDropdown from "../MenuDropdown";

const colorScheme = (status) => {
  switch (status) {
    case false:
      return "bg-yellow-100 text-yellow-800 border-yellow-800";
    case true:
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

  // project due date is data.project_start_date + data.duration (duration in days)
  // date format: 2023-06-30T20:00:00.000Z
  // convert to  March 17, 2023 format
  const dueDate = new Date(data.project_start_date);
  dueDate.setDate(dueDate.getDate() + data.duration);
  const formattedDueDate = dueDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  


  return (
    <>
      <div className="gap-x-4">
        <div className="min-w-0 flex-auto text-left">
          <div className="flex flex-row gap-x-2">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {data.project_name}
            </p>
            <div className="flex flex-row gap-x-2">
              <span
                className={`inline-flex items-center px-2 py-0 rounded-full text-xs font-medium leading-4 ${colorScheme(
                  data.completed
                )}`}
              >
                {data.completed ? "Completed" : "In Progress"}
              </span>
            </div>
          </div>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            Due on {formattedDueDate} - Created by {data.createdBy}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-row gap-x-4 sm:items-end">
        {/* view project button and 3 dots to pop up a menu */}
        <div>
          <Link to={`/project/activity?id=${data.project_id}`}>
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
