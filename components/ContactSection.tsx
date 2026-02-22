'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const revealElements = sectionRef.current.querySelectorAll('.reveal');
        revealElements.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 30, filter: 'blur(8px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="min-h-screen bg-gray-50 dark:bg-[#12121a] py-24 px-4 flex items-center justify-center transition-colors duration-500">
            <div className="max-w-4xl mx-auto text-center reveal">
                <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-6 transition-colors">
                    Ready to Create Something{' '}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 text-transparent bg-clip-text">
                        Amazing
                    </span>
                    ?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto transition-colors">
                    Let's collaborate and bring your vision to life with stunning animations and unforgettable experiences.
                </p>
                <a
                    href="mailto:racoctanveen15@gmail.com"
                    className="inline-block px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-600 rounded-2xl font-bold text-2xl hover:scale-105 transition-transform shadow-2xl text-white"
                >
                    Start Your Project
                </a>
            </div>
        </section>
    );
}
