import { db } from "../utils/db.server";
import { Activity, Project} from "@prisma/client";
import { createCycle } from "./cycle.services";

//get all projects by user
export const getProjects = async (user_id: number): Promise<Project[]> => {
    return db.project.findMany({
        where: {
            user_id: user_id,
        },
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            save_as_cycle: true,
            user_id: true,
        }
    })
};

//get project by id
export const getProjectByID = async (project_id: number): Promise<Project | null> => {
    return db.project.findUnique({
        where: {
            project_id,
        },
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            save_as_cycle: true,
            user_id: true,
        }
    });
}

//create project and add it to user list
export const createProject = async (project: Omit<Project, 'project_id'>): Promise<Project> => {
    //create new project
    let newProject = db.project.create({
        data: project,
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            save_as_cycle: true,
            user_id: true,
        }
    });

    if ((await newProject).save_as_cycle) {
        createCycle((await newProject).project_id);
    }

    return newProject;
}

export const updateProject = async (project: Project): Promise<Project | null> => {
    return db.project.update({
        where: {
            project_id: project.project_id,
        },
        data: project,
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            user_id: true,
            save_as_cycle: true,
        }
    });
}

export const deleteProject = async (project_id: number): Promise<Project | null> => {
    return db.project.delete({
        where: {
            project_id,
        },
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            user_id: true,
            save_as_cycle: true,
        }
    });
}


