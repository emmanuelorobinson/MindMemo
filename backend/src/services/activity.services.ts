import { db } from "../utils/db.server";
import { Activity, ActivityTagList, Task, } from "@prisma/client";
import { getActivityTagLists, getTagByID } from "./tag.services";
import { deleteTask, getTasks } from "./task.services";

//TODO: 
// 1. today's activities
// 2. upcoming activities

export const getActivities = async (project_id: number): Promise<Activity[] | undefined> => {
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
    const tasks = await getTasks(activity_id);
    if (tasks !== undefined) {
        await Promise.all(tasks.map((task) => deleteTask(task.task_id)));
    }

    let tagLists = await getActivityTagLists(activity_id);
    if (tagLists !== null) {
        tagLists.forEach(async (tagList) => {
            db.activityTagList.delete({
                where: {
                    activity_tag_list_id: tagList.activity_tag_list_id,
                }
            });
        });
    }

    let reminders = await db.activityReminder.findUnique({
        where: {
            activity_id,
        },
    })
    console.log("reminder:", reminders);
    if (reminders !== null) {
        await db.activityReminder.delete({
            where: {
                activity_id,
            }
        });
    }
    

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

    if (activities !== undefined)
    {
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
    }

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

    // Assuming your ActivityTagList object has an `activity_tag_list_id` property
    const tagListIds = tagLists.map((tagList) => ({ activity_tag_list_id: tagList.activity_tag_list_id }));

    // Add the new tag_list object to the array
    tagListIds.push({ activity_tag_list_id: tag_list.activity_tag_list_id });

    return db.activity.update({
        where: {
            activity_id,
        },
        data: {
            tag_list: {
                connect: tagListIds, // Use the array with unique objects
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

export const getTagsByActivity = async (activity_id: number): Promise<string> => {
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

    let results = "";
    if (list.length > 0)
        results += (await getTagByID(list[0].tag_id))?.tag_name;

    for (let i = 1; i < list.length; i++) {
        let name = (await getTagByID(list[i].tag_id))?.tag_name;
        if (name !== undefined)
            results += "," + name;
    }

    console.log(results);

    return results;
}

export const getAllActivityDates = async (project_id: number): Promise<{date: Date, name: string[]}[]> => {
    let activities = await getActivities(project_id);
    let results: {date: Date, name: string[]}[] = [];
    if (activities !== undefined)
    {
        activities.forEach((activity) => {
            let start_date = new Date(activity.start_date);
            let duration = activity.duration;
            let end_date = new Date(start_date.getTime() + duration * 24 * 60 * 60 * 1000);
            let name = activity.activity_name;

            let existingEntry = results.find((entry) => entry.date.getTime() === end_date.getTime());

            if (existingEntry) {
                existingEntry.name.push(name);
            } else {
                results.push({ date: end_date, name: [name] });
            }            
        });
    }

    // console.log(_id + " Upcoming tasks within 3 days: " + upcomingTasks.length);

    return results;
}

