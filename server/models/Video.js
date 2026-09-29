const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['forms', 'strikes', 'stances', 'conditioning', 'sparring', 'philosophy', 'weapons'],
  },
  skillLevel: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  duration: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: '/images/default-thumbnail.jpg',
  },
  videoUrl: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    default: 'Sifu Mulloy',
  },
  tags: [{
    type: String,
    trim: true,
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Text index for full-text search
videoSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Video', videoSchema);
