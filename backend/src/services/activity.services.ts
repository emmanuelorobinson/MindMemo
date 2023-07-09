import { db } from "../utils/db.server";
import { 
    Activity, 
    ActivityTagList, 
    Task, 
    TaskList 
} from "@prisma/client";
import { getActivityList } from "./project.services";

//TODO: 
// 1. today's activities
// 2. upcoming activities

export const getActivities = async (): Promise<Activity[]> => {
    return db.activity.findMany({
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
};

export const getActivityByID = async (activity_id: number): Promise<Activity | null> => {
    return db.activity.findUnique({
        where: {
            activity_id,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
}

export const createActivity = async (
    activity: Omit<Activity, 'activity_id' | 'activity_list_id'>, 
    project_id: number
): Promise<Activity> => {
    let id = await getActivityList(project_id);
    let activityListID = id?.activity_list_id;
    
    let activityList; 
    if (activityListID === undefined) {
        activityList = db.activityList.create({
            data: {
                activity_list_id: activityListID,
            },
            select: {
                activity_list_id: true,
                activities: true,
            }
        });
        activityListID = (await activityList).activity_list_id;
    } else {
        activityList = db.activityList.findUnique({
            where: {
                activity_list_id: activityListID,
            },
            select: {
                activity_list_id: true,
                activities: true,
            }
        });
    }

    let newActivity = db.activity.create({
        data: activity,
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });

    let activities = (await activityList)?.activities;
    activities = [...activities!, (await newActivity)];

    db.activityList.update({
        where: {
            activity_list_id: activityListID,
        },
        data: {
            activities: {
                connect: activities,
            },
        }
    });

    return newActivity;
}

export const updateActivity = async (activity: Omit<Activity, 'activity_list_id'>): Promise<Activity | null> => {
    return db.activity.update({
        where: {
            activity_id: activity.activity_id,
        },
        data: activity,
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
}

export const deleteActivity = async (activity_id: number): Promise<Activity | null> => {
    return db.activity.delete({
        where: {
            activity_id,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
}

export const getTaskList = async (activity_id: number): Promise<TaskList | null> => {
    return db.taskList.findUnique({
        where: {
            activity_id,
        },
        select: {
            task_list_id: true,
            activity_id: true,
        }
    });
}

export const getActivityTasks = async (activity_id: number): Promise<Task[] | null> => {
    let id = await getTaskList(activity_id);

    let list = await db.taskList.findUnique({
        where: {
            task_list_id: id?.task_list_id,
        },
        select: {
            tasks: true,
        }
    })

    let tasks = list === undefined ? [] : list?.tasks;
    return tasks!;
}

export const getTodaysActivities = async (): Promise<Activity[]> => {
    return db.activity.findMany({
        where: {
            duration: 0,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    })
}

export const getUpcomingActivities = async (): Promise<Activity[]> => {
    return db.activity.findMany({
        where: {
            duration: 0 || 1 || 2,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    })
}

export const getActivityTagList = async (activity_id: number): Promise<ActivityTagList | null> => {
    return db.activityTagList.findUnique({
        where: {
            activity_id,
        },
        select: {
            activity_tag_list_id: true,
            activity_id: true,
        }
    })
}