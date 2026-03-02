'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence, useVelocity, useTransform } from 'framer-motion';

const TRAIL_COUNT = 4;

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [cursorType, setCursorType] = useState('default');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const velX = useVelocity(mouseX);
    const velY = useVelocity(mouseY);

    const smoothVelX = useSpring(velX, { damping: 50, stiffness: 400 });
    const smoothVelY = useSpring(velY, { damping: 50, stiffness: 400 });

    const scaleX = useTransform(smoothVelX, [-3000, 0, 3000], [1.3, 1, 1.3]);
    const scaleY = useTransform(smoothVelY, [-3000, 0, 3000], [1.3, 1, 1.3]);
    const angle = useTransform(smoothVelX, [0, 3000], [0, 10]);

    const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const trails = Array.from({ length: TRAIL_COUNT }).map((_, i) => ({
        x: useSpring(mouseX, { damping: 25 + i * 5, stiffness: 300 - i * 50, mass: 0.5 }),
        y: useSpring(mouseY, { damping: 25 + i * 5, stiffness: 300 - i * 50, mass: 0.5 }),
    }));

    useEffect(() => {
        setMounted(true);
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('button, a, input, [role="button"], .cursor-pointer, .glitch-hover, .letter-spin, .hero-btn-primary, .hero-btn-secondary, nav, #audio-player, .modern-ui, .nav-item');

            if (interactive) {
                setIsHovering(true);

                const isNav = interactive.classList.contains('nav-item') || interactive.closest('.nav-item');
                const isMusicPlayer = interactive.id === 'audio-player' || interactive.closest('#audio-player');
                const isUI = interactive.tagName === 'NAV' || interactive.closest('nav') || interactive.classList.contains('modern-ui');

                if (isNav) setCursorType('nav-clear');
                else if (isMusicPlayer) setCursorType('music-glass');
                else if (isUI) setCursorType('ui-glass');
                else if (interactive.classList.contains('glitch-hover')) setCursorType('glitch');
                else if (interactive.classList.contains('letter-spin')) setCursorType('spin');
                else if (interactive.classList.contains('hero-btn-primary')) setCursorType('power');
                else setCursorType('pointer');
            } else {
                setIsHovering(false);
                setCursorType('default');
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleHover);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    const isGlass = cursorType === 'ui-glass' || cursorType === 'music-glass';
    const isNav = cursorType === 'nav-clear';
    const isMusic = cursorType === 'music-glass';

    return (
        <div className="fixed inset-0 pointer-events-none z-[999999] hidden md:block overflow-hidden">
            {/* 1. Liquid Trail - Hidden on Glass/Nav UI */}
            {!isGlass && !isNav && trails.map((pos, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        x: pos.x,
                        y: pos.y,
                        translateX: '-50%',
                        translateY: '-50%',
                        width: 6 - i,
                        height: 6 - i,
                        background: i % 2 === 0 ? '#22d3ee' : '#a855f7',
                        opacity: (1 - i / TRAIL_COUNT) * 0.3,
                    }}
                />
            ))}

            {/* 2. Outer Ring */}
            <motion.div
                className="absolute border-2 rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    rotate: (isGlass || isNav) ? 0 : angle,
                    scaleX: (isGlass || isNav) ? 1 : scaleX,
                    scaleY: (isGlass || isNav) ? 1 : scaleY,
                }}
                animate={{
                    width: isNav ? 45 : (isGlass ? 50 : 40),
                    height: isNav ? 45 : (isGlass ? 50 : 40),
                    scale: isHovering ? 1.1 : (isClicking ? 0.7 : 1),
                    borderColor: isNav
                        ? 'rgba(34, 211, 238, 0.9)'
                        : (isMusic
                            ? 'rgba(255, 255, 255, 0.1)'
                            : (isGlass ? 'rgba(255, 255, 255, 0.2)' : 'rgba(34, 211, 238, 0.2)')),
                    backgroundColor: isNav
                        ? 'rgba(34, 211, 238, 0.02)'
                        : (isMusic ? 'rgba(255, 255, 255, 0.02)' : (isGlass ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0)')),
                    opacity: (isMusic || isNav) ? 0.8 : 1,
                }}
                transition={{ type: 'spring', damping: 25 }}
            />

            {/* 3. Main Follower (Inverting Circle) */}
            {!isGlass && !isNav && (
                <motion.div
                    className="absolute w-4 h-4 bg-white mix-blend-difference rounded-full"
                    style={{
                        x: cursorX,
                        y: cursorY,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                    animate={{
                        scale: isHovering ? 1.5 : (isClicking ? 0.5 : 1),
                        opacity: isHovering ? 0.8 : 1
                    }}
                />
            )}

            {/* 4. Electric Core */}
            <motion.div
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicking ? 0 : (isNav ? 0.8 : (isMusic ? 0.5 : 1)),
                    backgroundColor: isNav ? '#22d3ee' : (isMusic ? 'rgba(255, 255, 255, 0.3)' : '#22d3ee'),
                    boxShadow: isNav ? '0 0 10px #22d3ee' : (isMusic ? 'none' : (isHovering ? "0 0 10px #22d3ee" : "0 0 5px #22d3ee")),
                    opacity: isMusic ? 0.3 : 1
                }}
            />
        </div>
    );
}
