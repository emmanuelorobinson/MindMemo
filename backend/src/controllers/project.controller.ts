import * as ProjectService from "../services/project.services";
import { Request, Response } from "express";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await ProjectService.getProjects();
        res.send(projects);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const getProjectByID = async (req: Request, res: Response) => {
    try {
        const { project_id } = req.params;
        console.log("ID IN CONTROLLER: " + project_id);
        const project = await ProjectService.getProjectByID(parseInt(project_id));
        res.send(project);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const createProject = async (req: Request, res: Response) => {
    try {
        let intduration = parseInt(req.body.duration);
        let intdays = parseInt(req.body.days_till_renew);
        let date = (new Date(req.body.project_start_date));
        let user_id = parseInt(req.body.user_id);
        let name = req.body.project_name;
        let cycle = req.body.save_as_cycle === "true" ? true : false;
        let complete = req.body.completed === "true" ? true : false;
        const project = { 
            project_name: name, 
            project_start_date: date, 
            duration: intduration, 
            days_till_renew: intdays, 
            completed: complete,
            save_as_cycle: cycle,
        }
        
        const newProject = await ProjectService.createProject(project, user_id);
        res.send(newProject);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}


export const updateProject = async (req: Request, res: Response) => {
    try {
        let intduration = parseInt(req.body.duration);
        let intdays = parseInt(req.body.days_till_renew);
        let date = (new Date(req.body.project_start_date));
        let name = req.body.project_name;
        let complete = req.body.completed === "true" ? true : false;
        let cycle = req.body.save_as_cycle === "true" ? true : false;
        const project_id = parseInt(req.params.project_id);
        const project = { 
            project_id: project_id,
            project_name: name, 
            project_start_date: date, 
            duration: intduration, 
            days_till_renew: intdays, 
            completed: complete,
            save_as_cycle: cycle,
        }
        const updatedProject = await ProjectService.updateProject(project);
        res.send(updatedProject);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { project_id } = req.params;
        const deletedProject = await ProjectService.deleteProject(parseInt(project_id));
        res.send(deletedProject);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const getProjectActivities = async (req: Request, res: Response) => {
    try {
        const { project_id } = req.params;
        const activities = await ProjectService.getProjectActivities(parseInt(project_id));
        res.send(activities);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}


