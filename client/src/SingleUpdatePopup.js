import React from "react";

const SingleUpdatePopup = ({
  selectedUpdateField,
  singleUpdateValue,
  setSingleUpdateValue,
  updateSingleField,
  setIsPopupVisibleSingleUpdate,
}) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <label>Update {selectedUpdateField}</label>
        <input
          type={selectedUpdateField === "times" ? "number" : "text"}
          value={singleUpdateValue}
          onChange={(e) => setSingleUpdateValue(e.target.value)}
        />
        <button
          className="app-button app-button-margin-right"
          onClick={updateSingleField}
        >
          Submit
        </button>
        <button
          className="app-button"
          onClick={() => setIsPopupVisibleSingleUpdate(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SingleUpdatePopup;