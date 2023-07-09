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
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const username = req.body.username;
        const user_id = parseInt(req.params.user_id);
        const updatedUser = await UserService.updateUser({first_name, last_name, email, username, user_id});
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
