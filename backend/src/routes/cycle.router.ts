import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as cycleController from "../controllers/cycle.controller";

export const cycleRouter = express.Router();

//Get: Get all cycles
cycleRouter
    .route("/")
    .get(cycleController.getCycles)
    .post(cycleController.createCycle);

cycleRouter
    .route("/:cycle_id")
    .get(cycleController.getCycleByID)
    .delete(cycleController.deleteCycle);   

