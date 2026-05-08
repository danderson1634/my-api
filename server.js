const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://danderson1_db_user:Mog888tuna^^@eventspace.rbikpvz.mongodb.net/?appName=eventspace')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is working');
});

const formSubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

// Form submission endpoint
app.post('/submit-form', async (req, res) => {
  try {
    console.log('📩 Form received:', req.body);

    const savedSubmission = await FormSubmission.create(req.body);

    res.json({
      message: 'Form saved to MongoDB successfully',
      data: savedSubmission
    });
  } catch (error) {
    console.error('❌ Error saving form:', error);

    res.status(500).json({
      message: 'Error saving form to MongoDB',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
