const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');

const statusRoutes = require('./routes/status.routes');
const musicRoutes = require('./routes/music.routes');
const streakRoutes = require('./routes/streak.routes');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(express.json());

// Static Assets
// Expose folder music so it can be accessed via URL /music/...
app.use('/music', express.static(path.join(__dirname, '../music')));

// API Routes
app.use('/api/status', statusRoutes);
app.use('/api', musicRoutes);
app.use('/api/streak', streakRoutes);

// Export for Vercel Serverless
module.exports = app;
