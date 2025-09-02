import * as Helpers from '../../oddsmatchers/main/helper.js';


(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js';
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/desktop_oddsmatchers/main/z.html';
    let styles_script = 'styles.css';



    class extraPlaceOddsmatcher extends HTMLElement {

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
                oddsmatcher_type: 'extra_place',
                is_desktop: true,
                desktop_header_columns: ['start date', 'end date', 'events', 'back odds', 'total lay odds', 'qualifying loss', 'rating']
                
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

            return globalData;
        
        }
    

        create_row(row, scope, state) {


            let bookmaker_image = Helpers.get_bookmaker_image(row.bookmaker)
            let win_exchange_image = Helpers.get_exchange_image(row.win_exchange)
            let place_exchange_image = Helpers.get_exchange_image(row.place_exchange)
        
        

        
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
        
            const tr = document.createElement('tr');
    
            tr.className = 'table_data_row';
            tr.setAttribute('data-id', row._id)
        
            tr.innerHTML = `
                
                <td class="date_and_time_data" id="date_time_${row._id}">${row.game_day}</td>
                <td class="end_date_and_time_data" id="end_date_time_${row._id}">${row.end_day_and_time}</td>
                <td class="fixture_data" id="fixture_${row._id}">${row.events.replace(/\n/g, '<br>')}</td>

                <td id="back_odds_data_${row._id}" class="no_padding_margin">
                    <div class="odds_and_bookmaker">
                        <div id="back_odds_value_${row._id}" class="back_odds_value">
                            <a ${row.bookmaker_link ? `href="${row.bookmaker_link}" target="_blank"` : ''} class="odds-link">${row.total_back_odds}</a>
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
                        <div id="back_odds_value_${row._id}" class="lay_odds_value">

                            <a ${row.bookmaker_link ? `href="${row.bookmaker_link}" target="_blank"` : ''} class="odds-link">${row.total_lay_odds}</a>


                            </div>

                </td>
        

        

                
                <td class="no_padding_margin">
                    <div class="expected_profit_data">
                        <div id='qualifying_loss_${row._id}' class='${qualifying_loss_class}'>${qualifying_loss}</div>
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
