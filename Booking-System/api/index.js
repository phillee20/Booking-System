const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User.js");

require("dotenv").config();

const app = express();

//parses the json
app.use(express.json());

//NPM I CORS fixed the issue with not recognising url error.
//Used yarn add CORS previously. Can set wild card * for allowing all origin but unsafe!
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173", //Set what app can communicate to the API
  })
);

//Connect MongoDB to your app via below - Put it in env file for best security practice
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (request, response) => {
  response.json("test ok here!");
});

app.post("/register", (request, response) => {
  const { name, email, password } = request.body;
  User.create({
    name,
    email,
    password,
  });
  response.json({ name, email, password });
});

app.listen(4000);
