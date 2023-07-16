import { db } from "../utils/db.server";
// import { User, Project, ProjectList } from "../utils/db.types";
import { Project, Task, User } from "@prisma/client";
import { getActivities } from "./activity.services";
import { getTodaysTasks } from "./task.services";

export const getUsers = async (): Promise<User[]> => {
    return db.user.findMany({
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
        }
    });
};

export const getUserByID = async (user_id: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            user_id,
        },
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
        }
    });
}

export const createUser = async (user: User): Promise<User> => {
    return db.user.create({
        data: user, 
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
        }
    });
}

export const updateUser = async (user: User): Promise<User | null> => {
    return db.user.update({
        where: {
            user_id: user.user_id,
        },
        data: user,
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
}

export const deleteUser = async (user_id: string): Promise<User | null> => {
    return db.user.delete({
        where: {
            user_id,
        },
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
}

export const getProjectTasks = async (projects: Project[]): Promise<Task[]> => {
    let tasks: Task[] = [];
    
    for (const project of projects) {
        const activities = await getActivities(project.project_id);
        
        for (const activity of activities) {
            let list = await getTodaysTasks(activity.activity_id);
            console.log(activity.activity_id + " " + list.length);
            tasks = [...tasks, ...list];
            console.log("tasks: " + tasks.length);
        }
    }

    return tasks;
}


