const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// console.log(process.env.MONGO_URI);

// ℹ️ Connects to the database
require("./db");

const app = express();

app.get("/login", (req, res) => {
  res.send("I am the login page");
});

app.post("/register", (req, res) => {
  res.json("Hello i am the register page!!");
});

app.listen(4000, () => {
  console.log("App is running on PORT 3000...");
});
