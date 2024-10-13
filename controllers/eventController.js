import Event from "../models/event.js";

export const getEvents = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
};

export const addAttendee = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    console.log("event found");
    if (event && event.attendees) {
      event.attendees.push(req.params.userId);
      const updatedEvent = await event.save();
      res.status(200).json(updatedEvent.attendees);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
};
