const express = require("express");
const {
  getAllUsers,
  getUserByID,
  blockUser,
  deleteUser,
} = require("../controller/userController");
const { adminAuth } = require("../middleware/adminAuth");
const route = express.Router();

route.get("/allUsers/:chatId", adminAuth, getAllUsers);

route.post("/userById/:chatId", adminAuth, getUserByID);

route.patch("/blockUser/:chatId", adminAuth, blockUser);

route.delete("/deleteUser/:chatId", adminAuth, deleteUser);

module.exports = route;
