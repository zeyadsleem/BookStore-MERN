import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, mongoDB_URL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

app.use(express.json());
app.use("/books", booksRoute);

// Middleware for handling CORS POLICY
app.use(cors());

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
