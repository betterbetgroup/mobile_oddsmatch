# Sales Pages System

A comprehensive sales page system for matched betting websites with beautiful, modern designs and full customization capabilities.

## Structure Overview

```
sales_pages/
├── main/
│   ├── z.html          # Main template with all sections
│   ├── styles.css      # Responsive CSS (desktop >700px, mobile <699px)
│   └── sales_helper.js # Content management & interactivity
├── homepage/
│   ├── index.html      # Standard homepage variant
│   └── homepage.js     # Custom element implementation
├── homepage_second/
│   ├── index.html      # Alternative homepage for A/B testing
│   └── homepage.js     # Different messaging/content
└── README.md
```

## Features

### 🎨 Modern Design
- Futuristic theme matching your dashboard aesthetics
- Beautiful gradients, shadows, and animations
- Responsive design for desktop and mobile
- Smooth scroll animations and hover effects

### 📱 Fully Responsive
- Desktop optimized (>700px)
- Mobile optimized (<699px)
- Automatic scaling and layout adjustments
- Touch-friendly interface

### 🔧 Highly Customizable
- Dynamic content population
- Modular section system
- Easy A/B testing capabilities
- Configurable CTA actions

### 📄 Complete Sales Sections
- Hero section with video placeholder
- Trust indicators
- Feature showcase
- How it works steps
- Customer testimonials
- Pricing plans
- FAQ with accordion
- Final CTA section

## How to Use

### 1. Basic Implementation

Each sales page is a custom web component that can be embedded in your Wix site:

```html
<!-- For main homepage -->
<home-page></home-page>

<!-- For alternative homepage -->
<homepage-second></homepage-second>
```

### 2. Creating New Sales Pages

1. Create a new directory in `sales_pages/`
2. Copy the structure from `homepage/`
3. Modify the content data in the JavaScript file
4. Update the custom element name

Example for a new "pro-membership" page:

```javascript
class ProMembershipPage extends HTMLElement {
    // ... same structure as homepage.js
    
    runSpecificScript() {
        import('../main/sales_helper.js')
            .then(({ initializeSalesPage }) => {
                const proMembershipData = {
                    hero: {
                        title: "Unlock Pro-Level Profits",
                        subtitle: "Advanced strategies for experienced matched bettors",
                        // ... custom content
                    },
                    // ... customize all sections
                };
                
                this.salesManager = initializeSalesPage(proMembershipData);
            });
    }
}

customElements.define('pro-membership-page', ProMembershipPage);
```

### 3. Content Customization

The sales helper accepts a data object with these sections:

```javascript
const salesData = {
    hero: {
        title: "Main headline",
        subtitle: "Supporting text",
        stats: [
            { number: "£4.2M+", label: "Member Profits" },
            // ... more stats
        ],
        primaryCTA: "Button text",
        videoUrl: "YouTube embed URL",
        videoThumbnail: "Image URL"
    },
    features: [
        {
            icon: "fas fa-calculator", // Font Awesome class
            title: "Feature name",
            description: "Feature description"
        }
        // ... more features
    ],
    testimonials: [
        {
            content: "Customer quote",
            author: "Customer name",
            role: "Customer title"
        }
        // ... more testimonials
    ],
    pricing: [
        {
            id: "plan-id",
            name: "Plan name",
            price: "£19/month",
            features: ["Feature 1", "Feature 2"],
            buttonText: "CTA text",
            featured: true // Highlights this plan
        }
        // ... more plans
    ],
    faq: [
        {
            question: "Question text",
            answer: "Answer text"
        }
        // ... more FAQ items
    ],
    cta: {
        redirectUrl: "https://signup.com",
        customHandler: function() { /* custom action */ }
    }
};
```

### 4. Section Management

You can show/hide sections dynamically:

```javascript
// Hide testimonials section
this.salesManager.toggleSection('testimonials-section', false);

// Show pricing section
this.salesManager.toggleSection('pricing-section', true);
```

### 5. A/B Testing

Create multiple variants with different:
- Messaging and headlines
- Section visibility
- Pricing structures
- Call-to-action text

Example variations already implemented:
- `homepage/` - Professional, feature-focused
- `homepage_second/` - Aggressive, profit-focused

## Styling Customization

### Color Scheme
Main colors defined in CSS variables:
```css
--sales-primary-color: #ff00c6;
--sales-secondary-color: #b300ff;
--sales-accent-color: #00ffff;
```

### Typography
Responsive font sizes using CSS variables:
```css
--sales-font-size-hero-title: 3.5rem; /* Desktop */
--sales-font-size-hero-title: 2.5rem; /* Mobile */
```

## Technical Details

### Dependencies
- Font Awesome 6.7.2 (for icons)
- Inter font (for typography)
- ES6 modules support

### Browser Support
- Modern browsers with shadow DOM support
- ES6 module support required
- Responsive design for all screen sizes

### Performance
- Lazy loading of content
- Smooth animations with CSS transforms
- Optimized for mobile devices

## Best Practices

1. **Content**: Keep headlines benefit-focused
2. **CTAs**: Use action-oriented button text
3. **Social Proof**: Include real testimonials and stats
4. **Mobile**: Test on actual mobile devices
5. **A/B Testing**: Compare different messaging approaches

## Future Enhancements

Potential additions:
- Video integration with actual player
- Form capture integration
- Analytics tracking
- More animation effects
- Additional section types (comparison tables, etc.)

## Support

The system is designed to be:
- Easy to modify and extend
- Compatible with your existing codebase structure
- Maintainable with clear separation of concerns

For questions or modifications, refer to the individual component files and the sales helper documentation. 