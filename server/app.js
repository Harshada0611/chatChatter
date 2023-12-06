const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors());

//! routes
app.use(require("./route/user"));

app.get("/", async (req, resp) => {
  resp.send("Application initiated successfully");
});

module.exports = app;
