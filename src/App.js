import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Upload from './components/Upload';
import StylistUpload from './components/StylistUpload';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div>
        <h1>Image Upload App</h1>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/upload" /> : <Login setToken={handleLogin} />}
          />
          <Route
            path="/upload"
            element={token ? <Upload token={token} handleLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/stylist/upload" 
                 element={<StylistUpload handleLogout={handleLogout} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
