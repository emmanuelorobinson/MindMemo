import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as tagController from "../controllers/tag.controller";
export const tagRouter = express.Router();

tagRouter
    .route("/")
    .get(tagController.getTags)
    .post(tagController.createTag);

tagRouter
    .route("/:tag_id")
    .get(tagController.getTagByID)

tagRouter
    .route("/:tag_name")
    .get(tagController.getTagByName)

// tagRouter
//     .route("/:tag_id/tasks")
//     // .get(tagController.getTagTasks)
//     .post(tagController.addTagToTask)

// tagRouter
//     .route("/:tag_id/activities")
//     .post(tagController.addTagToActivity)
