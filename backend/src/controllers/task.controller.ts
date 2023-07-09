import * as TaskService from '../services/task.services';

export const getTasks = async (req: any, res: any) => {
    try {
        const activities = await TaskService.getTasks();
        res.send(activities);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const getTaskByID = async (req: any, res: any) => {
    try {
        const { task_id } = req.params;
        const task = await TaskService.getTaskByID(parseInt(task_id));
        res.send(task);
    } catch (error: any) {
        res.send({ message: error.message });
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
        }
        console.log(req.body);
        const newTask = await TaskService.createTask(task, activityId);
        res.send(newTask);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const updateTask = async (req: any, res: any) => {
    try {
        const task_id = parseInt(req.params.task_id);
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
        }
        const updatedTask = await TaskService.updateTask(task);
        res.send(updatedTask);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const deleteTask = async (req: any, res: any) => {
    try {
        const { task_id } = req.params;
        const deletedTask = await TaskService.deleteTask(parseInt(task_id));
        res.send(deletedTask);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const getTodayTasks = async (req: any, res: any) => {
    try {
        const tasks = await TaskService.getTodaysTasks();
        res.send(tasks);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const getUpcomingTasks = async (req: any, res: any) => {
    try {
        const tasks = await TaskService.getUpcomingTasks();
        res.send(tasks);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const getTaskTagList = async (req: any, res: any) => {
    try {
        const task_id = req.params;
        const taskTagList = await TaskService.getTaskTagList(parseInt(task_id));
        res.send(taskTagList);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

