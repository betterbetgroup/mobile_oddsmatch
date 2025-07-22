

const MAX_WIDTH_FOR_MOBILE = 700;

// Default sales data structure
export const defaultSalesData = {
    hero: {
        title: "Transform Your Betting Into Guaranteed Profits",
        subtitle: "Join 15,000+ successful matched bettors earning consistent income with our professional tools and expert guidance",
        stats: [
            { number: "4.2M", label: "Member Profits", target: 4200000 },
            { number: "15,000", label: "Active Users", target: 15000 },
            { number: "98%", label: "Success Rate", target: 98.2 }
        ],
        primaryCTA: "Start Free Trial",
        videoUrl: "https://www.youtube.com/embed/3eEdy-7mGPQ",
        videoThumbnail: null
    },
    features: [
        {
            icon: "fas fa-calculator",
            title: "Professional Calculators",
            description: "Advanced calculators for standard, each-way, dutching, and all matched betting scenarios with real-time profit calculations"
        },
        {
            icon: "fas fa-search",
            title: "Live Odds Matching",
            description: "Real-time odds comparison across hundreds of bookmakers with instant profit calculations and alerts"
        },
        {
            icon: "fas fa-book-open",
            title: "Complete Guides Library",
            description: "Step-by-step video tutorials from beginner basics to advanced profit maximization strategies"
        },
        {
            icon: "fas fa-chart-line",
            title: "Profit Tracking Dashboard",
            description: "Monitor your earnings, track your progress, and optimize your betting strategy with detailed analytics"
        },
        {
            icon: "fas fa-users",
            title: "Expert Community",
            description: "Join our Discord community of successful matched bettors and get instant help from experts"
        },
        {
            icon: "fas fa-mobile-alt",
            title: "Mobile & Desktop Access",
            description: "Access all tools on any device, optimized for mobile and desktop use with offline capabilities"
        }
    ],
    testimonials: [
        {
            content: "I made £2,847 in my first month! The tools are incredibly easy to use and the support team helped me every step of the way. I've already paid off my credit cards!",
            author: "Sarah M.",
            role: "Premium Member since March 2024",
            profit: "£2,847",
            timeframe: "First Month"
        },
        {
            content: "These calculators are absolutely game-changing. I went from being completely confused about matched betting to making £1,500+ monthly in just 6 weeks. Best decision ever!",
            author: "David L.",
            role: "Pro Member since January 2024",
            profit: "£1,500",
            timeframe: "Monthly"
        },
        {
            content: "Best investment I've ever made. The tools literally pay for themselves within the first week. The community is incredibly supportive and the guides are crystal clear.",
            author: "Emma K.",
            role: "Premium Member since February 2024",
            profit: "£950",
            timeframe: "Weekly"
        },
        {
            content: "I was skeptical at first, but after making £89 in my very first hour, I knew this was the real deal. Now I'm earning more than my day job!",
            author: "Michael R.",
            role: "Pro Member since April 2024",
            profit: "£89",
            timeframe: "First Hour"
        },
        {
            content: "The step-by-step guidance made everything so simple. I hit my first £1,000 profit within 3 weeks and haven't looked back since.",
            author: "Lisa T.",
            role: "Premium Member since May 2024",
            profit: "£1,000",
            timeframe: "3 Weeks"
        },
        {
            content: "Amazing support team and foolproof system. I've made £3,200 so far this year and it's only getting better each month.",
            author: "James W.",
            role: "Pro Member since December 2023",
            profit: "£3,200",
            timeframe: "This Year"
        }
    ],
    pricing: [
        {
            id: "free",
            name: "Free Starter",
            price: "£0",
            features: [
                "Basic standard calculator",
                "Getting started guide",
                "Community access",
                "Email support"
            ],
            buttonText: "Get Started Free",
            featured: false
        },
        {
            id: "premium",
            name: "Premium",
            price: "£19/month",
            features: [
                "All professional calculators",
                "Live oddsmatcher tool",
                "Complete guide library",
                "Profit tracking dashboard",
                "Priority email support",
                "Mobile app access",
                "Weekly offer updates"
            ],
            buttonText: "Start 7-Day Free Trial",
            featured: true
        },
        {
            id: "pro",
            name: "Pro",
            price: "£39/month",
            features: [
                "Everything in Premium",
                "Advanced strategy guides",
                "1-on-1 coaching session",
                "Custom betting alerts",
                "API access for automation",
                "White-label tools access",
                "Priority Discord support"
            ],
            buttonText: "Go Pro Now",
            featured: false
        }
    ],
    faq: [
        {
            question: "What exactly is matched betting and is it really legal?",
            answer: "Matched betting is a completely legal technique that uses free bets and bonuses offered by bookmakers to guarantee profit. It exploits the difference between back and lay bets to eliminate risk. It's 100% legal and many people do it as their full-time income."
        },
        {
            question: "How much money can I realistically make?",
            answer: "Most beginners make £500-1,000 in their first month. Our average premium member earns £1,500-2,500 monthly, with some pro members earning £5,000+. Your earnings depend on time invested, available capital, and which offers you complete."
        },
        {
            question: "How much money do I need to get started?",
            answer: "You can start with as little as £50-100, though we recommend £200-500 for optimal results. Many members start smaller and reinvest their profits to build their betting bank over time."
        },
        {
            question: "Is there really no risk involved?",
            answer: "When done correctly following our guides, matched betting is mathematically risk-free. We provide comprehensive training, safety checks, and support to ensure you understand the process completely before you start."
        },
        {
            question: "How much time does matched betting actually take?",
            answer: "Most members spend 1-2 hours per day on matched betting. Once experienced, you can earn £25-50 per hour, making it an excellent side income or even full-time occupation for many."
        },
        {
            question: "What kind of support and training do you provide?",
            answer: "We provide 24/7 email support, live chat during business hours, an active Discord community, comprehensive video tutorials, and written guides. Premium members get priority support, and Pro members get 1-on-1 coaching sessions."
        }
    ],
    cta: {
        redirectUrl: "https://app.yourdomain.com/signup",
        customHandler: null
    }
};

