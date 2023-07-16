import { db } from "../utils/db.server";
import { Activity, ActivityTagList, Tag, Task, TaskTagList } from "@prisma/client";
import { getTaskTagList, updateTaskTagList } from "./task.services";
import { getActivityTagList, updateActivityTagList } from "./activity.services";
// import { getTaskTagList, updateTaskTagList } from "./task.services";
// import { getActivityTagList, updateActivityTagList } from "./activity.services";

//TODO:
// 1. update tag
// 2. delete tag

export const getTags = async (): Promise<Tag[]> => {
    return db.tag.findMany({
        select: {
            tag_id: true,
            tag_name: true,
        }
    });
}

export const getTagByID = async (tag_id: number): Promise<Tag | null> => {
    return db.tag.findUnique({
        where: {
            tag_id,
        },
        select: {
            tag_id: true,
            tag_name: true,
        }
    });
}

//TO DO : Change to findUnique
export const getTagByName =  async (tag_name: string): Promise<Tag | null> => {
    return db.tag.findUnique({
        where: {
            tag_name: tag_name,
        },
        select: {
            tag_id: true,
            tag_name: true,
        }
    });
}

export const createTag = async (tag_name: string): Promise<Tag> => {
    return db.tag.create({
        data: { 
            tag_name,
        }, 
        select: {
            tag_id: true,
            tag_name: true,
        }
    });
}

export const getTaskTagLists = async (tag_id: number): Promise<TaskTagList[] | null> => {
    return db.taskTagList.findMany({
        where: {
            tag_id
        },
        select: {
            task_tag_list_id: true,
            task_id: true,
            tag_id: true,
        }
    });
}

export const getActivityTagLists = async (tag_id: number): Promise<ActivityTagList[] | null> => {
    return db.activityTagList.findMany({
        where: {
            tag_id
        },
        select: {
            activity_tag_list_id: true,
            activity_id: true,
            tag_id: true,
        }
    });
}

export const addTagToTask = async (tag: Tag, task_id: number): Promise<TaskTagList> => {
    let tagList = db.taskTagList.create({
        data: {
            task_id: task_id,
            tag_id: tag.tag_id,
        },
        select: {
            task_id: true,
            task_tag_list_id: true,
            tag_id: true,
        }
    });
    let task_tag_lists = await getTaskTagList(tag.tag_id);

    updateTaskTagList(task_id, (await tagList).task_tag_list_id);
    task_tag_lists = [...task_tag_lists!, (await tagList)];

    db.tag.update({
        where: {
            tag_id: tag.tag_id,
        },
        data: {
            task_tag_list: {
                connect: task_tag_lists,
            }
        }
    })
    
    return tagList;
}

export const addTagToActivity = async (tag: Tag, activity_id: number): Promise<ActivityTagList> => {
    let tagList = db.activityTagList.create({
        data: {
            activity_id: activity_id,
            tag_id: tag.tag_id,
        },
        select: {
            activity_id: true,
            activity_tag_list_id: true,
            tag_id: true,
        }
    });
    let activity_tag_lists = await getActivityTagList(tag.tag_id);

    updateActivityTagList(activity_id, (await tagList));
    activity_tag_lists = [...activity_tag_lists!, (await tagList)];

    db.tag.update({
        where: {
            tag_id: tag.tag_id,
        },
        data: {
            activity_tag_list: {
                connect: activity_tag_lists,
            }
        }
    })
    
    return tagList;
}

export const getTaskTagListByID = async (task_tag_list_id: number): Promise<TaskTagList | null> => {
    let list = db.taskTagList.findUnique({
        where: {
            task_tag_list_id,
        },
        select: {
            task_tag_list_id: true,
            task_id: true,
            tag_id: true,
        }
    });

    if (list === null) {
        return null;
    } else {
        return list;
    }
}

export const getActivityTagListByID = async (activity_tag_list_id: number): Promise<ActivityTagList | null> => {
    return db.activityTagList.findUnique({
        where: {
            activity_tag_list_id,
        },
        select: {
            activity_tag_list_id: true,
            activity_id: true,
            tag_id: true,
        }
    });
}

export const getTasksByTag = async (tag_id: number): Promise<Task[]> => {
    let taskTagList = await getTaskTagLists(tag_id);
    
    let taskIDs = await db.taskTagList.findMany({
        where: {
            tag_id,
        },
        select: {
            task_id: true,
        }
    })

    let tasks;
    taskIDs.forEach((taskID) => {
        let task = db.task.findUnique({
            where: {
                task_id: taskID.task_id,
            },
        });
        tasks = [...tasks!, task];
    })

    if (tasks === undefined) {
        return [];
    }

    return tasks!;
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