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
