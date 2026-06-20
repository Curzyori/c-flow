import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPlayer = () => {
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    
    const tracksRef = useRef(tracks);
    const currentTrackRef = useRef(currentTrack);
    const audioRef = useRef(null);

    useEffect(() => {
        tracksRef.current = tracks;
    }, [tracks]);

    useEffect(() => {
        currentTrackRef.current = currentTrack;
    }, [currentTrack]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch Tracks with v4 cache buster
                const trackRes = await axios.get(`/api/tracks?v=4&t=${Date.now()}`);
                if (trackRes.data.success) {
                    setTracks(trackRes.data.tracks);
                    if (trackRes.data.tracks.length > 0) {
                        setCurrentTrack(trackRes.data.tracks[0]);
                    }
                }
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.error("Playback failed:", e);
                        setIsPlaying(false);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Playback failed on track change:", e));
            }
        }
    }, [currentTrack]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            const currentTime = audioRef.current.currentTime;
            if (duration) {
                setProgress((currentTime / duration) * 100);
            }
        }
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const playTrack = async (track) => {
        if (currentTrack?.id === track.id) {
            togglePlay();
            return;
        }
        setCurrentTrack(track);
        setIsPlaying(true);
        
        try {
            await axios.post('/api/streak/update');
        } catch (error) {
            console.error('Error updating streak:', error);
        }
    };

    const skipTrack = (direction = 'forward') => {
        const currentTracks = tracksRef.current;
        const currentT = currentTrackRef.current;
        if (currentTracks.length === 0) return;

        const currentIndex = currentTracks.findIndex(t => t.id === currentT?.id);
        let nextIndex;

        if (direction === 'forward') {
            nextIndex = (currentIndex + 1) % currentTracks.length;
        } else {
            nextIndex = (currentIndex - 1 + currentTracks.length) % currentTracks.length;
        }

        setCurrentTrack(currentTracks[nextIndex]);
        setIsPlaying(true);
    };

    const formatTime = (seconds) => {
        if (!seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="max-w-6xl mx-auto w-full p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative"
                    >
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-curzy-neon/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-full aspect-square bg-white/5 rounded-2xl mb-8 flex items-center justify-center border border-white/5 overflow-hidden">
                                {isPlaying ? (
                                    <div className="flex items-end space-x-1 h-32">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [20, 80, 40, 100, 20] }}
                                                transition={{ repeat: Infinity, duration: 1 + Math.random(), ease: "easeInOut" }}
                                                className="w-2 bg-curzy-neon rounded-full"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <Music size={80} className="text-white/20" />
                                )}
                            </div>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white truncate w-full px-4">{currentTrack?.title || 'No track selected'}</h2>
                                <p className="text-curzy-neon font-medium mt-1">{currentTrack?.artist || 'Select a song'}</p>
                            </div>
                            <div className="w-full mb-8 space-y-2">
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-curzy-neon" style={{ width: `${progress}%` }} />
                                </div>
                                <div className="flex justify-between text-xs text-white/40">
                                    <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
                                    <span>{currentTrack ? formatTime(currentTrack.duration) : '0:00'}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-8">
                                <button onClick={() => skipTrack('backward')} className="p-2 text-white/60 hover:text-white"><SkipBack size={32} /></button>
                                <button onClick={togglePlay} className="w-16 h-16 bg-curzy-neon rounded-full flex items-center justify-center text-black shadow-lg shadow-curzy-neon/20 hover:scale-105 active:scale-95 transition-all">
                                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                                </button>
                                <button onClick={() => skipTrack('forward')} className="p-2 text-white/60 hover:text-white"><SkipForward size={32} /></button>
                            </div>
                        </div>
                        <audio ref={audioRef} src={currentTrack ? currentTrack.url : ''} onTimeUpdate={handleTimeUpdate} onEnded={() => skipTrack('forward')} />
                    </motion.div>
                </div>
                <div className="lg:col-span-2">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 h-full shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Volume2 className="text-curzy-neon" />
                                C Flow Library v4
                            </h3>
                            <span className="text-white/40 text-sm">{tracks.length} Tracks</span>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 max-h-[500px] pr-2">
                            {tracks.map((track) => (
                                <button key={track.id} onClick={() => playTrack(track)} className={`w-full flex items-center p-4 rounded-2xl transition-all group ${currentTrack?.id === track.id ? 'bg-curzy-neon/10 border border-curzy-neon/20' : 'hover:bg-white/5 border border-transparent'}`}>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all ${currentTrack?.id === track.id ? 'bg-curzy-neon text-black' : 'bg-white/5 text-white/40 group-hover:bg-curzy-neon/20 group-hover:text-curzy-neon'}`}>
                                        {currentTrack?.id === track.id && isPlaying ? (
                                            <div className="flex items-end space-x-0.5 h-4">
                                                <div className="w-1 bg-current h-2 animate-[bounce_1s_infinite]" />
                                                <div className="w-1 bg-current h-4 animate-[bounce_0.8s_infinite]" />
                                                <div className="w-1 bg-current h-3 animate-[bounce_1.2s_infinite]" />
                                            </div>
                                        ) : <Music size={20} />}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className={`font-semibold truncate ${currentTrack?.id === track.id ? 'text-curzy-neon' : 'text-white'}`}>{track.title}</h4>
                                        <p className="text-sm text-white/40 truncate">{track.artist}</p>
                                    </div>
                                    <div className="text-sm text-white/20 tabular-nums">{formatTime(track.duration)}</div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
