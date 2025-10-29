const express = require('express');
const cors = require('cors');
require('dotenv').config();

const planetRoutes = require('./routes/planets');

const app = express();
const PORT = process.env.PORT || 5000;

// Security and performance middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Prevent various attacks
app.disable('x-powered-by');

// Routes
app.use('/api/planets', planetRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Space Station Explorer API' });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error occurred:', error);
  res.status(500).json({ message: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app, server };
