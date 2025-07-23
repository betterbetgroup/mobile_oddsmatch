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
                stats: [
                    { number: "£4.2M+", label: "Member Profits" },
                    { number: "15,000+", label: "Active Users" },
                    { number: "98%", label: "Success Rate" }
                ],
                bulletPoints: [
                    "Watch the Demo Video to Learn the Basics",
                    "Use Our Tutorial to Complete Your First Offer",
                    "Repeat the Process to Earn More",
                ],
                primaryCTA: "Start Free Trial",
                videoUrl: "https://www.youtube.com/embed/3eEdy-7mGPQ", // Replace with actual video
                videoThumbnail: null
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
            testimonials: [
                {
                    content: "I made £2,847 in my first month! The tools are incredibly easy to use and the support team helped me every step of the way. Couldn't be happier with my decision to join.",
                    author: "Sarah M.",
                    role: "Premium Member since March 2024"
                },
                {
                    content: "These calculators are absolutely game-changing. I went from being completely confused about matched betting to making £1,500+ monthly in just 6 weeks.",
                    author: "David L.",
                    role: "Pro Member since January 2024"
                },
                {
                    content: "Best investment I've ever made. The tools literally pay for themselves within the first week. The community is incredibly supportive too!",
                    author: "Emma K.",
                    role: "Premium Member since February 2024"
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
