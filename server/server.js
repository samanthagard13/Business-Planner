const mysql = require('mysql');
const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 4001;
const app = express();

app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'business_db'
    },
);

db.connect => {
    console.log('Connected to the business_db.');
}

fs.readFile('schema.sql', (data) => {
    db.query(data)
        .then(results) => {
            console.log('results');
        }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

