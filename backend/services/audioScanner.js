// backend/services/audioScanner.js
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

const MUSIC_DIR = path.join(__dirname, '../../music');

// Ensure the directory exists
if (!fs.existsSync(MUSIC_DIR)) {
    fs.mkdirSync(MUSIC_DIR, { recursive: true });
}

const scanMusicLibrary = async () => {
    try {
        if (!fs.existsSync(MUSIC_DIR)) {
            return [];
        }
        const files = fs.readdirSync(MUSIC_DIR).filter(file => file.endsWith('.mp3'));
        
        const tracks = await Promise.all(files.map(async (file) => {
            const filePath = path.join(MUSIC_DIR, file);
            const metadata = await mm.parseFile(filePath);
            
            return {
                id: file,
                fileName: file,
                title: metadata.common.title || file.replace('.mp3', ''),
                artist: metadata.common.artist || 'Unknown Artist',
                duration: metadata.format.duration,
                url: `/music/${file}` // Path for frontend access
            };
        }));
        
        return tracks;
    } catch (error) {
        console.error('Error scanning music library:', error);
        return [];
    }
};

module.exports = { scanMusicLibrary };
