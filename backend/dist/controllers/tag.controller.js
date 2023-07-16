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
exports.getTagActivities = exports.getTagTasks = exports.addTagToActivity = exports.addTagToTask = exports.createTag = exports.getTagByName = exports.getTagByID = exports.getTags = void 0;
const TagService = __importStar(require("../services/tag.services"));
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield TagService.getTags();
        res.json(tags);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTags = getTags;
const getTagByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tag_id } = req.params;
        const tag = yield TagService.getTagByID(parseInt(tag_id));
        res.json(tag);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTagByID = getTagByID;
const getTagByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tag_name } = req.params;
        const tag = yield TagService.getTagByName(tag_name);
        res.json(tag);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTagByName = getTagByName;
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tag_name } = req.body;
        const newTag = yield TagService.createTag(tag_name);
        res.json(newTag);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createTag = createTag;
const addTagToTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = parseInt(req.params.task_id);
        const tag_name = req.params.tag_name;
        let tag = yield TagService.getTagByName(tag_name);
        if (tag === null) {
            tag = yield TagService.createTag(tag_name);
        }
        const newTag = yield TagService.addTagToTask(tag, task_id);
        res.json(newTag);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addTagToTask = addTagToTask;
const addTagToActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity_id = parseInt(req.params.activity_id);
        const tag_name = req.params.tag_name;
        let tag = yield TagService.getTagByName(tag_name);
        if (tag === null) {
            tag = yield TagService.createTag(tag_name);
        }
        const newTag = yield TagService.addTagToActivity(tag, activity_id);
        res.json(newTag);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addTagToActivity = addTagToActivity;
const getTagTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag_id = req.params;
        const tasks = yield TagService.getTasksByTag(parseInt(tag_id));
        res.json(tasks);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getTagTasks = getTagTasks;
const getTagActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag_id = req.params;
        const activities = yield TagService.getActivitiesByTag(parseInt(tag_id));
        res.json(activities);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getTagActivities = getTagActivities;
