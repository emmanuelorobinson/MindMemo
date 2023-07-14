import * as ProjectService from "../services/project.services";
import { Request, Response } from "express";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;
        const projects = await ProjectService.getProjects(parseInt(user_id));
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
        let intdays = parseInt(req.body.days_till_renew);
        let date = (new Date(req.body.project_start_date));
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
            user_id: userId,
        }
        
        const newProject = await ProjectService.createProject(project);
        res.json(newProject);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}


export const updateProject = async (req: Request, res: Response) => {
    try {
        let userId = req.body.user_id;
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
        const { project_id } = req.params;
        const deletedProject = await ProjectService.deleteProject(parseInt(project_id));
        res.json(deletedProject);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}


