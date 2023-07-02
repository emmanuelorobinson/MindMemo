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

/*
app.post("/users", async (req, res) => {
  try {
    const  { first_name, last_name, email, username } = req.body;
    
    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        username
      }
    })

    res.json(newUser);
  }
  catch (error: any) {
    console.log(error.message);
  }
})

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    console.log(error.message);
  }
})

app.put("/users/:user_id", async (req, res) => {
  try {
    const { first_name, last_name, email, username } = req.body;
    const { user_id } = req.params;

    const updatedUser = await prisma.user.update({
      where: {
        user_id: parseInt(user_id),
      },
      data: {
        first_name,
        last_name,
        email,
        username
      },
    })

    res.json(updatedUser);
  } catch (error: any) {
    console.log(error.message);
  }
})

app.delete("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const deletedUser = await prisma.user.delete({
      where: {
        user_id: parseInt(user_id),
      },
    })

    res.json(deletedUser);
  } catch (error: any) {
    console.log(error.message);
  }
})

*/