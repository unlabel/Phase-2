// твой код
const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server started");
});

app.get("/status", (request, response) => {
  response.send("HTTP server is working!");
});

app.get("/users", (request, response) => {
  response.json({ data: { age: 26 }, error: null });
});

app.get("/home", (request, response) => {
  response.send("Home!");
});

module.exports = { app };
