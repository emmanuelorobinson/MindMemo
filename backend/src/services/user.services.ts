import { db } from "../utils/db.server";


type User = {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

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
    console.log(user);
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




