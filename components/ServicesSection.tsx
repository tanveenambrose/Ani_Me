'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
    return (
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
                        { icon: '🎨', title: 'Creative Design', desc: 'Strategic visual storytelling that defines your brand\'s unique voice.' },
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
                            <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
