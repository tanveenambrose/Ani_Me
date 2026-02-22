'use client';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-[#0a0a0f] border-t border-black/5 dark:border-white/10 py-12 px-4 transition-colors duration-500">
            <div className="max-w-7xl mx-auto text-center">
                <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 text-transparent bg-clip-text mb-4 transition-colors">
                    Tanveen's Portfolio
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors">
                    Bringing visions to life through motion and creativity.
                </p>
                <p className="text-gray-500 dark:text-gray-600 text-sm transition-colors">
                    © 2026 Tanveen Ambrose. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
