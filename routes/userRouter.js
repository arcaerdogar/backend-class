import express from "express";

import User from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
});

export default router;