export class SalesPageManager {
    constructor(salesData, shadowRoot = null) {
        this.salesData = salesData;
        this.shadowRoot = shadowRoot || document;
        this.countersAnimated = false;
        this.initializeInteractivity();
    }

    populateContent() {
        this.populateHero();
        this.populateFeatures();
        this.populateTestimonials();
        this.populatePricing();
        this.populateFAQ();
        this.initializeCounters();
        this.initializeTestimonialCarousel();
    }

    populateHero() {
        if (!this.salesData.hero) return;

        const titleElement = this.shadowRoot.getElementById('hero-title');
        const subtitleElement = this.shadowRoot.getElementById('hero-subtitle');
        const mainCTAElement = this.shadowRoot.getElementById('main-cta');

        if (titleElement) {
            titleElement.innerHTML = this.salesData.hero.title;
        }
        if (subtitleElement) {
            subtitleElement.textContent = this.salesData.hero.subtitle;
        }
        if (mainCTAElement) {
            const span = mainCTAElement.querySelector('span');
            if (span) span.textContent = this.salesData.hero.primaryCTA;
        }

        // Set up video
        if (this.salesData.hero.videoUrl) {
            const videoContainer = this.shadowRoot.getElementById('video-container');
            if (videoContainer) {
                videoContainer.addEventListener('click', () => {
                    this.playVideo(this.salesData.hero.videoUrl);
                });
            }
        }
    }

    populateFeatures() {
        if (!this.salesData.features) return;

        const featuresGrid = this.shadowRoot.getElementById('features-grid');
        if (!featuresGrid) return;

        featuresGrid.innerHTML = this.salesData.features.map(feature => `
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="${feature.icon}"></i>
                </div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `).join('');
    }

