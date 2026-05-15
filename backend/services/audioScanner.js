// backend/services/audioScanner.js
const fs = require('fs');
const path = require('path');

const scanMusicLibrary = async () => {
    // Hardcoded tracks for Vercel stability
    // These files are located in frontend/public/music/ and served at /music/
    return [
        {
            id: 'love-me-not',
            fileName: 'Love Me Not - Ravyn Lenae.mp3',
            title: 'Love Me Not',
            artist: 'Ravyn Lenae',
            duration: 218,
            url: '/music/Love Me Not - Ravyn Lenae.mp3'
        },
        {
            id: 'to-the-bone',
            fileName: 'To The Bone - Pamungkas.mp3',
            title: 'To The Bone',
            artist: 'Pamungkas',
            duration: 353,
            url: '/music/To The Bone - Pamungkas.mp3'
        }
    ];
};

module.exports = { scanMusicLibrary };
