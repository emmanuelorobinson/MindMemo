import * as TaskService from '../services/task.services';
import { getTaskTagListByID } from '../services/tag.services';
import { createActivityReminder, createTaskReminder, getTaskReminders } from '../services/reminder.services';
import { addTagsToTask, deleteTagFromTag } from './tag.controller';

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
        let reminder_date = req.body.reminder_date == "" ? new Date() : new Date(req.body.reminder_date);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let tags = req.body.tags;
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
        if (tags != undefined) {
            tags.forEach(async (tag: any) => {
                addTagsToTask(tag, newTask.activity_id);
            });
        }   
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
        let complete = String(req.body.completed) === 'true';
        let taskNote = req.body.note;
        let reminder_date = req.body.reminder_date == "" ? new Date() : new Date(req.body.reminder_date);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let tags = req.body.tags;
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
        let existingReminders = (await getTaskReminders(user_id));
        // console.log(existingReminders);

        if (existingReminders.length > 0) {
            let reminderExists = existingReminders.some(async (reminder: any) => {reminder.task_id === task_id});
            // console.log(reminderExists);
            if (!reminderExists) {
                await createTaskReminder({task_id, reminder_date, user_id});
            }

        }

        const taskTagList = await TaskService.getTagsByTask(task_id);
        if (tags != undefined) {
            taskTagList.forEach(async (tag: any) => {
                if (!tags.includes(tag))
                    deleteTagFromTag(tag, task_id);
            });
            tags.forEach(async (tag: any) => {
                if (!taskTagList.includes(tag))
                    addTagsToTask(tag, updatedTask!.task_id);
            });
        }

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




