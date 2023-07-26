import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { db } from './utils/db.server';
import { userRouter } from './routes/user.router';
import { projectRouter } from './routes/project.router';
import { activityRouter } from './routes/activity.router';
import { taskRouter } from './routes/task.router';
import { tagRouter } from './routes/tag.router';
import { cycleRouter } from './routes/cycle.router';
import { reminderRouter } from './routes/reminder.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const prisma = db;
const http = require("http").Server(app);
const cors = require("cors");
const nodemailer = require('nodemailer');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
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

app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/activities", activityRouter);
app.use("/tasks", taskRouter);
app.use("/tags", tagRouter);
app.use("/cycles", cycleRouter)
app.use("/reminders", reminderRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});