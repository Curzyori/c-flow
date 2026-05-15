const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/streak.json');

const getWIBDate = () => {
    // WIB is UTC+7
    const now = new Date();
    const wibOffset = 7 * 60 * 60 * 1000;
    const wibDate = new Date(now.getTime() + wibOffset);
    return wibDate.toISOString().split('T')[0];
};

const getYesterdayWIBDate = (todayStr) => {
    const today = new Date(todayStr);
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    return yesterday.toISOString().split('T')[0];
};

// In-memory data storage (resets on serverless cold start)
let memoryStreakData = { count: 0, lastPlayedDate: null };

const readStreakData = () => {
    return memoryStreakData;
};

const saveStreakData = (data) => {
    memoryStreakData = data;
};

const updateStreak = async () => {
    const today = getWIBDate();
    let data = readStreakData();

    if (data.lastPlayedDate === today) {
        return data;
    }

    const yesterday = getYesterdayWIBDate(today);

    if (data.lastPlayedDate === yesterday) {
        data.count += 1;
    } else {
        data.count = 1;
    }

    data.lastPlayedDate = today;
    saveStreakData(data);
    return data;
};

const getStreak = () => {
    const today = getWIBDate();
    let data = readStreakData();
    
    // Check if streak was broken (missed yesterday)
    if (data.lastPlayedDate && data.lastPlayedDate !== today) {
        const yesterday = getYesterdayWIBDate(today);
        if (data.lastPlayedDate !== yesterday) {
            data.count = 0; // Streak broken
            // We don't necessarily save here, wait for updateStreak
        }
    }
    
    return data;
};

module.exports = { updateStreak, getStreak };
