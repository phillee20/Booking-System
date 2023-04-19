const express = require("express");
const app = express();

app.get("/test", (request, response) => {
  response.json("test ok here!");
});

app.listen(4000);
