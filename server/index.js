const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "gabriele",
  password: process.env.DATABASE_PASSWORD || "password123!",
  database: process.env.DATABASE_NAME || "gab_library_v2",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/newBook", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const summary = req.body.summary;
  const isbn = req.body.isbn;
  const added = req.body.added;
  const times = req.body.times;
  const sqlInsert =
    "INSERT INTO `books` (title, author, summary, isbn, added, times) VALUES (?,?,?,?,curdate(),?);";
  db.query(
    sqlInsert,
    [title, author, summary, isbn, added, times],
    (err, res) => {
      console.log(res);
    }
  );
});

app.put("/api/updateSingleField", (req, res) => {
  const title = req.body.title;
  const field = req.body.field;
  const value = req.body.value;
  const sqlUpdate = `UPDATE books SET ${field} = ? WHERE title = ?;`;

  db.query(sqlUpdate, [value, title], (err, result) => {
    if (err) console.log(err);
  });
});
``;

app.get("/api/getBooks", (req, res) => {
  const sqlSelect =
    "SELECT title, author, summary, isbn, added, `times` FROM books;";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/api/deleteBook/:title", (req, res) => {
  const name = req.params.title;
  const sqlDelete = "DELETE FROM books WHERE title = ?;";

  db.query(sqlDelete, name, (err, res) => {
    if (err) console.log(err);
  });
});

app.put("/api/updateBook", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const summary = req.body.summary;
  const isbn = req.body.isbn;
  const times = req.body.times;
  const sqlUpdate =
    "UPDATE books SET author = ?, summary = ?, isbn = ?, added = CURDATE(), times = ? WHERE title = ?;";

  db.query(sqlUpdate, [author, summary, isbn, times, title], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("Siamo sulla port 3001");
});
