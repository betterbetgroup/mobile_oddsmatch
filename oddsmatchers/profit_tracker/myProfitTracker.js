import * as Helpers from '../main/helper.js';



(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js';
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/profit_tracker/styles.css';


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



                let bookmakerMatch = true;
                // Get list of unselected bookmakers
                const unselectedBookmakers = Object.keys(bookmakerImages).filter(bookie => 
                    !globalFilters.bookmakers.includes(bookie)
                );

                // If any platform in row.platforms matches an unselected bookmaker, return false
                if (row.platforms && row.platforms.length > 0) {
                    const hasUnselectedPlatform = row.platforms.some(p => 
                        unselectedBookmakers.includes(p.platform)
                    );
                    if (hasUnselectedPlatform) {
                        bookmakerMatch = false;
                    }
                }
                
                

    
                let exchangeMatch = true;
                // Get list of unselected exchanges
                const unselectedExchanges = Object.keys(exchangeImages).filter(exchange => 
                    !globalFilters.exchanges.includes(exchange)
                );


                // If any platform in row.platforms matches an unselected exchange, return false
                if (row.platforms && row.platforms.length > 0) {
                    const hasUnselectedPlatform = row.platforms.some(p => 
                        unselectedExchanges.includes(p.platform)
                    );
                    if (hasUnselectedPlatform) {
                        exchangeMatch = false;
                    }
                }







                const oddsmatcherMatch = globalFilters.oddsmatchers.includes(row.oddsmatcher_type)

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

            
            let bookmaker_image = null;
            let bookmaker_link = null;
            if (!row.platforms || row.platforms.length == 0) {
                bookmaker_image = Helpers.get_bookmaker_image_profit_tracker(null);
                bookmaker_link = null;
            } else {
                bookmaker_image = Helpers.get_bookmaker_image_profit_tracker_desktop(row.platforms[0].platform)
                bookmaker_link = row.platforms[0].link;
                if (!bookmaker_link) {
                    bookmaker_link = bookmakerLinks[row.platforms[0].platform];
                }
            }

            row.qualifying_loss = row.qualifying_loss.replace('£', '');
            row.potential_profit = row.potential_profit.replace('£', '');
            row.actualprofit = row.actualprofit.replace('£', '');

            row.qualifying_loss = parseFloat(row.qualifying_loss).toFixed(2);
            row.potential_profit = parseFloat(row.potential_profit).toFixed(2);
            row.actualprofit = parseFloat(row.actualprofit).toFixed(2);

            if (isNaN(row.qualifying_loss) || row.qualifying_loss == '' || row.qualifying_loss == null || row.qualifying_loss == undefined || row.qualifying_loss == '0.00' || row.qualifying_loss == '-0.00') {
                row.qualifying_loss = '£0.00';
            } else {
                if (row.qualifying_loss.toString().includes('-')) {
                    row.qualifying_loss = '-£' + row.qualifying_loss.replace('-', '');
                } else {
                    row.qualifying_loss = '£' + row.qualifying_loss;
                }
            }

            if (isNaN(row.potential_profit) || row.potential_profit == '' || row.potential_profit == null || row.potential_profit == undefined || row.potential_profit == '0.00' || row.potential_profit == '-0.00') {
                row.potential_profit = '£0.00';
            } else {
                if (row.potential_profit.toString().includes('-')) {
                    row.potential_profit = '-£' + row.potential_profit.replace('-', '');
                } else {
                    row.potential_profit = '£' + row.potential_profit;
                }
            }

            if (isNaN(row.actualprofit) || row.actualprofit == '' || row.actualprofit == null || row.actualprofit == undefined || row.actualprofit == '0.00' || row.actualprofit == '-0.00') {
                row.actualprofit = '£0.00';
            } else {
                if (row.actualprofit.toString().includes('-')) {
                    row.actualprofit = '-£' + row.actualprofit.replace('-', '');
                } else {
                    row.actualprofit = '£' + row.actualprofit;
                }
            }

        

            
            const card = document.createElement('div');
            card.className = 'mobile-card outer-mobile-card';
            card.setAttribute('data-id', row.betId);


            card.innerHTML = `
                    <div class="mobile-card">
                            <div class="mobile-row mobile-row-date"><strong>Date:</strong> <span>${row.date}</span></div>
                            
                            
                            <div class="mobile-row mobile-row-event ${row.event ? '' : 'hidden_row_above_columns'}">
                                <strong>Event:</strong>
                                <span>${row.event}</span>
                            </div>

                            <div class="mobile-row mobile-row-bet-outcome ${row.bet_outcome ? '' : 'hidden_row_above_columns'}">
                                <strong>Bet:</strong>
                                <span>${row.bet_outcome}</span>
                            </div>

                            <div class="mobile-row mobile-row-bookmaker">
                                <strong>Platform:</strong>
                                <div class="div-outside-logo-img">
                                <a href="${bookmaker_link}" target="_blank" rel="noopener noreferrer">
                                    <img src="${bookmaker_image}" class="logo-img">
                                </a>
                                </div>
                            </div>


                            ${false ? `
                            <div class="mobile-row mobile-row-exchange">
                                <strong>Exchange:</strong>
                                <a href="${exchange_link}" target="_blank" rel="noopener noreferrer">
                                    <img src="${exchange_image}" class="logo-img">
                                </a>
                            </div>
                            ` : ''}


                            <div class="mobile-row mobile-row-description-container mobile-row-description">
                                <div class="mobile-row-description-title"><strong>Description:</strong></div>
                                <div class="mobile-row mobile-row-description"><span class="mobile-row-description-text">${row.description}</span></div>
                            </div>



                            <div class="profit_info_div_outer">
                                <div class="profit_info_div_inner">
                                    <div class="profit_info_div_inner_title">Qualifying Loss</div>
                                    <div class="qualifying_loss_badge ${parseFloat(row.qualifying_loss.replace('£', '')) < 0 ? 'loss-badge' : 'profit-badge'}">${row.qualifying_loss}</div>
                                </div>
                                <div class="profit_info_div_inner">
                                    <div class="profit_info_div_inner_title">Potential Profit</div>
                                    <div class="potential_profit_badge ${parseFloat(row.potential_profit.replace('£', '')) < 0 ? 'loss-badge' : 'profit-badge'}">${row.potential_profit}</div>
                                </div>
                                <div class="profit_info_div_inner">
                                    <div class="profit_info_div_inner_title">Bet<br>Settled<br></div>
                                    
                                    <div class="div-outside-switch item-complete-switch">
                                        <div class="switch_container" >
                                            <label class="switch">
                                                <input type="checkbox" class="show_filters_switch item_complete_switch" data-id=${row.betId} id="item-complete-switch-${row.betId}" ${row.complete ? 'checked' : ''}>
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div class="profit_info_div_inner">
                                    <div class="profit_info_div_inner_title">Final<br>Profit</div>
                                    <div class="final_profit_badge ${parseFloat(row.actualprofit.replace('£', '')) < 0 ? 'loss-badge' : 'profit-badge'} ${!row.complete ? 'not-complete-badge' : ''}">${row.actualprofit}</div>
                                </div>
                            </div>



    

                    </div>
            `;
        
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
