import React from "react";

const Footer = ({ bookCount, onLogout }) => {
  return (
    <div className="footer">
      <h2>Books in my library: {bookCount()}</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Footer;