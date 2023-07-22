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
exports.duplicateCycle = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectByID = exports.getProjects = void 0;
const cycle_services_1 = require("../services/cycle.services");
const ProjectService = __importStar(require("../services/project.services"));
const activity_services_1 = require("../services/activity.services");
const task_services_1 = require("../services/task.services");
const tag_services_1 = require("../services/tag.services");
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
        let cycle_id = (req.body.cycle_id == "" || req.body.cycle_id === undefined) ? 0 : parseInt(req.body.cycle_id);
        let complete = req.body.completed === "true" ? true : false;
        const project = {
            project_name: name,
            project_start_date: date,
            duration: intduration,
            days_till_renew: intdays,
            completed: complete,
            save_as_cycle: save_as_cycle,
            cycle_id: cycle_id,
            user_id: userId,
        };
        const newProject = yield ProjectService.createProject(project);
        // if (cycle_id != 0) {
        //     duplicateCycle(cycle_id, newProject.project_id);
        // }
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
        let save_as_cycle = String(req.body.save_as_cycle) === "true";
        let cycle_id = req.body.cycle_id;
        let complete = req.body.completed === "true";
        const project = {
            project_id: parseInt(req.params.project_id),
            project_name: name,
            project_start_date: date,
            duration: intduration,
            days_till_renew: intdays,
            completed: complete,
            save_as_cycle: save_as_cycle,
            cycle_id: cycle_id,
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
const duplicateCycle = (cycle_id, project_id) => __awaiter(void 0, void 0, void 0, function* () {
    let cycle_project_id;
    const cycle = yield (0, cycle_services_1.getCycleByID)(cycle_id);
    if (cycle != null) {
        cycle_project_id = cycle.project_id;
        let activities = yield (0, activity_services_1.getActivities)(cycle_project_id);
        for (const activity of activities) {
            let newActivity = {
                activity_name: activity.activity_name,
                activity_number: activity.activity_number,
                start_date: activity.start_date,
                duration: activity.duration,
                completed: activity.completed,
                note: activity.note,
                project_id: project_id,
            };
            let createdActivity = yield (0, activity_services_1.createActivity)(newActivity);
            let activityTags = yield (0, activity_services_1.getTagsByActivity)(activity.activity_id);
            for (const tagName of activityTags) {
                let tag = yield (0, tag_services_1.getTagByName)(tagName);
                (0, tag_services_1.addTagToActivity)(tag, createdActivity.activity_id);
            }
            let tasks = yield (0, task_services_1.getTasks)(activity.activity_id);
            for (const task of tasks) {
                let newTask = {
                    task_name: task.task_name,
                    task_number: task.task_number,
                    start_date: task.start_date,
                    duration: task.duration,
                    completed: task.completed,
                    note: task.note,
                    activity_id: createdActivity.activity_id,
                };
                let createdTask = yield (0, task_services_1.createTask)(newTask);
                // let taskTags = await getTagsByTask(task.task_id);
                // console.log("TAGS:" + taskTags);
                // for (const tagName of taskTags) {
                //     let tag = await getTagByName(tagName);
                //     addTagToTask(tag!, createdTask.task_id);
                // }
            }
        }
    }
});
exports.duplicateCycle = duplicateCycle;
