//External Import
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
//internal import
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

//Database connections
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Database(mongoose) connection successfully");
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
  });

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set VIEW Engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup

//Error handling start
//-----Not found Handler
app.use(notFoundHandler);
//-----Default error Handler
app.use(errorHandler);
//Error handling End

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
