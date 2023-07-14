import * as TaskService from '../services/task.services';
import { getTaskTagListByID } from '../services/tag.services';

export const getTasks = async (req: any, res: any) => {
    try {
        const { activity_id } = req.body.activity_id;
        const activities = await TaskService.getTasks(parseInt(activity_id));
        res.json(activities);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getTaskByID = async (req: any, res: any) => {
    try {
        const { task_id } = req.params;
        const task = await TaskService.getTaskByID(parseInt(task_id));
        res.json(task);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const createTask = async (req: any, res: any) => {
    try {
        let activityId = parseInt(req.params.project_id);
        let taskName = req.body.task_name;
        let taskNumber = parseInt(req.body.task_number);
        let dueDate = req.body.due_date;
        let currentDate = new Date();
        let daysTillDue = ((Date.parse(dueDate)) - currentDate.getTime()) / (1000 * 3600 * 24);
        let complete = req.body.completed === 'true' ? true : false;
        let taskNote = req.body.note;
        let task = {
            task_name: taskName,
            task_number: taskNumber,
            days_till_due: daysTillDue,
            completed: complete,
            note: taskNote,
            activity_id: activityId,
        }
        console.log(req.body);
        const newTask = await TaskService.createTask(task);
        res.json(newTask);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const updateTask = async (req: any, res: any) => {
    try {
        const task_id = parseInt(req.params.task_id);
        let activityId = parseInt(req.params.project_id);
        let taskName = req.body.task_name;
        let taskNumber = parseInt(req.body.task_number);
        let dueDate = req.body.due_date;
        let currentDate = new Date();
        let daysTillDue = ((Date.parse(dueDate)) - currentDate.getTime()) / (1000 * 3600 * 24);
        let complete = req.body.completed === 'true' ? true : false;
        let taskNote = req.body.note;
        let task = {
            task_id: task_id,
            task_name: taskName,
            task_number: taskNumber,
            days_till_due: daysTillDue,
            completed: complete,
            note: taskNote,
            activity_id: activityId,
        }
        const updatedTask = await TaskService.updateTask(task);
        res.json(updatedTask);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const deleteTask = async (req: any, res: any) => {
    try {
        const { task_id } = req.params;
        const deletedTask = await TaskService.deleteTask(parseInt(task_id));
        res.json(deletedTask);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getTodayTasks = async (req: any, res: any) => {
    try {
        const tasks = await TaskService.getTodaysTasks();
        res.json(tasks);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getUpcomingTasks = async (req: any, res: any) => {
    try {
        const tasks = await TaskService.getUpcomingTasks();
        res.json(tasks);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getTaskTagList = async (req: any, res: any) => {
    try {
        const task_id = req.params;
        const taskTagList = await TaskService.getTaskTagList(parseInt(task_id));
        res.json(taskTagList);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getTasksByTag = async (req: any, res: any) => {
    try {
        const tag_id = req.params;
        const tasks = await TaskService.getTasksByTag(parseInt(tag_id));
        res.json(tasks);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const updateTaskTagList = async (req: any, res: any) => {
    try {
        const task_id = req.params;
        const tag_list = req.body.tag_list;
        const taskTagList = await TaskService.updateTaskTagList(parseInt(task_id), tag_list);
        res.json(taskTagList);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}


