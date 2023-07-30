import React, { useEffect, useState } from "react";
import { Form, Formik, ErrorMessage } from "formik";
import SelectMenu from "../SelectMenu";
import Toggle from "../Toggle";
import { useClerk } from "@clerk/clerk-react";
import { createProject } from "../../utils/ProjectController";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../utils/ProjectController";
import AppContext from "../../context/AppContext";

const CreateProjectComponent = () => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedCycle, setSelectedCycle] = useState(false);
  const [selectedRenew, setSelectedRenew] = useState(false);
  const { refetch, setRefetch, projectCycles, setProjectCycles } =
    React.useContext(AppContext);

  const { user } = useClerk();
  const navigate = useNavigate();

  const [projects, setProjects] = useState({
    cycle_id: "",
    project_name: "",
    project_start_date: "",
    duration: "",
    renew: false,
    days_till_renew: "",
    save_as_cycle: "",
    user_id: user.id,
    completed: false,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects(user.id);

      // loop through and store in options if save_as_cycle is true
      const temp = [];
      response.map((i) => {
        if (i.save_as_cycle) {
          temp.push({
            id: i.project_id,
            name: i.project_name,
          });
        }
      });

      setOptions(temp);
    };
    fetchProjects();

    console.log("appcontext", refetch);
  }, []);

  const handleSelectedValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleSelectedCycleChange = (value) => {
    setSelectedCycle(value);
  };

  const handleSelectedRenewChange = (value) => {
    setSelectedRenew(value);
  };

  return (
    <Formik
      initialValues={projects}
      validate={(values) => {
        const errors = {};
        if (!values.project_name) {
          errors.project_name = "Required";
        }

        if (!values.project_start_date) {
          errors.project_start_date = "Required";
        }

        if (!values.duration) {
          errors.duration = "Required";
        }

        // if (selectedRenew && !values.days_till_renew) {
        //   errors.days_till_renew = "Required";
        // }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        values.cycle_id = selectedValue.id;
        values.save_as_cycle = selectedCycle;

        try {
          const response = await createProject(values);
          console.log(response);

          setSubmitting(false);
        } catch (error) {
          console.log(error);
        }

        navigate("/project");
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
                    <ErrorMessage
                      name="project_name"
                      component="div"
                      className="text-red-500 text-sm"
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
                    <ErrorMessage
                      name="project_start_date"
                      component="div"
                      className="text-red-500 text-sm"
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
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* Renew */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="renew"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Renew
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle onToggle={handleSelectedRenewChange} />
                  </div>
                </div>

                {/* Renew after datys */}
                {selectedRenew && (
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
                        min={1}
                        name="days_till_renew"
                        id="days_till_renew"
                        value={values.days_till_renew}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

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
                  onClick={() => navigate("/project")}
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
