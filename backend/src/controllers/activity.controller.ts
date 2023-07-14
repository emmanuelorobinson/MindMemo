import * as ActivityService from '../services/activity.services';

export const getActivities = async (req: any, res: any) => {
    try {
        const activities = await ActivityService.getActivities();
        res.json(activities);
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
        res.json(newActivity);
    } catch (error: any) {
        res.json({ message: error.message });
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

export const getTodaysActivities = async (req: any, res: any) => {
    try {
        const todaysActivities = await ActivityService.getTodaysActivities();
        res.json(todaysActivities);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getUpcomingActivities = async (req: any, res: any) => {
    try {
            const upcomingActivitys = await ActivityService.getUpcomingActivities();
            res.json(upcomingActivitys);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getActivityTagList = async (req: any, res: any) => {
    try {
        const { activity_id } = req.params;
        const activityTagList = await ActivityService.getActivityTagList(parseInt(activity_id));
    } catch (error: any){
        res.json({ message: error.message });
    }
}


export const getActivitiesByTag = async (req: any, res: any) => {
    try {
        const tag_id = req.params;
        const tasks = await ActivityService.getActivitiesByTag(parseInt(tag_id));
        res.json(tasks);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const updateActivitiesTagList = async (req: any, res: any) => {
    try {
        const activity_id = req.params;
        const tag_list = req.body.tag_list;
        const activityTagList = await ActivityService.updateActivityTagList(parseInt(activity_id), tag_list);
        res.json(activityTagList);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const updateActivityNote = async (req: any, res: any) => {
    try {
        const activity_id = req.params;
        const note = req.body.note;
        const activityNote = await ActivityService.updateActivityNote (parseInt(activity_id), note);
        res.json(activityNote);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const updateActivityCompleted = async (req: any, res: any) => {
    try {
        const activity_id = req.params;
        const activityCompleted = await ActivityService.completeActivity(parseInt(activity_id));
        res.json(activityCompleted);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getActivityNote = async (req: any, res: any) => {
    try {
        const activity_id = req.params;
        const activityNote = await ActivityService.getActivityNote (parseInt(activity_id));
        res.json(activityNote);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}



