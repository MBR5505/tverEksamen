require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();

// Basic middleware first
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Trust proxy settings
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'http://eksamen.succubus.ikt-fag.no'
        : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['*']
}));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

app.set('view engine', 'ejs');

const userRoutes = require('./routes/userRoutes');

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
