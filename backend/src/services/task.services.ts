import { db } from "../utils/db.server";
import { Task, TaskTagList } from "@prisma/client";
import { getTaskTagLists } from "./tag.services";

//gTODO:
// 1. tasks by date

export const getTasks = async (activity_id: number): Promise<Task[]> => {
    return db.task.findMany({
        where: {
            activity_id,
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
};

export const getTaskByID = async (task_id: number): Promise<Task | null> => {
    return db.task.findUnique({
        where: {
            task_id,
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
}

export const createTask = async (task: Omit<Task, 'task_id' | 'task_list_id'>): Promise<Task> => {
    let newTask = db.task.create({
        data: task,
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
    
    return newTask;
}

export const updateTask = async (task: Omit<Task, 'task_list_id'>): Promise<Task | null> => {
    return db.task.update({
        where: {
            task_id: task.task_id,
        },
        data: task,
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
}

export const deleteTask = async (task_id: number): Promise<Task | null> => {
    return db.task.delete({
        where: {
            task_id,
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
}

export const getTodaysTasks = async (): Promise<Task[]> => {
    return db.task.findMany({
        where: {
            days_till_due: 0,
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    })
}

export const getUpcomingTasks = async (): Promise<Task[]> => {
    return db.task.findMany({
        where: {
            days_till_due: 0 || 1 || 2,
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    })
}

export const getTaskTagList = async (task_id: number): Promise<TaskTagList[] | null> => {
    return db.taskTagList.findMany({
        where: {
            task_id,
        },
        select: {
            task_tag_list_id: true,
            task_id: true,
            tag_id: true,
        }
    })
}

export const updateTaskTagList = async (task_id: number, tag_list_id: number): Promise<Task> => {
    let task = await getTaskByID(task_id);
    let tagLists = await getTaskTagList(task_id);
    let tagList = db.taskTagList.findUnique({
        where: {
            task_tag_list_id: tag_list_id,
        },
        select: {
            task_tag_list_id: true,
            task_id: true,
            tag_id: true,
        },
    })
    tagLists = [...tagLists!, (await tagList)!];

    return db.task.update({
        where: {
            task_id,
        },
        data: {
            tag_list: {
                connect: tagLists,
            }
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            activity_id: true,
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
