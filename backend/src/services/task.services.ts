import { db } from "../utils/db.server";
import { Task, TaskTagList } from "@prisma/client";
import { getTaskList } from "./activity.services";

//gTODO:
// 1. tasks by date

export const getTasks = async (): Promise<Task[]> => {
    return db.task.findMany({
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            task_list_id: true,
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
            task_list_id: true,
        }
    });
}

export const createTask = async (task: Omit<Task, 'task_id' | 'task_list_id'>, activity_id: number): Promise<Task> => {
    let id = await getTaskList(activity_id);
    let taskListID = id?.task_list_id;
    
    let taskList;
    if (taskListID === undefined) {
        taskList = db.taskList.create({
            data: {
                activity_id: activity_id,
            },
            select: {
                task_list_id: true,
                tasks: true,
            }
        })
        taskListID = (await taskList).task_list_id;
    } else {
        taskList = db.taskList.findUnique({
            where: {
                task_list_id: taskListID,
            },
            select: {
                task_list_id: true,
                tasks: true,
            }
        });
    }

    let newTask = db.task.create({
        data: task,
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            days_till_due: true,
            completed: true,
            note: true,
            task_list_id: true,
        }
    });
    
    let tasks = (await taskList)?.tasks;
    tasks = [...tasks!, (await newTask)];

    db.taskList.update({
        where: {
            task_list_id: taskListID,
        },
        data: {
            tasks: {
                connect: tasks,
            }
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
            task_list_id: true,
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
            task_list_id: true,
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
            task_list_id: true,
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
            task_list_id: true,
        }
    })
}

export const getTaskTagList = async (task_id: number): Promise<TaskTagList | null> => {
    return db.taskTagList.findUnique({
        where: {
            task_id,
        },
        select: {
            task_tag_list_id: true,
            task_id: true,
        }
    })
}