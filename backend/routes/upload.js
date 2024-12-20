const express = require('express');
const { uploadImage, getImage, deleteImage, } = require('../controllers/uploadController');
const { authenticate } = require('../middleware/authMiddleware');
const { saveRecommendation, getRecommendation } = require('../controllers/saveController');
const router = express.Router();
router.post('/upload', authenticate, uploadImage);
router.get('/image', authenticate, getImage);
router.delete('/image', authenticate, deleteImage)
router.post('/save',authenticate, saveRecommendation )
router.get('/recommendation', authenticate, getRecommendation);

module.exports = router;
