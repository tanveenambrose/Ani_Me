'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, ArrowRight, MousePointer2 } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        title: "Power Rangers",
        description: "An immersive story-based frontend experience built with advanced animations and cinematic storytelling.",
        image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/power-rangers",
        demo: "https://power-rangers-zeta.vercel.app",
        category: "Creative Frontend",
        color: "#9333ea"
    },
    {
        title: "X-Game",
        description: "A dynamic gaming-focused website featuring interactive elements and a high-energy aesthetic.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/xgame",
        demo: "https://xgame-psi.vercel.app/",
        category: "Gaming Web",
        color: "#3b82f6"
    },
    {
        title: "Fast-Go-Travel",
        description: "A comprehensive travel booking platform with a clean UI and seamless search functionality.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/Fast-Go-Travel",
        demo: "https://fast-go-travel.vercel.app",
        category: "Booking System",
        color: "#ec4899"
    },
    {
        title: "World Atlas",
        description: "API-driven data visualization platform exploring country details, flags, and global statistics.",
        image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/worldaltas",
        demo: "https://tanveenambrose.github.io/worldaltas/",
        category: "API Integration",
        color: "#10b981"
    }
];

function InteractiveCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Magnetic effect for buttons
    const magnetRef = useRef<HTMLDivElement>(null);
    const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

    const handleMagnet = (e: React.MouseEvent) => {
        if (!magnetRef.current) return;
        const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        setMagnetPos({ x: x * 0.3, y: y * 0.3 });
    };

    const resetMagnet = () => setMagnetPos({ x: 0, y: 0 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden bg-[#0a0a0f] border border-white/10"
        >
            {/* Background Preview */}
            <div className="absolute inset-0 z-0">
                <div
                    className={`absolute inset-0 transition-all duration-1000 ease-out z-10 ${isHovered ? 'opacity-0 scale-110 blur-xl' : 'opacity-40 scale-100 blur-0'}`}
                    style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Live Iframe */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <iframe
                        src={project.demo}
                        className="w-[200%] h-[200%] scale-50 origin-top-left pointer-events-none"
                        title={project.title}
                    />
                    {/* Interaction Shield */}
                    <div className="absolute inset-0 bg-transparent z-20" />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />
            </div>

            {/* Content Sidebar */}
            <div className="relative z-30 h-full w-full p-8 md:p-16 flex flex-col justify-end md:justify-center max-w-2xl">
                <motion.div
                    animate={{ x: isHovered ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] uppercase text-purple-400 mb-6 backdrop-blur-md">
                        {project.category}
                    </span>
                    <h3 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
                        {project.title.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0.5 }}
                                animate={{ opacity: isHovered ? 1 : 0.5, y: isHovered ? -5 : 0 }}
                                transition={{ delay: i * 0.02 }}
                                className="inline-block"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </h3>
                    <p className={`text-gray-400 text-lg md:text-xl max-w-lg mb-10 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-4' : 'opacity-60 overflow-hidden'}`}>
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <div
                            ref={magnetRef}
                            onMouseMove={handleMagnet}
                            onMouseLeave={resetMagnet}
                            style={{ transform: `translate(${magnetPos.x}px, ${magnetPos.y}px)` }}
                            className="transition-transform duration-200 ease-out"
                        >
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-3 overflow-hidden"
                            >
                                <span className="relative z-10">Launch Project</span>
                                <ArrowRight className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                                <motion.div
                                    className="absolute inset-0 bg-purple-600 z-0"
                                    initial={{ y: "100%" }}
                                    whileHover={{ y: 0 }}
                                    transition={{ type: "tween" }}
                                />
                                <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </div>

                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-full font-bold flex items-center gap-3 transition-all"
                        >
                            <Github size={20} />
                            <span>Source Code</span>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Floating Decorative Elements */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full border border-white/10 backdrop-blur-sm"
                                style={{
                                    width: Math.random() * 100 + 50,
                                    height: Math.random() * 100 + 50,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -50, 0],
                                    x: [0, 30, 0],
                                    rotate: 360,
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: Math.random() * 5 + 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Corner Spotlight */}
            <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] transition-all duration-1000 opacity-0 group-hover:opacity-40`}
                style={{ backgroundColor: project.color }}
            />
        </motion.div>
    );
}

export default function ProjectsSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const textSkew = useTransform(scrollYProgress, [0, 1], [0, 5]);

    return (
        <section
            ref={containerRef}
            id="projects-section"
            className="relative min-h-screen bg-[#050508] py-32 px-4 md:px-12 overflow-hidden"
        >
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 brightness-50"
                />
                <div className="absolute top-1/4 -left-1/4 w-[100vw] h-[100vw] bg-purple-900/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-[100vw] h-[100vw] bg-blue-900/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
                    <motion.div style={{ skewY: textSkew }}>
                        <span className="inline-block text-purple-500 font-mono text-sm tracking-[0.5em] uppercase mb-4">
                            Selected Works (01-04)
                        </span>
                        <h2 className="text-6xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter">
                            CRAFTING<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">EXPERIENCES</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-md">
                        <p className="text-gray-400 text-xl leading-relaxed">
                            A showcase of digital products where cutting-edge technology meets unconventional design patterns.
                        </p>
                        <div className="h-px w-full bg-gradient-to-r from-purple-500 to-transparent mt-8" />
                    </div>
                </div>

                <div className="flex flex-col gap-12 md:gap-32">
                    {projects.map((project, i) => (
                        <InteractiveCard key={i} project={project} index={i} />
                    ))}
                </div>

                {/* Bottom Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 pt-32 border-t border-white/5 flex flex-col items-center text-center"
                >
                    <p className="text-gray-500 uppercase tracking-[0.3em] text-sm mb-8">Want to see more?</p>
                    <a
                        href="https://github.com/tanveenambrose"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 text-3xl md:text-5xl font-black text-white hover:text-purple-500 transition-colors"
                    >
                        VIEW FULL REPOSITORY <ArrowRight size={48} className="group-hover:translate-x-4 transition-transform" />
                    </a>
                </motion.div>
            </div>

            {/* Custom Background element: Floating Cursor Follower */}
            <div className="hidden lg:block fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference">
                {/* This would be handled by CustomCursor component usually, so we leave it empty or add a simple effect */}
            </div>
        </section>
    );
}
