/* ===================================
   GSAP & Animation Setup
   =================================== */

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Animation frame for Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ===================================
   Hero Section Animations
   =================================== */

// Hero text reveal animation
const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTimeline
    .to('.hero-line', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
    }, '-=0.4')
    .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
    }, '-=0.6')
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 0.6,
    }, '-=0.4');

// Hero background parallax
gsap.to('.hero-background', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    },
});

// Hero resource items parallax (for your custom animation resources)
gsap.to('.placeholder-item.item-1', {
    y: -150,
    x: 50,
    rotation: 15,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    },
});

gsap.to('.placeholder-item.item-2', {
    y: -100,
    x: -50,
    rotation: -10,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    },
});

gsap.to('.placeholder-item.item-3', {
    y: -200,
    scale: 0.8,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    },
});

// Hide scroll indicator on scroll
gsap.to('.scroll-indicator', {
    opacity: 0,
    y: -20,
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'top -10%',
        scrub: true,
    },
});

/* ===================================
   Reveal Elements on Scroll
   =================================== */

// Generic reveal animation for all sections
const revealElements = gsap.utils.toArray('.reveal-element');

revealElements.forEach((element) => {
    gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
        },
    });
});

/* ===================================
   About Section Animations
   =================================== */

// Animate visual cards with parallax
gsap.to('.visual-card.card-1', {
    y: -50,
    rotation: 5,
    ease: 'none',
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
    },
});

gsap.to('.visual-card.card-2', {
    y: -80,
    rotation: -3,
    ease: 'none',
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
    },
});

gsap.to('.visual-card.card-3', {
    y: -120,
    rotation: 8,
    ease: 'none',
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
    },
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach((stat) => {
    const target = stat.textContent;
    const isPercentage = target.includes('%');
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

    ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.to(stat, {
                innerHTML: numericValue,
                duration: 2,
                ease: 'power2.out',
                snap: { innerHTML: 1 },
                onUpdate: function() {
                    stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + (isPercentage ? '%' : '+');
                },
            });
        },
    });
});

/* ===================================
   Services Section Animations
   =================================== */

// Staggered service card reveals
const serviceCards = gsap.utils.toArray('.service-card');

gsap.to(serviceCards, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
    },
});

/* ===================================
   Portfolio Section Animations
   =================================== */

// Portfolio items scale animation
const portfolioItems = gsap.utils.toArray('.portfolio-item');

portfolioItems.forEach((item) => {
    const image = item.querySelector('.portfolio-image');
    
    gsap.fromTo(image, 
        { scale: 1.2 },
        {
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
            },
        }
    );
});

/* ===================================
   Navigation Interactions
   =================================== */

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { targets: navbar, className: 'scrolled' },
    onUpdate: (self) => {
        if (self.progress > 0) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    },
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            lenis.scrollTo(targetElement, {
                offset: -80,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
    });
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.2 });
            gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.2 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });
}

/* ===================================
   Contact Section Animation
   =================================== */

gsap.to('.contact-content', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
    },
});

/* ===================================
   Custom Cursor (Optional Enhancement)
   =================================== */

// Uncomment to add custom cursor effect
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'custom-cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
});

// Add cursor styles to CSS if using custom cursor
const cursorStyles = `
    .custom-cursor,
    .custom-cursor-follower {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
    }
    
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
    
    .custom-cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
    }
`;
*/

/* ===================================
   Performance Optimization
   =================================== */

// Reduce animations on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable complex animations
    gsap.globalTimeline.timeScale(0);
    lenis.destroy();
}

// Refresh ScrollTrigger on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

/* ===================================
   Console Info
   =================================== */

console.log('%c Ani_Me ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Animated with GSAP & ScrollTrigger ', 'color: #667eea; font-size: 14px;');
console.log('%c Add your scroll animation resources in the .hero-resources section ', 'color: #888; font-style: italic;');
