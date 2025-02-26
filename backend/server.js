import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware (be able to parse req.body)
app.use(express.urlencoded({ extended: true })); // Middleware (be able to parse form data (urlended)

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectMongoDB();
});
