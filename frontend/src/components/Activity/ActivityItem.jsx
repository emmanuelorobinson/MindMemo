import React from "react";
import { Link } from "react-router-dom";
import MenuDropdown from "../MenuDropdown";
import EditActivityComponent from "./EditActvityComponent";
import { deleteActivity, updateActivity } from "../../utils/ActivityController";

const colorScheme = (status) => {
  switch (status) {
    case false:
      return {
        outer: "bg-yellow-100 border-yellow-800",
        inner: "bg-yellow-400",
      };
    case true:
      return {
        outer: "bg-green-100 border-green-800",
        inner: "bg-green-400",
      };
    case "Overdue":
      return {
        outer: "bg-red-100 border-red-800",
        inner: "bg-red-400",
      };
    default:
  }
};

const ActivityItem = ({ data }) => {
  // console.log(data);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const onEditClick = () => {
    console.log("edit");
    showEditModal ? setShowEditModal(false) : setShowEditModal(true);
  };

  const onDeleteClick = async() => {
    // console.log("delete");
    try {
      const response =  await deleteActivity(data.activity_id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // refresh page
    // window.location.reload();
  };

  const onCheckClick = async (e) => {
    try {
      console.log(data.activity_id)
      const newData = { ...data, completed: e.target.checked };
      const response = await updateActivity(newData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="gap-x-4">
        <div className="flex gap-x-4">
          {/* checkbox */}
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                onClick={(e) => onCheckClick(e)}
                value={data.completed}
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="min-w-0 flex-auto text-left">
            <div className="flex flex-row gap-x-2">
              <div className="flex flex-row gap-x-2">
                {/* double circle status */}
                <div
                  className={`flex items-center justify-center h-5 w-5 rounded-full ${
                    colorScheme(data.completed).outer
                  }`}
                >
                  <div
                    className={`h-3.5 w-3.5 rounded-full ${
                      colorScheme(data.completed).inner
                    }`}
                  ></div>
                </div>
              </div>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {data.activity_name}
              </p>
            </div>
            {data.tags && (
              <div className="flex align-middle gap-x-2 mt-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25 6.75H20.25M8.25 12H20.25M8.25 17.25H20.25M3.75 6.75H3.757V6.758H3.75V6.75ZM4.125 6.75C4.125 6.84946 4.08549 6.94484 4.01516 7.01516C3.94484 7.08549 3.84946 7.125 3.75 7.125C3.65054 7.125 3.55516 7.08549 3.48483 7.01516C3.41451 6.94484 3.375 6.84946 3.375 6.75C3.375 6.65054 3.41451 6.55516 3.48483 6.48484C3.55516 6.41451 3.65054 6.375 3.75 6.375C3.84946 6.375 3.94484 6.41451 4.01516 6.48484C4.08549 6.55516 4.125 6.65054 4.125 6.75ZM3.75 12H3.757V12.008H3.75V12ZM4.125 12C4.125 12.0995 4.08549 12.1948 4.01516 12.2652C3.94484 12.3355 3.84946 12.375 3.75 12.375C3.65054 12.375 3.55516 12.3355 3.48483 12.2652C3.41451 12.1948 3.375 12.0995 3.375 12C3.375 11.9005 3.41451 11.8052 3.48483 11.7348C3.55516 11.6645 3.65054 11.625 3.75 11.625C3.84946 11.625 3.94484 11.6645 4.01516 11.7348C4.08549 11.8052 4.125 11.9005 4.125 12ZM3.75 17.25H3.757V17.258H3.75V17.25ZM4.125 17.25C4.125 17.3495 4.08549 17.4448 4.01516 17.5152C3.94484 17.5855 3.84946 17.625 3.75 17.625C3.65054 17.625 3.55516 17.5855 3.48483 17.5152C3.41451 17.4448 3.375 17.3495 3.375 17.25C3.375 17.1505 3.41451 17.0552 3.48483 16.9848C3.55516 16.9145 3.65054 16.875 3.75 16.875C3.84946 16.875 3.94484 16.9145 4.01516 16.9848C4.08549 17.0552 4.125 17.1505 4.125 17.25Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {/* {data.tags.map((tag) => (
                  <span className="text-sm font-medium text-gray-500 mt-0.5 bg-[#F9FAFB] px-2 border rounded-lg">
                    {tag}
                  </span>
                ))} */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-row gap-x-4 sm:items-end align-middle">
        {/* view project button and 3 dots to pop up a menu */}

        <div className="flex align-middle justify-center">
          <MenuDropdown onDelete={onDeleteClick} onEdit={onEditClick} />

          <Link
            to={`/project/activity/task?projectId=${data.project_id}&activityId=${data.id}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
      {showEditModal && (
        <EditActivityComponent
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default ActivityItem;
