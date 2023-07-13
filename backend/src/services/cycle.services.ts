import { db } from "../utils/db.server";
import { Cycle, Project } from "@prisma/client";

export const createCycle = async (project_id: number): Promise<Cycle> => {
    return db.cycle.create({
        data: {
            project_id: project_id,
        },
        select: {
            cycle_id: true,
            project_id: true,
        },
    })
}

export const getCycleByID = async (cycle_id: number): Promise<Cycle | null> => {
    return db.cycle.findUnique({
        where: {
            cycle_id,
        },
        select: {
            cycle_id: true,
            project_id: true,
        }
    });
}

export const getCycles = async (): Promise<Cycle[]> => {
    return db.cycle.findMany({
        select: {
            cycle_id: true,
            project_id: true,
        }
    });
}

export const deleteCycle = async (cycle_id: number): Promise<Cycle | null> => {
    return db.cycle.delete({
        where: {
            cycle_id,
        },
        select: {
            cycle_id: true,
            project_id: true,
        }
    });
}

