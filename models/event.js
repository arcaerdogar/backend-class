import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  start: {
    type: Date,
    required: false,
  },
  step: [
    {
      location: {
        type: String,
        required: true,
        trim: true,
      },
      attendeeCount: {
        type: Number,
        required: true,
      },
    },
  ],
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
