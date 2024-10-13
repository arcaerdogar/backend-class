import express from "express";
import Event from "../models/event.js";
import { addAttendee, getEvents } from "../controllers/eventController.js";
import { addEvent } from "../controllers/userController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

router.get("/:id", getEvents);

router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      event.title = req.body.title || event.title;
      event.location = req.body.location || event.location;
      event.start = req.body.start || event.start;
      const updatedEvent = await event.save();
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      await event.deleteOne();
      res.json({ message: "Event removed" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
});

router.get("/steps/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event && event.step) {
      res.status(200).json(event.step);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
});

router.post("/steps/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event && event.step) {
      event.step.push(req.body);
      const updatedEvent = await event.save();
      res.status(200).json(updatedEvent.step);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
});

router.post("/attendees/:eventId/:userId", addEvent, addAttendee);

export default router;
