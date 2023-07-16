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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectByID = exports.getProjects = void 0;
const ProjectService = __importStar(require("../services/project.services"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        console.log(user_id);
        const projects = yield ProjectService.getProjects(user_id);
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjects = getProjects;
const getProjectByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id } = req.params;
        const project = yield ProjectService.getProjectByID(parseInt(project_id));
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjectByID = getProjectByID;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.body.user_id;
        let intduration = parseInt(req.body.duration);
        let intdays = parseInt(req.body.days_till_renew);
        let date = (new Date(req.body.project_start_date));
        let name = req.body.project_name;
        let save_as_cycle = req.body.save_as_cycle === "true" ? true : false;
        let cycle_name = req.body.cycle_name;
        let complete = req.body.completed === "true" ? true : false;
        const project = {
            project_name: name,
            project_start_date: date,
            duration: intduration,
            days_till_renew: intdays,
            completed: complete,
            save_as_cycle: save_as_cycle,
            cycle_name: cycle_name,
            user_id: userId,
        };
        const newProject = yield ProjectService.createProject(project);
        res.json(newProject);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.body.user_id;
        let intduration = parseInt(req.body.duration);
        let intdays = parseInt(req.body.days_till_renew);
        let date = (new Date(req.body.project_start_date));
        let name = req.body.project_name;
        let save_as_cycle = req.body.save_as_cycle === "true" ? true : false;
        let cycle_name = req.body.cycle_name;
        let complete = req.body.completed === "true" ? true : false;
        const project = {
            project_id: parseInt(req.params.project_id),
            project_name: name,
            project_start_date: date,
            duration: intduration,
            days_till_renew: intdays,
            completed: complete,
            save_as_cycle: save_as_cycle,
            cycle_name: cycle_name,
            user_id: userId,
        };
        const updatedProject = yield ProjectService.updateProject(project);
        res.json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id } = req.params;
        const deletedProject = yield ProjectService.deleteProject(parseInt(project_id));
        res.json(deletedProject);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProject = deleteProject;
