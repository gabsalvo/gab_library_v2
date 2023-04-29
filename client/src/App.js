import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Login from "./Login";
import AddBookPopup from "./AddBookPopup";

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
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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

  const newBook = (book) => {
    Axios.post("http://localhost:3001/api/newBook", book);

    setBookList([...bookList, book]);
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
    setIsbn("");
  };

  const count_books = () => {
    return bookList.length;
  };

  return (
    <div className="App">
      <h1>Gab Library</h1>
      <AddBookPopup
        onSubmit={(book) => newBook(book)}
        onClose={() => setIsPopupVisible(false)}
        isVisible={isPopupVisible}
      />
      <button onClick={() => setIsPopupVisible(true)}>New</button>
      <div className="book-list">
        {bookList.map((val) => {
          return (
            <div key={val.title} className="card">
              <h1>{val.title}</h1>
              <p>{val.author}</p>

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
        <button onClick={handleLogout}>Logout</button>
        <h2>Books in my library: {count_books()}</h2>
      </div>
    </div>
  );
}

export default App;
