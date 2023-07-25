import * as TaskService from '../services/task.services';
import { getTaskTagListByID } from '../services/tag.services';
import { createTaskReminder } from '../services/reminder.services';

export const getTasks = async (req: any, res: any) => {
    try {
        const { activity_id } = req.params;
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
        let activityId = parseInt(req.body.activity_id);
        let taskName = req.body.task_name;
        let taskNumber = (req.body.task_number == '') ? 0 : parseInt(req.body.task_number);
        let startDate = (req.body.start_date == '') ? new Date() : new Date(req.body.start_date);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let taskNote = req.body.note;
        let reminder_date = req.body.reminder_datetime == "" ? new Date() : new Date(req.body.reminder_datetime);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let task = {
            task_name: taskName,
            task_number: taskNumber,
            start_date: startDate,
            duration: intduration,
            completed: complete,
            note: taskNote,
            activity_id: activityId,
        }

        const newTask = await TaskService.createTask(task);
        const newReminder = await createTaskReminder({task_id: newTask.task_id, reminder_date, user_id});
        
        res.json(newTask);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const updateTask = async (req: any, res: any) => {
    try {
        const task_id = parseInt(req.params.task_id);
        let activityId = parseInt(req.body.activity_id);
        let taskName = req.body.task_name;
        let taskNumber = (req.body.task_number == '') ? 0 : parseInt(req.body.task_number);
        let startDate = (req.body.start_date == '') ? new Date() : new Date(req.body.start_date);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let taskNote = req.body.note;
        let reminder_date = req.body.reminder_datetime == "" ? new Date() : new Date(req.body.reminder_datetime);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let task = {
            task_id: task_id,
            task_name: taskName,
            task_number: taskNumber,
            start_date: startDate,
            duration: intduration,
            completed: complete,
            note: taskNote,
            activity_id: activityId,
        }
        const updatedTask = await TaskService.updateTask(task);
        const newReminder = await createTaskReminder({task_id, reminder_date, user_id});
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



// export const getUpcomingTasks = async (req: any, res: any) => {
//     try {
//         const tasks = await TaskService.getUpcomingTasks();
//         res.json(tasks);
//     } catch (error: any) {
//         res.json({ message: error.message });
//     }
// }

export const getTaskTagList = async (req: any, res: any) => {
    try {
        const task_id = req.params.task_id;
        const taskTagList = await TaskService.getTagsByTask(parseInt(task_id));
        res.json(taskTagList);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}




