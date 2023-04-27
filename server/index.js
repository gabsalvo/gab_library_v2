const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "gabriele",
  password: "password",
  database: "library_v2",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/newBook", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const sqlInsert = "INSERT INTO library_v2 (title, author) VALUES (?,?);";
  db.query(sqlInsert, [title, author], (err, res) => {
    console.log(res);
  });
});

app.get('/api/getBooks', (req, res) => {
  const sqlSelect = 
  "SELECT * FROM library_v2;";
  db.query(sqlSelect, (err, result) =>{
      res.send(result);
  });
})

app.delete('/api/deleteBook/:title', (req, res) => {
  const name = req.params.title;
  const sqlDelete = 
  "DELETE FROM library_v2 WHERE title = ?;";

  db.query(sqlDelete, name, (err, res) => {
    if (err) console.log(err);
  })
})

app.put("/api/updateBook", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const sqlUpdate = "UPDATE library_v2 SET author = ? WHERE title = ?;";

  db.query(sqlUpdate, [author, title], (err, result) => {
    if (err) console.log(err);
  })
})

app.listen(3001, () => {
  console.log("Siamo sulla port 3001");
});

/*app.get('/api/newBook', (req,res) => {

    const sqlInsert = "INSERT INTO library_v2 (title, author) VALUES ('Test Titolo', 'Test Autore');"
    db.query(sqlInsert, (err, result) =>{
        res.send("Hello, Testing Database_V2");
        console.log("Changes on Database Done");
    });
});*/
