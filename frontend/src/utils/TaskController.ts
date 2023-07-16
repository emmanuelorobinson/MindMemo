import { Tag } from "./TagController";

export interface Task {
  task_id?: number; // created by server
  project_id: number;
  activity_id: number;
  task_number: number;
  task_name: string;
  start_date: Date;
  duration: number;
  note: string;
  tags?: Tag[];
  completed: boolean;
}

const API_URL = process.env.REACT_APP_API_URL;

export const getTasks = async (activity_id: number): Promise<Task[]> => {
  const URL = API_URL + "/tasks/" + activity_id;

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createTask = async (task: Task): Promise<Task> => {
  const URL = API_URL + "/tasks/";

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  try {
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateTask = async (task: Task): Promise<Task> => {
  const URL = API_URL + "/tasks/task/" + task.task_id;

  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  try {
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteTask = async (task_id: number): Promise<Task> => {
  const URL = API_URL + "/tasks/task/" + task_id;

  const response = await fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
