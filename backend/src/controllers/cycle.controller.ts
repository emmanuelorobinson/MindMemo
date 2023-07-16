import * as CycleService from "../services/cycle.services";

export const createCycle = async (req: any, res: any) => {
    try {
        const { project_id } = req.body;
        const cycle = await CycleService.createCycle(parseInt(project_id));
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getCycleByID = async (req: any, res: any) => {
    try {
        const { cycle_id } = req.params;
        const cycle = await CycleService.getCycleByID(parseInt(cycle_id));
        res.json(cycle);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getCycles = async (req: any, res: any) => {
    try {
        const cycles = await CycleService.getCycles();
        res.json(cycles);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const deleteCycle = async (req: any, res: any) => {
    try {
        const { cycle_id } = req.params;
        const deletedCycle = await CycleService.deleteCycle(parseInt(cycle_id));
        res.json(deletedCycle);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}

export const getCyclesByUser = async (req: any, res: any) => {
    try {
        const { user_id } = req.params;
        const cycles = await CycleService.getCyclesByUser((user_id));
        res.json(cycles);
    } catch (error: any) {
        res.json({ message: error.message });
    }
}