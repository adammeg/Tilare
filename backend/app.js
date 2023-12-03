var express = require('express');
var path = require('path');
const mongoose = require("mongoose");
var cors = require('cors')

// IMPORT ROUTES
const userRoutes = require("./src/routes/users");

var app = express();
app.use(cors())
// SERVER PORT
const port = process.env.PORT || 3000;

// DATA BASE CONNECTION
mongoose.connect(
  "mongodb+srv://adambenhadjaissa:tylar123@tylarcluster.rsonrk6.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
  console.log("Database connected!");
  // Starting a server
  app.listen(port, process.env.ALWAYSDATA_HTTP_ID, () => {
    console.log(`App is running at ${port}`);
  });
})
.catch((err) => console.log(err));

// for cors origin config
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api", userRoutes);
