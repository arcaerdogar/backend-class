import express from "express";
import Event from "../models/event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

export default router;
