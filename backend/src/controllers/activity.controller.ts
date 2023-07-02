import * as ActivityService from '../services/activity.services';
import { Activity } from '../utils/db.types';

export const getActivities = async (req: any, res: any) => {
    try {
        const activities = await ActivityService.getActivities();
        res.send(activities);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const getActivityByID = async (req: any, res: any) => {
    try {
        const { activity_id } = req.params;
        const activity = await ActivityService.getActivityByID(parseInt(activity_id));
        res.send(activity);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const createActivity = async (req: any, res: any) => {
    try {
        const { project_id, activity_name, activity_number, duration, completed, note } = req.body;
        console.log(req.body);
        const newActivity = await ActivityService.createActivity({  activity_name, activity_number, duration, completed, note }, parseInt(project_id));
        res.send(newActivity);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const updateActivity = async (req: any, res: any) => {
    try {
        const { activity_id } = req.params;
        const { activity_name, activity_number, duration, completed, note } = req.body;
        const updatedActivity = await ActivityService.updateActivity(parseInt(activity_id), { activity_name, activity_number, duration, completed, note });
        res.send(updatedActivity);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const deleteActivity = async (req: any, res: any) => {
    try {
        const { activity_id } = req.params;
        const deletedActivity = await ActivityService.deleteActivity(parseInt(activity_id));
        res.send(deletedActivity);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}


