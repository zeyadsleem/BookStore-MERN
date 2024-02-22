import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDB_URL } from "./config.js";
import Book from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  // console.log(req);
  return res.status(234).send("here we are");
});

// Route for Save a new Book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.auther || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, auther, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      auther: req.body.auther,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for Get All Books from database
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ message: err.message });
  }
});

// Route for Get one Book with id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ message: err.message });
  }
});

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
