import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Logging in...", { username, password });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" className="login-button" onClick={handleLogin}>
          Login
        </button>
      </form>

      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 100px;
        }

        h2 {
          margin-bottom: 20px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: #333;
        }

        input {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .login-button {
          background-color: #3498db;
          color: #fff;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Login;
