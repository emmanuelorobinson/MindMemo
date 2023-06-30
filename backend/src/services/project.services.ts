import { db } from "../utils/db.server";


type Project = {
    project_name: string;
    project_start_date: Date;
    duration: number;
    days_till_renew: number;
    completed: boolean;
}

export const getProjects = async (): Promise<Project[]> => {
    return db.project.findMany({
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true
        }
    });
};

export const getProjectByID = async (project_id: number): Promise<Project | null> => {
    return db.project.findUnique({
        where: {
            project_id,
        },
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true
        }
    });
}

/* ERROR
export const createProject = async (project: Project): Promise<Project> => {
    return db.project.create({
        data: project,
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true
        }
    });
}
*/

export const updateProject = async (project_id: number, project: Project): Promise<Project | null> => {
    return db.project.update({
        where: {
            project_id,
        },
        data: project,
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true
        }
    });
}

export const deleteProject = async (project_id: number): Promise<Project | null> => {
    return db.project.delete({
        where: {
            project_id,
        },
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true
        }
    });
}




