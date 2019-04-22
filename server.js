// packages ==============================
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require("knex");

// controllers ==============================
const register = require("./controllers/register");
const signIn = require("./controllers/singin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// init ==============================
const app = express();  // create express server

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "test",
    database: "smart-brain"
  }
});

// middleware ==============================

app.use(bodyParser.json()); // middelware that first gets used on every req that comes in
app.use(cors());

// data & functions ================================


// routes ======================================

app.get("/", (req, res) => {
  db.select("*").from("users")
    .then(response => res.send(response))
    .catch(err => res.send(err));
})

app.post("/signin", (req, res) => signIn.handleSignIn(req, res, db, bcrypt));

app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get("/profile/:id", profile.handleProfileGet(db)); // we can use functional programming to make this a bit cleaner. might be difficult to read.

app.put("/image", (req, res) => image.handleImage(req, res, db));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

// listen =================================
const port = process.env.PORT;
app.listen(port || 3001, () => {
  console.log(`app is running on port ${port}`);
})