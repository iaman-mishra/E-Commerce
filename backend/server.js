import express from "express";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewears
app.use(express.json());

// API Endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(port, () => {
  console.log("listning on PORT :" + port);
});
