import { db } from "../utils/db.server";
import { ActivityTagList, Tag } from "@prisma/client";
import { getTaskTagList } from "./task.services";
import { TaskTagList } from "../utils/db.types";
import { getActivityTagList } from "./activity.services";

//TODO:
// 1. update tag
// 2. delete tag

export const getTags = async (): Promise<Tag[]> => {
    return db.tag.findMany({
        select: {
            tag_id: true,
            tag_name: true,
            activity_tag_list_id: true,
            task_tag_list_id: true,
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
            activity_tag_list_id: true,
            task_tag_list_id: true,
        }
    });
}

//TO DO : Change to findUnique
export const getTagByName =  async (tag_name: string): Promise<Tag[] | null> => {
    return db.tag.findMany({
        where: {
            tag_name,
        },
        select: {
            tag_id: true,
            tag_name: true,
            activity_tag_list_id: true,
            task_tag_list_id: true,
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
            activity_tag_list_id: true,
            task_tag_list_id: true,
        }
    });
}

export const addTagToTask = async (tag: Tag, task_id: number): Promise<TaskTagList> => {
    let id = await getTaskTagList(task_id);
    let taskTagListID = id?.task_tag_list_id;
    
    let taskTagList;
    if (taskTagListID === undefined) {
        taskTagList = db.taskTagList.create({
            data: {
                task_id: task_id,
                tags: {
                    connect: tag,
                }
            },
            select: {
                task_id: true,
                task_tag_list_id: true,
            }
        })
    }
    else {
        let tagsList = db.taskTagList.findUnique({
            where: {
                task_tag_list_id: taskTagListID,
            },
            select: {
                tags: true,
            }
        })
        let tags = (await tagsList)?.tags;
        tags = [...tags!, tag]


        taskTagList = db.taskTagList.update({
            where: {
                task_tag_list_id: taskTagListID,
            },
            data: {
                tags: {
                    connect: tags
                }
            }, 
            select: {
                task_id: true,
                task_tag_list_id: true,
            }
        })
    }
    
    return taskTagList;
}

export const addTagToActivity = async (tag: Tag, activity_id: number): Promise<ActivityTagList> => {
    let id = await getActivityTagList(activity_id);
    let activityTagListID = id?.activity_tag_list_id;
    
    let activityTagList;
    if (activityTagListID === undefined) {
        activityTagList = db.activityTagList.create({
            data: {
                activity_id: activity_id,
                tags: {
                    connect: tag,
                }
            },
            select: {
                activity_id: true,
                activity_tag_list_id: true,
            }
        })
    }
    else {
        let tagsList = db.activityTagList.findUnique({
            where: {
                activity_tag_list_id: activityTagListID,
            },
            select: {
                tags: true,
            }
        })
        let tags = (await tagsList)?.tags;
        tags = [...tags!, tag]


        activityTagList = db.activityTagList.update({
            where: {
                activity_tag_list_id: activityTagListID,
            },
            data: {
                tags: {
                    connect: tags
                }
            }, 
            select: {
                activity_id: true,
                activity_tag_list_id: true,
            }
        })
    }
    
    return activityTagList;
}

