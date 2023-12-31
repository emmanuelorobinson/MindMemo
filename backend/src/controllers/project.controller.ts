import { get } from "http";
import { getCycleByID } from "../services/cycle.services";
import * as ProjectService from "../services/project.services";
import { Request, Response } from "express";
import { createActivity, deleteActivity, getActivities, getTagsByActivity } from "../services/activity.services";
import { createTask, getTagsByTask, getTasks } from "../services/task.services";
import { addTagToActivity, addTagToTask, createTag, getTagByName } from "../services/tag.services";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        console.log(user_id);
        const projects = await ProjectService.getProjects(user_id);
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const getProjectByID = async (req: Request, res: Response) => {
    try {
        const { project_id } = req.params;
        const project = await ProjectService.getProjectByID(parseInt(project_id));
        res.json(project);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const createProject = async (req: Request, res: Response) => {
    try {
        let userId = req.body.user_id;
        let intduration = parseInt(req.body.duration);
        let intdays = (req.body.days_till_renew == "") ? 0 : parseInt(req.body.days_till_renew);
        let date = (new Date(req.body.project_start_date));
        let name = req.body.project_name;
        let renew = req.body.renew === "true" ? true : false;
        let save_as_cycle = String(req.body.save_as_cycle) === "true";
        let cycle_id = (req.body.cycle_id == "" || req.body.cycle_id === undefined) ? 0 : parseInt(req.body.cycle_id);
        let complete = req.body.completed === "true" ? true : false;

        const project = { 
            project_name: name, 
            project_start_date: date, 
            duration: intduration, 
            days_till_renew: intdays, 
            completed: complete,
            renew: renew,
            save_as_cycle: save_as_cycle,
            cycle_id: cycle_id,
            user_id: userId,
        }
        const newProject = await ProjectService.createProject(project);

        if (cycle_id != 0) {
            console.log("duplicate");
            duplicateCycle(cycle_id, newProject.project_id);
        }
        
        res.json(newProject);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}


export const updateProject = async (req: Request, res: Response) => {
    try {
        let userId = req.body.user_id;
        let intduration = parseInt(req.body.duration);
        let intdays = (req.body.days_till_renew == "") ? 0 : parseInt(req.body.days_till_renew);
        let date = (new Date(req.body.project_start_date));
        let name = req.body.project_name;
        let renew = req.body.renew === "true" ? true : false;
        let save_as_cycle = String(req.body.save_as_cycle) === "true";
        let cycle_id = req.body.cycle_id;
        let complete = req.body.completed === "true";
        const project = { 
            project_id: parseInt(req.params.project_id),
            project_name: name, 
            project_start_date: date, 
            duration: intduration, 
            days_till_renew: intdays, 
            renew: renew,
            completed: complete,
            save_as_cycle: save_as_cycle,
            cycle_id: cycle_id,
            user_id: userId,
        }
        const updatedProject = await ProjectService.updateProject(project);
        res.json(updatedProject);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const project_id = parseInt(req.params.project_id);
        const deletedProject = await ProjectService.deleteProject(project_id);
        res.json(deletedProject);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const duplicateCycle = async (cycle_id: number, project_id: number) => {
    let cycle_project_id;
    const cycle = await getCycleByID(cycle_id);
    if (cycle != null) {
        cycle_project_id = cycle.project_id;
        let project_start = (await ProjectService.getProjectByID(project_id))?.project_start_date;
        let cycle_start = (await ProjectService.getProjectByID(cycle_project_id))?.project_start_date;
        let activities = await getActivities(cycle_project_id!);
        if (activities !== undefined) {
            for (const activity of activities) {
                let newActivity = {
                    activity_name: activity.activity_name,
                    activity_number: activity.activity_number,
                    start_date: new Date(activity.start_date.getTime() - (cycle_start!.getTime() - project_start!.getTime())),
                    duration: activity.duration,
                    completed: activity.completed,
                    note: activity.note,
                    project_id: project_id,
                }
                let createdActivity = await createActivity(newActivity);
                
                let activityTags = await getTagsByActivity(activity.activity_id);
                for (const tagName of activityTags) {
                    let tag = await getTagByName(tagName);
                    addTagToActivity(tag!, createdActivity.activity_id);
                }
                
                let tasks = await getTasks(activity.activity_id);
                if (tasks !== undefined){
                    for (const task of tasks) {
                        let newTask = {
                            task_name: task.task_name,
                            task_number: task.task_number,
                            start_date: new Date(task.start_date.getTime() - (cycle_start!.getTime() - project_start!.getTime())),
                            duration: task.duration,
                            completed: task.completed,
                            note: task.note,
                            activity_id: createdActivity.activity_id,
                        }
                        let createdTask = await createTask(newTask);
                        
                        // let taskTags = await getTagsByTask(task.task_id);
                        // console.log("TAGS:" + taskTags);
                        // for (const tagName of taskTags) {
                        //     let tag = await getTagByName(tagName);
                        //     addTagToTask(tag!, createdTask.task_id);
                        // }
                    }
                }
                
            }
        }
       
    }

    
}


