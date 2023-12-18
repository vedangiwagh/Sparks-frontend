// src/components/Login.js
import React, { useState, useEffect } from 'react';
import '../styles/MealPlan.css';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/login/${email}/${password}`);

      if (response.ok) {
//        const data = await response.json();
        const username = await response.text(); // Assuming the response is a plain text string
              // Redirect to home page with the username
              console.log(username)

              if (username === 'Not Found') {
                        // If the server returns 'Not Found' as the username
                        setErrorMessage('User not found. Please check your credentials.');
                      } else {
                        // Redirect to home page with the username
//                        navigate(`/home/${username}`);
window.alert(`Welcome, ${username}!`);
        // Update the username in the context

        // Navigate to home page
        navigate(`/home`);
                      }
      } else {
        // Handle non-200 status codes
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Login;
