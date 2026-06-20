// backend/services/audioScanner.js
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

const MUSIC_DIR = path.join(process.cwd(), 'frontend/public/music');

// Ensure the directory exists (might fail on Vercel, but we handle it)
try {
    if (!fs.existsSync(MUSIC_DIR)) {
        fs.mkdirSync(MUSIC_DIR, { recursive: true });
    }
} catch (e) {}

const scanMusicLibrary = async () => {
    // Hardcoded tracks for Vercel stability
    // These files are located in frontend/public/music/ and served at /music/
    return [
        {
            id: 'love_me_not',
            fileName: 'love_me_not.mp3',
            title: 'Love Me Not',
            artist: 'Ravyn Lenae',
            duration: 218,
            url: 'https://cdn.jsdelivr.net/gh/Curzyori/C-Flow-4@vercel/frontend/public/audio/love_me_not.mp3'
        },
        {
            id: 'to_the_bone',
            fileName: 'to_the_bone.mp3',
            title: 'To The Bone',
            artist: 'Pamungkas',
            duration: 353,
            url: 'https://cdn.jsdelivr.net/gh/Curzyori/C-Flow-4@vercel/frontend/public/audio/to_the_bone.mp3'
        }
    ];
};

module.exports = { scanMusicLibrary };
