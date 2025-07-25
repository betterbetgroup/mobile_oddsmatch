import * as Helpers from '../../oddsmatchers/main/helper.js';


(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js';
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/desktop_oddsmatchers/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/desktop_oddsmatchers/dutching_matcher/styles.css';



    class dutchingOddsmatcher extends HTMLElement {

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
                current_sort: 'qualifying loss',
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
                        name: 'markets', 
                        type: 'list',
                        input_id: 'markets-dropdown-select-container',
                        filter_id: 'markets-dropdown-options',
                        default: [],
                        list_values_source: 'DutchingMarketsList'
                    },
                    {
                        name: 'startTime',
                        type: 'string',
                        input_id: 'date-range',
                        filter_id: 'date-range',
                        default: ''
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
                        name: 'minROI',
                        type: 'number',
                        input_id: 'min-roi',
                        filter_id: 'min-roi',
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
                        text: 'Sort By Profit'
                    },
                    {
                        value: 'rating',
                        text: 'Sort By Rating'
                    },
                    {
                        value: 'date and time',
                        text: 'Sort By Date'
                    }
                ],
                is_tutorial: false,
                oddsmatcher_type: 'dutching',
                is_desktop: true,
                desktop_header_columns: ['date and time', 'event', 'first bet', 'second bet', 'third bet', 'profit', 'rating']
                
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

            const allPlatforms = globalFilters.bookmakers.concat(globalFilters.exchanges);
        
            return globalData.filter(row => {
        
                let allBookmakers = [row.first_bookmaker, row.second_bookmaker, row.third_bookmaker];
                if (parseInt(row.outcomes) == 2) {
                    allBookmakers = [row.first_bookmaker, row.second_bookmaker];
                }
                const bookmakerMatch = allBookmakers.every(bookmaker => allPlatforms.includes(bookmaker));
                
        
                const marketMatch = globalFilters.markets.includes(row.market_type);
        
                
                const ratingMatch = (globalFilters.minrating === null || parseFloat(row.rating) >= globalFilters.minrating) &&
                                    (globalFilters.maxrating === null || parseFloat(row.rating) <= globalFilters.maxrating);
                const qualifyingLossMatch = globalFilters.minQualifyingLoss === null || parseFloat(row.qualifying_loss.replace('£', '')) >= globalFilters.minQualifyingLoss;
                const roiMatch = globalFilters.minROI === null || parseFloat(row.ROI.replace('%', '')) >= globalFilters.minROI;
        
                
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
        
                return bookmakerMatch && marketMatch && ratingMatch && qualifyingLossMatch && roiMatch && timeMatch;
        
        
            });
        
        }
    

        create_row(row, scope, state) {


            let bookmaker_image = Helpers.get_bookmaker_image(row.first_bookmaker)
            let win_exchange_image = Helpers.get_bookmaker_image(row.second_bookmaker)
            let place_exchange_image = Helpers.get_bookmaker_image(row.third_bookmaker)
                
            let first_outcome = '';
            let second_outcome = '';
            let third_outcome = '';
                
            if (row.market_type == 'Match Odds') {
                first_outcome = 'HOME';
                second_outcome = 'DRAW';
                third_outcome = 'AWAY'; 
            } else {
                first_outcome = row.first_outcome;
                second_outcome = row.second_outcome;
            }
        
        
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
        
                <td id="date_time_${row._id}" class="date_and_time_data" >${row.date_and_time}</td>
        
                <td class="fixture_data" id="fixture_${row._id}">${row.fixture}</td>
        
        
        
        
                <td id="back_odds_data_${row._id}" class="no_padding_margin">
                    <div class="odds_and_bookmaker" id='back_each_way_odds_and_bookmaker'>
        
        
                        <div id="first_outcome_${row._id}" class="outcome_value">
                            <a ${row.first_link ? `href="${row.first_link}" target="_blank"` : ''} class="odds-link">${first_outcome}</a>
                        </div>    
        
                        <div id="back_odds_value_${row._id}" class="back_odds_value">
                            <a ${row.first_link ? `href="${row.first_link}" target="_blank"` : ''} class="odds-link">${row.first_odds}</a>
                        </div>    
        
                        <div id="bookmaker_logo_${row._id}" class="bookmaker_logo_div">
                            <a class="div_around_logo" ${row.first_link ? `href="${row.first_link}" target="_blank"` : ''} >
                                <img class='bookmaker_logo_img' src="${bookmaker_image}" alt="${row.sport} ${row.bookmaker} each way bet">
                            </a>
                        </div>
                    </div>                
                </td>
        
                <td id="lay_odds_data_${row._id}" class="no_padding_margin">
        
        
                    <div class="odds_and_bookmaker" id='win_lay_odds_and_bookmaker'>
        
                        <div id="second_outcome_${row._id}" class="outcome_value">
                            <a ${row.second_link ? `href="${row.second_link}" target="_blank"` : ''} class="odds-link">${second_outcome}</a>
                        </div>    
        
                        <div id="lay_odds_value_${row._id}" class="back_odds_value">
                            <a ${row.second_link ? `href="${row.second_link}" target="_blank"` : ''} class="odds-link">${row.second_odds}</a>
                        </div>
                        <div id="exchange_logo_${row._id}" class="exchange_logo_div">
                            <a class="div_around_logo" ${row.second_link ? `href="${row.second_link}" target="_blank"` : ''} >
                                <img class='exchange_logo_img' src="${win_exchange_image}" alt="${row.sport}" >
                            </a>
                        </div>
                    </div>                
                </td>

        
                <td id="place_lay_odds_data_${row._id}" class="place_lay_odds_data no_padding_margin ${parseInt(row.outcomes) !== 3 ? 'hide_data' : ''}">
                    
                    <div class="odds_and_bookmaker" id='place_lay_odds_and_bookmaker'>
        
                        <div id="third_outcome_${row._id}" class="outcome_value">
                            <a ${row.third_link ? `href="${row.third_link}" target="_blank"` : ''} class="odds-link">${third_outcome}</a>
                        </div>    
        
                        <div id="lay_odds_value_${row._id}" class="back_odds_value">
                            <a ${row.third_link ? `href="${row.third_link}" target="_blank"` : ''} class="odds-link">${row.third_odds}</a>
                        </div>
                        <div id="exchange_logo_${row._id}" class="exchange_logo_div">
                            <a class="div_around_logo" ${row.third_link ? `href="${row.third_link}" target="_blank"` : ''} >
                                <img class='exchange_logo_img' src=${parseInt(row.outcomes) === 3 ? place_exchange_image : win_exchange_image} alt="${row.sport}" >
                            </a>
                        </div>
                    </div>  
        
                </td>
                
        
        
        
        
                <td class="no_padding_margin">
                    <div class="expected_profit_data">
                        <div id='qualifying_loss_${row._id}' class='${qualifying_loss_class}'>${qualifying_loss}</div>
                    </div>
                </td>
        
        
                <td id="rating_${row._id}" class="rating_data">
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
                .filter(([key]) => DUTCHING_BOOKMAKERS.includes(key))
                .sort((a, b) => a[0].localeCompare(b[0]))  
            );

            exchangeImages = Object.fromEntries(
                Object.entries(exchangeImages)
                .filter(([key]) => DUTCHING_EXCHANGES.includes(key))
                .sort((a, b) => a[0].localeCompare(b[0]))  
            );
    
            state.customFilters = {
                'No Filter':
                    {
                        "bookmakers": Object.keys(bookmakerImages),
                        "exchanges": Object.keys(exchangeImages),
                        "markets": DutchingMarketsList,
                        "startTime": "",
                        "minrating": "null",
                        "maxrating": "null",
                        "minQualifyingLoss": "null",
                        "minROI": "null"
                    }
            };
    
            state.globalFilters = {
                bookmakers: Object.keys(bookmakerImages),
                exchanges: Object.keys(exchangeImages),
                markets: DutchingMarketsList,
                startTime: '',
                minrating: null,
                maxrating: null,
                minQualifyingLoss: null,
                minROI: null,
            };
    
       
        }
    

    }

    customElements.define('dutching-oddsmatcher', dutchingOddsmatcher);



})();
