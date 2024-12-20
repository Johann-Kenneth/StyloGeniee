const Image = require('../models/Image');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

exports.uploadImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: 'Image upload failed' });
    try {
      const imageData = req.file.buffer.toString('base64');
      const userId = req.user.userId ;
      // Find existing image and update or create if not found
      const image = await Image.findOneAndUpdate(
        { userId },
        { userId, imageData },
        { new: true, upsert: true } // upsert: create new if none exists
      );

      console.log("Updated Image Data:", imageData); // Log for verification
      res.json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error("Image save error:", error); // Log for troubleshooting
      res.status(500).json({ error: 'Image save failed' });
    }
  });
};


exports.getImage = async (req, res) => {
  try {
    const image = await Image.findOne({ userId: req.user.userId });
    if (!image) return res.status(404).json({ error: 'No image found' });
    res.json({ imageData: image.imageData });
  } catch (error) {
    res.status(500).json({ error: 'Image retrieval failed' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
      // Assuming you have some way to identify which image to delete, e.g., by ID
      const { id } = req.user.userId ; // Get ID from request body
      await Image.findByIdAndDelete(id);
      res.json({ message: 'Image deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to delete the image' });
  }
};
