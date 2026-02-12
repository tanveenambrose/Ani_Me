'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById('about');
            if (!aboutSection) return;

            const aboutTop = aboutSection.offsetTop;
            const scrollY = window.scrollY;

            // Visible when we reach the About section
            if (scrollY >= aboutTop - 100) { // Slight buffer for smoother entry
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Blur effect triggers as we scroll deeper into the About section
            if (scrollY > aboutTop + 50) {
                setIsBlurred(true);
            } else {
                setIsBlurred(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
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
                    ? 'bg-black/50 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
                    {/* Logo/Brand */}
                    <div
                        onClick={() => window.location.href = '/'}
                        className="text-2xl font-black bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        Ani_Me
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-8">
                        {['About', 'Services', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    const section = document.getElementById(item.toLowerCase() === 'services' ? 'services-section' : item.toLowerCase());
                                    // Fallback for sections without specific IDs yet
                                    if (section) {
                                        section.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        // Attempt to find by text content or broad section match if ID missing
                                        // For now, consistent IDs are best.
                                    }
                                }}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-indigo-500 transition-all duration-300 group-hover:w-full" />
                            </button>
                        ))}

                        <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold transition-all backdrop-blur-sm">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
