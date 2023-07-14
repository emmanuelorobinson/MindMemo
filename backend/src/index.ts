import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { db } from './utils/db.server';
import { userRouter } from './routes/user.router';
import { projectRouter } from './routes/project.router';
import { activityRouter } from './routes/activity.router';
import { taskRouter } from './routes/task.router';
import { tagRouter } from './routes/tag.router';
import { cycleRouter } from './routes/cycle.router';

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
  res.json('Express + TypeScript Server');
});

app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/activities", activityRouter);
app.use("/tasks", taskRouter);
app.use("/tags", tagRouter);
app.use("/cycles", cycleRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

