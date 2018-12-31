"use strict";

require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "cms",
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: true
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "cms_test",
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: true,
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "cms",
    host: process.env.DB_HOST,
    dialect: "postgres"
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "cms",
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false
  }
};
