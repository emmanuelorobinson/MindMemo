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
        const projects = yield ProjectService.getProjects();
        res.send(projects);
    }
    catch (error) {
        res.send({ error: error.message });
    }
});
exports.getProjects = getProjects;
const getProjectByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id } = req.params;
        const project = yield ProjectService.getProjectByID(parseInt(project_id));
        res.send(project);
    }
    catch (error) {
        res.send({ error: error.message });
    }
});
exports.getProjectByID = getProjectByID;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_name, project_start_date, duration, days_till_renew, completed } = req.body;
        console.log(req.body);
        const newProject = yield ProjectService.createProject({ project_name, project_start_date, duration, days_till_renew, completed });
        res.send(newProject);
    }
    catch (error) {
        res.send({ error: error.message });
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_name, project_start_date, duration, days_till_renew, completed } = req.body;
        const { project_id } = req.params;
        const updatedProject = yield ProjectService.updateProject(parseInt(project_id), { project_name, project_start_date, duration, days_till_renew, completed });
        res.send(updatedProject);
    }
    catch (error) {
        res.send({ error: error.message });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id } = req.params;
        const deletedProject = yield ProjectService.deleteProject(parseInt(project_id));
        res.send(deletedProject);
    }
    catch (error) {
        res.send({ error: error.message });
    }
});
exports.deleteProject = deleteProject;
