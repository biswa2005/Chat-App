import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import { cloudinary } from "../lib/cloudinary.js";

export const UsersList = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const filteresUsers = await User.find({ _id: { $ne: currentUser } }).select(
      "-password"
    );

    res.status(200).json({
      filteresUsers,
    });
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const roomId = req.params;
    const currentUser = req.user._id;
    const messages = await Messsage.find({
      $or: [
        { senderId: currentUser, receiverId: roomId.id },
        { senderId: roomId.id, receiverId: currentUser },
      ],
    });

    res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Error in getMessages controller : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
