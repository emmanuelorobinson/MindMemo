import { Tag } from "./TagController";

export interface Activity {
  activity_id?: number;
  project_id: number;
  activity_number: number;
  activity_name: string;
  dependency: string;
  start_date: Date;
  duration: number;
  note: string;
  tags?: Tag[];
  completed: boolean;
}

const API_URL = process.env.REACT_APP_API_URL;

export const getActivities = async (project_id: number): Promise<Activity[]> => {
  const URL = API_URL + '/activities/' + project_id;

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
  const URL = API_URL + '/activities/';

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
  console.log(activity);
  const URL = API_URL + '/activities/activity/' + activity.activity_id;


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

export const deleteActivity = async (activity_id: number): Promise<Activity> => {
  const URL = API_URL + '/activities/activity/' + activity_id;

  const response = await fetch(URL, {
    method: 'DELETE',
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

