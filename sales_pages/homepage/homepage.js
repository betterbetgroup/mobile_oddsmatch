import * as Helpers from '../main/sales_helper.js'




(function () {

    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/sales_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/sales_pages/main/styles.css';


    styles_script = '../main/styles.css'
    html_script = '../main/z.html'


class Homepage extends HTMLElement {

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
        const homepageData = {
            hero: {
                title: `Turn Your Betting Into <span class="gradient-text">Guaranteed Profits</span>`,
                subtitle: "Join 3,000+ successful matched bettors earning consistent income with our professional tools and expert guidance",
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
                    "Repeat the Process to Earn More",
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
                        avatarSrc: "images/james.jpg",
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
                            avatarSrc: "images/emma.jpg",
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
                            avatarSrc: "images/david.jpg",
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
                            avatarSrc: "images/sophie.jpg", 
                            profit: "+£456"
                        }
                    },
                    {
                        rating: 5,
                        date: "1 week ago",
                        content: "Support team helped me through everything. Made my first profit in 3 hours!",
                        author: {
                            name: "Stephen T.",
                            avatar: "ST",
                            avatarSrc: "images/Stephen.jpg",
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
                            avatarSrc: "images/anna.jpg",
                            profit: "+£2,100"
                        }
                    },
                    {
                        rating: 5,
                        date: "3 weeks ago",
                        content: "Perfect for beginners. Everything is explained clearly with video tutorials.",
                        author: {
                            name: "Michael K.",
                            avatar: "MK",
                            avatarSrc: "images/Michael.jpg",
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
                    description: "Advanced calculators for standard, each-way, dutching, and all matched betting scenarios"
                },
                {
                    icon: "fas fa-search",
                    title: "Live Odds Matching",
                    description: "Real-time odds comparison across hundreds of bookmakers with instant profit calculations"
                },
                {
                    icon: "fas fa-book-open",
                    title: "Complete Guides Library",
                    description: "Step-by-step tutorials from beginner basics to advanced profit maximization strategies"
                },
                {
                    icon: "fas fa-chart-line",
                    title: "Profit Tracking Dashboard",
                    description: "Monitor your earnings, track your progress, and optimize your betting strategy"
                },
                {
                    icon: "fas fa-users",
                    title: "Expert Community",
                    description: "Join our Discord community of successful matched bettors and get instant help"
                },
                {
                    icon: "fas fa-mobile-alt",
                    title: "Mobile & Desktop",
                    description: "Access all tools on any device, optimized for mobile and desktop use"
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



        // Initialize the sales page with homepage data using the imported helper
        Helpers.initializeSalesPage(homepageData, this.shadowRoot)
            .then((manager) => {
                this.salesManager = manager;
                this.style.visibility = 'visible';
                console.log('Homepage sales page initialized successfully');
            })
            .catch((error) => {
                console.error('Failed to load sales page functionality:', error);
                this.style.visibility = 'visible'; // Show even if there's an error
            });
    }





}

customElements.define('home-page', Homepage);

})();
