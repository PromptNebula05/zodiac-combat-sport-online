const express = require('express');
const { body, validationResult } = require('express-validator');
const Video = require('../models/Video');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/videos - List all published videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/videos/search?q=keyword - Full-text search videos
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search query required' });
    }

    const videos = await Video.find({
      $text: { $search: q },
      isPublished: true,
    }).sort({ score: { $meta: 'textScore' } });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/videos/filter?level=Beginner&category=forms - Filter videos
router.get('/filter', async (req, res) => {
  try {
    const { level, category } = req.query;
    const filter = { isPublished: true };

    if (level) filter.skillLevel = level;
    if (category) filter.category = category;

    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/videos/categories - Get available categories and levels
router.get('/categories', async (req, res) => {
  try {
    const categories = await Video.distinct('category');
    const levels = await Video.distinct('skillLevel');
    res.json({ categories, levels });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/videos/:id - Get specific video
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/videos - Create new video (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn(['forms', 'strikes', 'stances', 'conditioning', 'sparring', 'philosophy', 'weapons']),
  body('skillLevel').isIn(['Beginner', 'Intermediate', 'Advanced']),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('videoUrl').trim().notEmpty().withMessage('Video URL is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const video = new Video({
      ...req.body,
      uploadedBy: req.user.id,
    });
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/videos/:id - Update video (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/videos/:id - Delete video (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
