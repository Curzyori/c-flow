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
const musicPath = path.join(process.cwd(), 'music');
console.log(`Checking music directory at: ${musicPath}`);
try {
    if (fs.existsSync(musicPath)) {
        console.log(`Music directory exists. Files: ${fs.readdirSync(musicPath).join(', ')}`);
    } else {
        console.log('Music directory DOES NOT exist');
    }
} catch (e) {
    console.log(`Error reading music dir: ${e.message}`);
}
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
