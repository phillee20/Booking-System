const cors = require("cors");
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./model/User");
require("dotenv").config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

//parses the json -  This solves the JSON error in console log
app.use(express.json());

//NPM I CORS fixed the issue with not recognising url error.
//Used yarn add CORS previously. Can set wild card * for allowing all origin but unsafe!
app.use(
  cors({
    credentials: true,
    origin: "*", //Set what app can communicate to the API
  })
);

//Connect MongoDB to your app via below - Put it in env file for best security practice
//console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (request, response) => {
  response.json("test ok here!");
});

app.post("/register", async (request, response) => {
  const { name, email, password } = request.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    response.json(userDoc);
  } catch (error) {
    response.status(422).json(error);
  }
});

app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    response.json("Found");
  } else {
    response.json("Not Found");
  }
});

app.listen(4000);
