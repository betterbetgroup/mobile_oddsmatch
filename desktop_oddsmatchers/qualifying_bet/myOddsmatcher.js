
//import * as Helpers from '../../oddsmatchers/main/helper.js';

import * as Helpers from 'public/custom-elements/oddsmatcher-helper.js'


(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js';
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/desktop_oddsmatchers/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/desktop_oddsmatchers/qualifying_bet/styles.css';

    /*html_script = '../main/z.html';
    styles_script = 'styles.css';*/
    

    // Create state object
    const state = {
        is_premium_member: false,
        waiting_globalData: [],
        globalData: [],
        filteredData: [],
        currentPage: 1,
        rowsPerPage: 10,
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
        oddsmatcher_type: 'qualifying_bet_tutorial',
        is_desktop: true,
        desktop_header_columns: ['date and time', 'sport', 'event', 'selection', 'back odds', 'lay odds', 'expected profit standard', 'rating']
        
    };



    class qualifyingBetOddsmatcher extends HTMLElement {

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
                    window.addEventListener('resize', () => Helpers.handleResize(this.shadowRoot));
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
    
        create_row(row, scope) {

            let sport_icon_url = Helpers.get_sport_icon_url(row.sport)
            let bookmaker_image = Helpers.get_bookmaker_image(row.bookmaker)
            let exchange_image = Helpers.get_exchange_image(row.exchange)
        
            let qualifying_loss_class = 'positive_profit_data'
            let potential_profit_class = 'positive_profit_data'
        
            let qualifying_loss = 0;
            let potential_profit = 0;
        
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
        
            const tr = document.createElement('tr');
    
            tr.className = 'table_data_row';
    
            tr.setAttribute('data-id', row._id)
    
        
            tr.innerHTML = `
                <td class="date_and_time_data" id="date_time_${row._id}">${row.date_and_time}</td>
                <td class="sport_data" id="sport_${row._id}"><img src="${sport_icon_url}" alt="${row.sport}" style="width: 2.14vw; height: 2.14vw;"></td>
                <td class="fixture_data" id="fixture_${row._id}">${row.fixture}</td>
                <td class="outcome_data" id="outcome_${row._id}">${row.outcome}</td>
        
                <td id="back_odds_data_${row._id}" class="no_padding_margin">
                    <div class="odds_and_bookmaker">
                        <div id="back_odds_value_${row._id}" class="back_odds_value">
                            <a ${row.bookmaker_link ? `href="${row.bookmaker_link}" target="_blank"` : ''} class="odds-link">${row.back_odds}</a>
                        </div>    
                        <div class="at_symbol">@</div>
                        <div id="bookmaker_logo_${row._id}" class="bookmaker_logo_div">
                            <a class="div_around_logo" ${row.bookmaker_link ? `href="${row.bookmaker_link}" target="_blank"` : ''} >
                                <img class='bookmaker_logo_img' src="${bookmaker_image}" alt="${row.sport} ${row.bookmaker}">
                            </a>
                        </div>
                    </div>                
                </td>
                <td id="lay_odds_data_${row._id}" class="no_padding_margin">
                    <div class="odds_and_bookmaker">
                        <div id="lay_odds_value_${row._id}" class="lay_odds_value">
                            <a ${row.exchange_link ? `href="${row.exchange_link}" target="_blank"` : ''} class="odds-link">${row.lay_odds}</a>
                        </div>
                        <div class="at_symbol">@</div>
                        <div id="exchange_logo_${row._id}" class="exchange_logo_div">
                            <a class="div_around_logo" ${row.exchange_link ? `href="${row.exchange_link}" target="_blank"` : ''} target="_blank" >
                                <img class='exchange_logo_img' src="${exchange_image}" alt="${row.sport} ${row.exchange}" >
                            </a>
                        </div>
                    </div>                
                </td>
                <td class="no_padding_margin">
                    <div class="expected_profit_data">
                        <div id='qualifying_loss_${row._id}' class='${qualifying_loss_class}'>${qualifying_loss}</div>
                        <div id='potential_profit_${row._id}' class='${potential_profit_class}'>${potential_profit}</div>
                    </div>
                </td>
                <td id="rating_${row._id}">
                    ${row.rating}
                </td>
            `;
        
        
        
        
        
            const tableBody = scope.querySelector('table tbody');
            tableBody.appendChild(tr);
        
            // Create and append button directly to the row
            if (state.is_premium_member) {
                let selectButton = document.createElement('button');
                selectButton.innerHTML = '+';
                selectButton.className = 'select_button';
                selectButton.setAttribute('data-id', row._id);
                selectButton.setAttribute('aria-label', row._id);
                tr.appendChild(selectButton);
            }

            
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

    customElements.define('qualbet-oddsmatcher', qualifyingBetOddsmatcher);



})();
