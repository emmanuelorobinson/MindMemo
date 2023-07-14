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
exports.getActivityNote = exports.updateActivityCompleted = exports.updateActivityNote = exports.updateActivitiesTagList = exports.getActivitiesByTag = exports.getActivityTagList = exports.getUpcomingActivities = exports.getTodaysActivities = exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityByID = exports.getActivities = void 0;
const ActivityService = __importStar(require("../services/activity.services"));
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield ActivityService.getActivities();
        res.send(activities);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.getActivities = getActivities;
const getActivityByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_id } = req.params;
        const activity = yield ActivityService.getActivityByID(parseInt(activity_id));
        res.send(activity);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.getActivityByID = getActivityByID;
const createActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let projectId = parseInt(req.params.project_id);
        let activityName = req.body.activity_name;
        let activityNumber = parseInt(req.body.activity_number);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let acitivtyNote = req.body.note;
        const activity = {
            activity_name: activityName,
            activity_number: activityNumber,
            duration: intduration,
            completed: complete,
            note: acitivtyNote,
        };
        console.log(req.body);
        const newActivity = yield ActivityService.createActivity(activity, projectId);
        res.send(newActivity);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.createActivity = createActivity;
const updateActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity_id = parseInt(req.params.activity_id);
        let activityName = req.body.activity_name;
        let activityNumber = parseInt(req.body.activity_number);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let acitivtyNote = req.body.note;
        const activity = {
            activity_id: activity_id,
            activity_name: activityName,
            activity_number: activityNumber,
            duration: intduration,
            completed: complete,
            note: acitivtyNote,
        };
        const updatedActivity = yield ActivityService.updateActivity(activity);
        res.send(updatedActivity);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.updateActivity = updateActivity;
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_id } = req.params;
        const deletedActivity = yield ActivityService.deleteActivity(parseInt(activity_id));
        res.send(deletedActivity);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.deleteActivity = deleteActivity;
const getTodaysActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todaysActivities = yield ActivityService.getTodaysActivities();
        res.send(todaysActivities);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.getTodaysActivities = getTodaysActivities;
const getUpcomingActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const upcomingActivitys = yield ActivityService.getUpcomingActivities();
        res.send(upcomingActivitys);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.getUpcomingActivities = getUpcomingActivities;
const getActivityTagList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_id } = req.params;
        const activityTagList = yield ActivityService.getActivityTagList(parseInt(activity_id));
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.getActivityTagList = getActivityTagList;
const getActivitiesByTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag_id = req.params;
        const tasks = yield ActivityService.getActivitiesByTag(parseInt(tag_id));
        res.send(tasks);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.getActivitiesByTag = getActivitiesByTag;
const updateActivitiesTagList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity_id = req.params;
        const tag_list = req.body.tag_list;
        const activityTagList = yield ActivityService.updateActivityTagList(parseInt(activity_id), tag_list);
        res.send(activityTagList);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.updateActivitiesTagList = updateActivitiesTagList;
const updateActivityNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity_id = req.params;
        const note = req.body.note;
        const activityNote = yield ActivityService.updateActivityNote(parseInt(activity_id), note);
        res.send(activityNote);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.updateActivityNote = updateActivityNote;
const updateActivityCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity_id = req.params;
        const activityCompleted = yield ActivityService.completeActivity(parseInt(activity_id));
        res.send(activityCompleted);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.updateActivityCompleted = updateActivityCompleted;
const getActivityNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity_id = req.params;
        const activityNote = yield ActivityService.getActivityNote(parseInt(activity_id));
        res.send(activityNote);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
exports.getActivityNote = getActivityNote;
