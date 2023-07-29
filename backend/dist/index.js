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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_server_1 = require("./utils/db.server");
const user_router_1 = require("./routes/user.router");
const project_router_1 = require("./routes/project.router");
const activity_router_1 = require("./routes/activity.router");
const task_router_1 = require("./routes/task.router");
const tag_router_1 = require("./routes/tag.router");
const cycle_router_1 = require("./routes/cycle.router");
const reminder_router_1 = require("./routes/reminder.router");
const reminder_services_1 = require("./services/reminder.services");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const prisma = db_server_1.db;
const http = require("http").Server(app);
const cors = require("cors");
const nodemailer = require('nodemailer');
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const cron = require('node-cron');
app.get('/', (req, res) => {
    let message = "Express + TypeScript Server for MindMemo<br>";
    message += "<pre>The following get routes are available:\n";
    message += "/users (get all users)\n";
    message += "/users/:user_id (get user by id)\n";
    message += "/users/:user_id/tasks (get user's upcoming tasks)\n";
    message += "/users/:user_id/activities (get user's upcoming activities)\n";
    message += "/projects/:user_id (get all projects by user)\n";
    message += "/projects/project/:project_id (get project by id)\n";
    message += "/activities/:project_id (get all activities by project)\n";
    message += "/activities/activity/:activity_id (get activity by id)\n";
    message += "/activities/activity/:activity_id/tags (get tags by activity)\n";
    message += "/tasks/:activity_id (get all tasks by activity)\n";
    message += "/tasks/task/:task_id (get task by id)\n";
    message += "/tasks/task/:task_id/tags (get tags by task)\n";
    message += "/tags (get all tags)\n";
    message += "/tags/:tag_id (get tag by id)\n";
    message += "/tags/:tag_name (get tag by name)\n";
    message += "/tags/:tag_name/:task_id (filter tasks by tag)\n";
    message += "/tags/:tag_name/:activity_id (filter activities by tag)\n";
    message += "/cycles (get all cycles)\n";
    message += "/cycles/:user_id (get cycles by user)\n";
    message += "/cycles/cycle/:cycle_id (get cycle by id)\n";
    message += "/reminders (get all reminders)\n";
    message += "</pre>";
    res.send(message);
});
app.use("/users", user_router_1.userRouter);
app.use("/projects", project_router_1.projectRouter);
app.use("/activities", activity_router_1.activityRouter);
app.use("/tasks", task_router_1.taskRouter);
app.use("/tags", tag_router_1.tagRouter);
app.use("/cycles", cycle_router_1.cycleRouter);
app.use("/reminders", reminder_router_1.reminderRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
cron.schedule('00 10 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, reminder_services_1.sendActivityReminder)(new Date());
    (0, reminder_services_1.sendTaskReminder)(new Date());
}));
