import { Tag } from "./TagController";

export interface Task {
  id?: string; // created by server
  project_id: string;
  activity_id: string;
  name: string;
  start_date: Date;
  duration: number;
  note: string;
  tags: Tag[];
}

export const getTasks = async (): Promise<Task[]> => {
  const URL = "";

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
  const URL = "";

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
  const URL = "";

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

export const deleteTask = async (task: Task): Promise<Task> => {
  const URL = "";

  const response = await fetch(URL, {
    method: "DELETE",
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
