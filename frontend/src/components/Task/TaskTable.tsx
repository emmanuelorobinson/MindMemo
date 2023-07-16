import React, { useMemo, useEffect, useState } from "react";
import Pagination from "./Pagination";
import MenuDropdown from "../MenuDropdown";
// import { getProducts } from "../utils/ProductController";
// import Image from "next/image";

const pageSize = 7;

const TaskTable = ({ taskList }: any) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const formatDate = (date: any, duration: any) => {
    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + duration);
    const formattedDueDate = dueDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDueDate;
  };

  const colorScheme = (status: any) => {
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

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    return taskList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, taskList]);

  const onEditClick = () => {
    console.log("edit");
  };

  const onDeleteClick = async () => {
    console.log("delete");
  };

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <div>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
              >
                <input
                  disabled
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Task
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Due
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentTableData.map((task: any) => (
              <tr key={task.task_id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="text-gray-900 text-center">
                  <input
                    disabled
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="text-gray-900 text-left">
                    TASK-{task.task_id}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="text-gray-900 text-left">
                    {task.task_name}
                  </div>
                  {/* <div className="text-gray-500">{task.subCategory}</div> */}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="text-gray-900 text-left">
                    {formatDate(task.start_date, task.duration)}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="text-gray-900 text-left">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium leading-4 ${colorScheme(
                        task.completed
                      )}`}
                    >
                      {task.completed ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <MenuDropdown
                    onEdit={onEditClick}
                    onDelete={onDeleteClick}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{currentPage}</span> to{" "}
                <span className="font-medium">
                  {taskList.length > pageSize
                    ? (taskList.length / pageSize).toFixed()
                    : taskList.length}
                </span>{" "}
                of <span className="font-medium">{taskList.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <Pagination
                currentPage={currentPage}
                totalCount={taskList.length}
                pageSize={pageSize}
                onPageChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
