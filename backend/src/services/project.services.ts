import { db } from "../utils/db.server";
import { Activity, ActivityList, Project } from "@prisma/client";
import { getUserProjectList } from "./user.services";

export const getProjects = async (): Promise<Project[]> => {
    return db.project.findMany({
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
            save_as_cycle: true,
        }
    });
};

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
            project_list_id: true,
            save_as_cycle: true,
        }
    });
}


export const createProject = async (project: Omit<Project, 'project_id' | 'project_list_id'>, user_id: number): Promise<Project> => {
    let id = await getUserProjectList(user_id);
    let projectListID = id?.project_list_id;
 
    let projectList;
    if (id?.project_list_id === undefined) {
        projectList = db.projectList.create({
            data: {
                user_id: user_id,
            },
            select: {
                project_list_id: true,
                projects: true,
            }
        })
        projectListID = (await projectList).project_list_id;
    } else {
        projectList = db.projectList.findUnique({
            where: {
                project_list_id: projectListID,
            },
            select: {
                project_list_id: true,
                projects: true,
            }
        })
    }
    
    let newProject = db.project.create({
        data: project,
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
            save_as_cycle: true,
        }
    });

    let projects = (await projectList)?.projects;
    projects = [...projects!, (await newProject)];

    db.projectList.update({
        where: {
            project_list_id: projectListID,
        },
        data: {
            projects: {
                connect: projects,
            }
        }
    });

    return newProject;
}


export const updateProject = async (project: Omit<Project, 'project_list_id'>): Promise<Project | null> => {
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
            project_list_id: true,
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
            project_list_id: true,
            save_as_cycle: true,
        }
    });
}

export const getActivityList = async (project_id: number): Promise<ActivityList | null> => {
    return db.activityList.findUnique({
        where: {
            project_id,
        },
        select: {
            activity_list_id: true,
            project_id: true,
        }
    });
}

export const getProjectActivities = async (project_id: number): Promise<Activity[] | null> => {
    let id = await getActivityList(project_id);

    let list = await db.activityList.findUnique({
        where: {
            activity_list_id: id?.activity_list_id,
        },
        select: {
            activities: true,
        }
    })

    let activities = list === undefined ? [] : list?.activities;
    return activities!; 
}