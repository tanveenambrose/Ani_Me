'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
    { src: '/pics/pic1.jpg', title: 'Abstract Logic', category: 'MOTION' },
    { src: '/pics/pic2.jpg', title: 'Future Pulse', category: 'DESIGN' },
    { src: '/pics/pic3.jpg', title: 'Digital Soul', category: 'ART' },
    { src: '/pics/pic4.jpg', title: 'Ethereal Flow', category: 'MOTION' },
    { src: '/pics/pic5.jpg', title: 'Neon Core', category: 'CODE' },
];

export default function FloatingSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-lg aspect-[4/5]">
                <AnimatePresence mode="popLayout">
                    {images.map((img, index) => {
                        const isMain = index === activeIndex;
                        const isNext = index === (activeIndex + 1) % images.length;
                        const isPrev = index === (activeIndex - 1 + images.length) % images.length;

                        if (!isMain && !isNext && !isPrev) return null;

                        return (
                            <motion.div
                                key={img.src}
                                initial={{ opacity: 0, x: 100, scale: 0.8, rotate: 5 }}
                                animate={{
                                    opacity: isMain ? 1 : 0.4,
                                    x: isMain ? 0 : isNext ? 120 : -120,
                                    y: isMain ? 0 : isNext ? 20 : -20,
                                    scale: isMain ? 1 : 0.7,
                                    rotate: isMain ? 0 : isNext ? 10 : -10,
                                    zIndex: isMain ? 30 : 10,
                                    filter: isMain ? 'blur(0px)' : 'blur(4px)',
                                }}
                                exit={{ opacity: 0, x: -100, scale: 0.8, rotate: -5 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 20,
                                }}
                                className="absolute inset-0 cursor-pointer"
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className="group relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-gray-900">
                                    <Image
                                        src={img.src}
                                        alt={img.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        priority={index === 0}
                                    />

                                    {/* Glass Overlay for Main Card */}
                                    {isMain && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black via-black/60 to-transparent"
                                        >
                                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold text-cyan-400 tracking-widest uppercase mb-3 border border-white/5">
                                                {img.category}
                                            </span>
                                            <h4 className="text-3xl font-black text-white mb-1 tracking-tight">
                                                {img.title}
                                            </h4>
                                            <div className="flex gap-1">
                                                {images.map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20'}`}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Floating effect particles */}
                                    <div className="absolute top-10 right-10 w-2 h-2 bg-white/20 rounded-full animate-ping" />
                                    <div className="absolute bottom-20 left-10 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-700" />
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Floating Label */}
            <div className="absolute -right-20 top-1/4 -rotate-90 pointer-events-none opacity-20 hidden lg:block">
                <span className="text-8xl font-black text-white tracking-tighter uppercase select-none">Showcase</span>
            </div>
        </div>
    );
}
