import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as userController from "../controllers/user.controller";
export const userRouter = express.Router();

//Get: Get all users
userRouter
    .route("/")
    .get(userController.getUsers)
    .post(userController.createUser);

userRouter
    .route("/:user_id")
    .get(userController.getUserByID)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

userRouter
    .route("/:user_id/projects")
    .get(userController.getUserProjects);
