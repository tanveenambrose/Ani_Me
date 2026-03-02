'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, MousePointer2 } from 'lucide-react';

const projects = [
    {
        title: "Ani_Me",
        description: "A high-speed anime discovery and streaming platform built with TypeScript and modern aesthetics.",
        image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1601850494422-3cf14624b0bb?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/Ani_Me",
        demo: "https://ani-me-three.vercel.app",
        category: "Entertainment",
        color: "#f43f5e"
    },
    {
        title: "Fast-Go-Travel",
        description: "Modern travel agency platform featuring global destination scouting and seamless booking UI.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/Fast-Go-Travel",
        demo: "https://fast-go-travel.vercel.app",
        category: "Travel",
        color: "#0ea5e9"
    },
    {
        title: "Vibe E-commerce",
        description: "A sleek, lifestyle-focused shopping experience with clean product management and smooth transitions.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/ecommerce-vibe-website",
        demo: "https://ecommerce-vibe-website-client.vercel.app/",
        category: "E-Commerce",
        color: "#8b5cf6"
    },
    {
        title: "X-Game",
        description: "Interactive gaming portal showcasing multiple game projects with a high-energy digital aesthetic.",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/xgame",
        demo: "https://xgame-psi.vercel.app/",
        category: "Gaming",
        color: "#22d3ee"
    },
    {
        title: "Power Rangers",
        description: "A unique character-driven storytelling experience utilizing advanced frontend motion systems.",
        image: "https://images.unsplash.com/photo-1562914313-7b6914f63ad2?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/power-rangers",
        demo: "https://power-rangers-zeta.vercel.app",
        category: "Storytelling",
        color: "#f59e0b"
    },
    {
        title: "Movie Lens",
        description: "API-powered cinematic explorer featuring high-quality visuals and movie discovery tools.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/project-one",
        demo: "https://github.com/tanveenambrose/project-one",
        category: "Cinema",
        color: "#ec4899"
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#0a0a0f] border border-white/10"
            style={{ willChange: "transform, opacity" }}
        >
            {/* Background Preview */}
            <div className="absolute inset-0 z-0">
                <div
                    className={`absolute inset-0 transition-all duration-1000 ease-out z-10 ${isHovered ? 'opacity-0 scale-110' : 'opacity-40 scale-100'}`}
                    style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Hover Image */}
                <div
                    className={`absolute inset-0 transition-all duration-1000 ease-out z-10 ${isHovered ? 'opacity-70 scale-100' : 'opacity-0 scale-95'}`}
                    style={{
                        backgroundImage: `url(${project.hoverImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10" />
            </div>

            {/* Content Sidebar */}
            <div className="relative z-30 h-full w-full p-6 md:p-10 flex flex-col justify-end">
                <div className={`transition-transform duration-500 ${isHovered ? 'translate-y-[-10px]' : 'translate-y-0'}`}>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400 mb-4 backdrop-blur-md">
                        {project.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter leading-none">
                        {project.title}
                    </h3>
                    <p className={`text-gray-400 text-sm md:text-base max-w-lg mb-8 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60 line-clamp-2'}`}>
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
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
                                className="group/btn relative px-6 py-3 bg-white text-black rounded-full text-sm font-bold flex items-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10">Launch</span>
                                <ArrowRight className="relative z-10 group-hover/btn:translate-x-1 transition-transform" size={16} />
                                <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 z-0" />
                            </a>
                        </div>

                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-full text-sm font-bold flex items-center gap-2 transition-all"
                        >
                            <Github size={16} />
                            <span>Source</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Corner Spotlight */}
            <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] transition-all duration-1000 opacity-0 group-hover:opacity-30`}
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

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

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
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div>
                        <span className="inline-block text-purple-500 font-mono text-sm tracking-[0.5em] uppercase mb-4">
                            Selected Works (01-06)
                        </span>
                        <h2 className="text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter">
                            CRAFTING<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">EXPERIENCES</span>
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <p className="text-gray-400 text-lg leading-relaxed">
                            A showcase of digital products where cutting-edge technology meets unconventional design patterns.
                        </p>
                        <div className="h-px w-full bg-gradient-to-r from-purple-500 to-transparent mt-8" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
