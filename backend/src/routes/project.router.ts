import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as projectController from "../controllers/project.controller";
export const projectRouter = express.Router();

//Get: Get all projects
projectRouter
    .route("/")
    .post(projectController.createProject);
    
projectRouter
    .route("/:user_id")
    .get(projectController.getProjects)

projectRouter
    .route("/project/:project_id")
    .get(projectController.getProjectByID)
    .put(projectController.updateProject)
    .delete(projectController.deleteProject);