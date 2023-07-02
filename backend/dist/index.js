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
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const prisma = db_server_1.db;
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use("/users", user_router_1.userRouter);
app.use("/projects", project_router_1.projectRouter);
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
