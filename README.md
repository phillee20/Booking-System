# AirBeeBee


AirBeeBee provides the registered and logged in users to list properties for people to rent. Logged in users will also be able to make bookings for accomodations for themselves, as well as be able to view all the listed places by everyone else.


## Tech Stack

The project is created using MongoDB, Express, React and Node (MERN). MongoDB and mongoose is used to store the data/collections provided by the users. For the backend, the endpoints are created using Express, a JavaScript server-side framework that runs within js. Express is a framework that sits on NodeJS and helps us to handle requests and responses. On the other hand, the front end is created using React which I have experience in using. Yarn is the package manager for Node. js that is also used within this project.


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

- Node.js and Yarn

## Endpoints

```
app.post("/register"
```

This endpoint will post users to the database. This request requires a body: {name: **_string_**, username: **_string_**, password: **_string_**

```
app.post("/login"

```

This endpoint will retrieve the user from the database. This request requires a body: {email: **_string_**, password: **_string_**}

```
app.get("/profile"

```

This request will get the users profile find it in database. This request requires a body: {name: **_string_**, email: **_string_**, id: **_string_**}

```
app.post("/api/logout"
```

Logs the logged in users out

```
app.post("/upload-by-link"

```

Uploads the images from user to amazon AWS - S3

```
app.post("/upload", photosMiddleware.array("photos", 100),
```

Request will upload photos from users local machine to AWS S3

```
app.patch("/api/user", updateUser);
```

This will update the user object stored in the database. This request requires a body: {username: **_string_**, name: **_string_** || password: **_string_** }

```
app.post("/api/scores", postScore);
```

This will post a users score to the scores database. This request requires a body: {username: **_string_**}

```
app.get("/api/scores", getScore);
```

This will retrieve all of the (sorted) scores stored in the database.

## Running this on a local machine

To run this server on your local machine, you will need to install our dependencies. The list of dependencies are as follows:

```

    axios: ^1.3.4,
    bcrypt: ^5.1.0,
    dotenv: ^16.0.3,
    express: ^4.18.2,
    mongoose: ^7.0.3

    cross-env: ^7.0.3,
    eslint: ^8.36.0,
    husky: ^8.0.3,
    jest: ^29.5.0,
    supertest: ^6.3.3
    node: 14.20.1

```

Clone the repository:

```
git clone https://github.com/yourusername/groove-game-api.git
```

running `npm i` will install the necessary packages.
<br>
<br>
You will need to create a `.env` file in the root directory. Inside of this `.env` file, you will need to create some environment variables:

```

MONGO_URI

```

You will then need to create a mongoDB database and link it to the environment variables.
<br>
<br>
If you wish to run our tests or develop them further, please include a `MONGO_URI_TEST` variable in the .env file and link it to the appropriate mongoDB database.
<br>
<br>
Start the server:

```
node app.js
```

## Contributing

If you would like to contribute to the Groove Game API, feel free to submit a pull request. We welcome contributions of all kinds, including bug fixes, new features, and improvements to the documentation.
