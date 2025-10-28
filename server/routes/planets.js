const express = require('express');
const router = express.Router();
const planetsData = require('../data/planets');

// Get all planets
router.get('/', (req, res) => {
  res.json(planetsData);
});

// Get single planet by id
router.get('/:id', (req, res) => {
  const planet = planetsData.find(p => p.id === req.params.id);
  if (!planet) {
    return res.status(404).json({ message: 'Planet not found' });
  }
  res.json(planet);
});

module.exports = router;
