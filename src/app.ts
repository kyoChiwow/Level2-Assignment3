import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { bookRoutes } from "./app/controller/books.controller";

const app: Application = express();
app.use(express.json());

app.use("/api", bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management!");
});



export default app;
