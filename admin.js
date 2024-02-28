const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const { dbConnect } = require("./database/dbConfig");

const app = express();
const port = process.env.PORT || 8001;
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

dbConnect();

app.use("/user", require("./router/userRouter"));

app.listen(port, () => {
  console.log("Server is running on the port", port);
});
