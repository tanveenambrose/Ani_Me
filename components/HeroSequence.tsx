'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameRef = useRef(0);

    const frameCount = 80;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Preload all images
        const loadImages = async () => {
            const imagePromises = [];

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
                img.src = `/hero/protfolio_${i.toString().padStart(3, '0')}.jpg`;
                imagesRef.current[i] = img;
                imagePromises.push(promise);
            }

            try {
                await Promise.all(imagePromises);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Failed to load images:', error);
            }
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const firstImage = imagesRef.current[0];

        // Set canvas size based on first image
        const setCanvasSize = () => {
            const container = containerRef.current;
            if (!container) return;

            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            const imageAspect = firstImage.width / firstImage.height;
            const containerAspect = containerWidth / containerHeight;

            let renderWidth, renderHeight;

            if (containerAspect > imageAspect) {
                renderWidth = containerWidth;
                renderHeight = containerWidth / imageAspect;
            } else {
                renderHeight = containerHeight;
                renderWidth = containerHeight * imageAspect;
            }

            canvas.width = renderWidth;
            canvas.height = renderHeight;

            render();
        };

        const render = () => {
            const frameIndex = Math.min(
                Math.floor(frameRef.current),
                imagesRef.current.length - 1
            );

            context.clearRect(0, 0, canvas.width, canvas.height);

            if (imagesRef.current[frameIndex]) {
                context.drawImage(imagesRef.current[frameIndex], 0, 0, canvas.width, canvas.height);
            }
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Create scroll animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=300%',
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    frameRef.current = self.progress * (frameCount - 1);
                    render();
                },
            },
        });

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            tl.kill();
        };
    }, [imagesLoaded]);

    return (
        <div
            ref={containerRef}
            className="hero-sequence relative w-full h-screen overflow-hidden bg-[#0a0a0f]"
        >
            {/* Hero Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
                    <span className="block opacity-0 hero-line-1">Bringing Your</span>
                    <span className="block opacity-0 hero-line-2">Vision to Life</span>
                    <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text opacity-0 hero-line-3">
                        Through Motion
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 opacity-0 hero-subtitle max-w-2xl">
                    Crafting immersive digital experiences with cutting-edge animations
                </p>
                <div className="flex flex-wrap gap-4 justify-center opacity-0 hero-cta">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform">
                        View Our Work
                    </button>
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-colors">
                        Let's Talk
                    </button>
                </div>
            </div>

            {/* Canvas for image sequence */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-full opacity-70"
                />
            </div>

            {/* Loading indicator */}
            {!imagesLoaded && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0a0a0f]">
                    <div className="text-white text-2xl font-semibold">
                        <div className="animate-pulse">Loading experience...</div>
                    </div>
                </div>
            )}
        </div>
    );
}
