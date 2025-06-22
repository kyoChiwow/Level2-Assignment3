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

borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([

      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },

      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        }
      },

      { $unwind: "$book" },

      {
        $project: {
        _id: 0,
        book: {
          title: "$book.title",
          isbn: "$book.isbn",
        },
        totalQuantity: 1
        }
      },
    ]);
    res.json({
      success: true,
      message: "Borrow fetched successfully!",
      summary
    })
  } catch (error) {
    handleError(res, error);
  }
})