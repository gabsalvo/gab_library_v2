import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const newBook = () => {
    Axios.post("http://localhost:3001/api/newBook", {
      title: title,
      author: author,
    }).then(() => {
      alert("successful newBook");
    });
  };

  return (
    <div className="App">
      <h1>Gab Library</h1>

      <div className="add_new_book">
        <label>Book Title</label>
        <input
          type="text"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />

        <button onClick={newBook}>New</button>
      </div>
    </div>
  );
}

export default App;
