import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Login from "./Login";
import AddBookPopup from "./AddBookPopup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("isLoggedIn")
  );
  const setTitle = useState("");
  const setAuthor = useState("");
  const setSummary = useState("");
  const [bookList, setBookList] = useState([]);
  const [newSummary, setNewSummary] = useState("");
  const setIsbn = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  const count_books = () => {
    return bookList.length;
  };

  return (
    <div className="App">
      <AddBookPopup
        onSubmit={(book) => newBook(book)}
        onClose={() => setIsPopupVisible(false)}
        isVisible={isPopupVisible}
      />
      <div className="container">
        <div className="left-column">
          <h1>Gab Library</h1>
          <button onClick={() => setIsPopupVisible(true)}>New</button>
          <div className="book-list">
            {bookList.map((val) => (
              <div
                key={val.title}
                className="list-item"
                onClick={() => handleBookClick(val)}
              >
                {val.title}
              </div>
            ))}
          </div>
          <h2>Books in my library: {count_books()}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
        {selectedBook && (
          <div className="book-details">
            <h1>{selectedBook.title}</h1>
            <h3>{selectedBook.author}</h3>
            <p>{selectedBook.summary}</p>
            <p>ISBN: {selectedBook.isbn}</p>
            <p>Added: {formatDate(selectedBook.added)}</p>
            <button onClick={() => deleteBook(selectedBook.title)}>
              Delete
            </button>
            <input
              type="text"
              id="editInput"
              onChange={(e) => setNewSummary(e.target.value)}
            ></input>
            <button onClick={() => updateBook(selectedBook.title)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
