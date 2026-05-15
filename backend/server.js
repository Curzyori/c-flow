const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');

const statusRoutes = require('./routes/status.routes');
const musicRoutes = require('./routes/music.routes');
const streakRoutes = require('./routes/streak.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger for Vercel
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Static Assets
const musicPath = path.join(process.cwd(), 'frontend/public/music');
app.use('/music', express.static(musicPath));

// API Routes - Handle both with and without /api prefix
const apiRouter = express.Router();
apiRouter.use('/status', statusRoutes);
apiRouter.use('/streak', streakRoutes);
apiRouter.use('/', musicRoutes);

app.use('/api', apiRouter);
app.use(apiRouter); // Fallback for direct matches

// Export for Vercel Serverless
module.exports = app;
