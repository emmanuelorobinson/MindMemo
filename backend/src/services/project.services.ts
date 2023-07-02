import { db } from "../utils/db.server";
import { Activity, ActivityList, Project } from "../utils/db.types";
import { getUserProjectList } from "./user.services";



export const getProjects = async (): Promise<Project[]> => {
    return db.project.findMany({
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
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
            completed: true,
            
        }
    });
}


export const createProject = async (project: Project, user_id: number): Promise<Project> => {
    let id = await getUserProjectList(user_id);
    let projectListID = id?.project_list_id;

    if (id?.project_list_id === undefined) {
        let projectList = db.projectList.create({
            data: {
                user_id: user_id,
            },
            select: {
                project_list_id: true,
            }
        })

        projectListID = (await projectList).project_list_id;
    }

    return db.project.create({
        data: {
            project_name: project.project_name,
            project_start_date: project.project_start_date,
            duration: project.duration,
            days_till_renew: project.days_till_renew,
            completed: project.completed,
            project_list_id: projectListID,
        },
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
        }
    });
}


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
            completed: true,
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

    if (id?.activity_list_id === undefined) {
        return null;
    }

    return db.activity.findMany({
        where: {
            activity_list_id: id?.activity_list_id,
        },
        select: {
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
        }
    })   
}






