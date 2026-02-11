'use client';

export default function ContactSection() {
    return (
        <section className="min-h-screen bg-[#12121a] py-24 px-4 flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center reveal">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Ready to Create Something{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        Amazing
                    </span>
                    ?
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    Let's collaborate and bring your vision to life with stunning animations and unforgettable experiences.
                </p>
                <button className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-bold text-2xl hover:scale-105 transition-transform shadow-2xl text-white">
                    Start Your Project
                </button>
            </div>
        </section>
    );
}
