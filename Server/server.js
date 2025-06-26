import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import colors from "colors";
import router from "./routes/dessertRoutes.js";

const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DessertApp Running....",
  });
});

app.use("/api/v1/users", router);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING...`.bgYellow);
});
