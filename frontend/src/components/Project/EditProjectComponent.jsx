import React, { useState } from "react";
import { Form, Formik, ErrorMessage } from "formik";
import SelectMenu from "../SelectMenu";
import Modal from "../Modal";
import Toggle from "../Toggle";
import { updateProject } from "../../utils/ProjectController";
import { AppContext } from "../../context/AppContext";

const options = [{ id: 1, name: "Test" }];

const EditProjectComponent = ({ onClose, project }) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedCycle, setSelectedCycle] = useState(false);
  const {triggerRefetch} = React.useContext(AppContext)

  const handleSelectedCycleChange = (value) => {
    setSelectedCycle(value);
  };

  const handleSelectedValueChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Modal onClose={onClose}>
      <Formik
        initialValues={project}
        onSubmit={async (values, { setSubmitting }) => {
          values.cycle_id = selectedValue;
          values.save_as_cycle = selectedCycle;
          values.start_date = new Date(values.start_date);

          try {
            const response = await updateProject(values);
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
                    Edit Project
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Edit a project, changes may take a while to reflect.
                  </p>
                </div>

                <div className="space-y-6 sm:space-y-5">
                  {/*Previous Cycle*/}
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <SelectMenu
                      label={"Previous Cycle"}
                      options={options}
                      onSelectedValueChange={handleSelectedValueChange}
                    />
                  </div>

                  {/* Name */}
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="project_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Project Name
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                        type="text"
                        name="project_name"
                        id="project_name"
                        value={values.project_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="project_start_date"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Start Date
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                        type="date"
                        name="project_start_date"
                        id="project_start_date"
                        value={values.project_start_date}
                        onChange={handleChange}
                      />
                    </div>
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

                  {/* Renew */}
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="days_till_renew"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Renew after days
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                        type="number"
                        min={0}
                        name="days_till_renew"
                        id="days_till_renew"
                        value={values.days_till_renew}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Cycle */}
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="renew"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Save as cycle
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <Toggle onToggle={handleSelectedCycleChange} />
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

export default EditProjectComponent;
