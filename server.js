require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Import routes
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// View engine
app.set('view engine', 'ejs');

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

// Mongo
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
