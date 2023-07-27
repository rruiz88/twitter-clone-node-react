import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

const app = express();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("mongodb connected.");
    })
    .catch((err) => {
      throw err;
    });
};
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8080, () => {
  connect();
  console.log("Connected.");
});
