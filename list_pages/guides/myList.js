import * as Helpers from '../main/helper.js'



(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/guides.js'
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/guides/styles.css';


    styles_script = 'styles.css'


    
    class GuidesList extends HTMLElement {
    
        constructor() {
            
            super();

            this.attachShadow({ mode: 'open' }); 

            this.isContentLoaded = false;
            this.attributeChangeQueue = [];
            
            this.state = {
                is_available: true,
                user_suo_object: [],
                is_premium_member: false,
                globalData: {},
                filteredData: [],
                current_sort: 'none',
                list_type: 'guides',
                data_loaded_from_wix: false,
                sort_options: [
                    { text: 'Sort By Difficulty', value: 'none' },
                    { text: 'Sort A-Z', value: 'a-z' },
                    { text: 'Sort Z-A', value: 'z-a' },
                ], 
                above_columns_items: ['guides read', 'search guides', 'sort', 'hidden switch guides'],
                is_desktop: true,
            };

            this.state.create_item_function = this.create_row;
            
        }

        static get observedAttributes() {
            return ['data-odds']; 
        }

        connectedCallback() {
            this.style.visibility = 'hidden';

            Helpers.render(this.shadowRoot, this.state, html_script, general_info_script)  
            .then(() => {
                Helpers.addStyles(this.shadowRoot, this.state, styles_script)
                .then(() => {
                    this.isContentLoaded = true;
                    this.processQueuedAttributeChanges();
                    Helpers.handleResize(this.shadowRoot);
                    ;
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
                    Helpers.process_new_final_data(newValue, this.shadowRoot, this.state, this);
                }
            } else {
                this.attributeChangeQueue.push({ name, oldValue, newValue });
            }
        }



        
        create_row(scope, state, row) {



        // Helper functions for guide content
        function getGuideIcon(title) {
            const icons = {
                'Signup Offer Tutorial': 'fa-user-plus',
                'Backing and Laying Guide': 'fa-exchange-alt',
                'Betting Exchange Guide': 'fa-chart-line',
                'Price Boost Guide': 'fa-rocket',
                'Arbitrage Betting Guide': 'fa-balance-scale',
                '2up Betting Guide': 'fa-dice-two'
            };
            return icons[title] || 'fa-book';
        }

        function getGuideDescription(title) {
            const descriptions = {
                'Signup Offer Tutorial': 'Learn how to complete your first signup offer by following our step-by-step tutorial.',
                'Backing and Laying Guide': 'Understand the concepts of back bets and lay bets.',
                'Betting Exchange Guide': 'Learn how a betting exchange works, and how we use it to make guaranteed profits.',
                'Price Boost Guide': 'Learn how to use price boost offers to make a risk free profit.',
                'Arbitrage Betting Guide': 'Learn how we use arbitrage to make guaranteed profits from bookmaker mistakes.',
                '2up Betting Guide': 'Learn how to take advantage of early payout offers and multiply your profits.',
                'Extra Place Betting Guide': 'Extra place offers are a great way to earn more profits once you get your head around it.',
                'Guide to Laying Accumulators': 'Learn how to profit from any type of free bet including accumulators and bet builders.',
                'Dutching Betting Guide': 'Dutching is where you use back bets on all outcomes of an event to guarantee a profit.',
                'Sequential Lay Betting Guide': 'Use this strategy to guarantee profits from accumulator bets with sequential events.'
            };
            return descriptions[title] || 'Comprehensive guide to help you master this betting strategy.';
        }

        function getGuideDifficulty(title) {
            const difficulties = {
                'Signup Offer Tutorial': 'Beginner',
                'Backing and Laying Guide': 'Beginner',
                'Betting Exchange Guide': 'Beginner',
                'Price Boost Guide': 'Beginner',
                'Arbitrage Betting Guide': 'Beginner',
                '2up Betting Guide': 'Intermediate',
                'Extra Place Betting Guide': 'Intermediate',
                'Guide to Laying Accumulators': 'Advanced',
                'Dutching Betting Guide': 'Intermediate',
                'Sequential Lay Betting Guide': 'Advanced'

            };
            return difficulties[title] || 'Intermediate';
        }

        function getGuideTime(title) {
            const times = {
                'Signup Offer Tutorial': '5 min',
                'Backing and Laying Guide': '8 min',
                'Betting Exchange Guide': '6 min',
                'Price Boost Guide': '12 min',
                'Arbitrage Betting Guide': '15 min',
                '2up Betting Guide': '18 min'
            };
            return times[title] || '10 min';
        }





            const div = document.createElement('div');
            div.className = 'container_div_around_each_item';

            let offer_id = state.create_offer_id_function(row, state);
                




            div.innerHTML = `
                <div class="guide_card ${!state.is_desktop ? 'guide_card_mobile' : ''}">
                    
                    <!-- Guide Icon Header -->
                    <div class="guide_icon_header">
                        <div class="guide_icon_container">
                            <i class="fas ${getGuideIcon(row.title)} guide_main_icon"></i>
                            <div class="guide_icon_gradient"></div>
                        </div>
                        <div class="guide_status_badge ${state.is_available ? 'available' : 'completed'}">
                            ${state.is_available ? 'Unread' : 'Read'}
                        </div>
                    </div>

                    <!-- Guide Content -->
                    <div class="guide_content">
                        <h3 class="guide_title">${row.title}</h3>
                        <p class="guide_description">${getGuideDescription(row.title)}</p>
                        
                        <div class="guide_meta">
                            <div class="guide_difficulty" data-difficulty="${getGuideDifficulty(row.title)}">
                                <i class="fas fa-signal"></i>
                                <span>${getGuideDifficulty(row.title)}</span>
                            </div>
                            <div class="guide_time">
                                <i class="far fa-clock"></i>
                                <span>${getGuideTime(row.title)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Guide Actions -->
                    <div class="guide_actions">
                        <a class="guide_button_primary ${!state.is_desktop ? 'guide_button_mobile' : ''}" href="${row.guide}">
                            <i class="fa-solid fa-book"></i>
                            <span>Read Guide</span>
                        </a>
                        
                        <div class="guide_completion_toggle">
                            <label class="completion_switch">
                                <input type="checkbox" class="show_filters_switch item_complete_switch" data-id="${offer_id}" id="item-complete-switch-${row.title}" ${!state.is_available ? 'checked' : ''}>
                                <span class="completion_slider">
                                </span>
                            </label>
                            <span class="completion_label">${state.is_available ? 'Mark as Read' : 'Mark as Unread'}</span>
                        </div>
                    </div>

                </div>
            `
            const tableBody = scope.querySelector('.item_container_div');
            tableBody.appendChild(div);

        }








    }


    customElements.define('allguides-page', GuidesList);
    
    
})();
    