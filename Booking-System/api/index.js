const cors = require("cors");
const express = require("express");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dfeeflnedfdmfejhvklfmdsf";

//parses the json -  This solves the JSON error in console log
app.use(express.json());
app.use(cookieParser());

//NPM I CORS fixed the issue with not recognising url error.
//Used yarn add CORS previously. Can set wild card * for allowing all origin but unsafe!
app.use(
  cors({
    //Set localhost to communicate to the endpoint
    origin: "http://127.0.0.1:5173",
    credentials: true,
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
    const userCred = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    response.json(userCred);
  } catch (error) {
    response.status(422).json(error);
  }
});

app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const userCred = await User.findOne({ email });

  if (userCred) {
    const validPassword = bcrypt.compareSync(password, userCred.password);
    if (validPassword) {
      jwt.sign(
        { email: userCred.email, id: userCred._id, name: userCred.name },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          response.cookie("token", token).json(userCred);
        }
      );
    } else {
      response.status(422).json("Password is bad!");
    }
  } else {
    response.json("User not found");
  }
});

app.get("/profile", (request, response) => {
  const { token } = request.cookies;
  //console.log(token, "TOKEN");
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, tokenData) => {
      if (error) throw error;
      const { name, email, id } = await User.findById(tokenData.id);
      response.json({ name, email, id });
    });
  } else {
    response.json(null);
  }
});

app.listen(4000);
