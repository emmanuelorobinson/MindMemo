import { getActivities, getAllActivityDates, getUpcomingActivities } from "../services/activity.services";
import { deleteProject, getProjects } from "../services/project.services";
import { getAllTaskDates, getUpcomingTasks } from "../services/task.services";
import * as UserService from "../services/user.services";
import { Request, Response } from "express";
import { Activity, Task } from "@prisma/client";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getUsers();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const user = await UserService.getUserByID(user_id);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, username, user_id } = req.body;
        console.log(req.body);
        const newUser = await UserService.createUser({first_name, last_name, email, username, user_id });
        res.json(newUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const username = req.body.username;
        const user_id = req.params.user_id;
        const updatedUser = await UserService.updateUser({first_name, last_name, email, username, user_id});
        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const deletedUser = await UserService.deleteUser(user_id);
        res.json(deletedUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}


// export const getTodayTasks = async (req: any, res: any) => {
//     try {
//         const { user_id } = req.params;
//         const projects = await getProjects(user_id);
//         let tasks: Task[] = [];
    
//         for (const project of projects) {
//             const activities = await getActivities(project.project_id);
            
//             for (const activity of activities) {
//                 let list = await getTodaysTasks(activity.activity_id);
//                 console.log(activity.activity_id + " " + list.length);
//                 tasks = [...tasks, ...list];
//                 console.log("tasks: " + tasks.length);
//             }
//         } 
        
//         res.json(tasks);
//     } catch (error: any) {
//         res.json({ message: error.message });
//     }
// }

export const getUpcomingTask = async (req: any, res: any) => {
    try {
        const { user_id } = req.params;
        const projects = await getProjects(user_id);
        let tasks: Task[] = [];
    
        for (const project of projects) {
            const activities = await getActivities(project.project_id);
            
            if (activities !== undefined) {
                for (const activity of activities) {
                    let list = await getUpcomingTasks(activity.activity_id);
                    console.log(activity.activity_id + " " + list.length);
                    tasks = [...tasks, ...list];
                    console.log("tasks: " + tasks.length);
                }
            }
            
        }
   
        res.json(tasks);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getUpcomingActivity = async (req: any, res: any) => {
    try {
        const { user_id } = req.params;
        const projects = await getProjects(user_id);
        let activities: Activity[] = [];
    
        for (const project of projects) {
            let list = await getUpcomingActivities(project.project_id);
            activities = [...activities, ...list];
            
        }
        
        res.json(activities);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getEvents = async (req: any, res: any) => {
    try {
        const { user_id } = req.params;
        const projects = await getProjects(user_id);
        let results:{ date: Date; name: string[]}[] = [];
    
        for (const project of projects) {
            const activityList = await getAllActivityDates(project.project_id);
            for (const activity of activityList) {
                const existingDateIndex = results.findIndex((item) => item.date.getTime() === activity.date.getTime());

                if (existingDateIndex !== -1) {
                    results[existingDateIndex].name = [...results[existingDateIndex].name, ...activity.name];
                } else {
                    results.push(activity);
                }
            }
            let activities = await getActivities(project.project_id);
            if (activities !== undefined) {
                for (const activity of activities) {
                    let taskList = await getAllTaskDates(activity.activity_id);

                    for (const task of taskList) {
                        const existingDateIndex = results.findIndex((item) => item.date.getTime() === task.date.getTime());

                        if (existingDateIndex !== -1) {
                            results[existingDateIndex].name = [...results[existingDateIndex].name, ...task.name];
                        } else {
                            results.push(task);
                        }
                    }
                }
            }
        }
        
        res.json(results);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

