"use strict";
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
app.get('/', (req, res) => {
    res.json('Express + TypeScript Server');
});
app.use("/users", user_router_1.userRouter);
app.use("/projects", project_router_1.projectRouter);
app.use("/activities", activity_router_1.activityRouter);
app.use("/tasks", task_router_1.taskRouter);
app.use("/tags", tag_router_1.tagRouter);
app.use("/cycles", cycle_router_1.cycleRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
