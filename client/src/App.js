import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("isLoggedIn")
  );
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [bookList, setBookList] = useState([]);
  const [newSummary, setNewSummary] = useState("");
  const [isbn, setIsbn] = useState("");
  const [added, setAdded] = useState("");
  const [removed, setRemoved] = useState("");
  const [read, setRead] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getBooks").then((response) => {
      setBookList(response.data);
    });
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const newBook = () => {
    Axios.post("http://localhost:3001/api/newBook", {
      title: title,
      author: author,
      summary: summary,
      isbn: isbn,
      added: added,
    });

    setBookList([...bookList, { title: title, author: author }]);
  };

  const deleteBook = (title_delete) => {
    Axios.delete(`http://localhost:3001/api/deleteBook/${title_delete}`);
    setBookList(bookList.filter((book) => book.title !== title_delete));
  };

  const updateBook = (title) => {
    Axios.put(`http://localhost:3001/api/updateBook`, {
      title: title,
      summary: newSummary,
    }).then(() => {
      Axios.get("http://localhost:3001/api/getBooks").then((response) => {
        setBookList(response.data);
      });
      setNewSummary("");
    });
  };

  const reset = () => {
    setTitle("");
    setAuthor("");
    setSummary("");
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
        <label>ISBN Code</label>
        <input
          type="text"
          name="summary"
          value={isbn}
          onChange={(e) => {
            setIsbn(e.target.value);
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
        <button onClick={handleLogout}>Logout</button>
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
                  setNewSummary(e.target.value);
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