    populateTestimonials() {
        if (!this.salesData.testimonials) return;

        const testimonialsCarousel = this.shadowRoot.getElementById('testimonials-carousel');
        if (!testimonialsCarousel) return;

        // Create duplicated testimonials for seamless infinite scroll
        const duplicatedTestimonials = [...this.salesData.testimonials, ...this.salesData.testimonials];

        testimonialsCarousel.innerHTML = duplicatedTestimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    "${testimonial.content}"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">
                        ${testimonial.author.charAt(0)}
                    </div>
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.role}</p>
                        ${testimonial.profit ? `<p class="profit-highlight">Made ${testimonial.profit} ${testimonial.timeframe}</p>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    populatePricing() {
        if (!this.salesData.pricing) return;

        const pricingGrid = this.shadowRoot.getElementById('pricing-grid');
        if (!pricingGrid) return;

        pricingGrid.innerHTML = this.salesData.pricing.map(plan => `
            <div class="pricing-card ${plan.featured ? 'featured' : ''}">
                <h3 class="plan-name">${plan.name}</h3>
                <div class="plan-price">${plan.price}</div>
                <ul class="plan-features">
                    ${plan.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
                <button class="cta-primary" data-plan="${plan.id}">
                    ${plan.buttonText}
                </button>
            </div>
        `).join('');

        // Add click handlers for pricing buttons
        const pricingButtons = pricingGrid.querySelectorAll('.cta-primary');
        pricingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const planId = e.target.dataset.plan;
                this.handleCTAClick(planId);
            });
        });
    }

    populateFAQ() {
        if (!this.salesData.faq) return;

        const faqContainer = this.shadowRoot.getElementById('faq-container');
        if (!faqContainer) return;

        faqContainer.innerHTML = this.salesData.faq.map((item, index) => `
            <div class="faq-item">
                <div class="faq-question" data-faq="${index}">
                    <span>${item.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" id="faq-answer-${index}">
                    ${item.answer}
                </div>
            </div>
        `).join('');
    }

    initializeCounters() {
        const counters = this.shadowRoot.querySelectorAll('.animated-counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.countersAnimated) {
                    this.animateCounters();
                    this.countersAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounters() {
        const counters = this.shadowRoot.querySelectorAll('.animated-counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const suffix = counter.dataset.suffix || '';
            const prefix = counter.textContent.match(/£/) ? '£' : '';
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current >= target) {
                    current = target;
                    counter.textContent = `${prefix}${this.formatNumber(current)}${suffix}`;
                    return;
                }
                counter.textContent = `${prefix}${this.formatNumber(Math.floor(current))}${suffix}`;
                requestAnimationFrame(updateCounter);
            };

            updateCounter();
        });

        // Also animate the hero live counter
        const liveCounter = this.shadowRoot.querySelector('.counter-number');
        if (liveCounter) {
            this.animateLiveCounter(liveCounter);
        }
    }

    animateLiveCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 3000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                current = target;
                element.textContent = `£${this.formatNumber(current)}`;
                return;
            }
            element.textContent = `£${this.formatNumber(Math.floor(current))}`;
            requestAnimationFrame(updateCounter);
        };

        updateCounter();
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toLocaleString();
    }

    initializeTestimonialCarousel() {
        const carousel = this.shadowRoot.getElementById('testimonials-carousel');
        if (!carousel) return;

        // Pause animation on hover
        carousel.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });

        carousel.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });
    }

    initializeInteractivity() {
        // FAQ toggles
        setTimeout(() => {
            this.initializeFAQ();
            this.initializeCTAButtons();
            this.initializeVideoHandlers();
            this.initializeScrollAnimations();
        }, 100);
    }

    initializeFAQ() {
        const faqQuestions = this.shadowRoot.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqIndex = question.dataset.faq;
                const answer = this.shadowRoot.getElementById(`faq-answer-${faqIndex}`);
                const icon = question.querySelector('i');
                
                if (answer) {
                    const isActive = answer.classList.contains('active');
                    
                    // Close all other FAQ items
                    const allAnswers = this.shadowRoot.querySelectorAll('.faq-answer');
                    const allIcons = this.shadowRoot.querySelectorAll('.faq-question i');
                    
                    allAnswers.forEach(item => item.classList.remove('active'));
                    allIcons.forEach(item => {
                        item.classList.remove('fa-chevron-up');
                        item.classList.add('fa-chevron-down');
                    });
                    
                    if (!isActive) {
                        answer.classList.add('active');
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    }
                }
            });
        });
    }

    initializeCTAButtons() {
        const ctaButtons = this.shadowRoot.querySelectorAll('.cta-primary, .cta-secondary');
        
        ctaButtons.forEach(button => {
            if (!button.dataset.plan) { // Avoid double-binding pricing buttons
                button.addEventListener('click', () => {
                    this.handleCTAClick();
                });
            }
        });
    }

    initializeVideoHandlers() {
        const videoContainer = this.shadowRoot.getElementById('video-container');
        const watchDemoButton = this.shadowRoot.getElementById('watch-demo');
        
        if (videoContainer) {
            videoContainer.addEventListener('click', () => {
                this.playVideo(this.salesData.hero?.videoUrl);
            });
        }
        
        if (watchDemoButton) {
            watchDemoButton.addEventListener('click', () => {
                this.playVideo(this.salesData.hero?.videoUrl);
            });
        }
    }

    initializeScrollAnimations() {
        const animatedElements = this.shadowRoot.querySelectorAll(
            '.feature-card, .metric-card, .testimonial-card, .pricing-card, .step-item'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    playVideo(videoUrl) {
        if (!videoUrl) return;
        
        // Create modal for video
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const iframe = document.createElement('iframe');
        iframe.src = videoUrl + '?autoplay=1';
        iframe.style.cssText = `
            width: 90%;
            max-width: 800px;
            height: 56.25vw;
            max-height: 450px;
            border: none;
            border-radius: 12px;
        `;
        
        modal.appendChild(iframe);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    handleCTAClick(planId = null) {
        if (this.salesData.cta?.customHandler) {
            this.salesData.cta.customHandler(planId);
        } else if (this.salesData.cta?.redirectUrl) {
            const url = planId ? 
                `${this.salesData.cta.redirectUrl}?plan=${planId}` : 
                this.salesData.cta.redirectUrl;
            window.open(url, '_blank');
        } else {
            console.log('CTA clicked', { planId });
        }
    }

    scrollToSection(sectionId) {
        const section = this.shadowRoot.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    toggleSection(sectionId, show = true) {
        const section = this.shadowRoot.getElementById(sectionId);
        if (section) {
            section.style.display = show ? 'block' : 'none';
        }
    }

    updateElement(elementId, content, isHTML = false) {
        const element = this.shadowRoot.getElementById(elementId);
        if (element) {
            if (isHTML) {
                element.innerHTML = content;
            } else {
                element.textContent = content;
            }
        }
    }
}

// Initialize sales page function
export function initializeSalesPage(customData = {}, shadowRoot = null) {
    const salesData = { ...defaultSalesData, ...customData };
    const manager = new SalesPageManager(salesData, shadowRoot);
    
    // Populate content immediately if shadowRoot is available
    if (shadowRoot) {
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            manager.populateContent();
        }, 100);
    }
    
    return manager;
}

// Helper functions for custom element lifecycle
export function process_new_final_data(newValue, scope, state) {
    // Placeholder for processing new data
    console.log('Processing new data:', newValue);
}

export function handleResize(scope) {
    // Responsive handling if needed
    console.log('Handling resize');
}

export async function addStyles(scope, state, styles_script) {
    try {
        const response = await fetch(styles_script);
        const css = await response.text();
        
        const style = document.createElement('style');
        style.textContent = css;
        scope.appendChild(style);
        
        return true;
    } catch (error) {
        console.error('Failed to load styles:', error);
        return false;
    }
}

export async function render(scope, state, html_script) {
    try {
        const response = await fetch(html_script);
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.getElementById('outer-container-div');
        
        if (content) {
            scope.appendChild(content);
        } else {
            scope.innerHTML = html;
        }
        
        return true;
    } catch (error) {
        console.error('Failed to load HTML:', error);
        return false;
    }
}
