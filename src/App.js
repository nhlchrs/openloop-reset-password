import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/reset-password`,
      {
        email,
        password
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY 
        }
      }
    );

    setResponse(response.data);
  } catch (err) {
    setResponse({
      error: err.response?.data || err.message || "Unknown error"
    });
  }
};


  return (
    <div className="container">
      <div className="form-card">
        <h2>Reset-password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Reset</button>
        </form>

        {response && (
          <div className="response-box">
            <h3>Response</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
