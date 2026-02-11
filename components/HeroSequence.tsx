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
            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight;

            // Get device pixel ratio for high-DPI displays (Retina, 4K, etc.)
            const dpr = window.devicePixelRatio || 1;

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

            // Set canvas display size (CSS pixels)
            canvas.style.width = renderWidth + 'px';
            canvas.style.height = renderHeight + 'px';

            // Set canvas actual size in memory (scaled for high-DPI)
            canvas.width = renderWidth * dpr;
            canvas.height = renderHeight * dpr;

            // Scale the context to ensure correct drawing operations
            context.scale(dpr, dpr);

            render();
        };

        const render = () => {
            const frameIndex = Math.min(
                Math.floor(frameRef.current),
                imagesRef.current.length - 1
            );

            // Get DPR for clearing
            const dpr = window.devicePixelRatio || 1;

            context.clearRect(0, 0, canvas.width, canvas.height);

            // Enable image smoothing for better quality
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';

            if (imagesRef.current[frameIndex]) {
                // Draw at display size (not DPR-scaled size)
                const displayWidth = canvas.width / dpr;
                const displayHeight = canvas.height / dpr;
                context.drawImage(imagesRef.current[frameIndex], 0, 0, displayWidth, displayHeight);
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
            {/* Dark Gradient Overlay for Text Visibility */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-15 pointer-events-none" />

            {/* Hero Text Content - Top Left Corner */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-20 md:pt-24 px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight">
                        {/* Line 1 - Slides from LEFT */}
                        <span
                            className="block opacity-0 hero-line-1 text-white font-extrabold"
                            style={{
                                textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7), 2px 2px 4px rgba(0,0,0,1)',
                            }}
                        >
                            Bringing Your
                        </span>

                        {/* Line 2 - Slides from RIGHT */}
                        <span
                            className="block opacity-0 hero-line-2 text-white font-extrabold"
                            style={{
                                textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7), 2px 2px 4px rgba(0,0,0,1)',
                            }}
                        >
                            Vision to Life
                        </span>

                        {/* Line 3 - Typing Effect with Neon Gradient */}
                        <span
                            className="block opacity-0 hero-line-3 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 text-transparent bg-clip-text font-black relative"
                            style={{
                                filter: 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 50px rgba(147, 51, 234, 0.6))',
                                textShadow: 'none'
                            }}
                        >
                            <span className="typing-text">Through Motion</span>
                        </span>
                    </h1>

                    {/* Subtitle - Fades UP from bottom */}
                    <p
                        className="text-base md:text-lg lg:text-xl text-white opacity-0 hero-subtitle max-w-2xl font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg inline-block"
                        style={{
                            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)'
                        }}
                    >
                        Crafting immersive digital experiences with cutting-edge animations
                    </p>
                </div>
            </div>

            {/* Canvas for image sequence - Full Screen */}
            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* CTA Buttons - Bottom Center */}
            <div className="absolute bottom-0 left-0 right-0 z-20 pb-12 px-4">
                <div className="flex flex-wrap gap-4 justify-center opacity-0 hero-cta">
                    <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)]">
                        View Our Work
                    </button>
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-cyan-400/50 rounded-2xl font-semibold text-lg hover:bg-cyan-500/20 hover:border-cyan-300 transition-all shadow-lg">
                        Let's Talk
                    </button>
                </div>
            </div>

            {/* Custom Preloader */}
            {!imagesLoaded && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] preloader-overlay">
                    {/* Animated particles background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="particle particle-1"></div>
                        <div className="particle particle-2"></div>
                        <div className="particle particle-3"></div>
                        <div className="particle particle-4"></div>
                        <div className="particle particle-5"></div>
                    </div>

                    {/* Preloader content */}
                    <div className="relative z-10 text-center px-6">
                        {/* Greeting text */}
                        <div className="mb-8">
                            <h2
                                className="text-2xl md:text-3xl font-light text-white mb-3 preloader-greeting"
                                style={{
                                    textShadow: '0 0 20px rgba(255,255,255,0.3)'
                                }}
                            >
                                Hey it's me -
                            </h2>
                            <h1
                                className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text preloader-name"
                                style={{
                                    filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.6)) drop-shadow(0 0 60px rgba(147, 51, 234, 0.4))',
                                    animation: 'gradient-shift 3s ease infinite'
                                }}
                            >
                                Tanveen Ambrose
                            </h1>
                        </div>

                        {/* Animated loading bar */}
                        <div className="relative w-64 md:w-96 mx-auto mb-6">
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full loading-bar"
                                    style={{
                                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(147, 51, 234, 0.6)'
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Loading text */}
                        <p className="text-sm md:text-base text-cyan-200/60 font-light tracking-widest preloader-status">
                            LOADING EXPERIENCE
                            <span className="loading-dots">
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
