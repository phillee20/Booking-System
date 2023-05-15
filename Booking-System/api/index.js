const cors = require("cors");
const express = require("express");
const Place = require("./model/Place");
const User = require("./model/User");
const Booking = require("./model/Booking");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();
const fs = require("fs");
const mime = require("mime-types");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dfeeflnedfdmfejhvklfmdsfff";
const bucket = "phil-airbeebee";

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
//Then added this connection string to every end points instead for AWSs3
//mongoose.connect(process.env.MONGO_URL_PROD);

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];

  const newFilename = Date.now() + "." + ext;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

//Used jwt verify a lot so created this function to make it DRY
function getUserDataFromToken(request) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      request.cookies.token,
      jwtSecret,
      {},
      async (error, tokenData) => {
        if (error) throw error;
        resolve(tokenData); //Did not want to return the tokenData back to async function so made new Promise with resolve so the returned data goes to the top function
      }
    );
  });
}

app.get("/api/test", (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
  response.json("test ok here!");
});

app.post("/api/register", async (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
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

app.post("/api/login", async (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
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

app.get("/api/profile", (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
  const { token } = request.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, tokenData) => {
      if (error) throw error;
      const { name, email, id } = await User.findById(tokenData.id);
      //const { name, email, id } = await User.findById(tokenData.id);
      response.json({ name, email, id });
    });
  } else {
    response.json(null);
  }
});

app.post("/api/logout", (request, response) => {
  response.cookie("token", "").json(true);
});

//URL Link post reqeust for images
//console.log({ __dirname });
app.post("/api/upload-by-link", async (request, response) => {
  const { link } = request.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + newName,
    //dest: __dirname + "/uploads/" + newName, Not to uploads folder anymore
  });
  const url = await uploadToS3(
    "/tmp/" + newName,
    newName,
    mime.lookup()("/tmp/" + newName)
  );
  response.json(url);
});

const photosMiddleware = multer({ dest: "/tmp" });
app.post(
  "/api/upload",
  photosMiddleware.array("photos", 100),
  async (request, response) => {
    const uploadedFiles = [];
    for (let i = 0; i < request.files.length; i++) {
      const { path, originalname, mimetype } = request.files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedFiles.push(url);
    }
    response.json(uploadedFiles);
  }
);

//Post a new place and create it with MongoDB place Schema
app.post("/api/places", (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
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
    price,
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
      price,
    });
    //console.log(placeInfo);
    response.json(placeInfo);
  });
});

//Get all the saved places to show in My Accomodation page
app.get("/api/user-places", (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
  const { token } = request.cookies;
  jwt.verify(token, jwtSecret, {}, async (error, tokenData) => {
    const { id } = tokenData;
    response.json(await Place.find({ owner: id }));
  });
});

//Get a single place by ID
app.get("/places/:id", async (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
  const { id } = request.params;
  response.json(await Place.findById(id));
});

//Update Saved location information
app.put("/api/places", async (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
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
    price,
  } = request.body;

  jwt.verify(token, jwtSecret, {}, async (error, tokenData) => {
    mongoose.connect(process.env.MONGO_URL_PROD);
    const placeDoc = await Place.findById(id);
    if (tokenData.id === placeDoc.owner.toString()) {
      console.log({ price });
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
        price,
      });
      await placeDoc.save();
      response.json("ok");
    }
  });
});

//Get all listings display on home page
app.get("/api/places", async (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
  response.json(await Place.find());
});

//Take in the below request and created the Schema for mongoDB
app.post("/bookings", async (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
  const tokenData = await getUserDataFromToken(request);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    request.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: tokenData.id,
  })
    .then((doc) => {
      response.json(doc);
    })
    .catch((error) => {
      throw error;
    });
});

app.get("/api/bookings", async (request, response) => {
  mongoose.connect(process.env.MONGO_URL_PROD);
  const tokenData = await getUserDataFromToken(request);
  response.json(await Booking.find({ user: tokenData.id }).populate("place"));
});

app.listen(4000);
