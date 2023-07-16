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
            start_date: true,
            duration: true,
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
            start_date: true,
            duration: true,
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
            start_date: true,
            duration: true,
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
            start_date: true,
            duration: true,
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
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
}

export const getAllTasks = async (): Promise<Task[]> => {
    return db.task.findMany({
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    })
}

export const getTodaysTasks = async (activity_id: number): Promise<Task[]> => {
    let tasks = await getTasks(activity_id);
    let today = new Date().toDateString();
    let todaysTasks: Task[] = [];

    tasks.forEach((task) => {
        let start_date = new Date(task.start_date);
        let duration = task.duration;
        let end_date = start_date;
        end_date.setDate(end_date.getDate() + duration);
        // console.log(task.task_name + end_date.toDateString());

        if (end_date.toDateString() === today) {
            // console.log(task.task_name + end_date);
            todaysTasks.push(task);
        }
    });

    console.log(activity_id + " Today's tasks: " + todaysTasks.length);

    return todaysTasks;
}

export const getUpcomingTasks = async (activity_id: number): Promise<Task[]> => {
    let tasks = await getTasks(activity_id);
    let today = new Date();
    let upcomingTasks: Task[] = [];

    tasks.forEach((task) => {
        let start_date = new Date(task.start_date);
        let duration = task.duration;
        let end_date = new Date(start_date.getTime() + duration * 24 * 60 * 60 * 1000);

        // Calculate the date difference in days
        let dateDifference = Math.floor((end_date.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

        if (dateDifference >= 0 && dateDifference <= 3) {
            upcomingTasks.push(task);
        }
    });

    console.log(activity_id + " Upcoming tasks within 3 days: " + upcomingTasks.length);

    return upcomingTasks;
}



// export const getTaskTagList = async (task_id: number): Promise<TaskTagList[] | null> => {
//     return db.taskTagList.findMany({
//         where: {
//             task_id,
//         },
//         select: {
//             task_tag_list_id: true,
//             task_id: true,
//             tag_id: true,
//         }
//     })
// }

// export const updateTaskTagList = async (task_id: number, tag_list_id: number): Promise<Task> => {
//     let task = await getTaskByID(task_id);
//     let tagLists = await getTaskTagList(task_id);
//     let tagList = db.taskTagList.findUnique({
//         where: {
//             task_tag_list_id: tag_list_id,
//         },
//         select: {
//             task_tag_list_id: true,
//             task_id: true,
//             tag_id: true,
//         },
//     })
//     tagLists = [...tagLists!, (await tagList)!];

//     return db.task.update({
//         where: {
//             task_id,
//         },
//         data: {
//             tag_list: {
//                 connect: tagLists,
//             }
//         },
//         select: {
//             task_id: true,
//             task_name: true,
//             task_number: true,
//             days_till_due: true,
//             completed: true,
//             note: true,
//             activity_id: true,
//         }
//     });
// }

// export const getTasksByTag = async (tag_id: number): Promise<Task[]> => {
//     let taskTagList = await getTaskTagLists(tag_id);
    
//     let taskIDs = await db.taskTagList.findMany({
//         where: {
//             tag_id,
//         },
//         select: {
//             task_id: true,
//         }
//     })

//     let tasks;
//     taskIDs.forEach((taskID) => {
//         let task = db.task.findUnique({
//             where: {
//                 task_id: taskID.task_id,
//             },
//         });
//         tasks = [...tasks!, task];
//     })

//     if (tasks === undefined) {
//         return [];
//     }

//     return tasks!;
// }
