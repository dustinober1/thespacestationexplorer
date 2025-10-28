const express = require('express');
const cors = require('cors');
const planetRoutes = require('./routes/planets');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/planets', planetRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Space Station Explorer API' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
