import { db } from "../utils/db.server";
import { 
    Activity, 
    ActivityTagList, 
    Task, 
    TaskList 
} from "@prisma/client";
import { getActivityList } from "./project.services";
import { getActivityTagLists } from "./tag.services";

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

export const getActivityTagList = async (activity_id: number): Promise<ActivityTagList[] | null> => {
    return db.activityTagList.findMany({
        where: {
            activity_id,
        },
        select: {
            activity_tag_list_id: true,
            activity_id: true,
            tag_id: true,
        }
    })
}

export const updateActivityTagList = async (activity_id: number, tag_list: ActivityTagList): Promise<Activity> => {
    let activity = await getActivityByID(activity_id);
    let tagLists = await getActivityTagList(activity_id);

    tagLists = [...tagLists!, tag_list];

    return db.activity.update({
        where: {
            activity_id,
        },
        data: {
            tag_list: {
                connect: tagLists,
            }
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

export const getActivitiesByTag = async (tag_id: number): Promise<Activity[]> => {
    let activityTagList = await getActivityTagLists(tag_id);
    
    let activityIDs = await db.activityTagList.findMany({
        where: {
            tag_id,
        },
        select: {
            activity_id: true,
        }
    })

    let activities;
    activityIDs.forEach((activityID) => {
        let activity = db.activity.findUnique({
            where: {
                activity_id: activityID.activity_id,
            },
        });
        activities = [...activities!, activity];
    })

    if (activities === undefined) {
        return [];
    }

    return activities!;
}

export const updateActivityNote = async (activity_id: number, note: string): Promise<Activity> => {
    return db.activity.update({
        where: {
            activity_id,
        },
        data: {
            note,
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

export const getActivityNote = async (activity_id: number): Promise<string> => {
    let activity = await getActivityByID(activity_id);
    
    if (activity === null) 
        return '';

    return activity!.note;
}

export const completeActivity = async (activity_id: number): Promise<Activity> => {
    return db.activity.update({
        where: {
            activity_id,
        },
        data: {
            completed: true,
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


