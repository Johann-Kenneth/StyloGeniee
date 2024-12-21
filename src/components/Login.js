import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/login', { username, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      navigate('/upload');
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  // Function to navigate to the register page
  const goToRegister = () => {
    navigate('/register');
  };

  const styles = {
    container: { 
      maxWidth: '400px', 
      margin: '50px auto', 
      padding: '30px', 
      borderRadius: '8px', 
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', 
      backgroundColor: '#f9f9f9' 
    },
    heading: { 
      textAlign: 'center', 
      color: '#333', 
      marginBottom: '20px' 
    },
    input: { 
      width: '100%', 
      padding: '12px', 
      margin: '10px 0', 
      borderRadius: '4px', 
      border: '1px solid #ddd', 
      transition: 'border-color 0.3s',
    },
    button: { 
      width: '100%', 
      padding: '12px', 
      backgroundColor: '#4caf50', 
      color: 'white', 
      border: 'none', 
      borderRadius: '4px', 
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginBottom: '10px'
    },
    registerButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2196f3',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    registerButtonHover: {
      backgroundColor: '#1976d2'
    },
    buttonHover: {
      backgroundColor: '#45a049'
    },
    message: { 
      color: 'red', 
      textAlign: 'center' 
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={login}>
        <input 
          style={styles.input} 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          style={styles.input} 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button 
          style={styles.button} 
          type="submit" 
          onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Login
        </button>
      </form>
      <button
        style={styles.registerButton}
        onClick={goToRegister}
        onMouseOver={e => e.currentTarget.style.backgroundColor = styles.registerButtonHover.backgroundColor}
        onMouseOut={e => e.currentTarget.style.backgroundColor = styles.registerButton.backgroundColor}
      >
        Register
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default Login;
