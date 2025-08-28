const { Pool } = require("pg");
const config = require("config");

try {
  const pool = new Pool({
    user: config.get("db.username"),
    password: config.get("db.password"),
    database: config.get("db.name"),
    host: config.get("db.host"),
    port: config.get("db.port"),
  });
  module.exports = pool;
  console.log("Connected to Database")
} catch (error) {
  console.log(error);
}
