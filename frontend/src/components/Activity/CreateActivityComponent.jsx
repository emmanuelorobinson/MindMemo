import React, { useState } from "react";
import { Form, Formik, ErrorMessage } from "formik";
import SelectMenu from "../SelectMenu";
import Toggle from "../Toggle";
import { createActivity } from "../../utils/ActivityController";
import { useNavigate, useLocation } from "react-router-dom";
import AppContext from "../../context/AppContext";

const CreateActivityComponent = () => {
  const search = useLocation().search;
  const project_id = new URLSearchParams(search).get("id");
  const navigate = useNavigate();
  const [selectedReminder, setSelectedReminder] = useState(false);

  const { activity, setActivity } = React.useContext(AppContext);
  const activityList = activity.map((item) => {
    return {
      id: item.activity_id,
      name: item.activity_name,
    };
  });
  const [selectedValue, setSelectedValue] = useState(0);
  const [projects, setProjects] = useState({
    project_id: project_id,
    activity_number: "",
    activity_name: "",
    start_date: "",
    duration: "",
    reminder: "",
    note: "",
    completed: false,
  });

  const handleSelectedValueChange = (value) => {
    setSelectedValue(value.id);
  };

  const handleSelectedReminderChange = (value) => {
    setSelectedReminder(value);
  };

  return (
    <Formik
      initialValues={projects}
      onSubmit={async (values, { setSubmitting }) => {
        values.activity_number = selectedValue;

        try {
          const response = await createActivity(values);
          console.log(response);

          setSubmitting(false);
        } catch (error) {
          console.log(error);
        }

        navigate(`/project/activity?id=${project_id}`);
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
                  Create New Activity
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Create an activity from scratch and selected a predecessor
                  (optional).
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                {/* Name */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="activity_name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Activity Name
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      type="text"
                      name="activity_name"
                      id="activity_name"
                      value={values.activity_name}
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
                    options={activityList}
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

                {/* Reminder */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="reminder_toggle"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Reminder
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle onToggle={handleSelectedReminderChange} />
                  </div>
                </div>

                {/* Reminder Date */}
                {selectedReminder && (
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="reminder"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Reminder Date
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                        type="date"
                        name="reminder"
                        id="reminder"
                        value={values.reminder}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

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
                      Write a few sentences about the activity.
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
                    navigate(`/project/activity?id=${project_id}`);
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

export default CreateActivityComponent;
