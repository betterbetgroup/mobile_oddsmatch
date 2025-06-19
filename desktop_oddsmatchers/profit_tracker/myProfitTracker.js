//import * as Helpers from 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/main/helper.js';
import * as Helpers from '../../oddsmatchers/main/helper.js';

//import * as Helpers from 'public/custom-elements/main-helper.js'

(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js';
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/desktop_oddsmatchers/profit_tracker/index.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/desktop_oddsmatchers/profit_tracker/styles.css';

    html_script = '../main/z.html';
    styles_script = 'styles.css';


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
                oddsmatcher_type: 'profit tracker',
                is_desktop: true,
                desktop_header_columns: ['date and time', 'description', 'bookmaker', 'exchange', 'expected profit ql and pp', 'bet settled', 'final profit']
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

                let bookmakerMatch = globalFilters.bookmakers.includes(row.bookie);

                // IF ALL BOOKIES ARE UNCHECKED IT STILL SHOWS WHEN .BOOKIE IS IN THE EXCHANGES LIST
    
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

            // IF NOT BOOKMAKER IMAGE THEN COLLAPSE THAT ROW
            let bookmaker_image = Helpers.get_bookmaker_image(row.bookie)
            let exchange_image = Helpers.get_exchange_image(row.exchange)

            if (!bookmaker_image) {
                bookmaker_image = 'https://static.wixstatic.com/media/7a0e3a_5ba0942899474154a8d3d0ab5095bc1e~mv2.png';
            }
            if (!exchange_image) {
                exchange_image = 'https://static.wixstatic.com/media/7a0e3a_5ba0942899474154a8d3d0ab5095bc1e~mv2.png';
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

            const tr = document.createElement('tr');
    
            tr.className = 'table_data_row';
            tr.setAttribute('data-id', row._id)




            tr.innerHTML = `

                <td class="date_and_time_data">${row.date}</td>
                
                <td class="description_data">
                    <div class="description-text">${row.description}</div>
                    <button class="more-button" data-bet-id="${row.betId}">more...</button>
                </td>


                <td>
                    <div id="bookmaker_logo_${row.betId}" class="bookmaker_logo_div">
                        <a class="div_around_logo" ${row.bookmaker_link ? `href="${row.bookmaker_link}" target="_blank"` : ''} >
                            <img class='bookmaker_logo_img' src="${bookmaker_image}">
                        </a>
                    </div>
                </td>

                <td>
                    <div id="bookmaker_logo_${row._id}" class="bookmaker_logo_div">
                        <a class="div_around_logo" ${row.exchange_link ? `href="${row.exchange_link}" target="_blank"` : ''} >
                            <img class='bookmaker_logo_img' src="${exchange_image}">
                        </a>
                    </div>
                </td>


                <td class="no_padding_margin">
                    <div class="expected_profit_data">
                        <div id='qualifying_loss_${row.betId}' class='${row.qualifying_loss.includes("-") ? "negative_profit_data" : "positive_profit_data"}' >${row.qualifying_loss}</div>
                        <div id='potential_profit_${row.betId}' class='${row.potential_profit.includes("-") ? "negative_profit_data" : "positive_profit_data"}' >${row.potential_profit}</div>
                    </div>
                </td>


                <td class="settled_data">
                    <div class="expected_profit_data">
                        <input type="checkbox" data-id="${row.betId}" name="is_settled" class="settled_checkbox" ${row.complete ? 'checked' : ''}>
                    </div>
                </td>


                <td class="no_padding_margin">
                    <div class="expected_profit_data">
                        <div id='actual_profit_${row.betId}' class='final_profit_data ${row.actualprofit.includes("-") ? "negative_profit_data" : "positive_profit_data"}' >${row.actualprofit}</div>
                    </div>
                </td>




            `;
        
            const tableBody = scope.querySelector('table tbody');
            tableBody.appendChild(tr);


            if (row.iscalc) {
                let calcButton = document.createElement('button');
                calcButton.innerHTML = `<img class="calculator_image" data-id="${row.betId}" id="more_info_button" src="https://img.icons8.com/?size=100&id=12780&format=png&color=000000" alt="Info">`;
                calcButton.className = 'calc_select_button';
                calcButton.setAttribute('data-id', row.betId);
                calcButton.setAttribute('aria-label', row.betId);
                tr.appendChild(calcButton);
            }
        
            // Create and append button directly to the row
            let selectButton = document.createElement('button');
            selectButton.innerHTML = '+';
            selectButton.className = 'select_button';
            selectButton.setAttribute('data-id', row.betId);
            selectButton.setAttribute('aria-label', row.betId);
            tr.appendChild(selectButton);
            






            // Add truncation functionality for description
            Helpers.setupDescriptionTruncation(tr, row.betId, row.description, scope, state);


        
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
