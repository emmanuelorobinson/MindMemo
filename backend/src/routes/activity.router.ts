import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as activityController from "../controllers/activity.controller";
export const activityRouter = express.Router();

//Get: Get all activitys
activityRouter
    .route("/")
    .get(activityController.getActivities)
    .post(activityController.createActivity);

activityRouter
    .route("/:activity_id")
    .get(activityController.getActivityByID)
    .put(activityController.updateActivity)
    .delete(activityController.deleteActivity);
