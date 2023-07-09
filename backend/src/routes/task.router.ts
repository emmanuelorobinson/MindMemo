import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as taskController from "../controllers/task.controller";
export const taskRouter = express.Router();

//Get: Get all tasks
taskRouter
    .route("/")
    .get(taskController.getTasks)
    .post(taskController.createTask);

taskRouter
    .route("/:task_id")
    .get(taskController.getTaskByID)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

taskRouter
    .route("/today")
    .get(taskController.getTodayTasks);

taskRouter
    .route("/upcoming")
    .get(taskController.getUpcomingTasks);
