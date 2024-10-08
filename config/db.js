import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/backend-class");
  const connection = mongoose.connection;
  connection.on("error", console.error.bind(console, "connection error:"));
  connection.once("open", () => {
    console.log("Connected to MongoDB");
  });
};
