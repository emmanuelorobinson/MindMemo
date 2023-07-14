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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRouter = void 0;
const express_1 = __importDefault(require("express"));
const activityController = __importStar(require("../controllers/activity.controller"));
exports.activityRouter = express_1.default.Router();
//Get: Get all activitys
exports.activityRouter
    .route("/")
    .get(activityController.getActivities)
    .post(activityController.createActivity);
exports.activityRouter
    .route("/:activity_id")
    .get(activityController.getActivityByID)
    .put(activityController.updateActivity)
    .delete(activityController.deleteActivity);
exports.activityRouter
    .route("/today")
    .get(activityController.getTodaysActivities);
exports.activityRouter
    .route("/upcoming")
    .get(activityController.getUpcomingActivities);
exports.activityRouter
    .route("/tags/:tag_id")
    .get(activityController.getActivitiesByTag)
    .put(activityController.updateActivitiesTagList);
