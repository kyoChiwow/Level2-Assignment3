import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { handleError } from "../utils/error.handle";

export const borrowRoutes = express.Router();

borrowRoutes.post("/borrow", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const borrow = await Borrow.create(body);
    res.status(201).json({
      success: true,
      message: "Borrow created successfully!",
      borrow,
    });
  } catch (error) {
    handleError(res, error);
  }
});
