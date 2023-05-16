# AirBeeBee


AirBeeBee provides the registered and logged in users to list properties for people to rent. Logged in users will also be able to make bookings for accomodations for themselves, as well as be able to view all the listed places by everyone else.


## Tech Stack

The project is created using MongoDB, Express, React and Node (MERN). MongoDB and mongoose is used to store the data/collections provided by the users. For the backend, the endpoints are created using Express, a JavaScript server-side framework that runs within js. Express is a framework that sits on NodeJS and helps us to handle requests and responses. On the other hand, the front end is created using React which I have experience in using. Yarn is the package manager for Node. js that is also used within this project.


## Running this on a local machine

To run this server on your local machine. Clone the repository:

```
git clone https://github.com/YOUROWNGITHUBUSERNAME/Booking-System.git
```

Running `yarn install` will install the necessary packages.
<br>
<br>
You will need to create an `.env` file in the /Booking-System/api directory. Inside of this `.env` file, you will need to create an environment variable named MONGO_URI:

```

MONGO_URI="ConnectionStringFromMongoDB-URI"

```

You will then need to create a MongoDB database and link it to the environment variables. Input the connection string to replace the above string. This will act as the database for the system.
<br>
<br>

Start the server:

cd into Booking-System/api and run below

```
node index.js
```
cd into Booking-System/client and run below. Copy http://localhost:5173/ which is the result of the below command into your URL address bar. 
```
yarn dev
```

Great! You are now connected!


## Features

The AirBeeBee contains these features:

- Users can make bookings for places via the booking widget.
- Users can list places to rent out via the listing places form
- Users can update the information for the places they've listed to rent out.
- Users can log out their profile.
- Users can make one of the pictures they've uploaded to become the listing cover.
- Users can register for a profile.
- Users can log into the registered profile.
- Users can can view all the places listed by other users on home page.


## Prerequisites

- Node.js
- Yarn


## Endpoints

```
app.post("/register")
```

This endpoint will post users to the database. This request requires a body: {name: **_string_**, username: **_string_**, password: **_string_**

```
app.post("/login")

```

This endpoint will retrieve the user from the database. This request requires a body: {email: **_string_**, password: **_string_**}

```
app.get("/profile")

```

This request will get the users profile find it in database. This request requires a body: {name: **_string_**, email: **_string_**, id: **_string_**}

```
app.post("/api/logout")
```

Logs the logged in users out

```
app.post("/upload-by-link")

```

Uploads the images from user to amazon AWS - S3

```
app.post("/upload", photosMiddleware.array("photos", 100),
```

Request will upload photos from users local machine to AWS S3

```
app.post("/places")
```

Post a new place and create it with Mongoose Schema

```
app.get("/user-places"
```

Get all the saved places to show in My Accomodation page

```
app.get("/places/:id")
```

Get requests a single place by ID

```
app.put("/places"
```

PUT request updates saved location information


```
app.get("/places"
```

Get all listings display on home page


```
app.post("/bookings"
```

Take in the below request and created the Schema for mongoDB


```
app.get("/bookings")
```

Gets the bookings information and populates the place



