'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSequence from '@/components/HeroSequence';
import AboutSection from '@/components/AboutSection';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Animate hero text on load
        const heroAnimation = gsap.timeline({ delay: 0.5 });

        heroAnimation
            .to('.hero-line-1', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
            .to('.hero-line-2', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.4')
            .to('.hero-line-3', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.4')
            .to('.hero-subtitle', {
                opacity: 1,
                y: 0,
                duration: 0.6,
            }, '-=0.3')
            .to('.hero-cta', {
                opacity: 1,
                y: 0,
                duration: 0.6,
            }, '-=0.3');

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <main className="bg-[#0a0a0f] text-white">
            <HeroSequence />
            <AboutSection />

            {/* Services Section */}
            <section className="min-h-screen bg-[#0a0a0f] py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 reveal">
                        <span className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold tracking-wider uppercase text-purple-400 mb-6">
                            What We Do
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white">
                            Our{' '}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                                Services
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🎨', title: 'Creative Design', desc: 'Stunning visual designs that capture attention and communicate your brand's unique story.' },
              { icon: '⚡', title: 'Web Animations', desc: 'Cutting-edge GSAP and scroll-triggered animations for immersive experiences.' },
              { icon: '🚀', title: 'Performance Optimization', desc: 'Lightning-fast load times and buttery-smooth 60fps animations.' },
                            { icon: '💎', title: 'Brand Identity', desc: 'Comprehensive branding solutions for a memorable visual presence.' },
                            { icon: '📱', title: 'Responsive Development', desc: 'Pixel-perfect designs that work beautifully on every device.' },
                            { icon: '🎬', title: 'Motion Graphics', desc: 'Dynamic motion graphics that elevate your brand and engage viewers.' },
                        ].map((service, i) => (
                            <div
                                key={i}
                                className="reveal p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:-translate-y-2 transition-all cursor-pointer group"
                            >
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="min-h-screen bg-[#12121a] py-24 px-4 flex items-center justify-center">
                <div className="max-w-4xl mx-auto text-center reveal">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Ready to Create Something{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                            Amazing
                        </span>
                        ?
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Let's collaborate and bring your vision to life with stunning animations and unforgettable experiences.
                    </p>
                    <button className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-bold text-2xl hover:scale-105 transition-transform shadow-2xl">
                        Start Your Project
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0a0a0f] border-t border-white/10 py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-4">
                        Ani_Me
                    </div>
                    <p className="text-gray-400 mb-8">
                        Bringing visions to life through motion and creativity.
                    </p>
                    <p className="text-gray-500 text-sm">
                        © 2026 Ani_Me. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
}
