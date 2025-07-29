

const MAX_WIDTH_FOR_MOBILE = 700;




// Default sales data structure
export const defaultSalesData = {
    hero: {
        title: "Transform Your Betting <span class='gradient-text'>Profits</span>",
        subtitle: "Join 15,000+ successful matched bettors earning consistent income with our professional tools and expert guidance",
        primaryCTA: {
            text: "Start Free Trial",
            icon: "fas fa-rocket"
        },
        watchDemo: {
            text: "Watch Demo",
            icon: "fas fa-play"
        },
        socialProof: {
            stars: 5,
            rating: "4.9/5",
            reviewCount: "1,350+",
            text: "reviews"
        },
        successCards: [
            {
                amount: "£2,847",
                text: "Sarah M. - This month"
            },
            {
                amount: "£1,456", 
                text: "David L. - Last week"
            },
            {
                amount: "£894",
                text: "Emma K. - Yesterday"
            }
        ],
        bulletPoints: [
            "Watch the Demo Video to Learn the Basics",
            "Use Our Tutorial to Complete Your First Offer", 
            "Repeat the Process to Earn More"
        ],
        videoUrl: "https://www.youtube.com/embed/3eEdy-7mGPQ",
        videoThumbnail: null
    },
    whatIs: {
        header: {
            title: "What <span class='highlight-text'>is</span> Matched Betting?",
            sectionLabel: null
        },
        explanation: {
            mainText: "Matched Betting is a way of turning bookmaker free bets into cash. We do this by placing multiple bets on the same event to make sure we cover every possible outcome, and we use free bets to lock in a guaranteed profit - as long as you do it correctly!",
            keyBenefit: {
                text: "That's right, ",
                highlight: "win, lose or draw, you'll make money!"
            },
            trustStatement: "People all over the UK choose and trust Better Bet to learn about matched betting. We've already taught over 15,000 people how to do it, making us the <strong>#1 Matched Betting service.</strong>"
        },
        features: [
            {
                title: "Complete Training",
                description: "Step-by-step guides from beginner to advanced strategies"
            },
            {
                title: "Professional Calculators", 
                description: "Calculate exact bets and guaranteed profits instantly"
            },
            {
                title: "Live Odds Matcher",
                description: "Find the best opportunities automatically, updated in real-time"
            }
        ],
        cta: {
            text: "Start My Free Trial",
            icon: "fas fa-rocket"
        },
        visual: {
            screenTitle: "Better Bet",
            calculator: {
                rows: [
                    { label: "Back Stake:", value: "£50.00" },
                    { label: "Lay Stake:", value: "£48.78" },
                    { label: "Profit:", value: "£8.45", success: true }
                ],
                buttons: [
                    { text: "Calculate", primary: true },
                    { text: "Clear", secondary: true }
                ]
            },
            notification: {
                icon: "fas fa-check-circle",
                title: "Profit Guaranteed!",
                amount: "+£8.45"
            }
        }
    },
    testimonials: {
        header: {
            title: "See What Our <span class='gradient-text'>Members Say</span>",
            subtitle: "Check out what our community is saying about their matched betting journey"
        },
        heroTestimonial: {
            quote: "I've made over £4,200 in 6 months using Better Bet. The tools are professional grade and the support is incredible. This genuinely changed my life.",
            author: {
                name: "James S.",
                avatar: "JS",
                avatarSrc: "",
                profit: "+£4,200 profit",
                verified: "✓ Verified Member"
            },
            profits: [
                { label: "This Month", amount: "£687" },
                { label: "Total Earnings", amount: "£4,200" },
                { label: "Success Rate", amount: "98%" }
            ]
        },
        cards: [
            {
                rating: 5,
                date: "2 days ago",
                content: "Made £247 in my first week. The step-by-step guides made it so easy!",
                author: {
                    name: "Emma M.",
                    avatar: "EM",
                    profit: "+£247"
                }
            },
            {
                rating: 5,
                date: "5 days ago", 
                content: "Best investment decision I've made. Paying for itself every single day.",
                author: {
                    name: "David L.",
                    avatar: "DL",
                    profit: "+£1,890"
                }
            },
            {
                rating: 5,
                date: "1 week ago",
                content: "The calculators are incredible. Takes all the guesswork out of matched betting.",
                author: {
                    name: "Sophie R.",
                    avatar: "SR", 
                    profit: "+£456"
                }
            },
            {
                rating: 5,
                date: "1 week ago",
                content: "Support team helped me through everything. Made my first profit in 3 hours!",
                author: {
                    name: "Mike T.",
                    avatar: "MT",
                    profit: "+£78"
                }
            },
            {
                rating: 5,
                date: "2 weeks ago",
                content: "£500+ monthly now. This platform changed my financial situation completely.",
                author: {
                    name: "Anna L.",
                    avatar: "AL",
                    profit: "+£2,100"
                }
            },
            {
                rating: 5,
                date: "3 weeks ago",
                content: "Perfect for beginners. Everything is explained clearly with video tutorials.",
                author: {
                    name: "Rachel K.",
                    avatar: "RK",
                    profit: "+£334"
                }
            }
        ]
    },
    getStarted: {
        companyIntro: {
            title: "Better Bet: Your <span class='gradient-text'>Complete Matched Betting Solution</span>",
            description: "We're the UK's leading matched betting platform, providing everything you need to turn bookmaker offers into guaranteed profits. With our professional tools, expert guidance, and proven system, we've helped over 15,000 members earn consistent income from matched betting."
        },
        steps: {
            header: {
                title: "How It Works",
                subtitle: "3 simple steps to start earning guaranteed profits"
            },
            list: [
                {
                    number: 1,
                    icon: "fas fa-play-circle",
                    title: "Watch Demo & Get Free Trial",
                    time: "5 min",
                    description: "See exactly how matched betting works with our demo video, then get instant access to all our professional tools with your free 7-day trial.",
                    features: [
                        { icon: "fas fa-check", text: "Instant platform access" },
                        { icon: "fas fa-check", text: "Video tutorials included" },
                        { icon: "fas fa-check", text: "No credit card required" }
                    ]
                },
                {
                    number: 2,
                    icon: "fas fa-calculator",
                    title: "Place Your First Bet",
                    time: "30 min",
                    description: "Use our professional calculators to complete your first matched bet. Our tools do all the complex math while you follow simple step-by-step instructions.",
                    features: [
                        { icon: "fas fa-check", text: "Guaranteed profit calculation" },
                        { icon: "fas fa-check", text: "Live support available" },
                        { icon: "fas fa-check", text: "Safety checks included" }
                    ]
                },
                {
                    number: 3,
                    icon: "fas fa-chart-line",
                    title: "Scale Your Earnings",
                    time: "Ongoing",
                    description: "Follow our weekly profitable offers and advanced strategies to consistently scale your earnings. Most active members earn £300-500+ monthly.",
                    features: [
                        { icon: "fas fa-check", text: "Weekly profitable offers" },
                        { icon: "fas fa-check", text: "Advanced strategies" },
                        { icon: "fas fa-check", text: "Profit tracking tools" }
                    ]
                }
            ],
            cta: {
                text: "Start My Free Trial",
                icon: "fas fa-rocket"
            }
        }
    },
    trust: {
        header: {
            title: "Trusted by <span class='animated-counter trust-member-count' data-target='15000'>0</span>+ Successful Members",
            subtitle: "Join the UK's most trusted matched betting community"
        },
        stats: [
            {
                value: "£4.2M+",
                label: "Member Profits This Year",
                target: 4200000,
                featured: true
            },
            {
                value: "98%", 
                label: "Guaranteed Success Rate",
                target: 98
            },
            {
                value: "24hrs",
                label: "Average Time to Profit", 
                target: 24
            }
        ],
        indicators: [
            {
                icon: "fa-solid fa-gavel",
                text: "100% Legal & Regulated"
            },
            {
                icon: "fas fa-lock",
                text: "Bank-Level Security"
            },
            {
                icon: "fas fa-headset",
                text: "24/7 Expert Support"
            },
            {
                icon: "fas fa-undo-alt",
                text: "30-Day Money Back"
            }
        ],
        liveActivity: {
            memberCount: "247",
            timeframe: "24 hours",
            totalAmount: "+£18,423"
        }
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
    featuresSection: {
        header: {
            title: "Everything You Need to <span class='gradient-text'>Succeed</span>",
            subtitle: "Professional-grade tools and guidance designed for maximum profits"
        }
    },
    problemSolution: {
        header: {
            title: "Tired of <span class='danger-text'>Losing Money</span> on Sports Betting?",
            subtitle: "Stop gambling with your money and start using mathematics to guarantee profits"
        },
        problem: {
            title: "Traditional Betting Problems",
            items: [
                {
                    icon: "fas fa-times-circle",
                    text: "Unpredictable outcomes = lost money"
                },
                {
                    icon: "fas fa-times-circle", 
                    text: "Emotional decisions lead to big losses"
                },
                {
                    icon: "fas fa-times-circle",
                    text: "No guaranteed way to profit"
                },
                {
                    icon: "fas fa-times-circle",
                    text: "Complex strategies that don't work"
                }
            ]
        },
        solution: {
            title: "Our Mathematical Solution",
            items: [
                {
                    icon: "fas fa-check-circle",
                    text: "100% guaranteed profits every time"
                },
                {
                    icon: "fas fa-check-circle",
                    text: "Mathematical certainty, not luck"
                },
                {
                    icon: "fas fa-check-circle", 
                    text: "Risk-free matched betting system"
                },
                {
                    icon: "fas fa-check-circle",
                    text: "Start earning from day one"
                }
            ]
        }
    },
    howItWorks: {
        header: {
            title: "How It Works",
            subtitle: "Three simple steps to start earning guaranteed profits today"
        },
        steps: [
            {
                number: 1,
                title: "Sign Up & Get Instant Access",
                description: "Access our professional calculators, oddsmatcher tools, and complete guide library instantly",
                features: [
                    "✓ Professional calculators",
                    "✓ Live oddsmatcher", 
                    "✓ Complete tutorials"
                ]
            },
            {
                number: 2,
                title: "Follow Our Proven System",
                description: "Use our step-by-step guides to complete your first profitable matched bet within 24 hours",
                features: [
                    "✓ Video walkthroughs",
                    "✓ Live chat support",
                    "✓ Safety checks"
                ]
            },
            {
                number: 3,
                title: "Scale Your Profits", 
                description: "Increase your betting bank and profits using our advanced strategies and ongoing offers",
                features: [
                    "✓ Advanced strategies",
                    "✓ Weekly offers",
                    "✓ Profit tracking"
                ]
            }
        ]
    },
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
    faqSection: {
        header: {
            title: "Frequently Asked Questions",
            subtitle: "Everything you need to know about matched betting success"
        }
    },
    finalCTA: {
        urgencyBanner: {
            icon: "fas fa-fire",
            text: "Limited Time: Free Trial + Bonus Training Worth £297"
        },
        title: "Ready to Start Your <span class='gradient-text'>Profit Journey?</span>",
        subtitle: "Join 15,000+ successful matched bettors earning £1,000+ monthly with guaranteed profits",
        primaryButton: {
            text: "Start Free Trial",
            icon: "fas fa-rocket"
        },
        guarantee: {
            icon: "fas fa-lock",
            text: "7-day free trial • Cancel anytime"
        },
        trustBadges: [
            {
                icon: "fas fa-users",
                text: "15,000+ Happy Members"
            },
            {
                icon: "fas fa-star",
                text: "4.9/5 Rating"
            },
            {
                icon: "fas fa-shield-alt",
                text: "100% Secure"
            },
            {
                icon: "fas fa-credit-card",
                text: "SSL Protected"
            }
        ]
    },
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
        this.populateWhatIs();
        this.populateTestimonials();
        this.populateGetStarted();
        this.populateTrust();
        this.populateFeatures();
        this.populateProblemSolution();
        this.populateHowItWorks();
        this.populatePricing();
        this.populateFAQ();
        this.populateFinalCTA();
        this.initializeCounters();
        this.initializeTestimonialCarousel();
        
        // Initialize all interactivity after content is populated
        setTimeout(() => {
            this.initializeFAQ();
            this.initializeCTAButtons();
            this.initializeVideoHandlers();
            this.initializeScrollAnimations();
        }, 50);
    }

    populateHero() {
        if (!this.salesData.hero) return;

        const titleElement = this.shadowRoot.getElementById('hero-title');
        const subtitleElement = this.shadowRoot.getElementById('hero-subtitle');
        const mainCTAElement = this.shadowRoot.getElementById('main-cta');
        const watchDemoElement = this.shadowRoot.getElementById('watch-demo');

        if (titleElement) {
            titleElement.innerHTML = this.salesData.hero.title;
        }
        if (subtitleElement) {
            subtitleElement.textContent = this.salesData.hero.subtitle;
        }
        if (mainCTAElement) {
            const span = mainCTAElement.querySelector('span');
            const icon = mainCTAElement.querySelector('i');
            if (span) span.textContent = this.salesData.hero.primaryCTA.text;
            if (icon) icon.className = this.salesData.hero.primaryCTA.icon;
        }
        if (watchDemoElement) {
            const span = watchDemoElement.querySelector('span');
            const icon = watchDemoElement.querySelector('i');
            if (span) span.textContent = this.salesData.hero.watchDemo.text;
            if (icon) icon.className = this.salesData.hero.watchDemo.icon;
        }

        // Populate social proof
        this.populateHeroSocialProof();
        
        // Populate success cards
        this.populateHeroSuccessCards();

        // Set up auto-playing video
        if (this.salesData.hero.videoUrl) {
            const videoContainer = this.shadowRoot.getElementById('video-container');
            if (videoContainer) {
                this.setupAutoPlayVideo(videoContainer, this.salesData.hero.videoUrl);
            }
        }

        // Populate bullet points
        this.populateHeroBulletPoints();
    }

    populateHeroSocialProof() {
        if (!this.salesData.hero?.socialProof) return;

        const socialProofElement = this.shadowRoot.querySelector('.social-proof .rating-stars');
        if (!socialProofElement) return;

        const proof = this.salesData.hero.socialProof;
        const starsHTML = Array(proof.stars).fill('<i class="fas fa-star"></i>').join('');
        const spanElement = socialProofElement.querySelector('span');
        
        // Update stars
        const starsContainer = socialProofElement;
        const currentStars = starsContainer.querySelectorAll('i');
        currentStars.forEach(star => star.remove());
        starsContainer.insertAdjacentHTML('afterbegin', starsHTML);
        
        // Update text
        if (spanElement) {
            spanElement.textContent = `${proof.rating} from ${proof.reviewCount} ${proof.text}`;
        }
    }

    populateHeroSuccessCards() {
        if (!this.salesData.hero?.successCards) return;

        const successCardsContainer = this.shadowRoot.querySelector('.success-cards-below');
        if (!successCardsContainer) return;

        successCardsContainer.innerHTML = this.salesData.hero.successCards.map((card, index) => `
            <div class="success-card card-${index + 1}">
                <div class="success-amount">${card.amount}</div>
                <div class="success-text">${card.text}</div>
            </div>
        `).join('');
    }

    populateWhatIs() {
        if (!this.salesData.whatIs) return;

        // Header
        const headerElement = this.shadowRoot.querySelector('.what-is-header h2');
        if (headerElement) {
            headerElement.innerHTML = this.salesData.whatIs.header.title;
        }

        // Main explanation
        const mainExplanationElement = this.shadowRoot.querySelector('.main-explanation');
        if (mainExplanationElement) {
            mainExplanationElement.textContent = this.salesData.whatIs.explanation.mainText;
        }

        // Key benefit
        const benefitTextElement = this.shadowRoot.querySelector('.benefit-text');
        const benefitHighlightElement = this.shadowRoot.querySelector('.benefit-highlight');
        if (benefitTextElement && benefitHighlightElement) {
            benefitTextElement.textContent = this.salesData.whatIs.explanation.keyBenefit.text;
            benefitHighlightElement.textContent = this.salesData.whatIs.explanation.keyBenefit.highlight;
        }

        // Trust statement
        const trustStatementElement = this.shadowRoot.querySelector('.trust-statement');
        if (trustStatementElement) {
            trustStatementElement.innerHTML = this.salesData.whatIs.explanation.trustStatement;
        }

        // Features
        const featuresContainer = this.shadowRoot.querySelector('.what-is-features');
        if (featuresContainer) {
            featuresContainer.innerHTML = this.salesData.whatIs.features.map(feature => `
                <div class="feature-item">
                    <div class="feature-content">
                        <h4>${feature.title}</h4>
                        <p>${feature.description}</p>
                    </div>
                </div>
            `).join('');
        }

        // CTA
        const ctaElement = this.shadowRoot.getElementById('what-is-cta');
        if (ctaElement) {
            const span = ctaElement.querySelector('span');
            const icon = ctaElement.querySelector('i');
            if (span) span.textContent = this.salesData.whatIs.cta.text;
            if (icon) icon.className = this.salesData.whatIs.cta.icon;
        }

        // Visual elements
        this.populateWhatIsVisual();
    }

    populateWhatIsVisual() {
        if (!this.salesData.whatIs?.visual) return;

        // Screen title
        const screenTitleElement = this.shadowRoot.querySelector('.screen-title');
        if (screenTitleElement) {
            screenTitleElement.textContent = this.salesData.whatIs.visual.screenTitle;
        }

        // Calculator interface
        const calculatorElement = this.shadowRoot.querySelector('.calculator-interface');
        if (calculatorElement && this.salesData.whatIs.visual.calculator) {
            const rowsHTML = this.salesData.whatIs.visual.calculator.rows.map(row => `
                <div class="calc-row ${row.success ? 'highlight' : ''}">
                    <span class="calc-label">${row.label}</span>
                    <span class="calc-value ${row.success ? 'success' : ''}">${row.value}</span>
                </div>
            `).join('');
            calculatorElement.innerHTML = rowsHTML;
        }

        // Buttons
        const buttonsContainer = this.shadowRoot.querySelector('.interface-buttons');
        if (buttonsContainer && this.salesData.whatIs.visual.calculator?.buttons) {
            const buttonsHTML = this.salesData.whatIs.visual.calculator.buttons.map(button => `
                <div class="${button.primary ? 'btn-calculate' : 'btn-secondary'}">${button.text}</div>
            `).join('');
            buttonsContainer.innerHTML = buttonsHTML;
        }

        // Notification
        const notificationElement = this.shadowRoot.querySelector('.success-notification');
        if (notificationElement && this.salesData.whatIs.visual.notification) {
            const notification = this.salesData.whatIs.visual.notification;
            notificationElement.innerHTML = `
                <div class="notification-icon">
                    <i class="${notification.icon}"></i>
                </div>
                <div class="notification-text">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-amount">${notification.amount}</div>
                </div>
            `;
        }
    }

    populateTestimonials() {
        if (!this.salesData.testimonials) return;

        // Header
        const headerTitleElement = this.shadowRoot.querySelector('.testimonials-header h2');
        const headerSubtitleElement = this.shadowRoot.querySelector('.testimonials-header p');
        
        if (headerTitleElement) {
            headerTitleElement.innerHTML = this.salesData.testimonials.header.title;
        }
        if (headerSubtitleElement) {
            headerSubtitleElement.textContent = this.salesData.testimonials.header.subtitle;
        }

        // Hero testimonial
        this.populateHeroTestimonial();

        // Testimonial cards
        this.populateTestimonialCards();
    }

    populateHeroTestimonial() {
        if (!this.salesData.testimonials?.heroTestimonial) return;

        const hero = this.salesData.testimonials.heroTestimonial;
        
        // Quote
        const quoteElement = this.shadowRoot.querySelector('.hero-testimonial-content h3');
        if (quoteElement) {
            quoteElement.textContent = hero.quote;
        }

        // Author info
        const authorNameElement = this.shadowRoot.querySelector('.hero-author-info h4');
        const profitElement = this.shadowRoot.querySelector('.profit');
        const verifiedElement = this.shadowRoot.querySelector('.verified');
        const avatarElement = this.shadowRoot.querySelector('.hero-avatar img');
        if (avatarElement) avatarElement.src = hero.author.avatarSrc;
        console.log(hero.author.avatarSrc);

        if (authorNameElement) authorNameElement.textContent = hero.author.name;
        if (profitElement) profitElement.textContent = hero.author.profit;
        if (verifiedElement) verifiedElement.textContent = hero.author.verified;
        if (avatarElement) avatarElement.alt = hero.author.avatar;

        // Profits showcase
        const profitsContainer = this.shadowRoot.querySelector('.profit-showcase');
        if (profitsContainer) {
            profitsContainer.innerHTML = hero.profits.map(profit => `
                <div class="profit-item">
                    <span class="profit-label">${profit.label}</span>
                    <span class="profit-amount">${profit.amount}</span>
                </div>
            `).join('');
        }
    }

    populateTestimonialCards() {
        if (!this.salesData.testimonials?.cards) return;

        const cardsContainer = this.shadowRoot.querySelector('.testimonials-grid');
        if (!cardsContainer) return;

        cardsContainer.innerHTML = this.salesData.testimonials.cards.map(card => {
            const starsHTML = Array(card.rating).fill('★').join('');
            return `
                <div class="testimonial-card">
                    <div class="testimonial-rating">
                        <span class="stars">${starsHTML}</span>
                        <span class="date">${card.date}</span>
                    </div>
                    <p>"${card.content}"</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="${card.author.avatarSrc}" alt="${card.author.name}" />
                        </div>
                        <div class="author-info">
                            <h5>${card.author.name}</h5>
                            <span class="profit-tag">${card.author.profit}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    populateGetStarted() {
        if (!this.salesData.getStarted) return;

        // Company intro
        const introTitleElement = this.shadowRoot.querySelector('.intro-content h2');
        const introDescElement = this.shadowRoot.querySelector('.intro-description');
        
        if (introTitleElement) {
            introTitleElement.innerHTML = this.salesData.getStarted.companyIntro.title;
        }
        if (introDescElement) {
            introDescElement.textContent = this.salesData.getStarted.companyIntro.description;
        }

        // Steps header
        const stepsHeaderTitleElement = this.shadowRoot.querySelector('.steps-header h3');
        const stepsHeaderSubtitleElement = this.shadowRoot.querySelector('.steps-header p');
        
        if (stepsHeaderTitleElement) {
            stepsHeaderTitleElement.textContent = this.salesData.getStarted.steps.header.title;
        }
        if (stepsHeaderSubtitleElement) {
            stepsHeaderSubtitleElement.textContent = this.salesData.getStarted.steps.header.subtitle;
        }

        // Steps list
        this.populateStepsList();
    }

    populateStepsList() {
        if (!this.salesData.getStarted?.steps?.list) return;

        const stepsContainer = this.shadowRoot.querySelector('.steps-list');
        if (!stepsContainer) return;

        let stepsHTML = '';
        
        this.salesData.getStarted.steps.list.forEach((step, index) => {
            const featuresHTML = step.features.map(feature => `
                <span><i class="${feature.icon}"></i> ${feature.text}</span>
            `).join('');

            stepsHTML += `
                <div class="step">
                    <div class="step-number">
                        <span class="number">${step.number}</span>
                        <i class="${step.icon} step-icon"></i>
                    </div>
                    <div class="step-content">
                        <div class="step-header">
                            <h4>${step.title}</h4>
                            <span class="step-time">${step.time}</span>
                        </div>
                        <p>${step.description}</p>
                        <div class="step-features">
                            ${featuresHTML}
                        </div>
                    </div>
                </div>
            `;

            if (index < this.salesData.getStarted.steps.list.length - 1) {
                stepsHTML += '<div class="step-connector"></div>';
            }
        });

        // Add CTA
        stepsHTML += `
            <div class="step-section-cta">
                <button class="cta-primary glow-effect" id="step-cta">
                    <span>${this.salesData.getStarted.steps.cta.text}</span>
                    <i class="${this.salesData.getStarted.steps.cta.icon}"></i>
                    <div class="button-shine"></div>
                </button>
            </div>
        `;

        stepsContainer.innerHTML = stepsHTML;
    }

    populateTrust() {
        if (!this.salesData.trust) return;

        // Header
        const headerTitleElement = this.shadowRoot.querySelector('.trust-header h3');
        const headerSubtitleElement = this.shadowRoot.querySelector('.trust-header p');
        
        if (headerTitleElement) {
            headerTitleElement.innerHTML = this.salesData.trust.header.title;
        }
        if (headerSubtitleElement) {
            headerSubtitleElement.textContent = this.salesData.trust.header.subtitle;
        }

        // Stats
        const statsContainer = this.shadowRoot.querySelector('.trust-stats-grid');
        if (statsContainer) {
            statsContainer.innerHTML = this.salesData.trust.stats.map(stat => `
                <div class="stat-item ${stat.featured ? 'featured' : ''}">
                    <div class="stat-value">${stat.value}</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `).join('');
        }

        // Trust indicators
        const indicatorsContainer = this.shadowRoot.querySelector('.trust-indicators');
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = this.salesData.trust.indicators.map(indicator => `
                <div class="trust-indicator">
                    <i class="${indicator.icon}"></i>
                    <span>${indicator.text}</span>
                </div>
            `).join('');
        }

        // Live activity
        const activityElement = this.shadowRoot.querySelector('.live-activity-banner .activity-text');
        const activityAmountElement = this.shadowRoot.querySelector('.live-activity-banner .activity-amount');
        
        if (activityElement) {
            activityElement.innerHTML = `<strong>${this.salesData.trust.liveActivity.memberCount} members</strong> earned profits in the last ${this.salesData.trust.liveActivity.timeframe}`;
        }
        if (activityAmountElement) {
            activityAmountElement.textContent = `${this.salesData.trust.liveActivity.totalAmount} total`;
        }
    }

    populateProblemSolution() {
        if (!this.salesData.problemSolution) return;

        // Header
        const headerElement = this.shadowRoot.querySelector('.problem-solution-section .section-header');
        if (headerElement) {
            const titleElement = headerElement.querySelector('h2');
            const subtitleElement = headerElement.querySelector('p');
            
            if (titleElement) titleElement.innerHTML = this.salesData.problemSolution.header.title;
            if (subtitleElement) subtitleElement.textContent = this.salesData.problemSolution.header.subtitle;
        }

        // Problem card
        const problemCardElement = this.shadowRoot.querySelector('.problem-card');
        if (problemCardElement) {
            const titleElement = problemCardElement.querySelector('h3');
            const listElement = problemCardElement.querySelector('.problem-list');
            
            if (titleElement) titleElement.textContent = this.salesData.problemSolution.problem.title;
            if (listElement) {
                listElement.innerHTML = this.salesData.problemSolution.problem.items.map(item => `
                    <div class="problem-item">
                        <i class="${item.icon}"></i>
                        <span>${item.text}</span>
                    </div>
                `).join('');
            }
        }

        // Solution card
        const solutionCardElement = this.shadowRoot.querySelector('.solution-card');
        if (solutionCardElement) {
            const titleElement = solutionCardElement.querySelector('h3');
            const listElement = solutionCardElement.querySelector('.solution-list');
            
            if (titleElement) titleElement.textContent = this.salesData.problemSolution.solution.title;
            if (listElement) {
                listElement.innerHTML = this.salesData.problemSolution.solution.items.map(item => `
                    <div class="solution-item">
                        <i class="${item.icon}"></i>
                        <span>${item.text}</span>
                    </div>
                `).join('');
            }
        }
    }

    populateHowItWorks() {
        if (!this.salesData.howItWorks) return;

        // Header
        const headerElement = this.shadowRoot.querySelector('.how-it-works-section .section-header');
        if (headerElement) {
            const titleElement = headerElement.querySelector('h2');
            const subtitleElement = headerElement.querySelector('p');
            
            if (titleElement) titleElement.textContent = this.salesData.howItWorks.header.title;
            if (subtitleElement) subtitleElement.textContent = this.salesData.howItWorks.header.subtitle;
        }

        // Steps
        const stepsContainer = this.shadowRoot.querySelector('.steps-container');
        if (stepsContainer) {
            stepsContainer.innerHTML = this.salesData.howItWorks.steps.map(step => `
                <div class="step-item" data-step="${step.number}">
                    <div class="step-number">${step.number}</div>
                    <div class="step-content">
                        <h3>${step.title}</h3>
                        <p>${step.description}</p>
                        <div class="step-features">
                            ${step.features.map(feature => `<span>${feature}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
        }
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

        // Header
        if (this.salesData.faqSection?.header) {
            const headerElement = this.shadowRoot.querySelector('.faq-section .section-header');
            if (headerElement) {
                const titleElement = headerElement.querySelector('h2');
                const subtitleElement = headerElement.querySelector('p');
                
                if (titleElement) titleElement.textContent = this.salesData.faqSection.header.title;
                if (subtitleElement) subtitleElement.textContent = this.salesData.faqSection.header.subtitle;
            }
        }

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

    populateFinalCTA() {
        if (!this.salesData.finalCTA) return;

        // Urgency banner
        const urgencyBannerElement = this.shadowRoot.querySelector('.urgency-banner');
        if (urgencyBannerElement) {
            const iconElement = urgencyBannerElement.querySelector('i');
            const spanElement = urgencyBannerElement.querySelector('span');
            
            if (iconElement) iconElement.className = this.salesData.finalCTA.urgencyBanner.icon;
            if (spanElement) spanElement.textContent = this.salesData.finalCTA.urgencyBanner.text;
        }

        // Title and subtitle
        const titleElement = this.shadowRoot.getElementById('final-cta-title');
        const subtitleElement = this.shadowRoot.getElementById('final-cta-subtitle');
        
        if (titleElement) titleElement.innerHTML = this.salesData.finalCTA.title;
        if (subtitleElement) subtitleElement.textContent = this.salesData.finalCTA.subtitle;

        // Primary button
        const primaryButtonElement = this.shadowRoot.getElementById('final-cta-primary');
        if (primaryButtonElement) {
            const spanElement = primaryButtonElement.querySelector('span');
            const iconElement = primaryButtonElement.querySelector('i');
            
            if (spanElement) spanElement.textContent = this.salesData.finalCTA.primaryButton.text;
            if (iconElement) iconElement.className = this.salesData.finalCTA.primaryButton.icon;
        }

        // Guarantee
        const guaranteeElement = this.shadowRoot.querySelector('.cta-guarantee');
        if (guaranteeElement) {
            const iconElement = guaranteeElement.querySelector('i');
            const spanElement = guaranteeElement.querySelector('span');
            
            if (iconElement) iconElement.className = this.salesData.finalCTA.guarantee.icon;
            if (spanElement) spanElement.textContent = this.salesData.finalCTA.guarantee.text;
        }

        // Trust badges
        const trustBadgesContainer = this.shadowRoot.querySelector('.trust-badges');
        if (trustBadgesContainer) {
            trustBadgesContainer.innerHTML = this.salesData.finalCTA.trustBadges.map(badge => `
                <div class="trust-badge">
                    <i class="${badge.icon}"></i>
                    <span>${badge.text}</span>
                </div>
            `).join('');
        }
    }

    populateFeatures() {
        if (!this.salesData.features) return;

        // Header
        if (this.salesData.featuresSection?.header) {
            const headerElement = this.shadowRoot.querySelector('.features-section .section-header');
            if (headerElement) {
                const titleElement = headerElement.querySelector('h2');
                const subtitleElement = headerElement.querySelector('p');
                
                if (titleElement) titleElement.innerHTML = this.salesData.featuresSection.header.title;
                if (subtitleElement) subtitleElement.textContent = this.salesData.featuresSection.header.subtitle;
            }
        }

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

    populateHeroBulletPoints() {
        if (!this.salesData.hero || !this.salesData.hero.bulletPoints) return;

        const bulletPointsContainer = this.shadowRoot.getElementById('hero-bullet-points');
        if (!bulletPointsContainer) return;

        bulletPointsContainer.innerHTML = this.salesData.hero.bulletPoints.map((point, index) => `
            <div class="bullet-point">
                <div class="bullet-icon">${index + 1}</div>
                <div class="bullet-text">${point}</div>
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
        // This method is now called from populateContent
    }

    initializeFAQ() {
        const faqQuestions = this.shadowRoot.querySelectorAll('.faq-question');
        
        console.log(`Initializing FAQ with ${faqQuestions.length} questions`);
        
        faqQuestions.forEach((question, index) => {
            question.addEventListener('click', () => {
                const faqIndex = question.dataset.faq;
                const answer = this.shadowRoot.getElementById(`faq-answer-${faqIndex}`);
                const icon = question.querySelector('i');
                const parentItem = question.closest('.faq-item');
                
                console.log(`FAQ question ${faqIndex} clicked`);
                
                if (answer && icon) {
                    const isActive = answer.classList.contains('active');
                    
                    // Toggle current item only
                    if (!isActive) {
                        answer.classList.add('active');
                        parentItem.classList.add('active');
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                        console.log(`FAQ answer ${faqIndex} opened`);
                    } else {
                        answer.classList.remove('active');
                        parentItem.classList.remove('active');
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                        console.log(`FAQ answer ${faqIndex} closed`);
                    }
                } else {
                    console.error(`FAQ elements not found for index ${faqIndex}`, { answer, icon });
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

    setupAutoPlayVideo(container, videoUrl) {
        if (!videoUrl || !container) return;
        
        // Try multiple approaches for autoplay
        this.tryMultipleAutoplayMethods(container, videoUrl);
    }

    tryMultipleAutoplayMethods(container, videoUrl) {
        // Method 1: Try aggressive YouTube autoplay
        this.tryYouTubeAutoplay(container, videoUrl);
        
        // Method 2: Fallback with interaction trigger
        setTimeout(() => {
            this.addInteractionTrigger(container, videoUrl);
        }, 3000);
    }

    tryYouTubeAutoplay(container, videoUrl) {
        const videoId = this.extractYouTubeId(videoUrl);
        if (!videoId) return;
        
        // Most aggressive autoplay parameters
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}&playsinline=1&start=1&disablekb=1&iv_load_policy=3`;
        
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            border-radius: inherit;
        `;
        
        // Most permissive allow attributes
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('loading', 'eager');
        iframe.setAttribute('importance', 'high');
        iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        
        container.innerHTML = '';
        container.appendChild(iframe);
        
        // Multiple autoplay attempts
        const attempts = [500, 1000, 2000, 3000];
        attempts.forEach(delay => {
            setTimeout(() => {
                this.forcePlay(iframe);
            }, delay);
        });
    }

    forcePlay(iframe) {
        try {
            // Try different postMessage commands
            const commands = [
                '{"event":"command","func":"playVideo","args":""}',
                '{"event":"command","func":"unMute","args":""}',
                '{"event":"command","func":"setVolume","args":[0]}'
            ];
            
            commands.forEach(command => {
                if (iframe.contentWindow) {
                    iframe.contentWindow.postMessage(command, '*');
                }
            });
        } catch (e) {
            console.log('PostMessage failed:', e);
        }
    }

    addInteractionTrigger(container, videoUrl) {
        // Add a nearly invisible play button that triggers on any user interaction
        const playTrigger = document.createElement('div');
        playTrigger.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const playIcon = document.createElement('div');
        playIcon.innerHTML = `
            <div style="
                width: 60px;
                height: 60px;
                background: rgba(255, 0, 198, 0.9);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                animation: pulse 2s infinite;
            ">
                <i class="fas fa-play" style="margin-left: 3px;"></i>
            </div>
        `;
        
        playTrigger.appendChild(playIcon);
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        playTrigger.addEventListener('click', () => {
            this.forceVideoPlay(container, videoUrl);
            playTrigger.remove();
        });
        
        // Also trigger on any mouse movement over the container
        container.addEventListener('mouseenter', () => {
            setTimeout(() => {
                this.forceVideoPlay(container, videoUrl);
                playTrigger.remove();
            }, 100);
        }, { once: true });
        
        container.style.position = 'relative';
        container.appendChild(playTrigger);
    }

    forceVideoPlay(container, videoUrl) {
        const videoId = this.extractYouTubeId(videoUrl);
        if (!videoId) return;
        
        // Force play with controls enabled for user interaction
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`;
        
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            border-radius: inherit;
        `;
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');
        iframe.setAttribute('allowfullscreen', '');
        
        // Clear container and add new iframe
        container.innerHTML = '';
        container.appendChild(iframe);
        
        console.log('Video should now be playing with user interaction');
    }

    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    checkAutoplayStatus(container, iframe) {
        // This method can be used to add fallback UI if autoplay doesn't work
        // For now, we'll just log the status
        console.log('Checking autoplay status - video should be playing automatically');
        
        // If autoplay fails due to browser policies, the video will still be visible
        // and users can manually click play using YouTube's built-in controls
    }

    initializeVideoHandlers() {
        const watchDemoButton = this.shadowRoot.getElementById('watch-demo');
        
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
    return new Promise((resolve, reject) => {
        // This line merges the default sales data with any custom data provided
        // It creates a new object by spreading defaultSalesData first, then overlaying customData
        // Any matching properties in customData will override those in defaultSalesData
        const salesData = { ...defaultSalesData, ...customData };
        const manager = new SalesPageManager(salesData, shadowRoot);
        
        // Populate content and resolve Promise only after content is loaded
        if (shadowRoot) {
            // Wait a bit for DOM to be ready, then populate content
            setTimeout(() => {
                try {
                    manager.populateContent();
                    resolve(manager);
                } catch (error) {
                    reject(error);
                }
            }, 100);
        } else {
            // If no shadowRoot, resolve immediately
            resolve(manager);
        }
    });
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
