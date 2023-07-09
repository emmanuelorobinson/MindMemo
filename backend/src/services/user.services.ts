import { db } from "../utils/db.server";
// import { User, Project, ProjectList } from "../utils/db.types";
import { User, Project, ProjectList } from "@prisma/client";

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

export const getUserByID = async (user_id: number): Promise<User | null> => {
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

export const createUser = async (user: Omit<User, 'user_id'>): Promise<User> => {
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

export const deleteUser = async (user_id: number): Promise<User | null> => {
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

export const getUserProjectList = async (user_id: number): Promise<ProjectList | null> => {
    return db.projectList.findUnique({
        where: {
            user_id: user_id,
        },
        select: {
            project_list_id: true,
            user_id: true,
        }
    });
}

export const getUserProjects = async (user_id: number): Promise<Project[] | null> => {
    let listID = await getUserProjectList(user_id);
    
    let list = await db.projectList.findUnique({
        where: {
            project_list_id: listID?.project_list_id,
        },
        select: {
            projects: true,
        }
    })

    let projects = list === undefined ? [] : list?.projects;
    return projects!;
}