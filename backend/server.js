import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";

import recipeRoutes from "./routes/recipeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import groceryRoutes from "./routes/groceryRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/diaries", diaryRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/groceries", groceryRoutes);
app.use("/api/questions", questionRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
