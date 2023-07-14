import { Tag } from "./TagController";

export interface Activity {
  id?: string;
  project_id: string;
  activity_number: number;
  activity_name: string;
  dependency: string;
  start_date: Date;
  duration: number;
  note: string;
  tags?: Tag[];
  completed: boolean;
}

export const getActivities = async (): Promise<Activity[]> => {
  const URL = '';

  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const data = await response.json();
    return data;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export const createActivity = async (activity: Activity): Promise<Activity> => {
  const URL = '';

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });

  try {
    const data = await response.json();
    return data;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export const updateActivity = async (activity: Activity): Promise<Activity> => {
  const URL = '';

  const response = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });

  try {
    const data = await response.json();
    return data;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export const deleteActivity = async (activity: Activity): Promise<Activity> => {
  const URL = '';

  const response = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });

  try {
    const data = await response.json();
    return data;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

