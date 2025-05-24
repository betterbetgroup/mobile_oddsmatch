import * as Helpers from 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/main/helper.js';

import * as Helpers from 'public/custom-elements/oddsmatcher-helper.js'



// BEAR IN MIND THESE FILTERS DO NOT MATCH THE DESKTOP VERSION OF EACH WAY FILTERS

// THEY SHOULD BE LINED UP WHEN REDOING DESKTOP VERSION


(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js';
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/extra_place_matcher/styles.css';

    // Create state object
    const state = {
        is_premium_member: false,
        waiting_globalData: [],
        globalData: [],
        filteredData: [],
        currentPage: 1,
        rowsPerPage: 10,
        current_sort: 'Implied Odds',
        globalFilters: {},
        customFilters: {},
        data_loaded_from_wix: false, 
        filter_info: [
            {
                name: 'bookmakers',
                type: 'list',
                input_id: 'bookmakers-dropdown-select-container',
                filter_id: 'bookmakers-dropdown-options',
                default: [],
                list_values_source: 'bookmakerImages'
            },
            {
                name: 'exchanges', 
                type: 'list',
                input_id: 'exchanges-dropdown-select-container',
                filter_id: 'exchanges-dropdown-options',
                default: [],
                list_values_source: 'exchangeImages'
            },
            {
                name: 'startTime',
                type: 'string',
                input_id: 'date-range',
                filter_id: 'date-range',
                default: ''
            },
            {
                name: 'minLiquidity',
                type: 'number',
                input_id: 'min-liquidity',
                filter_id: 'min-liquidity',
                default: null
            },
            {
                name: 'minBackOdds',
                type: 'number',
                input_id: 'min-back-odds',
                filter_id: 'min-back-odds',
                default: null
            },
            {
                name: 'maxBackOdds',
                type: 'number',
                input_id: 'max-back-odds',
                filter_id: 'max-back-odds',
                default: null
            },
            {
                name: 'minImpliedOdds',
                type: 'number',
                input_id: 'min-Implied Odds',
                filter_id: 'min-Implied Odds',
                default: null
            },
            {
                name: 'maxImpliedOdds',
                type: 'number',
                input_id: 'max-Implied Odds',
                filter_id: 'max-Implied Odds',
                default: null
            },
            {
                name: 'minPlaces',
                type: 'number',
                input_id: 'min-places',
                filter_id: 'min-places',
                default: null
            },
            {
                name: 'minExtraPlaces',
                type: 'number',
                input_id: 'min-extra_places',
                filter_id: 'min-extra_places',
                default: null
            },
            {
                name: 'minQualifyingLoss',
                type: 'number',
                input_id: 'min-qualifying-loss',
                filter_id: 'min-qualifying-loss',
                default: null
            },
            {
                name: 'minPotentialProfit',
                type: 'number',
                input_id: 'min-potential-profit',
                filter_id: 'min-potential-profit',
                default: null
            }
        ],
        // Add null placeholders for the functions
        filter_function: null,
        create_row_function: null,
        set_bookmakers_and_exchanges_function: null,
        sort_options: [
            {
                value: 'Implied Odds',
                text: 'Sort By Implied Odds'
            },
            {
                value: 'qualifying loss',
                text: 'Sort By Qualifying Loss'
            },  
            {
                value: 'potential profit',
                text: 'Sort By Potential Profit'
            },
            {
                value: 'date and time',
                text: 'Sort By Date'
            }
            
        ]     ,
        is_tutorial: false,  
        oddsmatcher_type: 'extra_place'
    };

    class extraPlaceOddsmatcher extends HTMLElement {

        constructor() {
            
            super();

            this.attachShadow({ mode: 'open' }); 

            this.isContentLoaded = false;
            this.attributeChangeQueue = [];
            this.state = state; 
            
            // Assign the actual functions to the state
            this.state.filter_function = this.function_using_global_data_and_global_filters_to_make_filtered_data;
            this.state.create_row_function = this.create_row;
            this.state.set_bookmakers_and_exchanges_function = this.filter_bookmakers_and_exchanges;
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
                    this.style.visibility = 'visible'; 
                    Helpers.runSpecificScript(this.shadowRoot, this.state); 
                    Helpers.add_loading_row(this.shadowRoot, this.state);
                    this.isContentLoaded = true;
                    this.processQueuedAttributeChanges();
                    Helpers.handleResize(this.shadowRoot);
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
                    Helpers.process_new_final_data(newValue, this.shadowRoot, this.state);
                }
            } else {
                this.attributeChangeQueue.push({ name, oldValue, newValue });
            }
        }







        function_using_global_data_and_global_filters_to_make_filtered_data(globalData, globalFilters) {

            function parseDateAndTime_filterData(dateString) {
                const [date, time] = dateString.split(' ');
                const [day, month, year] = date.split('/');
                const [hour, minute] = time.split(':');
                return new Date(`20${year}`, month - 1, day, hour, minute);
            }
    
            const now = new Date(); 
    
            return globalData.filter(row => {
        
                const bookmakerMatch = globalFilters.bookmakers.includes(row.bookmaker);
                const exchangeMatch = globalFilters.exchanges.includes(row.win_exchange) && globalFilters.exchanges.includes(row.place_exchange);
                const liquidityMatch = globalFilters.minLiquidity === null || (parseFloat(row.exchange_place_liquidity) >= globalFilters.minLiquidity) && (parseFloat(row.exchange_win_liquidity) >= globalFilters.minLiquidity);
                const backOddsMatch = (globalFilters.minBackOdds === null || parseFloat(row.bookmaker_each_way_odds) >= globalFilters.minBackOdds) &&
                                      (globalFilters.maxBackOdds === null || parseFloat(row.bookmaker_each_way_odds) <= globalFilters.maxBackOdds);
                const ImpliedOddsMatch = (globalFilters.minImpliedOdds === null || parseFloat(row.implied_odds) >= globalFilters.minImpliedOdds) &&
                                    (globalFilters.maxImpliedOdds === null || parseFloat(row.implied_odds) <= globalFilters.maxImpliedOdds);
                const placesMatch = globalFilters.minPlaces === null || parseFloat(row.bookmaker_places) >= globalFilters.minPlaces;
                const extraPlacesMatch = globalFilters.minExtraPlaces === null || parseFloat(row.extra_places) >= globalFilters.minExtraPlaces;
                const qualifyingLossMatch = globalFilters.minQualifyingLoss === null || parseFloat(row.qualifying_loss.replace('£', '')) >= globalFilters.minQualifyingLoss;
                const potentialProfitMatch = globalFilters.minPotentialProfit === null || parseFloat(row.potential_profit.replace('£', '')) >= globalFilters.minPotentialProfit;
        
        
                
        
                // Parse row date and time
                const rowDateTime = parseDateAndTime_filterData(row.date_and_time);
                let timeMatch = true; // Default to true if (No Selected Filter) is set
        
        
                if (globalFilters.startTime) {
                    switch (globalFilters.startTime) {
                        case '1h':
                            timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 1 * 60 * 60 * 1000);
                            break;
                        case '12h':
                            timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 12 * 60 * 60 * 1000);
                            break;
                        case '24h':
                            timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 24 * 60 * 60 * 1000);
                            break;
                        case 'today':
                            timeMatch = rowDateTime >= now && now.toDateString() === rowDateTime.toDateString();
                            break;
                        case 'tomorrow':
                            timeMatch = rowDateTime >= now && new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString() === rowDateTime.toDateString();
                            break;
                        case 'today-tomorrow':
                            timeMatch = rowDateTime >= now && (now.toDateString() === rowDateTime.toDateString() ||
                                        new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString() === rowDateTime.toDateString());
                            break;
                        default:
                            timeMatch = true;
                    }
                }
        
                return bookmakerMatch && exchangeMatch && liquidityMatch && backOddsMatch && ImpliedOddsMatch && placesMatch && extraPlacesMatch && qualifyingLossMatch && potentialProfitMatch && timeMatch;
            });
        
        
        }
    
        create_row(row, scope) {

            let bookmaker_image = Helpers.get_bookmaker_image(row.bookmaker)
            let win_exchange_image = Helpers.get_exchange_image(row.win_exchange)
            let place_exchange_image = Helpers.get_exchange_image(row.place_exchange)
        
        
            let bookmakerFraction = row.bookmaker_fraction.split('/');
            let numerator = parseInt(bookmakerFraction[0], 10);
            let denominator = parseInt(bookmakerFraction[1], 10);
            bookmakerFraction = numerator / denominator;
            let implied_back_place_odds = (((row.bookmaker_each_way_odds - 1) * bookmakerFraction) + 1).toFixed(2)
            
        
            let qualifying_loss_class = 'positive_profit_data'
            let potential_profit_class = 'positive_profit_data'
        
            let qualifying_loss = 0;
            let potential_profit = 0;
        
            let places = row.bookmaker_places + ' (+' + row.extra_places + ')';
        
            if (row.qualifying_loss.toString().includes('-')) {
                qualifying_loss_class = 'negative_profit_data';
                qualifying_loss = row.qualifying_loss;
            } else {
                qualifying_loss = '+' + (row.qualifying_loss).toString();
            }
        
            if (qualifying_loss == '+0.00') {
                qualifying_loss = '£0.00'
            }
        
            if (row.potential_profit.toString().includes('-')) {
                potential_profit_class = 'negative_profit_data';
                potential_profit = row.potential_profit;
            } else {
                potential_profit = '+' + (row.potential_profit).toString();
            }
            if (potential_profit == '+0.00') {
                potential_profit = '£0.00'
            }
                
            

            const card = document.createElement('div');
            card.className = 'mobile-card outer-mobile-card';
            card.setAttribute('data-id', row._id);


            card.innerHTML = `
                    <div class="mobile-card ${state.is_premium_member ? '' : 'blurred_tbody'}">
                            <div class="mobile-row"><strong>Date & Time:</strong> <span>${row.date_and_time}</span></div>
                            <div class="mobile-row"><strong>Race:</strong> <span>${row.fixture}</span></div>
                            <div class="mobile-row"><strong>Horse:</strong> <span>${row.horse}</span></div>
                            <div class="mobile-row"><strong>Extra Places:</strong> <span>${row.extra_places}</span></div>
                            <div class="mobile-row">
                                <strong>Each Way Bet:</strong>
                                
                                <span class="odds-combo odds-combo-each-and-extra">
                                    <div class="double_odds_combo">
                                        <a>${row.bookmaker_each_way_odds}</a> 
                                        <span class="mobile_and_symbol" >&</span>
                                        <a>${implied_back_place_odds}</a> 
                                    </div>
                                    <a class="bookmaker_image_each_way" href="${row.bookmaker_link}" target="_blank" rel="noopener noreferrer">
                                        <img src="${bookmaker_image}" class="logo-img">
                                    </a>
                                </span>
                            </div>

                            <div class="mobile-row">
                                <strong>Win Lay Bet:</strong>

                                <span class="odds-combo">
                                    <a>${row.exchange_win_odds}</a> 
                                    <a href="${row.win_exchange_link}" target="_blank" rel="noopener noreferrer">
                                    <img src="${win_exchange_image}" class="logo-img">
                                    </a>
                                </span>

                            </div>

                            <div class="mobile-row">
                                <strong>Place Lay Bet:</strong>

                                <span class="odds-combo">
                                    <a>${row.exchange_place_odds}</a> 
                                    <a href="${row.place_exchange_link}" target="_blank" rel="noopener noreferrer">
                                    <img src="${place_exchange_image}" class="logo-img">
                                    </a>
                                </span>

                            </div>
                            
                            <div class="mobile-row data-buttons-row">
                                <strong>Profit & IO:</strong>
                                <div class="expected-profit-box">
                                    <div class="${parseFloat(row.qualifying_loss.replace('£', '')) < 0 ? 'loss-badge' : 'profit-badge'}">${row.qualifying_loss}</div>
                                    <div class="${parseFloat(row.potential_profit.replace('£', '')) < 0 ? 'loss-badge' : 'profit-badge'}">${row.potential_profit}</div>
                                    <div class="rating-badge">${row.implied_odds}</div>
                                </div>
                            </div>
                    </div>
            `;
        
            //<button class="select_button">Select</button>

            const mobileContainer = scope.querySelector('.mobile-container');
            mobileContainer.appendChild(card);
        
        }

        filter_bookmakers_and_exchanges(scope, state) {

            bookmakerImages = Object.fromEntries(
                Object.entries(bookmakerImages)
                .filter(([key]) => EXTRA_PLACE_BOOKMAKERS.includes(key))
                .sort((a, b) => a[0].localeCompare(b[0]))  
            );
    
            exchangeImages = Object.fromEntries(
                Object.entries(exchangeImages)
                .filter(([key]) => EXTRA_PLACE_EXCHANGES.includes(key))
                .sort((a, b) => a[0].localeCompare(b[0]))  
            );
    
            state.customFilters = {
                'No Filter':
                    {
                        "bookmakers": Object.keys(bookmakerImages),
                        "exchanges": Object.keys(exchangeImages),
                        "startTime": "",
                        "minLiquidity": "null",
                        "minBackOdds": "null",
                        "maxBackOdds": "null",
                        "minImpliedOdds": "null",
                        "maxImpliedOdds": "null",
                        "minPlaces": "null",
                        "minExtraPlaces": "null",
                        "minQualifyingLoss": "null",
                        "minPotentialProfit": "null"
                    }
            }
    
            state.globalFilters = {
                bookmakers: Object.keys(bookmakerImages),
                exchanges: Object.keys(exchangeImages),
                startTime: '',
                minLiquidity: null,
                minBackOdds: null,
                maxBackOdds: null,
                minImpliedOdds: null,
                maxImpliedOdds: null,
                minPlaces: null,
                minExtraPlaces: null,
                minQualifyingLoss: null,
                minPotentialProfit: null,
            };
    
       
        }
    

    }

    customElements.define('extra-place-oddsmatcher', extraPlaceOddsmatcher);



})();
