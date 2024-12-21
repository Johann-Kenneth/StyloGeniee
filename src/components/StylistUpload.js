import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StylistUpload = () => {
  const [file, setFile] = useState(null);
  const [occasion, setOccasion] = useState("casual");
  const [recommendations, setRecommendations] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const navigate = useNavigate(); // Initialize navigate
  const [token] = useState(localStorage.getItem('token') || ''); // Get token from local storage

  // Effect to load recommendations and image from local storage
  useEffect(() => {
    const savedRecommendations = localStorage.getItem('recommendations');
    const savedImage = localStorage.getItem('uploadedImage');

    if (savedRecommendations) {
      setRecommendations(JSON.parse(savedRecommendations));
    }

    if (savedImage) {
      setImagePreview(savedImage);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    // Create a preview of the selected image
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('occasion', occasion);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      
      setRecommendations(response.data); // Set recommendations from response
      
      // Store recommendations in local storage
      localStorage.setItem('recommendations', JSON.stringify(response.data));

      // Store the uploaded image preview in local storage
      localStorage.setItem('uploadedImage', URL.createObjectURL(file)); // Store the uploaded image preview
      
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSave = async () => {
    if (!recommendations || !file) return; // Ensure there are recommendations and a file to save

    const formData = new FormData(); // Use FormData to include the file
    formData.append('file', file); // Append the image file
    formData.append('recommendation', JSON.stringify(recommendations.recommendations)); // Append recommendations as string
    formData.append('occasion', occasion); // Append occasion

    try {
      const response = await axios.post('http://localhost:8080/upload/save', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          Authorization: `Bearer ${token}` // Set the content type with token
        },
      });
      console.log(response.data);
      alert('Recommendations and image saved successfully!'); // Alert on success

      // Store the recommendations in local storage after saving
      localStorage.setItem('recommendations', JSON.stringify(recommendations));
      
    } catch (error) {
      console.error("Error saving recommendation:", error);
      alert('Failed to save recommendations and image.'); // Alert on failure
    }
  };

  const handleNavigateToUpload = () => {
    navigate('/upload'); // Navigate to Upload page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <h2>AI Personal Stylist</h2>
        <p>Upload an image to receive styling recommendations based on your body shape and skin tone.</p>
        
        <input type="file" onChange={handleFileChange} />
        <select value={occasion} onChange={handleOccasionChange}>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
        </select>
        <button onClick={handleUpload}>Get Recommendations</button>

        {recommendations && (
          <div style={{ marginTop: '20px' }}>
            <h3>Styling Recommendations</h3>
            <p><strong>Skin Tone:</strong> {recommendations.skin_tone}</p>
            <p><strong>Body Shape:</strong> {recommendations.body_shape}</p>
            <ul>
              {recommendations.recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Button to save recommendations and uploaded image */}
        <button onClick={handleSave} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Save Recommendations
        </button>

        {/* Button to navigate to Upload page */}
        <button onClick={handleNavigateToUpload} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Go to Upload
        </button>
      </div>

      {/* Image Preview Section */}
      {imagePreview && (
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h3>Uploaded Image</h3>
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
};

export default StylistUpload;
