import * as Helpers from '../main/helper.js';
import * as calculateHelpers from '../../oddsmatchers/main/calculate_functions.js'




(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js';
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/qualifying_bet/styles.css';


    styles_script = '../../oddsmatchers/tutorial/styles.css';



    class tutorialOddsmatcher extends HTMLElement {

        constructor() {
            
            super();

            this.attachShadow({ mode: 'open' }); 

            this.isContentLoaded = false;
            this.attributeChangeQueue = [];


            // Create state object
            this.state = {
                is_premium_member: false,
                waiting_globalData: [],
                globalData: [],
                filteredData: [],
                currentPage: 1,
                rowsPerPage: 3,
                current_sort: 'qualifying loss',
                globalFilters: {},
                customFilters: {},
                data_loaded_from_wix: false, 
                filter_info: [
                    {
                        name: 'sports',
                        type: 'list',
                        input_id: 'sports-dropdown-select-container',
                        filter_id: 'sports-dropdown-options',
                        default: [],
                        list_values_source: 'sportIconUrlsStandard'
                    },
                    {
                        name: 'markets', 
                        type: 'list',
                        input_id: 'markets-dropdown-select-container',
                        filter_id: 'markets-dropdown-options',
                        default: [],
                        list_values_source: 'marketsListStandard'
                    },
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
                        name: 'minRating',
                        type: 'number',
                        input_id: 'min-rating',
                        filter_id: 'min-rating',
                        default: null
                    },
                    {
                        name: 'maxRating',
                        type: 'number',
                        input_id: 'max-rating',
                        filter_id: 'max-rating',
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
                        value: 'qualifying loss',
                        text: 'Sort By Qualifying Loss'
                    }
                ],
                is_tutorial: true,
                oddsmatcher_type: 'tutorial',
                tutorial_info: {}
            };

    

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
                    Helpers.handleResize(this.shadowRoot, true);
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
                    Helpers.process_new_final_data_tutorial(newValue, this.shadowRoot, this.state);
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
        
                const sportMatch = globalFilters.sports.includes(row.sport);
                const marketMatch = globalFilters.markets.includes(row.market_type);
                const bookmakerMatch = globalFilters.bookmakers.includes(row.bookmaker);
                const exchangeMatch = globalFilters.exchanges.includes(row.exchange);
                const liquidityMatch = globalFilters.minLiquidity === null || parseFloat(row.lay_liquidity) >= globalFilters.minLiquidity;
                const backOddsMatch = (globalFilters.minBackOdds === null || parseFloat(row.back_odds) >= globalFilters.minBackOdds) &&
                                      (globalFilters.maxBackOdds === null || parseFloat(row.back_odds) <= globalFilters.maxBackOdds);
                const ratingMatch = (globalFilters.minRating === null || parseFloat(row.rating.replace('%', '')) >= globalFilters.minRating) &&
                                    (globalFilters.maxRating === null || parseFloat(row.rating.replace('%', '')) <= globalFilters.maxRating);
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
                        case '3days':
                            timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
                            break;
                        case '5days':
                            timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
                            break;
                        case 'week':
                            timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                            break;
                        default:
                            timeMatch = true;
                    }
                }
        
                return sportMatch && marketMatch && bookmakerMatch && exchangeMatch && liquidityMatch && backOddsMatch && ratingMatch && qualifyingLossMatch && potentialProfitMatch && timeMatch;
            });
        
        }
    
        create_row(row, scope, state) {

            function get_row_data(row) {
        
                let bookmaker_image = Helpers.get_bookmaker_image(row.bookmaker)
                let exchange_image = Helpers.get_exchange_image(row.exchange)
        
                let data = {
                    back_odds: parseFloat(row.back_odds),
                    lay_odds: parseFloat(row.lay_odds),
                    lay_commission: parseFloat('0') / 100,
                    back_stake: parseFloat(state.tutorial_info.stake),
                    isfree: state.tutorial_info.isfree,
                    laytype: state.tutorial_info.laytype
                }
            
                let qualifying_loss_class = 'positive_profit_data'
            
                let qualifying_loss = 0;
    
                data = calculateHelpers.calculate_standard(data);
        

                if (state.tutorial_info.isfree) {
                    qualifying_loss = ('£' + data.potential_profit).replace('£-', '-£');
                } else {
                    qualifying_loss = ('£' + data.qualifying_loss).replace('£-', '-£');
                    qualifying_loss_class = 'negative_profit_data';
                }
        
                return {
                    bookmaker_image: bookmaker_image,
                    exchange_image: exchange_image,
                    qualifying_loss: qualifying_loss,
                    qualifying_loss_class: qualifying_loss_class, 
                }
            }

            let row_info = get_row_data(row);
        
            const card = document.createElement('div');
            card.className = 'mobile-card outer-mobile-card';
            card.setAttribute('data-id', row._id);


            card.innerHTML = `
                    <div class="mobile-card ${state.is_premium_member ? '' : 'blurred_tbody'}">
                            <div class="mobile-row"><strong>Date & Time:</strong> <span>${row.date_and_time}</span></div>
                            <div class="mobile-row"><strong>Event:</strong> <span>${row.fixture}</span></div>
                            <div class="mobile-row"><strong>Selection:</strong> <span>${row.outcome}</span></div>
                            <div class="mobile-row">
                                <strong>Back Odds:</strong>
                                <span class="odds-combo">
                                    <a>${row.back_odds}</a> 
                                    <span class="mobile_at_symbol" >@</span>
                                    <a href="${row.bookmaker_link}" target="_blank" rel="noopener noreferrer">
                                        <img src="${row_info.bookmaker_image}" class="logo-img">
                                    </a>
                                </span>
                            </div>
                            <div class="mobile-row">
                                <strong>Lay Odds:</strong>
                                <span class="odds-combo">
                                    <a>${row.lay_odds}</a> 
                                    <span class="mobile_at_symbol" >@</span>
                                    <a href="${row.exchange_link}" target="_blank" rel="noopener noreferrer">
                                        <img src="${row_info.exchange_image}" class="logo-img">
                                    </a>
                                </span>
                            </div>
                            <div class="mobile-row data-buttons-row">
                                <strong>${state.tutorial_info.profit_header_text.replace('<br>', ' ')}</strong>
                                <div class="expected-profit-box">
                                    <div class="${parseFloat(row_info.qualifying_loss.replace('£', '')) < 0 ? 'loss-badge' : 'profit-badge'}">${row_info.qualifying_loss}</div>
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
            .filter(([key]) => STANDARD_BOOKMAKERS.includes(key))
            .sort((a, b) => a[0].localeCompare(b[0]))  

        );

        exchangeImages = Object.fromEntries(
            Object.entries(exchangeImages)
            .filter(([key]) => STANDARD_EXCHANGES.includes(key))
            .sort((a, b) => a[0].localeCompare(b[0]))  
        );
    
            state.customFilters = {

                'No Filter':
                    {
                        "sports": Object.keys(sportIconUrlsStandard),
                        "markets": marketsListStandard,
                        "bookmakers": Object.keys(bookmakerImages),
                        "exchanges": Object.keys(exchangeImages),
                        "startTime": "",
                        "minLiquidity": "null",
                        "minBackOdds": "null",
                        "maxBackOdds": "null",
                        "minRating": "null",
                        "maxRating": "null",
                        "minQualifyingLoss": "null",
                        "minPotentialProfit": "null"
                    }
            }
    
            state.globalFilters = {
                sports: Object.keys(sportIconUrlsStandard),
                markets: marketsListStandard,
                bookmakers: Object.keys(bookmakerImages),
                exchanges: Object.keys(exchangeImages),
                startTime: '',
                minLiquidity: null,
                minBackOdds: null,
                maxBackOdds: null,
                minRating: null,
                maxRating: null,
                minQualifyingLoss: null,
                minPotentialProfit: null
            }
           
        }
    

    }

    customElements.define('tutorial-oddsmatcher', tutorialOddsmatcher);



})();
