import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE_URL = '';

const StreakBadge = () => {
    const [streak, setStreak] = useState(0);

    const fetchStreak = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/streak`);
            if (response.data.success) {
                setStreak(response.data.count);
            }
        } catch (error) {
            console.error('Error fetching streak:', error);
        }
    };

    useEffect(() => {
        fetchStreak();
        // Check streak every minute to handle daily reset without refresh
        const interval = setInterval(fetchStreak, 60000);
        return () => clearInterval(interval);
    }, []);

    if (streak === 0) return null;

    return (
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg transition-all ${
                streak >= 2 
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400 animate-pulse shadow-orange-500/20' 
                : 'bg-white/5 border-white/10 text-white/60'
            }`}
        >
            <Flame size={18} className={streak >= 2 ? 'fill-current' : ''} />
            <span className="text-sm font-bold tracking-tight">
                Streak: {streak} Days
            </span>
        </motion.div>
    );
};

export default StreakBadge;
