'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Reveal animations for titles and text
        const revealElements = sectionRef.current.querySelectorAll('.reveal-text');
        revealElements.forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 50, filter: 'blur(10px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: i * 0.1
                }
            );
        });

        // Animate stat cards with a stagger
        const statCards = sectionRef.current.querySelectorAll('.stat-card');
        gsap.fromTo(statCards,
            { opacity: 0, scale: 0.9, y: 30 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: sectionRef.current.querySelector('.stats-container'),
                    start: 'top 80%',
                }
            }
        );

        // Counter animation
        const stats = sectionRef.current.querySelectorAll('.stat-number');
        stats.forEach((stat) => {
            const target = stat.textContent || '0';
            const value = parseInt(target.replace(/\D/g, ''));
            const suffix = target.includes('%') ? '%' : '+';

            ScrollTrigger.create({
                trigger: stat,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to({ val: 0 }, {
                        val: value,
                        duration: 2.5,
                        ease: 'power3.out',
                        onUpdate: function () {
                            stat.innerHTML = Math.floor(this.targets()[0].val) + suffix;
                        }
                    });
                }
            });
        });
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen bg-[#0a0a0f] py-32 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Content */}
                    <div className="space-y-8">
                        <div className="reveal-text">
                            <span className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-purple-400 mb-4 bg-white/5 backdrop-blur-sm">
                                The Creative Mind
                            </span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                                Crafting Digital <br />
                                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text">
                                    Reality
                                </span>
                            </h2>
                        </div>

                        <div className="reveal-text">
                            <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed">
                                We are a world-class design and motion studio, transforming bold visions into immersive digital experiences.
                            </p>
                        </div>

                        <div className="reveal-text max-w-lg">
                            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                                Our process bridges the gap between technology and art. We don't just build sites; we create ecosystems where movement and interaction tell your unique story. Every pixel is calculated, and every animation is intentional.
                            </p>
                        </div>

                        {/* Stats Container */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 stats-container">
                            {[
                                { number: '500+', label: 'Projects Done' },
                                { number: '98%', label: 'Loyal Clients' },
                                { number: '50+', label: 'Global Awards' }
                            ].map((stat, i) => (
                                <div key={i} className="stat-card p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-md hover:bg-white/[0.08] transition-all group">
                                    <h3 className="stat-number text-3xl md:text-4xl font-black text-white group-hover:text-purple-400 transition-colors mb-1">
                                        {stat.number}
                                    </h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Visual Imagery - Floating Photo Slider */}
                    <div className="relative group reveal-text overflow-visible h-[650px] flex items-center justify-center lg:justify-end">
                        <FloatingSlider />
                    </div>
                </div>
            </div>
        </section>
    );
}

import dynamic from 'next/dynamic';
const FloatingSlider = dynamic(() => import('./FloatingSlider'), { ssr: false });
