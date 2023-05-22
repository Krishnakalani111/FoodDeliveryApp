import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import admin from "./routes/Admin.js";
import user from "./routes/User.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cookieParser())
app.use("/api/admin", admin)
app.use("/api/user",user)

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`server connected on ${PORT}`);
});
