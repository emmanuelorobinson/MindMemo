"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCyclesByUser = exports.getCycleByProjectID = exports.deleteCycle = exports.getCycles = exports.getCycleByID = exports.createCycle = void 0;
const db_server_1 = require("../utils/db.server");
const createCycle = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.cycle.create({
        data: {
            project_id: project_id,
        },
        select: {
            cycle_id: true,
            project_id: true,
        },
    });
});
exports.createCycle = createCycle;
const getCycleByID = (cycle_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.cycle.findUnique({
        where: {
            cycle_id,
        },
        select: {
            cycle_id: true,
            project_id: true,
        }
    });
});
exports.getCycleByID = getCycleByID;
const getCycles = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.cycle.findMany({
        select: {
            cycle_id: true,
            project_id: true,
        }
    });
});
exports.getCycles = getCycles;
const deleteCycle = (cycle_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.cycle.delete({
        where: {
            cycle_id,
        },
        select: {
            cycle_id: true,
            project_id: true,
        }
    });
});
exports.deleteCycle = deleteCycle;
const getCycleByProjectID = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.cycle.findUnique({
        where: {
            project_id,
        },
    });
});
exports.getCycleByProjectID = getCycleByProjectID;
// export const getCycleNames = async (user_id: number): Promise<String[]> => {
//     let cycles = await getCycles();
//     let cycleNames: String[] = [];
//     cycles.forEach(async (cycle) => {
//         let name = await db.project.findMany({
//             where: {
//                 project_id: cycle.project_id,
//                 user_id,
//             },
//             select: {
//                 project_name: true,
//             }
//         }) 
//         if (name?.project_name != undefined)
//             cycleNames.push(name?.project_name);
//     });
//     return cycleNames;
// }
const getCyclesByUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.project.findMany({
        where: {
            user_id,
            save_as_cycle: true,
        },
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            save_as_cycle: true,
            user_id: true,
            cycle_id: true,
        }
    });
});
exports.getCyclesByUser = getCyclesByUser;
