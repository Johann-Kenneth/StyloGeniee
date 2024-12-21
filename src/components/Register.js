import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/register', { username, password });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage('Registration failed');
    }
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
      transition: 'background-color 0.3s'
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
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={register}>
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
        <input 
          style={styles.input} 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        <button 
          style={styles.button} 
          type="submit" 
          onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Register
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default Register;
