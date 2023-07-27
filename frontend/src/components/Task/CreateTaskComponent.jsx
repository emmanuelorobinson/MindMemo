import React, { useState } from "react";
import { Form, Formik, ErrorMessage } from "formik";
import SelectMenu from "../SelectMenu";
import Toggle from "../Toggle";
import { useNavigate, useLocation } from "react-router-dom";
import { createTask } from "../../utils/TaskController";
import AppContext from "../../context/AppContext";

const CreateTaskComponent = () => {
  const search = useLocation().search;
  const project_id = new URLSearchParams(search).get("projectId");
  const activity_id = new URLSearchParams(search).get("activityId");
  const { task: taskList, triggerRefetch } = React.useContext(AppContext);
  const taskOptions = taskList.map((item) => {
    return {
      id: item.task_id,
      name: item.task_name,
    };
  });

  const navigate = useNavigate();

  const [task, setTask] = useState({
    project_id: project_id,
    activity_id: activity_id,
    task_number: "",
    task_name: "",
    start_date: "",
    duration: "",
    note: "",
    completed: false,
  });

  const [selectedValue, setSelectedValue] = useState(0);

  const handleSelectedValueChange = (value) => {
    setSelectedValue(value.id);
  };

  return (
    <Formik
      initialValues={task}
      onSubmit={ async (values, { setSubmitting }) => {
        values.task_number = selectedValue;

        try {
          const response = await createTask(values);
          console.log(response);

          setSubmitting(false);
        } catch (error) {
          console.log(error);
        }

        navigate(
          `/project/activity/task?projectId=${project_id}&activityId=${activity_id}`
        );

        triggerRefetch();
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <div className=" flex w-[100%] text-left bg-white p-6 pl-10 mt-5 border border-[#E7E7E9] rounded-lg">
          <form
            className="space-y-8 divide-y divide-gray-200 w-[90%]"
            onSubmit={handleSubmit}
          >
            <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10 py-6 px-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Create New Task
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Create a task from scratch and selected a predecessor
                  (optional).
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                {/* Name */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="task_name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Task Name
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      type="text"
                      name="task_name"
                      id="task_name"
                      value={values.task_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="start_date"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Start Date
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      type="date"
                      name="start_date"
                      id="start_date"
                      value={values.start_date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/*Dependency*/}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <SelectMenu
                    label={"Dependency"}
                    options={taskOptions}
                    onSelectedValueChange={handleSelectedValueChange}
                  />
                </div>

                {/* Duration */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Duration
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      type="number"
                      min={1}
                      name="duration"
                      id="duration"
                      value={values.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Note */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="note"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Note
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <textarea
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      id="note"
                      name="note"
                      rows={3}
                      value={values.note}
                      onChange={handleChange}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about the task.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="py-10 px-10">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    navigate(
                      `/project/activity/task?projectId=${project_id}&activityId=${activity_id}`
                    );
                  }}
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default CreateTaskComponent;
