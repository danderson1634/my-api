const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://danderson1_db_user:password@eventspace.rbikpvz.mongodb.net/?appName=eventspace')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Form submission endpoint
app.post('/submit-form', (req, res) => {
  console.log('📩 Form received:', req.body);

  res.json({
    message: 'Form received successfully',
    data: req.body
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
