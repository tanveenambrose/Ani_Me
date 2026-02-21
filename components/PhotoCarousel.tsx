'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

const images = [
    '/pics/pic1.jpg',
    '/pics/pic2.jpg',
    '/pics/pic3.jpg',
    '/pics/pic4.jpg',
    '/pics/pic5.jpg',
];

export default function PhotoCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center perspective-[1500px] py-20 overflow-visible">
            <motion.div
                style={{ rotateY: rotate }}
                className="relative w-72 h-[400px] transform-style-3d cursor-grab active:cursor-grabbing"
            >
                {images.map((src, index) => {
                    const angle = (index / images.length) * 360;
                    return (
                        <motion.div
                            key={index}
                            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl backface-hidden"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(400px)`,
                                transformStyle: 'preserve-3d'
                            }}
                            whileHover={{
                                scale: 1.1,
                                filter: 'brightness(1.2)',
                                zIndex: 50
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={src}
                                    alt={`Showcase ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <div className="w-8 h-1 bg-purple-500 rounded-full mb-2" />
                                    <span className="text-white font-bold text-xs uppercase tracking-widest">
                                        Frame {index + 1}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Ambient Lighting */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none blur-3xl" />
        </div>
    );
}
