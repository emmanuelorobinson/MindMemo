import * as TagService from '../services/tag.services';
import e, { Request, Response } from 'express';

export const getTags = async (req: Request, res: Response)=> {
    try {
        const tags = await TagService.getTags();
        res.send(tags);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const getTagByID = async (req: Request, res: Response)=> {
    try {
        const { tag_id } = req.params;
        const tag = await TagService.getTagByID(parseInt(tag_id));
        res.send(tag);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const getTagByName = async (req: Request, res: Response)=> {
    try {
        const { tag_name } = req.params;
        const tag = await TagService.getTagByName(tag_name);
        res.send(tag);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const createTag = async (req: Request, res: Response)=> {
    try {
        const { tag_name } = req.body;
        const newTag = await TagService.createTag(tag_name);
        res.send(newTag);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}