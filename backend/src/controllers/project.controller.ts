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
        const project = await ProjectService.getProjectByID(parseInt(project_id));
        res.send(project);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}


export const createProject = async (req: Request, res: Response) => {
    try {
        const { user_id, project_name, project_start_date, duration, days_till_renew, completed } = req.body;
        console.log(req.body);
        const newProject = await ProjectService.createProject({ project_name, project_start_date, duration, days_till_renew, completed }, parseInt(user_id));
        res.send(newProject);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}


export const updateProject = async (req: Request, res: Response) => {
    try {
        const { project_name, project_start_date, duration, days_till_renew, completed } = req.body;
        const { project_id } = req.params;
        const updatedProject = await ProjectService.updateProject(parseInt(project_id), { project_name, project_start_date, duration, days_till_renew, completed });
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

