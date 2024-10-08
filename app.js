import express from "express";
import Event from "./models/event.js";
import { connectDB } from "./config/db.js";
import eventRouter from "./routes/eventRouter.js";
const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/events", eventRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
