import React, { useState } from "react";
import { Form, Formik, ErrorMessage } from "formik";
import SelectMenu from "../SelectMenu";
import Toggle from "../Toggle";
import { useClerk } from "@clerk/clerk-react";
import { createProject } from "../../utils/ProjectController";
import { useNavigate } from "react-router-dom";

const options = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

const CreateProjectComponent = () => {
  const { user } = useClerk();

  const navigate = useNavigate();

  const [projects, setProjects] = useState({
    cycle: "",
    project_name: "",
    project_start_date: "",
    duration: "",
    days_till_renew: "",
    save_as_cycle: "",
    user_id: user.id,
    completed: false,
  });

  const [selectedValue, setSelectedValue] = useState("None");
  const [selectedCycle, setSelectedCycle] = useState(false);

  const handleSelectedValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleSelectedCycleChange = (value) => {
    setSelectedCycle(value);
  };

  return (
    <Formik
      initialValues={projects}
      onSubmit={ async (values, { setSubmitting }) => {
        values.cycle = selectedValue;
        values.save_as_cycle = selectedCycle;

        // try {
        //   const response = await createProject(values);
        //   console.log(response);

        //   setSubmitting(false);
        // } catch (error) {
        //   console.log(error);
        // }

        // useNavigate("/project");
        // navigate("/project");
        
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
                  Create New Project
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Create a project from scratch or from an existing cycle if
                  available.
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
                  onClick={() => {
                    // router.push("/product");
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

export default CreateProjectComponent;
