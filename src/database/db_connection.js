const { Pool } = require("pg");
const url = require("url");
require("env2")("./.env");

//Etablishing test for database
let DB_URL = process.env.DB_URL;

if (process.env.NODE_ENV === "test") {
  DB_URL = process.env.TEST_DB_URL;
}

if (!DB_URL) throw new Error("Environment variable DB_URL must be set!");

const params = url.parse(DB_URL);
const [user, password] = params.auth.split(":");

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user,
  password,
  ssl: params.hostname !== "localhost"
};

const dbConnection = new Pool(options);
module.exports = dbConnection;
