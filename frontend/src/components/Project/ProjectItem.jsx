import React from "react";
import { Link } from "react-router-dom";

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
          <Link
            to={`/project/activity?id=${data.id}`}
          >
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Project
            </button>
          </Link>
        </div>
        <div className="mt-2">
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            More
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
