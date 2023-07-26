import { db } from "../utils/db.server";
// import { User, Project, ProjectList } from "../utils/db.types";
import { Project, Task, User } from "@prisma/client";
//USER SERVICES

export const getUsers = async (): Promise<User[]> => {
    return db.user.findMany({
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
        }
    });
};

export const getUserByID = async (user_id: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            user_id,
        },
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
        }
    });
}

export const createUser = async (user: User): Promise<User> => {
    return db.user.create({
        data: user, 
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
        }
    });
}

export const updateUser = async (user: User): Promise<User | null> => {
    return db.user.update({
        where: {
            user_id: user.user_id,
        },
        data: user,
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
}

export const deleteUser = async (user_id: string): Promise<User | null> => {
    return db.user.delete({
        where: {
            user_id,
        },
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
}



