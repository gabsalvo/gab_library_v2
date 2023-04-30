import { useState } from "react";

const AddBookPopup = ({ onSubmit, onClose, isVisible }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [isbn, setIsbn] = useState("");
  const [times, setTimes] = useState(0);

  const handleSubmit = () => {
    onSubmit({ title, author, summary, isbn, times });
    setTitle("");
    setAuthor("");
    setSummary("");
    setIsbn("");
    setTimes(0); // Update this line
    onClose();
};
  if (!isVisible) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <label>Book Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Summary</label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <label>ISBN Code</label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
         <label>Many Times Read</label>
        <input
          type="number"
          value={times}
          onChange={(e) => setTimes(e.target.value)}
        />
        <button
          className="app-button app-button-margin-right"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button className="app-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddBookPopup;
