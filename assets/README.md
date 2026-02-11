# Assets Directory

This directory is for your custom scroll animation resources.

## Directory Structure

```
assets/
├── images/          # Add your images here (.png, .jpg, .svg, etc.)
└── videos/          # Add your videos here (.mp4, .webm, etc.)
```

## How to Add Your Resources

### Images
1. Place your images in the `images/` folder
2. Reference them in `index.html`:
   ```html
   <img src="assets/images/your-image.png" class="placeholder-item item-1" alt="Description">
   ```

### Videos
1. Place your videos in the `videos/` folder
2. Reference them in `index.html`:
   ```html
   <video class="placeholder-item item-2" autoplay loop muted playsinline>
       <source src="assets/videos/your-video.mp4" type="video/mp4">
   </video>
   ```

### Animation Configuration

After adding your resources, customize their animations in `script.js`:

```javascript
// Example: Animate your image with parallax
gsap.to('.placeholder-item.item-1', {
    y: -150,        // Vertical movement
    x: 50,          // Horizontal movement
    rotation: 15,   // Rotation in degrees
    scale: 1.2,     // Scale factor
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,  // Smooth scrubbing
    },
});
```

## Tips for Best Results

- **Image Size**: Optimize images for web (use WebP format when possible)
- **Video Format**: Use MP4 with H.264 codec for best compatibility
- **File Size**: Keep assets under 5MB for optimal load times
- **Resolution**: Use appropriate resolution for the display size
- **Transparency**: PNG or WebP for images with transparency

## Examples

The current placeholder items in the hero section are styled with gradient backgrounds. Replace them with your actual content for a stunning visual experience!
