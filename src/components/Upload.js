import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = ({ handleLogout }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [message, setMessage] = useState('');
  const [token] = useState(localStorage.getItem('token') || '');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();

  const handleNavigateToStylist = () => {
    navigate('/stylist/upload');
  };

  useEffect(() => {
    if (!token) {
      setMessage("No token found, please login again.");
      return;
    }

    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:8080/upload/image', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.imageData) {
          setUploadedImage(`data:image/jpeg;base64,${response.data.imageData}`);
        }
      } catch (error) {
        console.error('Failed to retrieve image');
      }
    };

    fetchImage();
  }, [token]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/upload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setUploadedImage(URL.createObjectURL(selectedFile));
    } catch (error) {
      setMessage('Image upload failed');
      console.error('Upload error', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:8080/upload/image', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message || 'Image deleted successfully');
      setUploadedImage(null);
    } catch (error) {
      setMessage('Failed to delete image');
      console.error('Delete error', error);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatHistory([...chatHistory, { sender: 'user', text: chatInput }]);

    try {
      const response = await axios.post('http://localhost:8080/chatbot/chat', { message: chatInput });
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'bot', text: response.data.reply },
      ]);
    } catch (error) {
      console.error('Chatbot error:', error);
    }

    setChatInput('');
  };

  const styles = {
    container: { maxWidth: '600px', margin: '50px auto', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', backgroundColor: '#fdfdfd', textAlign: 'center' },
    chatContainer: { border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginTop: '20px', maxHeight: '300px', overflowY: 'auto' },
    chatMessage: { margin: '5px 0', padding: '8px', borderRadius: '8px', textAlign: 'left', backgroundColor: '#e0e0e0' },
    userMessage: { backgroundColor: '#4caf50', color: '#fff' },
    inputContainer: { display: 'flex', marginTop: '10px' },
    input: { flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' },
    submitButton: { padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Image</h2>
      <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: '#f44336', marginBottom: '10px' }}>Logout</button>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit" style={styles.submitButton}>Upload</button>
      </form>
      {message && <p>{message}</p>}
      {uploadedImage && (
        <div>
          <img src={uploadedImage} alt="Uploaded" style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', marginTop: '20px' }} />
          <button onClick={handleDelete} style={{ ...styles.button, backgroundColor: '#f44336', margin: '10px' }}>Delete</button>
        </div>
      )}
      <button onClick={handleNavigateToStylist} style={{ ...styles.button, backgroundColor: '#007bff', marginTop: '10px' }}>Go to Stylist Upload</button>

      {/* Chatbot UI */}
      <div style={styles.chatContainer}>
        {chatHistory.map((msg, index) => (
          <div key={index} style={{ ...styles.chatMessage, ...(msg.sender === 'user' ? styles.userMessage : {}) }}>
            {msg.sender === 'user' ? 'You: ' : 'Bot: '}
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleChatSubmit} style={styles.inputContainer}>
        <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask for outfit suggestions..." style={styles.input} />
        <button type="submit" style={styles.submitButton}>Send</button>
      </form>
    </div>
  );
};

export default Upload;
