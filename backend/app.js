var express = require('express');
const mongoose = require("mongoose");
var cors = require('cors');
require("dotenv").config();

// IMPORT ROUTES
const userRoutes = require("./src/routes/usersRoute");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// SERVER PORT
const port = process.env.PORT ;

// DATA BASE CONNECTION
mongoose.connect(
  process.env.baseAccess)
.then(() => {
  console.log("Database connected!");
  // Starting a server
  app.listen(port, process.env.ALWAYSDATA_HTTP_ID, () => {
    console.log(`App is running at ${port}`);
  });
}).catch((err) => console.log(err));

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
