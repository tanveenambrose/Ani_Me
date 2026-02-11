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

        // Fade in sections as they enter viewport
        const reveals = sectionRef.current.querySelectorAll('.reveal');

        reveals.forEach((element) => {
            gsap.from(element, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Animate stats
        const stats = sectionRef.current.querySelectorAll('.stat-number');
        stats.forEach((stat) => {
            const target = stat.textContent || '0';
            const value = parseInt(target.replace(/\D/g, ''));
            const isPercentage = target.includes('%');

            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    gsap.to(stat, {
                        innerHTML: value,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { innerHTML: 1 },
                        onUpdate: function () {
                            const currentValue = Math.ceil(this.targets()[0].innerHTML);
                            stat.innerHTML = currentValue + (isPercentage ? '%' : '+');
                        },
                    });
                },
            });
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen bg-[#12121a] py-24 px-4"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 reveal">
                    <span className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold tracking-wider uppercase text-purple-400 mb-6">
                        Who We Are
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white">
                        Creating Digital{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                            Masterpieces
                        </span>
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="reveal">
                        <p className="text-2xl md:text-3xl font-semibold text-white mb-6 leading-relaxed">
                            We are a creative studio specializing in bringing brands to life through the power of animation and interactive design.
                        </p>
                        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            Our mission is to craft unforgettable digital experiences that captivate audiences and drive engagement. With expertise in modern web technologies and a passion for pushing creative boundaries, we transform ideas into stunning visual narratives.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all hover:-translate-y-2">
                                <h3 className="stat-number text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-2">
                                    500+
                                </h3>
                                <p className="text-sm text-gray-400">Projects Completed</p>
                            </div>
                            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all hover:-translate-y-2">
                                <h3 className="stat-number text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-2">
                                    98%
                                </h3>
                                <p className="text-sm text-gray-400">Client Satisfaction</p>
                            </div>
                            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all hover:-translate-y-2">
                                <h3 className="stat-number text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-2">
                                    50+
                                </h3>
                                <p className="text-sm text-gray-400">Awards Won</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Cards */}
                    <div className="relative h-[500px] reveal">
                        <div className="absolute w-64 h-80 top-0 left-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl backdrop-blur-md border border-white/10 visual-card-1"></div>
                        <div className="absolute w-56 h-72 top-20 right-12 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-3xl backdrop-blur-md border border-white/10 visual-card-2"></div>
                        <div className="absolute w-48 h-64 bottom-0 right-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-3xl backdrop-blur-md border border-white/10 visual-card-3"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
