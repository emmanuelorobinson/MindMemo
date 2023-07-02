import { db } from "../utils/db.server";
import { Activity } from "../utils/db.types";
import { getActivityList } from "./project.services";

export const getActivities = async (): Promise<Activity[]> => {
    return db.activity.findMany({
        select: {
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
        }
    });
};

export const getActivityByID = async (activity_id: number): Promise<Activity | null> => {
    return db.activity.findUnique({
        where: {
            activity_id,
        },
        select: {
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
        }
    });
}

export const createActivity = async (activity: Activity, project_id: number): Promise<Activity> => {
    let id = await getActivityList(project_id);
    let activityListID = id?.activity_list_id;

    if (activityListID === undefined) {
        let activityList = db.activityList.create({
            data: {
                project_id: project_id,
            },
            select: {
                activity_list_id: true,
            }
        })

        activityListID = (await activityList).activity_list_id;
    }

    return db.activity.create({
        data: {
            activity_name: activity.activity_name,
            activity_number: activity.activity_number,
            duration: activity.duration,
            completed: activity.completed,
            note: activity.note,
            activity_list_id: activityListID,
        },
        select: {
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
        }
    });
}

export const updateActivity = async (activity_id: number, activity: Activity): Promise<Activity | null> => {
    return db.activity.update({
        where: {
            activity_id,
        },
        data: activity,
        select: {
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
        }
    });
}

export const deleteActivity = async (activity_id: number): Promise<Activity | null> => {
    return db.activity.delete({
        where: {
            activity_id,
        },
        select: {
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
        }
    });
}