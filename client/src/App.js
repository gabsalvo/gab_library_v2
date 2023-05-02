import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Login from "./Login";
import AddBookPopup from "./AddBookPopup";
import UpdateBookPopup from "./UpdateBookPopup";
import SingleUpdatePopup from "./SingleUpdatePopup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("isLoggedIn")
  );
  const [bookList, setBookList] = useState([]);
  const [isPopupVisibleAdd, setIsPopupVisibleAdd] = useState(false);
  const [isPopupVisibleUpdate, setIsPopupVisibleUpdate] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedUpdateField, setSelectedUpdateField] = useState(null);
  const [isPopupVisibleSingleUpdate, setIsPopupVisibleSingleUpdate] =
    useState(false);
  const [singleUpdateValue, setSingleUpdateValue] = useState("");

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

  const handleUpdateFieldChange = (event) => {
    setSelectedUpdateField(event.target.value);
  };

  const updateSingleField = () => {
    Axios.put(`${apiBaseUrl}/api/updateSingleField`, {
      title: selectedBook.title,
      field: selectedUpdateField,
      value: singleUpdateValue,
    }).then(() => {
      Axios.get(`${apiBaseUrl}/api/getBooks`).then((response) => {
        setBookList(response.data);
      });
    });

    setIsPopupVisibleSingleUpdate(false);
  };
  
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

  useEffect(() => {
    Axios.get(`${apiBaseUrl}/api/getBooks`).then((response) => {
      setBookList(response.data);
    });
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const newBook = (book) => {
    Axios.post(`${apiBaseUrl}/api/newBook`, book);

    setBookList([...bookList, book]);
  };

  const deleteBook = (title_delete) => {
    Axios.delete(`${apiBaseUrl}/api/deleteBook/${title_delete}`);
    setBookList(bookList.filter((book) => book.title !== title_delete));
  };

  const updateBook = (title, updatedBook) => {
    Axios.put(`${apiBaseUrl}/api/updateBook`, {
      title: title,
      author: updatedBook.author,
      summary: updatedBook.summary,
      isbn: updatedBook.isbn,
      added: updatedBook.added,
      times: parseInt(updatedBook.times, 10),
    }).then(() => {
      Axios.get(`${apiBaseUrl}/api/getBooks`).then((response) => {
        setBookList(response.data);
      });
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const count_books = () => {
    return bookList.length;
  };

  return (
    <div className="App">
      <AddBookPopup
        onSubmit={(book) => newBook(book)}
        onClose={() => setIsPopupVisibleAdd(false)}
        isVisible={isPopupVisibleAdd}
      />
      <UpdateBookPopup
        onSubmit={(updatedBook) => updateBook(selectedBook.title, updatedBook)}
        onClose={() => setIsPopupVisibleUpdate(false)}
        isVisible={isPopupVisibleUpdate}
      />
      {isPopupVisibleSingleUpdate && (
        <SingleUpdatePopup
          selectedUpdateField={selectedUpdateField}
          singleUpdateValue={singleUpdateValue}
          setSingleUpdateValue={setSingleUpdateValue}
          updateSingleField={updateSingleField}
          setIsPopupVisibleSingleUpdate={setIsPopupVisibleSingleUpdate}
        />
      )}
      <div className="container">
        <div className="left-column">
          <h1 class="gab_pointer" onClick={() => setSelectedBook(null)}>
            Gab Library
          </h1>
          <button
            className="app-button"
            onClick={() => setIsPopupVisibleAdd(true)}
          >
            New
          </button>
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
          <div className="bottom-controls">
            <h2>Books owned: {count_books()}</h2>
            <button className="app-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        {selectedBook && (
          <div className="book-details">
            <h1>{selectedBook.title}</h1>
            <h3>{selectedBook.author}</h3>
            <p>{selectedBook.summary}</p>
            <p>ISBN: {selectedBook.isbn}</p>
            <p>Added: {formatDate(selectedBook.added)}</p>
            <p>I've Read this book {selectedBook.times} time(s)</p>
            <button
              className="app-button app-button-margin-right"
              onClick={() => deleteBook(selectedBook.title)}
            >
              Delete
            </button>
            <select
              className="dropdown"
              onChange={handleUpdateFieldChange}
              value={selectedUpdateField}
            >
              <option value="">Select field to update</option>
              <option value="all">All</option>
              <option value="author">Author</option>
              <option value="summary">Summary</option>
              <option value="isbn">ISBN</option>
              <option value="times">Times</option>
            </select>
            <button
              className="app-button"
              onClick={() => {
                if (selectedUpdateField === "all") {
                  setIsPopupVisibleUpdate(true);
                } else if (selectedUpdateField) {
                  setIsPopupVisibleSingleUpdate(true);
                }
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
