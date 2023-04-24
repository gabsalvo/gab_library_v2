const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'gabriele',
    password: 'password',
    database: 'library_v2',
});


app.get('/', (req,res) => {

    const sqlInsert = "INSERT INTO library_v2 (title, author) VALUES ('Test Titolo', 'Test Autore');"
    db.query(sqlInsert, (err, result) =>{
        res.send("Hello, Testing Database_V2");
        console.log("Changes on Database Done");
    });
})

app.listen(3001, () => {
    console.log("Siamo sulla port 3001")
});