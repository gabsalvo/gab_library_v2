import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform some authentication logic here, e.g. send a request to a server
    // and check the credentials against a database
    // For simplicity, we'll just hardcode the credentials here
    if (username === "admin" && password === "password") {
      onLogin();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;