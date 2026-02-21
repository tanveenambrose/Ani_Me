'use client';

import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById('about');
            if (!aboutSection) return;

            const rect = aboutSection.getBoundingClientRect();
            const scrollY = window.scrollY;

            // Show navbar only when About section starts hitting the top
            if (rect.top <= 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Blur effect triggers as we are firmly inside the About section
            if (rect.top <= 0) {
                setIsBlurred(true);
            } else {
                setIsBlurred(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
        >
            <div
                className={`w-full transition-all duration-300 ${isBlurred
                    ? 'bg-white/70 dark:bg-black/50 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-lg py-4'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
                    {/* Logo/Brand */}
                    <div
                        onClick={() => window.location.href = '/'}
                        className="nav-item text-2xl font-black bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text cursor-pointer hover:opacity-80 transition-all hover:scale-110"
                    >
                        Ani_Me
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6 md:gap-8">
                        <div className="hidden md:flex items-center gap-8">
                            {['About', 'Services', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        const section = document.getElementById(item.toLowerCase() === 'services' ? 'services-section' : item.toLowerCase());
                                        if (section) {
                                            section.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="nav-item text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all hover:scale-110 relative group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-indigo-500 transition-all duration-300 group-hover:w-full" />
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="nav-item transition-all hover:scale-110">
                                <ThemeToggle />
                            </div>
                            <button className="nav-item px-5 py-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 text-black dark:text-white text-sm font-semibold transition-all hover:scale-110 backdrop-blur-sm">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
