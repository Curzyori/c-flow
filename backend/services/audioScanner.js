// backend/services/audioScanner.js
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

const MUSIC_DIR = path.join(process.cwd(), 'music');

// Ensure the directory exists (might fail on Vercel, but we handle it)
try {
    if (!fs.existsSync(MUSIC_DIR)) {
        fs.mkdirSync(MUSIC_DIR, { recursive: true });
    }
} catch (e) {}

const scanMusicLibrary = async () => {
    try {
        let tracks = [];
        if (fs.existsSync(MUSIC_DIR)) {
            const files = fs.readdirSync(MUSIC_DIR).filter(file => file.endsWith('.mp3'));
            
            tracks = await Promise.all(files.map(async (file) => {
                const filePath = path.join(MUSIC_DIR, file);
                const metadata = await mm.parseFile(filePath);
                
                return {
                    id: file,
                    fileName: file,
                    title: metadata.common.title || file.replace('.mp3', ''),
                    artist: metadata.common.artist || 'Unknown Artist',
                    duration: metadata.format.duration,
                    url: `/music/${file}`
                };
            }));
        }
        
        // If no tracks found, provide dummy data for Vercel demonstration
        if (tracks.length === 0) {
            return [
                {
                    id: 'dummy-1',
                    fileName: 'dummy1.mp3',
                    title: 'Vercel Static Demo',
                    artist: 'Cloud Symphony',
                    duration: 180,
                    url: '#'
                },
                {
                    id: 'dummy-2',
                    fileName: 'dummy2.mp3',
                    title: 'Memory API Track',
                    artist: 'Serverless Echo',
                    duration: 240,
                    url: '#'
                }
            ];
        }
        
        return tracks;
    } catch (error) {
        console.error('Error scanning music library:', error);
        return [];
    }
};

module.exports = { scanMusicLibrary };
