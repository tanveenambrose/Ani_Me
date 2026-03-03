'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, MousePointer2 } from 'lucide-react';

const projects = [
    {
        title: "Fast-Go-Travel",
        description: "Modern travel agency platform featuring global destination scouting and seamless booking UI.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/Fast-Go-Travel",
        demo: "https://fast-go-travel.vercel.app",
        category: "Travel",
        color: "#0ea5e9"
    },
    {
        title: "Vibe E-commerce",
        description: "A sleek, lifestyle-focused shopping experience with clean product management and smooth transitions.",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/ecommerce-vibe-website",
        demo: "https://ecommerce-vibe-website-client.vercel.app/",
        category: "E-Commerce",
        color: "#8b5cf6"
    },
    {
        title: "X-Game",
        description: "Interactive gaming portal showcasing multiple game projects with a high-energy digital aesthetic.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/xgame",
        demo: "https://xgame-psi.vercel.app/",
        category: "Gaming",
        color: "#22d3ee"
    },
    {
        title: "Power Rangers",
        description: "A unique character-driven storytelling experience utilizing advanced frontend motion systems.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/power-rangers",
        demo: "https://power-rangers-zeta.vercel.app",
        category: "Storytelling",
        color: "#f59e0b"
    },
    {
        title: "Movie Lens",
        description: "API-powered cinematic explorer featuring high-quality visuals and movie discovery tools.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
        github: "https://github.com/tanveenambrose/project-one",
        demo: "https://github.com/tanveenambrose/project-one",
        category: "Cinema",
        color: "#ec4899"
    }
];

const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: (i % 3) * 0.1,
            ease: [0.215, 0.61, 0.355, 1],
        }
    })
} as any;

function InteractiveCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const magnetRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!magnetRef.current) return;
        const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * 0.35);
        y.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#0a0a0f] border border-white/10"
            style={{ willChange: "transform, opacity" }}
        >
            {/* Background Preview */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0 z-10"
                    initial={{ opacity: 0.4, scale: 1 }}
                    whileHover={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Hover Image */}
                <motion.div
                    className="absolute inset-0 z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            <div className="relative z-30 h-full w-full p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                <motion.div
                    initial={{ y: 0 }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400 mb-3 md:mb-4 backdrop-blur-md">
                        {project.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 md:mb-4 tracking-tighter leading-none">
                        {project.title}
                    </h3>
                    <motion.p
                        className="text-gray-400 text-xs sm:text-sm md:text-base max-w-lg mb-6 md:mb-8 line-clamp-2 md:line-clamp-none transition-opacity duration-500"
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 1 }}
                    >
                        {project.description}
                    </motion.p>

                    <div className="flex flex-wrap gap-3 md:gap-4">
                        <motion.div
                            ref={magnetRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ x: springX, y: springY }}
                        >
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative px-5 py-2.5 md:px-6 md:py-3 bg-white text-black rounded-full text-xs md:text-sm font-bold flex items-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10">Launch</span>
                                <ArrowRight className="relative z-10 group-hover/btn:translate-x-1 transition-transform" size={16} />
                                <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 z-0" />
                            </a>
                        </motion.div>

                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 md:px-6 md:py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-full text-xs md:text-sm font-bold flex items-center gap-2 transition-all"
                        >
                            <Github size={16} />
                            <span>Source</span>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Corner Spotlight - Only show on large devices for performance */}
            <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] transition-all duration-1000 opacity-0 group-hover:opacity-20 hidden md:block`}
                style={{ backgroundColor: project.color, pointerEvents: 'none' }}
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

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

    return (
        <section
            ref={containerRef}
            id="projects-section"
            className="relative min-h-screen bg-[#050508] py-20 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden"
        >
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <motion.div
                    style={{ y: smoothBackgroundY }}
                    className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"
                />
                <div className="absolute top-1/4 -left-1/4 w-[100vw] h-[100vw] bg-purple-900/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-[100vw] h-[100vw] bg-blue-900/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8 md:gap-12">
                    <div className="max-w-4xl">
                        <span className="inline-block text-purple-500 font-mono text-xs sm:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4">
                            Selected Works (01-06)
                        </span>
                        <h2 className="text-[clamp(2.5rem,10vw,8rem)] font-black text-white leading-[0.9] tracking-tighter">
                            CRAFTING<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">EXPERIENCES</span>
                        </h2>
                    </div>

                    <div className="max-w-md lg:pb-4">
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                            A showcase of digital products where cutting-edge technology meets unconventional design patterns.
                        </p>
                        <div className="h-px w-full bg-gradient-to-r from-purple-500 to-transparent mt-6 md:mt-8" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                    {projects.map((project, i) => (
                        <InteractiveCard key={i} project={project} index={i} />
                    ))}
                </div>

                {/* Bottom Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 md:mt-32 pt-20 md:pt-32 border-t border-white/5 flex flex-col items-center text-center"
                >
                    <p className="text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-sm mb-6 md:mb-8">Want to see more?</p>
                    <a
                        href="https://github.com/tanveenambrose"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-wrap justify-center items-center gap-4 text-2xl sm:text-3xl md:text-5xl font-black text-white hover:text-purple-500 transition-colors"
                    >
                        VIEW FULL REPOSITORY <ArrowRight size={32} className="md:w-12 md:h-12 group-hover:translate-x-4 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
