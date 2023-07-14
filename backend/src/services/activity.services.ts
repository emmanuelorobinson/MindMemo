import { db } from "../utils/db.server";
import { Activity, ActivityTagList, Task, } from "@prisma/client";
import { getActivityTagLists } from "./tag.services";

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

// export const getUpcomingActivities = async (): Promise<Activity[]> => {
//     return db.activity.findMany({
//         where: {
//             duration: 0 || 1 || 2,
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

// export const getActivityTagList = async (activity_id: number): Promise<ActivityTagList[] | null> => {
//     return db.activityTagList.findMany({
//         where: {
//             activity_id,
//         },
//         select: {
//             activity_tag_list_id: true,
//             activity_id: true,
//             tag_id: true,
//         }
//     })
// }

// export const updateActivityTagList = async (activity_id: number, tag_list: ActivityTagList): Promise<Activity> => {
//     let activity = await getActivityByID(activity_id);
//     let tagLists = await getActivityTagList(activity_id);

//     tagLists = [...tagLists!, tag_list];

//     return db.activity.update({
//         where: {
//             activity_id,
//         },
//         data: {
//             tag_list: {
//                 connect: tagLists,
//             }
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
//     });
// }

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
