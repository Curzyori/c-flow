// backend/services/audioScanner.js
const fs = require('fs');
const scanMusicLibrary = async () => {
    // Using CDN for guaranteed stability on Vercel (v4)
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
