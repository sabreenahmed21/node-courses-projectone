require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const httpStatusText = require("./utils/httpStatusText");
const path = require('node:path');

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname,'uploads')));

const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("mongodb connection");
});

const courseRouter = require("./routes/coursesRout");
const userRouter = require("./routes/userRout");

app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  res.json({
    status: httpStatusText.ERROR,
    message: "this resourse is not found",
  });
});

app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({
      status: error.statusText || httpStatusText.ERROR,
      message: error.message,
      code: error.statusCode || 500,
      data: null,
    });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
