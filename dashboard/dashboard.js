


const MAX_WIDTH_FOR_MOBILE = 700;



(function () {

let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/dashboard/z.html';
let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/dashboard/styles.css';

html_script = 'z.html';
styles_script = 'styles.css'

class Dashboard extends HTMLElement {

    constructor() {
            
        super();

        this.attachShadow({ mode: 'open' }); 

        this.isContentLoaded = false;
        this.attributeChangeQueue = [];

    }


    static get observedAttributes() {
        return ['data-odds']; 
    }
    
    connectedCallback() {
        this.style.visibility = 'hidden';
        this.render(this.shadowRoot, this.state, html_script)  
        .then(() => {
            this.addStyles(this.shadowRoot, this.state, styles_script)
            .then(() => {
                this.style.visibility = 'visible'; 
                this.runSpecificScript(this.shadowRoot, this.state); 
                this.isContentLoaded = true;
                this.processQueuedAttributeChanges();
                this.handleResize(this.shadowRoot);
            });
        });
        
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
                this.process_new_final_data(newValue, this.shadowRoot, this.state);
            }
        } else {
            this.attributeChangeQueue.push({ name, oldValue, newValue });
        }
    }

    process_new_final_data(data, scope, state) {
        console.log('Processing dashboard data:', data);
        
        try {
            const dashboardData = typeof data === 'string' ? JSON.parse(data) : data;
            
            // Update profit values
            if (dashboardData.profit) {
                this.updateProfitValues(scope, dashboardData.profit);
            }
            
            // Update offer progress
            if (dashboardData.offers) {
                this.updateOfferProgress(scope, dashboardData.offers);
            }
            
            // Update membership status
            if (dashboardData.membership) {
                this.updateMembershipStatus(scope, dashboardData.membership);
            }
            
        } catch (error) {
            console.error('Error processing dashboard data:', error);
        }
    }

    updateProfitValues(scope, profitData) {
        const formatCurrency = (value) => {
            const num = parseFloat(value) || 0;
            return num >= 0 ? `£${num.toFixed(2)}` : `-£${Math.abs(num).toFixed(2)}`;
        };

        const profitToday = scope.getElementById('profit-today');
        const profitMonth = scope.getElementById('profit-month');
        const profitLastMonth = scope.getElementById('profit-last-month');
        const profitLifetime = scope.getElementById('profit-lifetime');

        if (profitToday && profitData.today !== undefined) {
            profitToday.textContent = formatCurrency(profitData.today);
        }
        
        if (profitMonth && profitData.thisMonth !== undefined) {
            profitMonth.textContent = formatCurrency(profitData.thisMonth);
        }
        
        if (profitLastMonth && profitData.lastMonth !== undefined) {
            profitLastMonth.textContent = formatCurrency(profitData.lastMonth);
        }
        
        if (profitLifetime && profitData.lifetime !== undefined) {
            profitLifetime.textContent = formatCurrency(profitData.lifetime);
        }
    }

    updateOfferProgress(scope, offersData) {
        const updateProgress = (id, completed, total) => {
            const countElement = scope.getElementById(`${id}-count`);
            const progressElement = scope.getElementById(`${id}-progress`);
            
            if (countElement) {
                countElement.textContent = `${completed} / ${total}`;
            }
            
            if (progressElement) {
                const percentage = total > 0 ? (completed / total) * 100 : 0;
                progressElement.style.width = `${percentage}%`;
            }
        };

        
        if (offersData.signup) {
            updateProgress('signup', offersData.signup.completed, offersData.signup.total);
        }
        
        if (offersData.weekly) {
            updateProgress('weekly', offersData.weekly.completed, offersData.weekly.total);
        }
        
        if (offersData.reload) {
            updateProgress('reload', offersData.reload.completed, offersData.reload.total);
        }
        
        if (offersData.guides) {
            updateProgress('guides', offersData.guides.completed, offersData.guides.total);
        }


    }

    updateMembershipStatus(scope, membershipData) {
        const statusBadge = scope.getElementById('status-badge');
        const planName = scope.getElementById('plan-name');
        const planExpiry = scope.getElementById('plan-expiry');
        const toolsAccess = scope.getElementById('tools-access');
        
        if (!statusBadge) return;
        
        // Update status badge
        const status = membershipData.status || 'free';
        statusBadge.className = `status-badge ${status}`;
        
        const statusDisplayNames = {
            'free': 'Free Member',
            'premium-trial': 'Premium Free Trial',
            'premium': 'Premium Member',
            'pro': 'Pro Member'
        };
        
        statusBadge.textContent = statusDisplayNames[status] || 'Free Member';
        
        // Update plan details
        if (planName) {
            planName.textContent = membershipData.planName || 'Free';
        }
        
        if (planExpiry) {
            planExpiry.textContent = membershipData.expiryDate || '-';
        }
        
        if (toolsAccess) {
            const accessLevels = {
                'free': 'Basic Tools',
                'premium-trial': 'Premium Tools',
                'premium': 'Premium Tools',
                'pro': 'All Tools + Pro Features'
            };
            toolsAccess.textContent = accessLevels[status] || 'Basic Tools';
        }
        
        // Update button visibility and text based on status
        this.updateMembershipButtons(scope, status);
    }

    updateMembershipButtons(scope, status) {
        const upgradeBtn = scope.getElementById('upgrade-membership');
        const manageBtn = scope.getElementById('manage-subscription');
        
        if (!upgradeBtn || !manageBtn) return;
        
        // Show/hide upgrade button based on membership status
        if (status === 'pro') {
            upgradeBtn.classList.add('hidden');
        } else {
            upgradeBtn.classList.remove('hidden');
            
            // Update upgrade button text based on current status
            const upgradeTexts = {
                'free': 'Upgrade to Premium',
                'premium-trial': 'Upgrade to Premium',
                'premium': 'Upgrade to Pro'
            };
            
            const icon = upgradeBtn.querySelector('i');
            upgradeBtn.innerHTML = `${icon.outerHTML} ${upgradeTexts[status] || 'Upgrade Plan'}`;
        }
        
        // Update manage button text based on status
        if (status === 'free') {
            const icon = manageBtn.querySelector('i');
            manageBtn.innerHTML = `${icon.outerHTML} View Plans`;
        } else {
            const icon = manageBtn.querySelector('i');
            manageBtn.innerHTML = `${icon.outerHTML} Manage Subscription`;
        }
    }

    setupMembershipButtons(scope) {
        const upgradeBtn = scope.getElementById('upgrade-membership');
        const manageBtn = scope.getElementById('manage-subscription');
        
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => {
                this.handleUpgradeClick();
            });
        }
        
        if (manageBtn) {
            manageBtn.addEventListener('click', () => {
                this.handleManageSubscriptionClick();
            });
        }
    }

    handleUpgradeClick() {
        // Define upgrade routes based on current membership
        const currentStatus = this.getCurrentMembershipStatus();
        const upgradeRoutes = {
            'free': '../sales_pages/homepage/',
            'premium-trial': '../sales_pages/homepage/',
            'premium': '#upgrade-to-pro'
        };
        
        const route = upgradeRoutes[currentStatus] || '../sales_pages/homepage/';
        
        if (route.startsWith('../')) {
            window.location.href = route;
        } else {
            console.log(`Navigate to ${route}`);
            // Handle internal upgrade logic here
        }
    }

    handleManageSubscriptionClick() {
        const currentStatus = this.getCurrentMembershipStatus();
        
        if (currentStatus === 'free') {
            // Redirect to plans page for free users
            window.location.href = '../sales_pages/homepage/';
        } else {
            // Redirect to subscription management for paid users
            console.log('Navigate to subscription management');
            // You can implement subscription management logic here
            // For example: window.location.href = '#manage-subscription';
        }
    }

    getCurrentMembershipStatus() {
        const statusBadge = document.querySelector('#status-badge');
        if (!statusBadge) return 'free';
        
        const classes = statusBadge.className.split(' ');
        const statusClass = classes.find(cls => cls !== 'status-badge');
        return statusClass || 'free';
    }

    setupToolCardEvents(scope) {
        const toolCards = scope.querySelectorAll('.tool-card');
        
        toolCards.forEach(card => {
            card.addEventListener('click', () => {
                const tool = card.getAttribute('data-tool');
                this.handleToolClick(tool);
            });
        });
    }

    handleToolClick(tool) {
        // Define routing logic for each tool
        const toolRoutes = {
            'oddsmatcher': '../oddsmatchers/standard_oddsmatcher/',
            'calculator': '../calculators/standard/',
            'advanced-calculators': '../calculators/',
            'extra-place-master': '../oddsmatchers/extra_place_matcher/',
            '2up-master': '../oddsmatchers/2up_oddsmatcher/',
            'profit-tracker': '../oddsmatchers/profit_tracker/',
            'balance-sheet': '#balance-sheet',
            'refer-friend': '#refer-friend',
            'acca-catcher': '../oddsmatchers/bog_matcher/',
            'match-catcher': '../oddsmatchers/standard_oddsmatcher/',
            'extra-place-catcher': '../list_pages/extra_places/',
            'slots-database': '#slots-database',
            'forum': '#forum',
            'simulator': '#simulator',
            'help-support': '#help-support'
        };

        const route = toolRoutes[tool];
        if (route && route.startsWith('../')) {
            // Navigate to relative path
            window.location.href = route;
        } else if (route && route.startsWith('#')) {
            // Handle internal navigation or external links
            console.log(`Navigate to ${route}`);
            // You can implement specific logic for each internal link here
        }
    }

    setupFeatureCardEvents(scope) {
        const featureCards = scope.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('click', () => {
                const cardClass = card.className.split(' ').find(cls => cls.endsWith('-card'));
                this.handleFeatureCardClick(cardClass);
            });
        });
    }

    handleFeatureCardClick(cardType) {
        const featureRoutes = {
            'pro-card': '#better-bet-pro',
            'guides-card': '../list_pages/guides/',
            'signup-card': '../list_pages/signup/',
            'weekly-card': '../list_pages/weekly/',
            'discord-card': '#discord-group',
            'support-card': '#help-support'
        };

        const route = featureRoutes[cardType];
        if (route && route.startsWith('../')) {
            window.location.href = route;
        } else if (route) {
            console.log(`Navigate to ${route}`);
        }
    }

    setupCustomizeButton(scope) {
        const customizeBtn = scope.getElementById('customize-links');
        if (customizeBtn) {
            customizeBtn.addEventListener('click', () => {
                this.handleCustomizeLinks(scope);
            });
        }
    }

    handleCustomizeLinks(scope) {
        // Simple implementation - could be enhanced with a modal
        alert('Customize Quick Links feature coming soon!');
    }

    runSpecificScript(scope, state) {
        
        // Setup event listeners
        this.setupToolCardEvents(scope);
        this.setupFeatureCardEvents(scope);
        this.setupCustomizeButton(scope);
        this.setupMembershipButtons(scope);
        
        // Add window resize listener
        window.addEventListener('resize', () => {
            this.handleResize(scope);
        });
    }


    handleResize(scope) {

        if (window.innerWidth < MAX_WIDTH_FOR_MOBILE) {
            return;
        }
    
        
        let width = window.innerWidth;
        const contentDiv = scope.getElementById('outer-container-div');
        if (contentDiv) {
            contentDiv.style.width = `${width}px`;
        }
    
    }
    
    
    addStyles(scope, state, styles_script) {
    
        return new Promise((resolve, reject) => {
    
            try {
    
                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', styles_script);
    
                link.onload = () => { resolve('done'); };
    
                scope.appendChild(link);
    
            } catch (error) {
                return reject(error)
            }
    
        });
    }


    render(scope, state, html_script) {
        return fetch(html_script)
            .then(response => response.text())
            .then(html => {
                return new Promise((resolve, reject) => {
                    scope.innerHTML = html;
                    resolve('done');
                });
            })
            .catch(error => {
                // Catch any errors that occur during the fetch or script loading
                console.error('Error loading script or processing data:', error);
            });
    }





}

customElements.define('dashboard-page', Dashboard);



})();
