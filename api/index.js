const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const cors = require("cors");

const jwtSecret = process.env.JWT_SECRET;

const User = require("./models/User");

// ℹ️ Connects to the database
require("./db");

const app = express();
const morgan = require("morgan");

app.use(express.json());

// Use cors
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/login", (req, res) => {
  res.send("I am the login page");
});

// CREATING A NEW USER WITH THE DATA FROM THE REQUEST (req.body)
app.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const createdUser = await User.create({ userName, password });
    jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.cookie("token", token).status(201).json({
        id: createdUser._id,
      });
    });
  } catch (error) {
    // Handle the duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Handle other errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log("App is running on PORT 4000...");
});
