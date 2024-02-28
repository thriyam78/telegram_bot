const User = require("../models/userModel");

async function adminAuth(req, res, next) {
  const { chatId } = req.params;
  try {
    const user = await User.findOne({ chatId: chatId });

    const role = user.role;

    if (role !== "ADMIN") {
      return res.status(401).json({
        status: "Failed",
        message: "The User is not an admin",
      });
    }

    req.chatId = user?.chatId;

    next();
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
      error: error,
    });
  }
}

module.exports = { adminAuth };
