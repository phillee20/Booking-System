const cors = require("cors");
const express = require("express");
const Place = require("./model/Place");
const User = require("./model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
require("dotenv").config();
const fs = require("fs");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dfeeflnedfdmfejhvklfmdsfff";

//parses the json -  This solves the JSON error in console log
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

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

app.post("/logout", (request, response) => {
  response.cookie("token", "").json(true);
});

//console.log({ __dirname });
app.post("/upload-by-link", async (request, response) => {
  const { link } = request.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  response.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  (request, response) => {
    const uploadedFiles = [];
    for (let i = 0; i < request.files.length; i++) {
      const { path, originalname } = request.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads/", ""));
    }

    response.json(uploadedFiles);
  }
);

//Post a new place and create it with MongoDB place Schema
app.post("/places", (request, response) => {
  const { token } = request.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = request.body;
  jwt.verify(token, jwtSecret, {}, async (error, tokenData) => {
    if (error) throw error;
    const placeInfo = await Place.create({
      owner: tokenData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    //console.log(placeInfo);
    response.json(placeInfo);
  });
});

//Get all the saved places to show in My Accomodation page
app.get("/user-places", (request, response) => {
  const { token } = request.cookies;
  jwt.verify(token, jwtSecret, {}, async (error, tokenData) => {
    const { id } = tokenData;
    response.json(await Place.find({ owner: id }));
  });
});

//Get each place id
app.get("/places/:id", async (request, response) => {
  const { id } = request.params;
  response.json(await Place.findById(id));
});

//Update Saved location information
app.put("/places", async (request, response) => {
  const { token } = request.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = request.body;

  jwt.verify(token, jwtSecret, {}, async (error, tokenData) => {
    const placeDoc = await Place.findById(id);
    if (tokenData.id === placeDoc.owner.toString()) {
      // console.log(tokenData.id)
      // console.log(placeDoc.owner)
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      await placeDoc.save();
      response.json("ok");
    }
  });
});

//Get all listings display on home page
app.get("/places", async (request, response) => {
  response.json(await Place.find());
});

app.listen(4000);
