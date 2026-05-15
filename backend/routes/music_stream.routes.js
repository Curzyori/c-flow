const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    // __dirname is backend/routes/
    const filePath = path.join(__dirname, '../music', filename);

    if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size,
            'Accept-Ranges': 'bytes'
        });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    } else {
        console.error(`File not found: ${filePath}`);
        try {
            const currentDir = __dirname;
            console.log('--- Vercel FS Debug ---');
            console.log('__dirname:', currentDir);
            console.log('Files in __dirname:', fs.readdirSync(currentDir));
            const parentDir = path.join(currentDir, '..');
            console.log('Parent dir:', parentDir);
            console.log('Files in parent:', fs.readdirSync(parentDir));
            const musicDir = path.join(parentDir, 'music');
            if (fs.existsSync(musicDir)) {
                console.log('Files in music:', fs.readdirSync(musicDir));
            } else {
                console.log('Music dir does not exist at:', musicDir);
            }
            console.log('-----------------------');
        } catch (e) {
            console.error('Debug failed:', e.message);
        }
        res.status(404).send('File not found');
    }
});

module.exports = router;
