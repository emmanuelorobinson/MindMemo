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

// export const addTagToTask = async (req: Request, res: Response)=> {
//     try {
//         const { task_id, tag_id } = req.body;
//         const newTag = await TagService.addTagToTask(task_id, tag_id);
//         res.json(newTag);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message});
//     }
// }

// export const addTagToActivity = async (req: Request, res: Response)=> {
//     try {
//         const { activity_id, tag_id } = req.body;
//         const newTag = await TagService.addTagToActivity(activity_id, tag_id);
//         res.json(newTag);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message});
//     }
// }

export const getTaskTagListByID = async (req: Request, res: Response)=> {
    try {
        const { task_id } = req.params;
        const tagList = await TagService.getTaskTagListByID(parseInt(task_id));
        res.json(tagList);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}

export const getActivityTagListByID = async (req: Request, res: Response)=> {
    try {
        const { activity_id } = req.params;
        const tagList = await TagService.getActivityTagListByID(parseInt(activity_id));
        res.json(tagList);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
}
