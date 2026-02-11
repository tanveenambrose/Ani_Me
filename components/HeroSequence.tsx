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
    const [showContent, setShowContent] = useState(false);
    const [startFadeOut, setStartFadeOut] = useState(false);
    const [mounted, setMounted] = useState(false);

    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameRef = useRef(0);

    const frameCount = 80;

    // Prevent hydration errors - client-side only
    useEffect(() => {
        setMounted(true);
    }, []);

    // Animate preloader counter
    useEffect(() => {
        if (!mounted || showContent) return;

        const counterElement = document.querySelector('.counter-value');
        const circleElement = document.querySelector('.preloader-circle');

        if (counterElement && circleElement) {
            let count = 0;
            const interval = setInterval(() => {
                count += Math.random() * 5; // Updated speed for 2s duration
                if (count > 100) count = 100;

                counterElement.textContent = Math.floor(count).toString();

                // Calculate dash offset for circle (283 is the circumference)
                const offset = 283 - (count / 100) * 283;
                (circleElement as SVGCircleElement).style.strokeDashoffset = offset.toString();

                if (count >= 100) {
                    clearInterval(interval);
                }
            }, 50);

            return () => clearInterval(interval);
        }
    }, [mounted, showContent]);

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

                // Keep preloader visible for minimum 2 seconds
                setTimeout(() => {
                    setStartFadeOut(true);

                    // Allow time for fade transition before unmounting
                    setTimeout(() => {
                        setShowContent(true);
                    }, 800);
                }, 2000);
            } catch (error) {
                console.error('Failed to load images:', error);
            }
        };

        loadImages();
    }, []);

    // Text Animations - Triggered when preloader finishes
    useEffect(() => {
        if (!showContent || !mounted) return;

        const heroAnimation = gsap.timeline({ delay: 0.5 });

        heroAnimation
            // Line 1: Slide from LEFT
            .fromTo('.hero-line-1',
                {
                    opacity: 0,
                    x: -150,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power4.out',
                }
            )
            // Line 2: Slide from RIGHT
            .fromTo('.hero-line-2',
                {
                    opacity: 0,
                    x: 150,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power4.out',
                },
                '-=0.6'
            )
            // Line 3: Typing Effect with fade in
            .to('.hero-line-3', {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
            }, '-=0.3')
            // Subtitle: Slide UP from bottom
            .fromTo('.hero-subtitle',
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                },
                '-=0.8'
            )
            // CTA: Fade in with slight scale
            .fromTo('.hero-cta',
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out(1.2)',
                },
                '-=0.4'
            );

    }, [showContent, mounted]);



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
            <div className="absolute top-0 left-0 right-0 z-20 pt-20 md:pt-24 px-6 md:px-8 w-full">
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
                            className="block opacity-0 hero-line-3 font-black relative"
                            style={{
                                filter: 'drop-shadow(0 0 25px rgba(244, 63, 94, 0.6)) drop-shadow(0 0 50px rgba(168, 85, 247, 0.4))',
                                textShadow: 'none'
                            }}
                        >
                            <span className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text">
                                Through Motion
                            </span>
                        </span>
                    </h1>
                </div>
            </div>

            {/* Subtitle - Bottom Right Corner */}
            <div className="absolute bottom-32 md:bottom-24 right-0 z-20 px-6 md:px-8 text-right" style={{ transform: 'translateY(-15px)' }}>
                <div className="max-w-xl ml-auto">
                    <p
                        className="text-base md:text-lg lg:text-xl text-white opacity-0 hero-subtitle font-medium bg-black/40 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 inline-block shadow-2xl"
                        style={{
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
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

            {/* Enhanced Minimal Preloader */}
            {
                !showContent && mounted && (
                    <div className={`absolute inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black preloader-minimal ${startFadeOut ? 'preloader-fadeout' : ''}`}>
                        {/* Animated grid background */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="grid-pattern"></div>
                        </div>

                        {/* Preloader content */}
                        <div className="relative z-10 text-center">
                            {/* Name with split design */}
                            <div className="mb-12">
                                <h1
                                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-2 tracking-tight preloader-name-minimal"
                                    style={{
                                        letterSpacing: '-0.03em',
                                        textShadow: '0 0 40px rgba(255,255,255,0.1)'
                                    }}
                                >
                                    TANVEEN
                                </h1>
                                <h2
                                    className="text-3xl md:text-5xl lg:text-6xl font-light text-white/30 tracking-wide preloader-name-minimal"
                                    style={{
                                        letterSpacing: '0.3em',
                                        animation: 'slideUp 0.8s ease-out 0.2s both'
                                    }}
                                >
                                    AMBROSE
                                </h2>
                            </div>

                            {/* Circular progress with counter */}
                            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-8">
                                {/* Circular progress ring */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="2"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeDasharray="283"
                                        strokeDashoffset="283"
                                        className="preloader-circle"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                {/* Counter in center */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="text-4xl md:text-5xl font-black text-white preloader-counter"
                                        style={{
                                            fontVariantNumeric: 'tabular-nums',
                                            letterSpacing: '-0.05em'
                                        }}
                                    >
                                        <span className="counter-value">0</span>
                                    </div>
                                </div>
                            </div>

                            {/* Subtitle with dots */}
                            <div className="flex items-center justify-center gap-3 preloader-label">
                                <div className="w-8 h-px bg-white/20"></div>
                                <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                                    Loading
                                </p>
                                <div className="w-8 h-px bg-white/20"></div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
