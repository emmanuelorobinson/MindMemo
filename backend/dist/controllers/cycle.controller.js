"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getCyclesByUser = exports.deleteCycle = exports.getCycles = exports.getCycleByID = exports.createCycle = void 0;
const CycleService = __importStar(require("../services/cycle.services"));
const createCycle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id } = req.body;
        const cycle = yield CycleService.createCycle(parseInt(project_id));
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.createCycle = createCycle;
const getCycleByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cycle_id } = req.params;
        const cycle = yield CycleService.getCycleByID(parseInt(cycle_id));
        res.json(cycle);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getCycleByID = getCycleByID;
const getCycles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cycles = yield CycleService.getCycles();
        res.json(cycles);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getCycles = getCycles;
const deleteCycle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cycle_id } = req.params;
        const deletedCycle = yield CycleService.deleteCycle(parseInt(cycle_id));
        res.json(deletedCycle);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.deleteCycle = deleteCycle;
const getCyclesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const cycles = yield CycleService.getCyclesByUser((user_id));
        res.json(cycles);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getCyclesByUser = getCyclesByUser;
