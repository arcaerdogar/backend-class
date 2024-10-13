import User from "../models/user.js";

export const addEvent = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log("user found");
    if (user) {
      user.events.push(req.params.eventId);
      const updatedUser = await user.save();
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
};
