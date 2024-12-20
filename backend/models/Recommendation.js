const mongoose = require('mongoose');
const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageData: { type: String, required: true },
  recommendation: { type: String, required: true},
  occasion: { type: String, required: true},
});
module.exports = mongoose.model('Recommendation', recommendationSchema);
