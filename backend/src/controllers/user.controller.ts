import * as UserService from "../services/user.services";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getUsers();
        res.send(users);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const user = await UserService.getUserByID(parseInt(user_id));
        res.send(user);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, username } = req.body;
        console.log(req.body);
        const newUser = await UserService.createUser({first_name, last_name, email, username });
        res.send(newUser);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, username } = req.body;
        const { user_id } = req.params;
        const updatedUser = await UserService.updateUser(parseInt(user_id), { first_name, last_name, email, username });
        res.send(updatedUser);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const deletedUser = await UserService.deleteUser(parseInt(user_id));
        res.send(deletedUser);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}

export const getUserProjects = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const userProjects = await UserService.getUserProjects(parseInt(user_id));
        res.send(userProjects);
    } catch (error: any) {
        res.send({ error: error.message});
    }
}
