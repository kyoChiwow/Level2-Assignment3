import { model, Schema } from "mongoose";
import { IBook } from "../interface/books.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: [0, "Copies must not be less than 0"] },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Instance here to update the availability
bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
    return this.save();
}

// Static method here for controling available
bookSchema.statics.updateAvailability = async function (bookId: string) {
    const book = await this.findById(bookId);
    if (!book) throw new Error("Book not found");

    book.available = book.copies > 0;
    return book.save();
}

export const Book = model<IBook>("Book", bookSchema);
