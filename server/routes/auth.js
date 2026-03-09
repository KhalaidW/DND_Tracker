import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Register
router.post("/register", async (req, res, next) => {
  try {

    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    await newUser.save();

    res.json({ message: "User registered" });

  } catch (error) {
    next(error);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  console.log("LOGIN ROUTE HIT", req.body);  

  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;