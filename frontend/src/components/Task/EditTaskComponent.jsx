import React, { useState } from "react";
import { Form, Formik, ErrorMessage } from "formik";
import SelectMenu from "../SelectMenu";
import Modal from "../Modal";
import Toggle from "../Toggle";
import { updateTask } from "../../utils/TaskController";
import { AppContext } from "../../context/AppContext";

const EditActivityComponent = ({ show, onClose, task }) => {
  const [selectedValue, setSelectedValue] = useState(task.task_number);
  const [selectedReminder, setSelectedReminder] = useState(false);
  const { task: taskList, triggerRefetch } = React.useContext(AppContext);
  const taskOptions = taskList.map((item) => {
    return {
      id: item.task_id,
      name: item.task_name,
    };
  });

  const handleSelectedValueChange = (value) => {
    setSelectedValue(value.id);
  };

  const handleSelectedReminderChange = (value) => {
    setSelectedReminder(value);
  };

  return (
    //modal
    <Modal onClose={onClose}>
      <Formik
        initialValues={task}
        onSubmit={async (values, { setSubmitting }) => {
          values.task_number = selectedValue;
          values.start_date = new Date(values.start_date);

          try {
            const response = await updateTask(values);
            console.log(response);

            setSubmitting(false);
          } catch (error) {
            console.log(error);
          }

          onClose();
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
          <div className=" flex md:w-[70%] md:h-[70%] align-middle text-left bg-white p-6 pl-10 mt-5 border border-[#E7E7E9] rounded-lg">
            <form
              className="space-y-8 divide-y divide-gray-200 w-[90%]"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10 py-6 px-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Edit Task
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Edit a task, changes may take a while to reflect.
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
                      value={{
                        id: selectedValue,
                        name: taskOptions.find(
                          (item) => item.id === selectedValue
                        )
                          ? taskOptions.find(
                              (item) => item.id === selectedValue
                            ).name
                          : "none",
                      }}
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
                    onClick={onClose}
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClose={onClose}
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
    </Modal>
  );
};

export default EditActivityComponent;
