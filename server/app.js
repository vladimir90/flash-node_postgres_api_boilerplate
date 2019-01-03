"use strict";

require('express-async-errors')
require("dotenv").config()

const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const routes = require("./routes")
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const error = require('./middlewares/error')
const cors = require('cors')
const PORT = process.env.PORT || 8080;

const swaggerDefinition = {
  definition: {
    info: {
      title: "RQI",
      version: "0.0.1",
      description: "A sample API"
    },
    host: `localhost:${PORT}`
  },
  apis: ["./server/routes/**/*.js"]
};
const swaggerSpec = swaggerJSDoc(swaggerDefinition);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(...routes)
app.use("*", (req, res) => {res.send({ error: "Not found" }, 404)});
app.use(error)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`Express server running in enviroment: ${process.env.NODE_ENV}`)
})


module.exports = app