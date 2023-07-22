import * as ReminderService from '../services/reminder.services';

export const createTaskReminder = async (req: any, res: any) => {
    try {
        const { task_id, reminder_date, user_id } = req.body;
        const reminder = await ReminderService.createTaskReminder({ task_id, reminder_date, user_id });
        res.json(reminder);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const createActivityReminder = async (req: any, res: any) => {
    try {
        const { activity_id, reminder_date, user_id } = req.body;
        const reminder = await ReminderService.createActivityReminder({ activity_id, reminder_date, user_id });
        res.json(reminder);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getTaskReminders = async (req: any, res: any) => {
    try {
        const { user_id } = req.params;
        const reminders = await ReminderService.getTaskReminders(user_id);
        res.json(reminders);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getActivityReminders = async (req: any, res: any) => {
    try {
        const { user_id } = req.params;
        const reminders = await ReminderService.getActivityReminders(user_id);
        res.json(reminders);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const updateTaskReminder = async (req: any, res: any) => {
    try {
        const { task_reminder_id, task_id, reminder_date, user_id } = req.body;
        const reminder = await ReminderService.updateTaskReminder({ task_reminder_id, task_id, reminder_date, user_id });
        res.json(reminder);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const updateActivityReminder = async (req: any, res: any) => {
    try {
        const { activity_reminder_id, activity_id, reminder_date, user_id } = req.body;
        const reminder = await ReminderService.updateActivityReminder({ activity_reminder_id, activity_id, reminder_date, user_id });
        res.json(reminder);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const deleteTaskReminder = async (req: any, res: any) => {
    try {
        const { task_reminder_id } = req.params;
        const reminder = await ReminderService.deleteTaskReminder(parseInt(task_reminder_id));
        res.json(reminder);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const deleteActivityReminder = async (req: any, res: any) => {
    try {
        const { activity_reminder_id } = req.params;
        const reminder = await ReminderService.deleteActivityReminder(parseInt(activity_reminder_id));
        res.json(reminder);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const sendReminder = async (req: any, res: any) => {
    try {
        const activityReminder = await ReminderService.sendActivityReminder(new Date("2023-07-07T00:00:00.000Z"));
        const taskReminder = await ReminderService.sendTaskReminder(new Date("2023-07-07T00:00:00.000Z"));
        res.json({ activityReminder, taskReminder });
    } catch (error: any) {
        res.json({ message: error.message });
    }
}
