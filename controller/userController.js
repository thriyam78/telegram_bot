const User = require("../models/userModel");

async function getAllUsers(req, res) {
  const { chatId } = req.chatId;
  console.log(chatId);
  try {
    const allUsers = await User.find();
    if (allUsers) {
      return res.status(200).json({
        status: "Success",
        message: "All Users retrived successfully",
        length: allUsers.length,
        data: allUsers,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
      error: error,
    });
  }
}

async function getUserByID(req, res) {
  const { userChatId } = req.body;
  try {
    const user = await User.findOne({ chatId: userChatId });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "User retrived successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
      error: error,
    });
  }
}

async function blockUser(req, res) {
  const { userChatId } = req.body;

  try {
    const blockedUser = await User.findOneAndUpdate(
      { chatId: userChatId },
      { blocked: "TRUE" }
    );
    if (blockedUser) {
      return res.status(200).json({
        status: "Success",
        message: "User Blocked Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
      error: error,
    });
  }
}

async function deleteUser(req, res) {
  const { userChatId } = req.body;
  try {
    const deletedUser = await User.deleteOne({ chatId: userChatId });
    if (!deletedUser) {
      return res.status(401).json({
        status: "Failed",
        message: "User has not been deleted ",
      });
    }
    return res.status(200).json({
      staus: "Success",
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
      error: error,
    });
  }
}

module.exports = { getAllUsers, getUserByID, blockUser, deleteUser };
