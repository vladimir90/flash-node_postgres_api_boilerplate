"use strict";

require('express-async-errors')
require("dotenv").config()

const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const routes = require("./routes")
const error = require('./middlewares/error')
const cors = require('cors')
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes)
app.use("*", (req, res) => {res.send({ error: "Not found" }, 404)});
app.use(error)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`Express server running in enviroment: ${process.env.NODE_ENV}`)
})


module.exports = app