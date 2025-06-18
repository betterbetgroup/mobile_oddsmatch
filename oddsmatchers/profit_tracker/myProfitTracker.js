//import * as Helpers from 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/main/helper.js';
import * as Helpers from '../main/helper.js';

//import * as Helpers from 'public/custom-elements/main-helper.js'

(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js';
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/profit_tracker/styles.css';

    html_script = '../main/z.html';
    styles_script = '../main/styles.css';


    class ProfitTracker extends HTMLElement {

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
                rowsPerPage: 10,
                current_sort: 'date and time',
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
                        name: 'oddsmatchers',
                        type: 'list',
                        input_id: 'oddsmatchers-dropdown-select-container',
                        filter_id: 'oddsmatchers-dropdown-options',
                        default: [],
                        list_values_source: 'oddsmatcher_list'
                    },
                    {
                        name: 'calculators',
                        type: 'list',
                        input_id: 'calculators-dropdown-select-container',
                        filter_id: 'calculators-dropdown-options',
                        default: [],
                        list_values_source: 'calculator_list'
                    },
                    {
                        name: 'startTime',
                        type: 'date',
                        input_id: 'date-range-start',
                        filter_id: 'date-range-start',
                        default: ''
                    },
                    {
                        name: 'endTime',
                        type: 'date',
                        input_id: 'date-range-end',
                        filter_id: 'date-range-end',
                        default: ''
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
                    },
                    {
                        name: 'minActualProfit',
                        type: 'number',
                        input_id: 'min-actual-profit',
                        filter_id: 'min-actual-profit',
                        default: null
                    },
                    {
                        name: 'maxActualProfit',
                        type: 'number',
                        input_id: 'max-actual-profit',
                        filter_id: 'max-actual-profit',
                        default: null
                    }
                ],
                // Add null placeholders for the functions
                filter_function: null,
                create_row_function: null,
                set_bookmakers_and_exchanges_function: null,
                sort_options: [
                    {
                        value: 'date and time',
                        text: 'Sort By Date'
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
                        value: 'final profit',
                        text: 'Sort By Final Profit'
                    }
                ],
                is_tutorial: false,
                oddsmatcher_type: 'profit tracker'
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

            function convertDateToJSDate(dateStr) {
                const [day, month, year] = dateStr.split('/');
                const fullYear = '20' + year; // Convert yy to yyyy (assuming all dates are in the 2000s)
                return new Date(`${fullYear}-${month}-${day}`);
            }
    
            const now = new Date(); 
        
            return globalData.filter(row => {

                const allPlatforms = globalFilters.bookmakers.concat(globalFilters.exchanges)
                let bookmakerMatch = allPlatforms.includes(row.bookie);
    
                if (globalFilters.bookmakers.includes('Other')) {
                    if (bookmakerMatch == false && !Object.keys(bookmakerImages).includes(row.bookie)) {
                        bookmakerMatch = true;
                    }
                }
    
                let exchangeMatch = globalFilters.exchanges.includes(row.exchange);
    
                if (globalFilters.exchanges.includes('Other')) {
                    if (exchangeMatch == false && !Object.keys(exchangeImages).includes(row.exchange)) {
                        exchangeMatch = true;
                    }
                }
    
                const oddsmatcherMatch = globalFilters.oddsmatchers.includes(row.oddsmatcher_type);
                const calculatorMatch = globalFilters.calculators.includes(row.calculator);
    
                const qualifyingLossMatch = globalFilters.minQualifyingLoss === null || parseFloat(row.qualifying_loss.replace('£', '')) >= globalFilters.minQualifyingLoss;
                const potentialProfitMatch = globalFilters.minPotentialProfit === null || parseFloat(row.potential_profit.replace('£', '')) >= globalFilters.minPotentialProfit;
        
                const minActualProfitMatch = globalFilters.minActualProfit === null || parseFloat(row.actualprofit.replace('£', '')) >= globalFilters.minActualProfit;
                const maxActualProfitMatch = globalFilters.maxActualProfit === null || parseFloat(row.actualprofit.replace('£', '')) <= globalFilters.maxActualProfit;
        
                const startTimeMatch = globalFilters.startTime === '' || 
                    convertDateToJSDate(row.date) >= convertDateToJSDate(globalFilters.startTime);
    
                const endTimeMatch = globalFilters.endTime === '' || 
                    convertDateToJSDate(row.date) <= convertDateToJSDate(globalFilters.endTime);
                

                //console.log(startTimeMatch, endTimeMatch)
                //console.log(globalFilters)
                //console.log(bookmakerMatch, exchangeMatch, oddsmatcherMatch, calculatorMatch, qualifyingLossMatch, potentialProfitMatch, minActualProfitMatch, maxActualProfitMatch, startTimeMatch, endTimeMatch)

                return bookmakerMatch && exchangeMatch && oddsmatcherMatch && calculatorMatch && qualifyingLossMatch && potentialProfitMatch && minActualProfitMatch && maxActualProfitMatch && startTimeMatch && endTimeMatch ;
            
            
            });
        
        }


    
        create_row(row, scope, state) {

            function get_row_data(row) {
        
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
        
                return {
                    bookmaker_image: bookmaker_image,
                    exchange_image: exchange_image,
                    qualifying_loss: qualifying_loss,
                    potential_profit: potential_profit,
                    qualifying_loss_class: qualifying_loss_class, 
                    potential_profit_class: potential_profit_class
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
                                <strong>Returns & Rating:</strong>
                                <div class="expected-profit-box">
                                    <div class="${parseFloat(row_info.qualifying_loss.replace('£', '')) < 0 ? 'loss-badge' : 'profit-badge'}">${row_info.qualifying_loss}</div>
                                    <div class="${parseFloat(row_info.potential_profit.replace('£', '')) < 0 ? 'loss-badge' : 'profit-badge'}">${row_info.potential_profit}</div>
                                    <div class="rating-badge">${row.rating}</div>
                                </div>
                            </div>
                    </div>
            `;
        
            //<button class="select_button">Select</button>

            const mobileContainer = scope.querySelector('.mobile-container');
            mobileContainer.appendChild(card);
        
        }








        filter_bookmakers_and_exchanges(scope, state) {

            // take bookmaker images and exchange images and add 'Other' to each, where the value for other is '' for both
            bookmakerImages = {
                ...bookmakerImages,
                'Other': ''
            }
            exchangeImages = {
                ...exchangeImages,
                'Other': ''
            }

            state.customFilters = {

                'No Filter':
                    
                    {
                        "bookmakers": Object.keys(bookmakerImages),
                        "exchanges": Object.keys(exchangeImages),                    
                        "oddsmatchers": oddsmatcher_list,
                        "calculators": calculator_list,
                        "startTime": "",
                        "endTime": "",
                        "minQualifyingLoss": "null",
                        "minPotentialProfit": "null",
                        "minActualProfit": "null",
                        "maxActualProfit": "null"
                    }
                
            }
    
            state.globalFilters = {
                bookmakers: Object.keys(bookmakerImages),
                exchanges: Object.keys(exchangeImages),    
                oddsmatchers: oddsmatcher_list,
                calculators: calculator_list,
                startTime: '',
                endTime: '',
                minQualifyingLoss: null,
                minPotentialProfit: null,    
                minActualProfit: null,
                maxActualProfit: null,
            };
    
       
        }
    

    }

    customElements.define('profit-tracker', ProfitTracker);



})();
