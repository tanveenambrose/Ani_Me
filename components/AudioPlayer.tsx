'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [isMorphing, setIsMorphing] = useState(false);
    const [scrollState, setScrollState] = useState<'hero' | 'about'>('hero');
    const [showScrollPrompt, setShowScrollPrompt] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Increased delay to 4000ms to ensure the preloader is fully gone and hero animation has started
        const timer = setTimeout(() => setIsVisible(true), 4000);

        const morphInterval = setInterval(() => {
            setIsMorphing(true);
            setTimeout(() => setIsMorphing(false), 1000);
        }, 5000);

        const resetIdleTimer = () => {
            setShowScrollPrompt(false);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

            idleTimerRef.current = setTimeout(() => {
                const isStillInHero = window.scrollY < window.innerHeight * 0.3;
                if (isStillInHero) {
                    setShowScrollPrompt(true);
                }
            }, 2000);
        };

        const handleScroll = () => {
            resetIdleTimer();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const rect = aboutSection.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.4) {
                    setScrollState('about');
                } else {
                    setScrollState('hero');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', resetIdleTimer);

        handleScroll();
        resetIdleTimer();

        return () => {
            clearTimeout(timer);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            clearInterval(morphInterval);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', resetIdleTimer);
        };
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.muted = false;
            audio.volume = volume;
            audio.play().catch(err => console.error("Playback failed:", err));
        } else {
            audio.pause();
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        left: scrollState === 'hero' ? '50%' : '5%',
                        // Lowered to the very base to maximize distance from CTA buttons
                        bottom: scrollState === 'hero' ? '25px' : '40px',
                        x: scrollState === 'hero' ? '-50%' : '0%',
                        y: showScrollPrompt && scrollState === 'hero' ? [-5, 5, -5] : 0
                    }}
                    transition={{
                        opacity: { duration: 0.8 },
                        left: { type: 'spring', damping: 22, stiffness: 120 },
                        bottom: { type: 'spring', damping: 22, stiffness: 120 },
                        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="fixed z-[10000] pointer-events-auto flex flex-col items-center"
                    suppressHydrationWarning
                >

                    <motion.div
                        id="audio-player"
                        className="relative flex items-center bg-white/[0.01] backdrop-blur-[60px] border border-white/10 p-1 px-3 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden transition-all duration-500 hover:bg-white/[0.03] hover:border-white/20 modern-ui eye-catching-player scale-90 sm:scale-100"
                        onClick={togglePlay}
                    >
                        <audio
                            ref={audioRef}
                            src="/song.mp3?v=18"
                            loop
                            preload="auto"
                        />

                        {/* Interactive Waveform */}
                        <div className="flex items-center gap-[4px] h-12 relative z-10 py-2">
                            <div className="absolute w-full h-[1px] bg-white/20 top-1/2 -translate-y-1/2" />

                            {[0.7, 1.0, 0.8, 1.0, 0.7, 0.9, 0.6].map((h, i) => (
                                <motion.div
                                    key={i}
                                    className="w-[5px] md:w-2 relative h-full flex items-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                                        if (rect) {
                                            const clickX = e.clientX - rect.left;
                                            setVolume(Math.min(1, Math.max(0, clickX / rect.width)));
                                        }
                                    }}
                                >
                                    <motion.div
                                        className="absolute bottom-[50%] left-0 w-full"
                                        animate={{
                                            height: isPlaying
                                                ? (isMorphing ? "6px" : [6, 24 * h, 12, 20 * h, 6])
                                                : 2,
                                            borderRadius: isMorphing ? "50%" : "999px",
                                            backgroundColor: (i / 7) <= volume ? '#06b6d4' : 'rgba(255,255,255,0.1)',
                                            boxShadow: (i / 7) <= volume && isPlaying ? '0 0 15px #06b6d4' : 'none'
                                        }}
                                        transition={{
                                            duration: isPlaying ? 0.6 : 1.2,
                                            repeat: isMorphing ? 0 : Infinity,
                                            delay: i * 0.05
                                        }}
                                    />
                                    <motion.div
                                        className="absolute top-[50%] left-0 w-full"
                                        animate={{
                                            height: isPlaying
                                                ? (isMorphing ? "6px" : [6, 24 * h, 12, 20 * h, 6])
                                                : 2,
                                            borderRadius: isMorphing ? "50%" : "999px",
                                            backgroundColor: (i / 7) <= volume ? '#06b6d4' : 'rgba(255,255,255,0.1)',
                                            boxShadow: (i / 7) <= volume && isPlaying ? '0 0 15px #06b6d4' : 'none'
                                        }}
                                        transition={{
                                            duration: isPlaying ? 0.6 : 1.2,
                                            repeat: isMorphing ? 0 : Infinity,
                                            delay: i * 0.05
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="absolute inset-y-0 w-8 bg-white/5 blur-xl -skew-x-12"
                            animate={{ left: ['-100%', '200%'] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>

                    {/* Highly Aligned Scroll Prompt */}
                    <AnimatePresence>
                        {showScrollPrompt && scrollState === 'hero' && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="mt-4 flex flex-col items-center gap-1.5"
                            >
                                <div className="w-px h-3 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-500/30" />
                                    <span className="text-[9px] text-cyan-400 font-black uppercase tracking-[0.4em]">Scroll</span>
                                    <div className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-500/30" />
                                </div>
                                <motion.div
                                    animate={{ y: [0, 4, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-4 h-6 border-2 border-cyan-500/20 rounded-full flex justify-center p-0.5"
                                >
                                    <motion.div
                                        animate={{ height: [4, 8, 4], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="w-1 bg-cyan-500 rounded-full"
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
