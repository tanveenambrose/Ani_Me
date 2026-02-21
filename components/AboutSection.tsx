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
            className="relative min-h-screen bg-[#0a0a0f] py-20 md:py-32 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
                        <div className="reveal-text">
                            <span className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-[9px] md:text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4 bg-white/5 backdrop-blur-sm">
                                MERN Stack Specialist
                            </span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                                Building Scalable <br />
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                                    Digital Solutions
                                </span>
                            </h2>
                        </div>

                        <div className="reveal-text">
                            <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
                                I'm <span className="text-white">Tanveen Ambrose</span>, a MERN Stack Developer and Vibe Coding enthusiast dedicated to turning bold ideas into seamless digital reality.
                            </p>
                        </div>

                        <div className="reveal-text max-w-lg mx-auto lg:mx-0">
                            <p className="text-xs md:text-base text-gray-500 leading-relaxed">
                                "Code with passion, build with purpose." I specialize in architecting clean, maintainable codebases where performance meets beautiful design. From robust backends to immersive glassmorphic interfaces, I build for the future of the web.
                            </p>
                        </div>

                        {/* Tech Stack Mini-Gallery */}
                        <div className="reveal-text flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 pt-2">
                            {['React', 'Next.js', 'TS', 'Node', 'Mongo', 'TW'].map((tech) => (
                                <span key={tech} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tighter hover:bg-white/10 hover:text-cyan-400 transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Stats Container - Compact on Mobile */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-10 stats-container">
                            {[
                                { number: '10+', label: 'Apps' },
                                { number: '100%', label: 'Clean' },
                                { number: '24/7', label: 'Learning' }
                            ].map((stat, i) => (
                                <div key={i} className="stat-card p-4 md:p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-md hover:bg-white/[0.08] transition-all group">
                                    <h3 className="stat-number text-xl md:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors mb-0.5 md:mb-1">
                                        {stat.number}
                                    </h3>
                                    <p className="text-[8px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="reveal-text pt-4">
                            <a
                                href="mailto:racoctanveen15@gmail.com"
                                className="inline-flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
                            >
                                Let's build something epic
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right: Visual Imagery - Floating Photo Slider (First on Mobile) */}
                    <div className="relative group reveal-text overflow-visible h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center lg:justify-end order-1 lg:order-2">
                        <FloatingSlider />
                    </div>
                </div>
            </div>
        </section>
    );
}

import dynamic from 'next/dynamic';
const FloatingSlider = dynamic(() => import('./FloatingSlider'), { ssr: false });
