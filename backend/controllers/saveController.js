const multer = require('multer');
const Recommendation = require('../models/Recommendation');

// Setup multer to handle memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file'); // Expecting the file field name as 'file'

// Middleware to handle the upload
exports.saveRecommendation = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Image upload error:", err);
      return res.status(500).json({ error: 'Image upload failed' });
    }

    try {
      // Log the entire request body to verify received data
      console.log("Received body:", req.body);

      const userId = req.user.userId; // Correctly fetch userId from the request
      const { recommendation, occasion } = req.body; // Extract recommendation and occasion

      // Handle the uploaded file
      let imageData = null;
      if (req.file) {
        imageData = req.file.buffer.toString('base64'); // Convert image buffer to base64
      }

      // Save or update the recommendation in the database
      const recommendationData = await Recommendation.findOneAndUpdate(
        { userId }, // Use the userId for the query
        { userId, imageData, recommendation, occasion }, // Parse the recommendation string back to JSON
        { new: true, upsert: true } // upsert: create new if none exists
      );

      res.status(200).json({ message: 'Recommendation saved successfully', data: recommendationData });
    } catch (error) {
      console.error("Recommendation save error:", error);
      res.status(500).json({ error: 'Recommendation save failed' });
    }
  });
};
exports.getRecommendation = (req , res) => {
    try {
        const userId = req.user.userId;
        const recommendation =  Recommendation.findOne({ userId });
        if (!recommendation) return res.status(404).json({ message: 'No recommendations found' });
        
        res.json({
          recommendation: recommendation.recommendation, // Assuming this is your saved recommendation structure
          imageData: recommendation.imageData,
        });
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
      }
}
