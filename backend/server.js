const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');

const statusRoutes = require('./routes/status.routes');
const musicRoutes = require('./routes/music.routes');
const streakRoutes = require('./routes/streak.routes');
const musicStreamRoutes = require('./routes/music_stream.routes');

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
const musicPath = path.join(process.cwd(), 'backend/music');
app.use('/music', express.static(musicPath));

// API Routes - Handle both with and without /api prefix
const apiRouter = express.Router();
apiRouter.get('/test', (req, res) => res.json({ success: true, message: 'Backend is active v2' }));
apiRouter.use('/status', statusRoutes);
apiRouter.use('/streak', streakRoutes);
apiRouter.use('/music', musicStreamRoutes); // Use streaming route
apiRouter.use('/', musicRoutes);

app.use('/api', apiRouter);
app.use(apiRouter); // Fallback for direct matches

// Export for Vercel Serverless
module.exports = app;
