import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [bookList, setBookList] = useState([]);
  const [newAuthor, setNewAuthor] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getBooks").then((response) => {
      setBookList(response.data);
    });
  }, []);

  const newBook = () => {
    Axios.post("http://localhost:3001/api/newBook", {
      title: title,
      author: author,
      summary: summary,
    });

    setBookList([
      ...bookList,
      { title: title, author: author, summary: summary },
    ]);
  };

  const deleteBook = (title_delete) => {
    Axios.delete(`http://localhost:3001/api/deleteBook/${title_delete}`);
  };

  const updateBook = (title) => {
    Axios.put(`http://localhost:3001/api/updateBook`, {
      title: title,
      author: newAuthor,
    });
    setNewAuthor("");
  };

  const reset = () => {
    setTitle("");
    setAuthor("");
  };

  return (
    <div className="App">
      <h1>Gab Library</h1>

      <div className="add_new_book">
        <label>Book Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <label>Summary</label>
        <input
          type="text"
          name="summary"
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
        <button
          onClick={() => {
            newBook();
            reset();
          }}
        >
          New
        </button>
        {bookList.map((val) => {
          return (
            <div key={val.title} className="card">
              <h1>{val.title}</h1>
              <p>{val.author}</p>
              <p>{val.summary}</p>

              <button
                onClick={() => {
                  deleteBook(val.title);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="editInput"
                onChange={(e) => {
                  setNewAuthor(e.target.value);
                }}
              ></input>
              <button
                onClick={() => {
                  updateBook(val.title);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
