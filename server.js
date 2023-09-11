const mysql = require("mysql");
const fs = require('fs');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "business_db",
});

module.exports = {
  db,
};
