import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as reminderController from "../controllers/reminder.controller";

export const reminderRouter = express.Router();

//Get: Get all reminders
reminderRouter
    .route("/activity")
    .post(reminderController.createActivityReminder)
    

reminderRouter
    .route("/activity/:activity_id")
    // .get(reminderController.getActivityReminders)
    .delete(reminderController.deleteActivityReminder)
    .put(reminderController.updateActivityReminder);

reminderRouter
    .route("/task")
    .post(reminderController.createTaskReminder)

reminderRouter
    .route("/task/:task_id")
    // .get(reminderController.getTaskReminders)
    .delete(reminderController.deleteTaskReminder)
    .put(reminderController.updateTaskReminder);

reminderRouter
    .route("/send")
    .post(reminderController.sendReminder);

