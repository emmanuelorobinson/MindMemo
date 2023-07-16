import * as ActivityService from '../services/activity.services';

export const getActivities = async (req: any, res: any) => {
    try {
        const { project_id } = req.params;
        const activities = await ActivityService.getActivities(parseInt(project_id));
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
        let projectId = parseInt(req.body.project_id);
        let activityName = req.body.activity_name;            
        let activityNumber = (req.body.activity_number == '') ? 0 : parseInt(req.body.activity_number);
        let startDate = (req.body.start_date == undefined) ? new Date() : new Date(req.body.start_date);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let acitivtyNote = req.body.note;
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
        let complete = req.body.completed === 'true' ? true : false;
        let acitivtyNote = req.body.note;
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
        console.log(activity);
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


