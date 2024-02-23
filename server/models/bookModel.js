import { Schema, model } from "mongoose";

const bookSchema = Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
  },
  { timestamps: true },
);

const Book = model("book", bookSchema);

export default Book;
