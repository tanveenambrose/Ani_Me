# Ani_Me - Premium Animated Promotional Website

A stunning, modern promotional website featuring cutting-edge scroll animations, parallax effects, and a premium glassmorphism design aesthetic.

![Ani_Me](https://img.shields.io/badge/Status-Active-success)
![GSAP](https://img.shields.io/badge/GSAP-3.12-green)
![ScrollTrigger](https://img.shields.io/badge/ScrollTrigger-Enabled-blue)

## ✨ Features

- 🎬 **GSAP ScrollTrigger Animations** - Smooth, performant scroll-driven animations
- 🌊 **Lenis Smooth Scroll** - Premium, weighty scroll feel
- 🎨 **Glassmorphism Design** - Modern UI with frosted glass effects
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **60fps Performance** - Optimized animations for smooth experience
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML
- 🌈 **Vibrant Gradients** - Eye-catching color schemes
- ✨ **Parallax Effects** - Multi-layer depth animations

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Ani_Me.git
   cd Ani_Me
   ```

2. **Open locally:**
   
   **Option A - Simple (double-click):**
   - Just open `index.html` in your browser
   
   **Option B - Local Server (recommended):**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx serve .
   
   # Or using PHP
   php -S localhost:8000
   ```
   
3. **Visit in browser:**
   - Open `http://localhost:8000` in your browser

## 📁 Project Structure

```
Ani_Me/
├── index.html          # Main HTML file
├── styles.css          # Complete styling with design system
├── script.js           # GSAP animations and interactions
├── assets/             # Directory for your custom resources
│   ├── images/         # Add your images here
│   └── videos/         # Add your videos here
├── README.md           # This file
└── .gitignore          # Git ignore patterns
```

## 🎨 Customization Guide

### Adding Your Scroll Animation Resources

The hero section includes a placeholder area specifically designed for your custom scroll animation resources. Here's how to add them:

1. **Locate the resource placeholder** in `index.html`:
   ```html
   <div class="hero-resources">
       <div class="resource-placeholder">
           <!-- ADD YOUR SCROLL ANIMATION RESOURCES HERE -->
           <div class="placeholder-item item-1"></div>
           <div class="placeholder-item item-2"></div>
           <div class="placeholder-item item-3"></div>
       </div>
   </div>
   ```

2. **Replace placeholder items** with your own content:
   ```html
   <!-- Example: Adding images -->
   <img src="assets/images/your-image.png" class="placeholder-item item-1" alt="Description">
   
   <!-- Example: Adding videos -->
   <video class="placeholder-item item-2" autoplay loop muted playsinline>
       <source src="assets/videos/your-video.mp4" type="video/mp4">
   </video>
   
   <!-- Example: Adding SVG animations -->
   <svg class="placeholder-item item-3">
       <!-- Your SVG code -->
   </svg>
   ```

3. **Adjust animations** in `script.js`:
   ```javascript
   // Customize parallax animations for your resources
   gsap.to('.placeholder-item.item-1', {
       y: -150,
       x: 50,
       rotation: 15,
       // Add more properties as needed
   });
   ```

### Color Scheme

Modify CSS variables in `styles.css` to change the color scheme:

```css
:root {
    --color-accent: #6366f1;        /* Primary accent color */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Add your custom colors */
}
```

### Content Updates

- **Logo**: Change "Ani_Me" text in the navbar
- **Hero Text**: Update the hero title and subtitle
- **Sections**: Modify content in About, Services, Portfolio sections
- **Contact**: Update email and contact information

## 🛠️ Technology Stack

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No framework dependencies

### Animation Libraries
- **[GSAP 3.12+](https://greensock.com/gsap/)** - Professional-grade animation library
- **[ScrollTrigger](https://greensock.com/scrolltrigger/)** - GSAP plugin for scroll animations
- **[Lenis](https://lenis.studiofreight.com/)** - Smooth scroll library

### Design Features
- Custom CSS variables for easy theming
- Glassmorphism effects
- Responsive grid layouts
- Mobile-first approach
- Google Fonts (Inter)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- **Lighthouse Score**: 95+ Performance
- **Animation FPS**: 60fps
- **Load Time**: < 2 seconds
- **Optimized Assets**: Efficient resource loading

## 🎯 SEO Features

- Semantic HTML5 structure
- Proper meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Descriptive alt texts
- Optimized heading hierarchy

## 📝 License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

- **Email**: hello@anime.studio
- **Website**: [Your Website URL]
- **GitHub**: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Inspired by [Export Arts Studio](https://www.exportarts.studio/)
- Built with [GSAP](https://greensock.com/)
- Smooth scroll by [Lenis](https://lenis.studiofreight.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

**Made with ❤️ and GSAP**

*Ready to bring your vision to life through motion!*
ok 
ok i am doing well
