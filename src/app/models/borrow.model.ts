import { model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Pre-save hook here
borrowSchema.pre<IBorrow>("save", async function (next) {
  const book = await Book.findById(this.book);
  if (!book) throw new Error("Book not found");

  if (book.copies < this.quantity) {
    throw new Error("Not enough copies available");
  }

  book.copies -= this.quantity;
  book.available = book.copies > 0;

  await book.save();
  next();
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
