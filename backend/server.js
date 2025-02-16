import express from "express";
import "dotenv/config";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// middlewears
app.use(express.json());

// API Endpoints
app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(port, () => {
  console.log("listning on PORT :" + port);
});
