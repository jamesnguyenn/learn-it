require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//Routes
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");

//Connect Database
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kx8rp.mongodb.net/learn-it?retryWrites=true&w=majority`
    );
    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use("/api/auth", authRouter);

app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
