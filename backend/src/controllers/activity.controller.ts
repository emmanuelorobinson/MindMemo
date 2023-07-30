import * as ActivityService from '../services/activity.services';
import { createActivityReminder, getActivityReminders } from '../services/reminder.services';
import { getTasks, updateTask } from '../services/task.services';
import { addTagsToActivity, deleteTagFromActivty } from './tag.controller';

export const getActivities = async (req: any, res: any) => {
    try {
        const { project_id } = req.params;
        const activities = await ActivityService.getActivities(parseInt(project_id));
        let results: {activity_id: number, activity_name: string, activity_number: number, start_date: Date, duration: number, completed: boolean, note: string, project_id: number, tag_list: string}[] = [];
        if (activities !== undefined) {
            for (const activity of activities) {
                const activityTagList = await ActivityService.getTagsByActivity(activity.activity_id);
                results.push({activity_id: activity.activity_id, activity_name: activity.activity_name, activity_number: activity.activity_number, start_date: activity.start_date, duration: activity.duration, completed: activity.completed, note: activity.note, project_id: activity.project_id, tag_list: activityTagList});
            }}
        console.log(results);
        res.json(results);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getActivityByID = async (req: any, res: any) => {
    try {
        const { activity_id } = req.params;
        const activity = await ActivityService.getActivityByID(parseInt(activity_id));
        res.json(activity);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const createActivity = async (req: any, res: any) => {
    try {
        let projectId = parseInt(req.body.project_id);
        let activityName = req.body.activity_name;            
        let activityNumber = (req.body.activity_number == '') ? 0 : parseInt(req.body.activity_number);
        let startDate = (req.body.start_date == undefined) ? new Date() : new Date(req.body.start_date);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let reminder_date = req.body.reminder == "" ? new Date() : new Date(req.body.reminder);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let acitivtyNote = req.body.note;
        let tag_list = req.body.tag_list;
        console.log("TAG LIST: ", tag_list);
        const activity = {
            activity_name: activityName,
            activity_number: activityNumber,
            start_date: startDate,
            duration: intduration,
            completed: complete,
            note: acitivtyNote,
            project_id: projectId,
        }
        
        const newActivity = await ActivityService.createActivity(activity);
        const newReminder = await createActivityReminder({activity_id: newActivity.activity_id, reminder_date, user_id});

        if (tag_list !== undefined) {
            const tagsArray = tag_list.split(','); 
            console.log("CHECK: ", tagsArray);
            tagsArray.forEach(async (tag: string) => {
                await addTagsToActivity(tag, newActivity.activity_id);
            });
        }
        res.json(newActivity);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const updateActivity = async (req: any, res: any) => {
    try {
        let activity_id = parseInt(req.params.activity_id);
        let projectId = parseInt(req.body.project_id);
        let activityName = req.body.activity_name;            
        let activityNumber = (req.body.activity_number == '') ? 0 : parseInt(req.body.activity_number);
        let startDate = (req.body.start_date == undefined) ? new Date() : new Date(req.body.start_date);
        let intduration = parseInt(req.body.duration);
        let complete = String(req.body.completed) === 'true';
        let acitivtyNote = req.body.note;
        let reminder_date = req.body.reminder == "" ? new Date() : new Date(req.body.reminder);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let tags = req.body.tag_list;
        const activity = {
            activity_id: activity_id,
            activity_name: activityName,
            activity_number: activityNumber,
            start_date: startDate,
            duration: intduration,
            completed: complete,
            note: acitivtyNote,
            project_id: projectId,
        }
        // console.log(activity);

        const updatedActivity = await ActivityService.updateActivity(activity);
        let existingReminders = (await getActivityReminders(user_id));
        // console.log(existingReminders);

        if (existingReminders.length > 0) {
            let reminderExists = existingReminders.some(async (reminder: any) => {reminder.activity_id === activity_id});
            // console.log(reminderExists);
            if (!reminderExists) {
                await createActivityReminder({activity_id, reminder_date, user_id});
            }

        }

        const activityTagList = await ActivityService.getTagsByActivity(activity_id);
        if (tags != undefined) {
            const tagsArray = tags.split(','); 
            const tagList = activityTagList.split(',');
            tagList.forEach(async (tag: any) => {
                if (!tagsArray.includes(tag))
                    deleteTagFromActivty(tag, activity_id);
            });
            tagsArray.forEach(async (tag: any) => {
                if (!activityTagList.includes(tag))
                    addTagsToActivity(tag, updatedActivity!.activity_id);
            });
        }

        if (complete === true) {
            let tasks = await getTasks(activity_id);
            if (tasks !== undefined) {
                tasks.forEach(async (task) => {
                    task.completed = true;
                    await updateTask(task);
                });
            }
        }

        res.json(updatedActivity);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const deleteActivity = async (req: any, res: any) => {
    try {
        const { activity_id } = req.params;
        const deletedActivity = await ActivityService.deleteActivity(parseInt(activity_id));
        res.json(deletedActivity);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}


// export const getTodaysActivities = async (req: any, res: any) => {
//     try {
//         const todaysActivities = await ActivityService.getTodaysActivities();
//         res.json(todaysActivities);
//     } catch (error: any) {
//         res.json({ message: error.message });
//     }
// }

// export const getUpcomingActivities = async (req: any, res: any) => {
//     try {
//             const upcomingActivitys = await ActivityService.getUpcomingActivities();
//             res.json(upcomingActivitys);
//     } catch (error: any) {
//         res.json({ message: error.message });
//     }
// }

export const getActivityTagList = async (req: any, res: any) => {
    try {
        const { activity_id } = req.params;
        const activityTagList = await ActivityService.getTagsByActivity(parseInt(activity_id));
        res.json(activityTagList);
    } catch (error: any){
        res.json({ message: error.message });
    }
}


