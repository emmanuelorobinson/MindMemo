import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as reminderController from "../controllers/reminder.controller";

export const reminderRouter = express.Router();

//Get: Get all reminders
reminderRouter
    .route("/activity")
    .post(reminderController.createActivityReminder)
    .delete(reminderController.deleteActivityReminder)
    .put(reminderController.updateActivityReminder);
    

reminderRouter
    .route("/activity/:user_id")
    .get(reminderController.getActivityReminders);

reminderRouter
    .route("/task")
    .post(reminderController.createTaskReminder)
    .delete(reminderController.deleteTaskReminder)
    .put(reminderController.updateTaskReminder);

reminderRouter
    .route("/task/:user_id")
    .get(reminderController.getTaskReminders)

reminderRouter
    .route("/send")
    .post(reminderController.sendReminder);

