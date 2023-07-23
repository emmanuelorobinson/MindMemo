import { db } from "../utils/db.server";
import { Activity, Project} from "@prisma/client";
import { createCycle, getCycleByProjectID } from "./cycle.services";
import { get } from "http";
import { getActivities } from "./activity.services";

//get all projects by user
export const getProjects = async (user_id: string): Promise<Project[]> => {
    return db.project.findMany({
        where: {
            user_id,
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
            cycle_id: true,
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
            cycle_id: true,
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
            cycle_id: true,
        }
    });

    if ((await newProject).save_as_cycle) {
        createCycle((await newProject).project_id);
    }

    return newProject;
}

export const updateProject = async (project: Project): Promise<Project | null> => {
    let newProject = db.project.update({
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
            save_as_cycle: true,
            user_id: true,
            cycle_id: true,
        }
    });

    if ((await newProject).save_as_cycle) {
        let cycle = await getCycleByProjectID((await newProject).project_id);
        if (cycle == null) {
            createCycle((await newProject).project_id);
        }
    }

    return newProject;
}

export const deleteProject = async (project_id: number): Promise<Project | null> => {
    let activities = await getActivities(project_id);
    activities.forEach(async (activity) => {
        db.activity.delete({
            where: {
                activity_id: activity.activity_id,
            },
        })
    });
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
            save_as_cycle: true,
            user_id: true,
            cycle_id: true,
        }
    });
}


