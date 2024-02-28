const mongoose = require("mongoose");
const DB_URI = process.env.DATABASE_URI;
async function dbConnect(req, res) {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
module.exports = { dbConnect };
