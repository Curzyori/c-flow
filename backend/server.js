const path = require('path');
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

// API Routes
const apiRouter = express.Router();
apiRouter.get('/test', (req, res) => res.json({ success: true, message: 'Backend is active v4' }));
apiRouter.use('/status', statusRoutes);
apiRouter.use('/streak', streakRoutes);
apiRouter.use('/', musicRoutes);

app.use('/api', apiRouter);
app.use(apiRouter); // Fallback for direct matches

// Export for Vercel Serverless
module.exports = app;
