const port = 6000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json())
const a=require("./controller/auth")


mongoose
  .connect("mongodb://localhost:27017/dbverification", {
    UseNewUrlParser: true,
    useunifiedtopology: true,
  })
  .then(() => {
    console.log("Database is connected ");
  })
  .catch(() => {
    console.log("Database is not connected");
  });
``;

app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
app.use("/m",a)

module.exports = app;
