'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
    Code2, Sparkles, Target, Cpu, Globe, Rocket,
    Layers, Zap, Palette, Terminal, Box, Database
} from 'lucide-react';

const techStack = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'MongoDB', category: 'Backend' },
    { name: 'Tailwind', category: 'Frontend' },
    { name: 'Express', category: 'Backend' },
    { name: 'PHP', category: 'Backend' },
    { name: 'Java', category: 'Language' },
    { name: 'C++', category: 'Language' },
    { name: 'C#', category: 'Language' },
    { name: 'Git', category: 'Tool' },
];

const floatingLogos = [
    'JS', 'TS', 'JSX', 'NODE', 'DB', 'APP', 'WEB', 'UI', 'UX', 'API', 'GIT', 'MERN'
];

export default function ProfessionalSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-[#050508] py-24 px-6 md:px-12 overflow-hidden"
        >
            {/* Animated Floating Logos Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                {floatingLogos.map((logo, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-4xl md:text-6xl font-black text-white/10 select-none whitespace-nowrap"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            rotate: Math.random() * 360
                        }}
                        animate={{
                            y: [null, Math.random() * -100 - 50 + "%"],
                            rotate: [null, Math.random() * 360 + 180],
                            x: [null, (Math.random() - 0.5) * 20 + "%"]
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            left: `${(i * 15) % 100}%`,
                            top: `${(i * 20) % 100}%`,
                        }}
                    >
                        {logo}
                    </motion.div>
                ))}
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div style={{ y, opacity }} className="space-y-16">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                        >
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-bold tracking-widest text-white uppercase">Professional Excellence</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Me</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Who Am I Card */}
                        <div className="col-span-1 lg:col-span-2 space-y-8">
                            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.05] transition-all group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                                        <Terminal className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Who Am I?</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        { icon: <Cpu />, title: "MERN Stack Developer", desc: "Passionate about building scalable web applications" },
                                        { icon: <Zap />, title: "Vibe Coding Enthusiast", desc: "Exploring AI-powered development" },
                                        { icon: <Target />, title: "Problem Solver", desc: "Turning ideas into reality" },
                                        { icon: <Rocket />, title: "Continuous Learner", desc: "Staying ahead of tech trends" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                                            <div className="text-cyan-400 p-1">{item.icon}</div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">{item.title}</h4>
                                                <p className="text-gray-500 text-xs">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Philosophy & Focus */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-purple-400" />
                                        Current Focus
                                    </h3>
                                    <div className="space-y-4 font-medium">
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">Role</span>
                                            <span className="text-white">Full Stack Developer</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">Specialization</span>
                                            <span className="text-cyan-400">MERN Stack</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">Location</span>
                                            <span className="text-white">Earth</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2">
                                            <span className="text-gray-500">Status</span>
                                            <span className="text-purple-400 italic">Building the future...</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-3xl bg-gray-900 border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5" />
                                    <div className="relative font-mono text-sm space-y-2">
                                        <p className="text-purple-400">if (<span className="text-cyan-400">code</span> === <span className="text-rose-400">"clean"</span> && <span className="text-cyan-400">design</span> === <span className="text-rose-400">"beautiful"</span>) {"{"}</p>
                                        <p className="pl-6 text-white"><span className="text-blue-400">success</span> = <span className="text-orange-400">true</span>;</p>
                                        <p className="text-purple-400">{"}"}</p>
                                    </div>
                                    <div className="mt-6">
                                        <p className="text-gray-400 text-sm italic">"Code with passion, build with purpose 🚀"</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack Card */}
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.05] transition-all">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-purple-600/10 border border-purple-600/20">
                                    <Layers className="w-6 h-6 text-purple-400" />
                                </div>
                                Tech Stack
                            </h3>

                            <div className="space-y-8">
                                {[
                                    { title: "Frontend", items: ["React", "Next.js", "TypeScript", "JS", "Tailwind", "CSS3", "HTML5"], color: "text-cyan-400" },
                                    { title: "Backend", items: ["Node.js", "Express", "MongoDB", "PHP"], color: "text-purple-400" },
                                    { title: "Languages", items: ["C", "C++", "C#", "Java"], color: "text-blue-400" },
                                    { title: "Tools & Design", items: ["Git", "VS Code", "Photoshop", "Illustrator"], color: "text-rose-400" }
                                ].map((group, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <h4 className={`text-xs font-black uppercase tracking-widest ${group.color}`}>{group.title}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {group.items.map((item, i) => (
                                                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-all cursor-default">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Quote */}
                    <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-white/10 text-center">
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                            I believe in writing clean, maintainable code that makes a difference.
                            Whether it's crafting beautiful UIs or architecting robust backends,
                            I'm all about creating exceptional user experiences.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
