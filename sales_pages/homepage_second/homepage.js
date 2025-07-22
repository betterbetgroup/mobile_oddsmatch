import * as Helpers from '../main/sales_helper.js'




(function () {


    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/sales_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/sales_pages/main/styles.css';


    styles_script = '../main/styles.css'
    html_script = '../main/z.html'



class HomepageSecond extends HTMLElement {

    constructor() {

        super();

        this.attachShadow({ mode: 'open' }); 

        this.isContentLoaded = false;
        this.attributeChangeQueue = [];        
    }

    connectedCallback() {
        this.style.visibility = 'hidden';

        Helpers.render(this.shadowRoot, this.state, html_script)  
        .then(() => {
            Helpers.addStyles(this.shadowRoot, this.state, styles_script)
            .then(() => {
                this.style.visibility = 'visible'; 
                this.runSpecificScript(); 
                this.isContentLoaded = true;
                this.processQueuedAttributeChanges();
                Helpers.handleResize(this.shadowRoot);
            });
        });
    }


    static get observedAttributes() {
        return ['data-odds']; 
    }

    processQueuedAttributeChanges() {

        this.attributeChangeQueue.forEach(change => {
            this.attributeChangedCallback(change.name, change.oldValue, change.newValue);
        });
        this.attributeChangeQueue = [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.isContentLoaded) {
            if (name === 'data-odds') {
                Helpers.process_new_final_data(newValue, this.shadowRoot, this.state);
            }
        } else {
            this.attributeChangeQueue.push({ name, oldValue, newValue });
        }
    }


    



    runSpecificScript() {
        // Initialize the sales page functionality using the already imported helper
        const homepageSecondData = {
                    hero: {
                        title: "Make £2,000+ Monthly With Zero Risk",
                        subtitle: "Stop losing money on bets. Start guaranteeing profits with matched betting. Our members average £1,847 monthly profit.",
                        stats: [
                            { number: "£1,847", label: "Avg Monthly Profit" },
                            { number: "24 Hours", label: "To First Profit" },
                            { number: "Zero", label: "Risk When Done Right" }
                        ],
                        primaryCTA: "Claim Free Trial",
                        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video
                        videoThumbnail: null
                    },
                    features: [
                        {
                            icon: "fas fa-money-bill-wave",
                            title: "Guaranteed Profits",
                            description: "Mathematically eliminate risk and guarantee profits on every bet with our proven system"
                        },
                        {
                            icon: "fas fa-rocket",
                            title: "Get Started in 24 Hours",
                            description: "Complete setup and make your first guaranteed profit within 24 hours of joining"
                        },
                        {
                            icon: "fas fa-shield-alt",
                            title: "100% Legal & Safe",
                            description: "Completely legal strategy used by thousands. No gray areas, no risks to your accounts"
                        },
                        {
                            icon: "fas fa-graduation-cap",
                            title: "Beginner Friendly",
                            description: "No experience needed. Our step-by-step system works for complete beginners"
                        },
                        {
                            icon: "fas fa-headset",
                            title: "Expert Support",
                            description: "Get help from our team of matched betting experts whenever you need it"
                        },
                        {
                            icon: "fas fa-clock",
                            title: "Flexible Schedule",
                            description: "Work whenever you want. Just 1-2 hours daily can generate £1,000+ monthly"
                        }
                    ],
                    testimonials: [
                        {
                            content: "I was skeptical at first, but I made £312 in my first week! The training is so clear and the tools make everything simple. Already planning to quit my day job.",
                            author: "Tom R.",
                            role: "New Member - Week 1"
                        },
                        {
                            content: "£4,200 profit in 2 months! This isn't some get-rich-quick scheme - it's a legitimate business model that actually works. The support team is incredible.",
                            author: "Jennifer S.",
                            role: "Premium Member - 2 Months"
                        },
                        {
                            content: "I've replaced my full-time salary with matched betting. Making £3,500+ monthly working part-time hours. Best decision I ever made!",
                            author: "Paul M.",
                            role: "Pro Member - 6 Months"
                        }
                    ],
                    pricing: [
                        {
                            id: "trial",
                            name: "Free Trial",
                            price: "£0",
                            features: [
                                "7-day full access",
                                "All calculators included",
                                "Complete training library",
                                "Live support chat",
                                "Profit guarantee or refund"
                            ],
                            buttonText: "Start Free Trial",
                            featured: true
                        },
                        {
                            id: "premium",
                            name: "Premium",
                            price: "£19/month",
                            features: [
                                "Everything in trial",
                                "Advanced profit strategies",
                                "Weekly new opportunities",
                                "Priority email support",
                                "Mobile app access",
                                "Private Discord community"
                            ],
                            buttonText: "Upgrade to Premium",
                            featured: false
                        },
                        {
                            id: "pro",
                            name: "Pro Accelerator",
                            price: "£39/month",
                            features: [
                                "Everything in Premium",
                                "1-on-1 strategy sessions",
                                "Custom automation tools",
                                "Advanced market access",
                                "White-label reseller rights",
                                "Direct phone support"
                            ],
                            buttonText: "Go Pro Today",
                            featured: false
                        }
                    ],
                    faq: [
                        {
                            question: "Can I really make money with zero risk?",
                            answer: "Yes! Matched betting is mathematically guaranteed profit when done correctly. We provide complete training and safety checks to ensure you never lose money. Our system has a 98% success rate."
                        },
                        {
                            question: "How quickly will I see results?",
                            answer: "Most members make their first profit within 24-48 hours. You can realistically expect £200-500 in your first week, and £1,000+ monthly once you're up and running with our full system."
                        },
                        {
                            question: "Do I need to be good with numbers or technology?",
                            answer: "Not at all! Our calculators do all the math for you automatically. If you can use a smartphone, you can do matched betting. We have 70+ year old members making consistent profits."
                        },
                        {
                            question: "Is this just another gambling system?",
                            answer: "No - this is the opposite of gambling! Matched betting eliminates all risk and guarantees profit regardless of sports outcomes. It's a business model, not gambling."
                        },
                        {
                            question: "What if I don't have much money to start?",
                            answer: "You can start with just £50-100. Many members begin small and quickly build their betting bank from profits. We'll show you exactly how to scale up safely."
                        },
                        {
                            question: "What if this doesn't work for me?",
                            answer: "We're so confident in our system that we offer a 30-day money-back guarantee. If you don't make a profit in your first month, we'll refund every penny."
                        }
                    ],
                    cta: {
                        redirectUrl: "https://app.yourdomain.com/signup-variant",
                        customHandler: null
                    }
                };

                        // Initialize the sales page with variant data using the imported helper
        try {
            this.salesManager = Helpers.initializeSalesPage(homepageSecondData, this.shadowRoot);
            
            // Hide testimonials section for this variant (A/B testing)
            setTimeout(() => {
                this.salesManager.toggleSection('testimonials-section', false);
            }, 200);
            
            console.log('Homepage second variant initialized successfully');
        } catch (error) {
            console.error('Failed to load sales page functionality:', error);
        }
    }



}

customElements.define('homepage-second', HomepageSecond);

})();
