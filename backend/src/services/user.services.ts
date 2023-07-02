import { db } from "../utils/db.server";
import { User, Project, ProjectList } from "../utils/db.types";

export const getUsers = async (): Promise<User[]> => {
    return db.user.findMany({
        select: {
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
};

export const getUserByID = async (user_id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            user_id,
        },
        select: {
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
}

export const createUser = async (user: User): Promise<User> => {
    const { first_name, last_name, email, username } = user;
    return db.user.create({
        data: { 
            first_name,
            last_name,
            email,
            username
        }, 
        select: {
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
}

export const updateUser = async (user_id: number, user: User): Promise<User | null> => {
    return db.user.update({
        where: {
            user_id,
        },
        data: user,
        select: {
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
    let id = await getUserProjectList(user_id);

    if (id?.project_list_id === undefined) {
        return null;
    }

    return db.project.findMany({
        where: {
            project_list_id: id?.project_list_id,
        },
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
        }
    })   
}





