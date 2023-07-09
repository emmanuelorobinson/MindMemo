import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { db } from './utils/db.server';
import { userRouter } from './routes/user.router';
import { projectRouter } from './routes/project.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const prisma = db;
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use("/users", userRouter);
app.use("/projects", projectRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

