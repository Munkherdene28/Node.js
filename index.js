const express = require("express");
const port = 8000;
const app = express();
app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/one", (req, res) => {
  res.send({ id: 123, name: "John", food_id: 1234 });
});
app.listen(port, () => {
  console.log();
});
