require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PromptController = require("./controllers/promptControllers");
const UserController = require("./controllers/UserController");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/prompts", PromptController);
app.use("/api/user", UserController);


app.use(express.static("client/build"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/positive-thoughts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * *', function() {
  console.log('You will see this message every minute');
  // call a function in here. query all of the users, finding the ones that opted in. Take the users info and send that to the twilio functionality.
}, null, true, 'America/Los_Angeles');

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

app.listen(PORT, () => {
  job.start();
  console.log(`App is running on http://localhost:${PORT}`);
});