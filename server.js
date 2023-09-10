const mysql = require("mysql");
const fs = require('fs');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "business_db",
});

const schemaSQL = fs.readFileSync('./db/schema.sql', 'utf8');

  db.connect((err) => {
    if (err) {
      console.log("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the business_db.");
  });


module.exports = {
  db,
  schemaSQL,
};
