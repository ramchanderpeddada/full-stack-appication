import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server listening on ${PORT}`))
  )
  .catch((error) => console.log(error));
