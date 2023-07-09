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
        let projectId = parseInt(req.params.project_id);
        let activityName = req.body.activity_name;
        let activityNumber = parseInt(req.body.activity_number);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let acitivtyNote = req.body.note;
        const activity = {
            activity_name: activityName,
            activity_number: activityNumber,
            duration: intduration,
            completed: complete,
            note: acitivtyNote,
        }
        console.log(req.body);
        const newActivity = await ActivityService.createActivity( activity, projectId);
        res.send(newActivity);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const updateActivity = async (req: any, res: any) => {
    try {
        const activity_id = parseInt(req.params.activity_id);
        let activityName = req.body.activity_name;
        let activityNumber = parseInt(req.body.activity_number);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let acitivtyNote = req.body.note;
        const activity = {
            activity_id: activity_id,
            activity_name: activityName,
            activity_number: activityNumber,
            duration: intduration,
            completed: complete,
            note: acitivtyNote,
        }
        const updatedActivity = await ActivityService.updateActivity(activity);
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

export const getTodaysActivities = async (req: any, res: any) => {
    try {
        const todaysActivities = await ActivityService.getTodaysActivities();
        res.send(todaysActivities);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const getUpcomingActivities = async (req: any, res: any) => {
    try {
            const upcomingActivitys = await ActivityService.getUpcomingActivities();
            res.send(upcomingActivitys);
    } catch (error: any) {
        res.send({ message: error.message });
    }
}

export const getActivityTagList = async (req: any, res: any) => {
    try {
        const { activity_id } = req.params;
        const activityTagList = await ActivityService.getActivityTagList(parseInt(activity_id));
    } catch (error: any){
        res.send({ message: error.message });
    }
}

