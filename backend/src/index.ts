import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

const prisma = new PrismaClient();
const app: Express = express();
const http = require("http").Server(app);
const cors = require("cors");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/test", (req: Request, res: Response) => {
  // res.status(200).json({msg: "Welcome"});
  res.send("Express + TypeScript Server");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// http.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
