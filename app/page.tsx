'use client';

import dynamic from 'next/dynamic';

// Dynamic imports with SSR disabled to prevent hydration mismatches
// and ensure consistent client-side behavior (like the preloader).

const HeroSequence = dynamic(() => import('../components/HeroSequence'), {
    ssr: false,
    loading: () => <div className="w-full h-screen bg-[#0a0a0f]" />
});

const AboutSection = dynamic(() => import('../components/AboutSection'), {
    ssr: false
});

const ServicesSection = dynamic(() => import('../components/ServicesSection'), {
    ssr: false
});

const ContactSection = dynamic(() => import('../components/ContactSection'), {
    ssr: false
});

const Footer = dynamic(() => import('../components/Footer'), {
    ssr: false
});

const Navbar = dynamic(() => import('../components/Navbar'), {
    ssr: false
});

export default function Home() {
    return (
        <main className="bg-[#0a0a0f] min-h-screen">
            <Navbar />
            <HeroSequence />
            <AboutSection />
            <ServicesSection />
            <ContactSection />
            <Footer />
        </main>
    );
}
