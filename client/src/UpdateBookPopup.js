import { useState } from "react";

const UpdateBookPopup = ({ onSubmit, onClose, isVisible }) => {
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [isbn, setIsbn] = useState("");
  const [added, setAdded] = useState("");
  const [times, setTimes] = useState(0)

  const handleSubmit = () => {
    onSubmit({ author, summary, isbn, added, times });
    setAuthor("");
    setSummary("");
    setIsbn("");
    setAdded("");
    setTimes(0);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="popup">
      <div className="popup-content">
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

export default UpdateBookPopup;
