const express = require('express');
const router = express.Router();
const planetsData = require('../data/planets');

// Validate planet ID format
const validatePlanetId = (req, res, next) => {
  const id = req.params.id;
  // Only allow alphanumeric characters, hyphens, and underscores
  if (!id || !/^[a-z0-9_-]+$/i.test(id)) {
    return res.status(400).json({ message: 'Invalid planet ID format' });
  }
  next();
};

// Get all planets
router.get('/', (req, res) => {
  try {
    res.json(planetsData);
  } catch (error) {
    console.error('Error retrieving planets:', error);
    res.status(500).json({ message: 'Error retrieving planets' });
  }
});

// Get single planet by id
router.get('/:id', validatePlanetId, (req, res) => {
  try {
    const planet = planetsData.find(p => p.id === req.params.id);
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    res.json(planet);
  } catch (error) {
    console.error('Error retrieving planet:', error);
    res.status(500).json({ message: 'Error retrieving planet' });
  }
});

module.exports = router;
