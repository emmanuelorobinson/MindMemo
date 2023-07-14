// import env from 'react-dotenv';
// import dotenv from 'dotenv';

export interface Project {
    cycle: string;
    project_id?: number;
    project_name: string;
    project_start_date: Date;
    duration: number;
    days_till_renew: boolean;
    save_as_cycle: boolean;
    user_id: string;
    completed: boolean;
}


const API_URL = process.env.REACT_APP_API_URL;

export const getProjects = async (): Promise<Project[]> => {
  const URL = API_URL + '/projects/'

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
};

export const createProject = async (project: Project): Promise<Project> => {
  const URL = API_URL + '/projects/'

  const projectData = {
    ...project,
  };
  delete projectData.project_id; // Remove project_id from projectData


  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });

  try {
    const data = await response.json();
    return data;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export const updateProject = async (project: Project): Promise<Project> => {
  const URL = '';

  const response = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });

  try {
    const data = await response.json();
    return data;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export const deleteProject = async (project: Project): Promise<Project> => {
  const URL = '';

  const response = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });

  try {
    const data = await response.json();
    return data;
  }
  catch (error: any) {
    throw new Error(error);
  }
}