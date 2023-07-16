import * as TagService from '../services/tag.services';
import e, { Request, Response } from 'express';

export const getTags = async (req: Request, res: Response)=> {
    try {
        const tags = await TagService.getTags();
        res.json(tags);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const getTagByID = async (req: Request, res: Response)=> {
    try {
        const { tag_id } = req.params;
        const tag = await TagService.getTagByID(parseInt(tag_id));
        res.json(tag);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const getTagByName = async (req: Request, res: Response)=> {
    try {
        const { tag_name } = req.params;
        const tag = await TagService.getTagByName(tag_name);
        res.json(tag);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const createTag = async (req: Request, res: Response)=> {
    try {
        const { tag_name } = req.body;
        const newTag = await TagService.createTag(tag_name);
        res.json(newTag);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const addTagToTask = async (req: Request, res: Response)=> {
    try {
        const task_id = parseInt(req.params.task_id);
        const tag_name = req.params.tag_name;

        let tag = await TagService.getTagByName(tag_name);
        if (tag === null) {
            tag = await TagService.createTag(tag_name);
        }

        const newTag = await TagService.addTagToTask(tag, task_id);
        res.json(newTag);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const addTagToActivity = async (req: Request, res: Response)=> {
    try {
        const activity_id = parseInt(req.params.activity_id);
        const tag_name = req.params.tag_name;

        let tag = await TagService.getTagByName(tag_name);
        if (tag === null) {
            tag = await TagService.createTag(tag_name);
        }

        const newTag = await TagService.addTagToActivity(tag, activity_id);
        res.json(newTag);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const getTagTasks = async (req: any, res: any) => {
    try {
        const tag_id = req.params;
        const tasks = await TagService.getTasksByTag(parseInt(tag_id));
        res.json(tasks);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getTagActivities = async (req: any, res: any) => {
    try {
        const tag_id = req.params;
        const activities = await TagService.getActivitiesByTag(parseInt(tag_id));
        res.json(activities);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}