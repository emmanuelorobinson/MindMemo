import { createContext, useState } from "react";
import { getProjects } from "../utils/ProjectController";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [refetch, setRefetch] = useState(false);
  const [projectCycles, setProjectCycles] = useState([]);
  const [activity, setActivity] = useState([]);
  const [task, setTask] = useState([]);
  const triggerRefetch = () => {
    setRefetch(!refetch);
    console.log("triggered");
  };

  return (
    <AppContext.Provider
      value={{
        refetch,
        setRefetch,
        activity,
        setActivity,
        task,
        setTask,
        projectCycles,
        setProjectCycles,
        triggerRefetch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
