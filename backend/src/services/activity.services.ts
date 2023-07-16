import { db } from "../utils/db.server";
import { Activity, ActivityTagList, Task, } from "@prisma/client";
import { getActivityTagLists, getTagByID } from "./tag.services";

//TODO: 
// 1. today's activities
// 2. upcoming activities

export const getActivities = async (project_id: number): Promise<Activity[]> => {
    return db.activity.findMany({
        where: {
            project_id: project_id,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
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
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
        }
    });
}

export const createActivity = async (activity: Omit<Activity, 'activity_id'>): Promise<Activity> => {
    let newActivity = db.activity.create({
        data: activity,
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
        }
    });

    return newActivity;
}

export const updateActivity = async (activity: Activity): Promise<Activity | null> => {
    return db.activity.update({
        where: {
            activity_id: activity.activity_id,
        },
        data: activity,
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
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
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
        }
    });
}


// export const getTodaysActivities = async (): Promise<Activity[]> => {
//     return db.activity.findMany({
//         where: {
//             duration: 0,
//         },
//         select: {
//             activity_id: true,
//             activity_name: true,
//             activity_number: true,
//             duration: true,
//             completed: true,
//             note: true,
//             project_id: true,
//         }
//     })
// }


export const getUpcomingActivities = async (project_id: number): Promise<Activity[]> => {
    let activities = await getActivities(project_id);
    let today = new Date();
    let upcomingActivities: Activity[] = [];

    activities.forEach((activity) => {
        let start_date = new Date(activity.start_date);
        let duration = activity.duration;
        let end_date = new Date(start_date.getTime() + duration * 24 * 60 * 60 * 1000);

        // Calculate the date difference in days
        let dateDifference = Math.floor((end_date.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

        if (dateDifference >= 0 && dateDifference <= 3) {
            upcomingActivities.push(activity);
        }
    });

    // console.log(_id + " Upcoming tasks within 3 days: " + upcomingTasks.length);

    return upcomingActivities;
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
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
        }
    });
}

export const getTagsByActivity = async (activity_id: number): Promise<string[]> => {
    let list = await db.activityTagList.findMany({
        where: {
            activity_id,
        },
        select: {
            activity_id: true,
            activity_tag_list_id: true,
            tag_id: true,
        }
    })
    console.log(list);

    let results = [];

    for (let i = 0; i < list.length; i++) {
        let name = (await getTagByID(list[i].tag_id))?.tag_name;
        if (name !== undefined)
            results.push(name);
    }

    console.log(results);

    return results;
}


