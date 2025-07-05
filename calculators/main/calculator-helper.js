import * as calculator_helper from '../../oddsmatchers/main/calculate_functions.js';
import * as pt_helper from '../../oddsmatchers/main/profit_tracker_helper.js';
import * as helper from '../../oddsmatchers/main/helper.js';
import * as select_boxes_helper from '../../oddsmatchers/main/select_boxes.js';




const MAX_UPDATE_INTERVAL_LOCAL_DATA = 1000;








export function process_new_final_data(data, scope, state) {
    state.data_loaded_from_wix = true;
    data = JSON.parse(data);

    state.is_premium_member = data.premium_member;


    if (data.is_calc) {
        console.log('show the calculator things and return - should include platforms, date etc')
        state.data_object = data.is_calc_data;
        state.loaded_from_tracker = true;
        scope.querySelector('#log-bet-button').textContent = 'Update Bet';
        add_values_for_calculator(scope, state, true);
        return
    }

    if (data.local_calc_data && Object.keys(data.local_calc_data).length > 0) {
        console.log('fill inputs with local data - should include platform, date etc')
        state.data_object = data.local_calc_data;
        console.log(state.data_object)
        add_values_for_calculator(scope, state, true);
        return
    }

    set_all_values_to_default(scope, state)

}









export function runSpecificScript(scope, state) {

    window.addEventListener('resize', () => { handleResize(scope); });

    // FIRST CREATE THE HTML FOR THE CALCULATOR
    let calculator_container_div = scope.querySelector('.calculator-container-div')
    add_html_for_calculator(scope, state, calculator_container_div);

    // THEN ADD EVENT LISTENERS
    add_event_listeners_for_calculator(scope, state, calculator_container_div);


}





function add_html_for_calculator(scope, state, calculator_container_div) {

    // all of them should have a refresh button div
    add_refresh_button_div(scope, state, calculator_container_div);






    if (state.calculator_type == 'Standard') {
        add_input_section_for_standard_calculator(scope, state, calculator_container_div);
    }

    if (state.calculator_type == 'Each Way' || state.calculator_type == 'Extra Place') {
        add_input_section_for_each_way_calculator(scope, state, calculator_container_div);
    }

    add_event_listeners_for_dropdowns(scope, state, calculator_container_div);


    // then add 2 divs one goes on left for info and profit one on right for logging
    calculator_container_div.innerHTML += `<div class="bottom_div_calculator_container"></div>`
    add_div_for_info_and_profit(scope, state, calculator_container_div);


    set_all_values_to_default(scope, state)


}


function add_refresh_button_div(scope, state, calculator_container_div) {

    const refresh_button_div = document.createElement('div');
    refresh_button_div.className = 'refresh-button-div';

    refresh_button_div.innerHTML = `
        <button class="save-filter-button refresh-button refresh-button-calculator-click" id="refresh-button">
            <span class="refresh-button-calculator-click">Refresh</span>
            <img src="https://img.icons8.com/?size=100&amp;id=59872&amp;format=png&amp;color=ffffff" alt="Refresh Oddsmatcher Data" class="refresh_results_img refresh-button-calculator-click">
        </button>
    `;

    calculator_container_div.appendChild(refresh_button_div);


}





function add_input_section_for_standard_calculator(scope, state, calculator_container_div) {

    // take the container and add a div with three divs in it, dividing the space equally
    const input_section_div = document.createElement('div');
    input_section_div.className = 'input-section-div input-section-div-outer';
    calculator_container_div.appendChild(input_section_div);


    // add back bet div
    const first_row_div = document.createElement('div');
    first_row_div.className = 'calculator-bet-info-section-div back-bet-calculator-div';

    // add three divs to the input section div
    const second_row_div = document.createElement('div');
    second_row_div.className = 'calculator-bet-info-section-div lay-bet-calculator-div';

    input_section_div.appendChild(first_row_div);
    input_section_div.appendChild(second_row_div);


    // select the back-input-div
    add_flag_div(first_row_div, false);
    add_stake_input(first_row_div, 'Back', 'back-stake-input');
    add_odds_input(first_row_div, 'Back', 1);
    add_platform_div_for_logging(first_row_div, 'Back Bet Bookmaker', 1);
    add_free_bet_mode_control(first_row_div);


    // select the lay-input-div
    add_flag_div(second_row_div, true);
    add_odds_input(second_row_div, 'Lay', 2);
    add_commission_input(second_row_div, 'Lay', 2);
    add_platform_div_for_logging(second_row_div, 'Lay Bet Exchange', 2);





    // adding in lay bet info
    add_lay_bet_info_div(scope, state, second_row_div, 2, `at <span id="lay-odds-span-2"`);





    // add the lay type div - make it be in the main div
    const lay_control_div = document.createElement('div');
    lay_control_div.className = 'calculator-bet-info-section-div control-div-bet-calculator-div';
    calculator_container_div.appendChild(lay_control_div);
    add_control_input_standard(lay_control_div);


}

function add_input_section_for_each_way_calculator(scope, state, calculator_container_div) {


    // take the container and add a div with three divs in it, dividing the space equally
    const input_section_div = document.createElement('div');
    input_section_div.className = 'input-section-div input-section-div-outer';
    calculator_container_div.appendChild(input_section_div);


    // add back bet div
    const first_row_div = document.createElement('div');
    first_row_div.className = 'calculator-bet-info-section-div back-bet-calculator-div';

    // add three divs to the input section div
    const second_row_div = document.createElement('div');
    second_row_div.className = 'calculator-bet-info-section-div lay-bet-calculator-div';

    const third_row_div = document.createElement('div');
    third_row_div.className = 'calculator-bet-info-section-div place-lay-bet-calculator-div';


    input_section_div.appendChild(first_row_div);
    input_section_div.appendChild(second_row_div);
    input_section_div.appendChild(third_row_div);


    // select the back-input-div
    add_flag_div(first_row_div, false);
    add_odds_input(first_row_div, 'Each Way', 1);
    add_lay_terms_input(first_row_div, 'Place Payout Fraction', 1);
    add_platform_div_for_logging(first_row_div, 'Each Way Bookmaker', 1);
    add_stake_input(first_row_div, 'Each Way', 'back-stake-input');


    // select the lay-input-div
    add_flag_div(second_row_div, true);
    add_odds_input(second_row_div, 'Win Lay', 2);
    add_commission_input(second_row_div, 'Win Lay', 2);
    add_platform_div_for_logging(second_row_div, 'Win Lay Exchange', 2);


    // select the place-lay-bet-div
    add_flag_div(third_row_div, true);
    add_odds_input(third_row_div, 'Place Lay', 3);
    add_commission_input(third_row_div, 'Place Lay', 3);
    add_platform_div_for_logging(third_row_div, 'Place Lay Exchange', 3);




    // ALSO NEED TO ADD LAY BET DIVS 
    add_lay_bet_info_div(scope, state, second_row_div, 2, 'on the Win');
    add_lay_bet_info_div(scope, state, third_row_div, 3, 'on the Place');



}




function add_lay_bet_info_div(scope, state, top_div, index, info_text) {
    top_div.innerHTML += `
        <div class="select_bet_text_div lay_bet_info_div"> 
            <span class="select_bet_text_div_text" id="select_bet_text_div_text_iOarZiIyJHVdbIJe6gt1wY8GqVhyeCvleF9k_Lay">Lay <span id="lay-stake-span-${index}" class="copy-on-click "></span>
            <img src="https://img.icons8.com/?size=100&amp;id=59773&amp;format=png&amp;color=ffffff" class="copy-icon" id="copy-icon-${index}" alt="(Copy)">
            ${info_text}      
            </span>
        </div>
    `;
}

function add_free_bet_mode_control(div) {
    div.innerHTML += `
            <div class="free_bet_mode_control">
                <label class="switch switch_select_free_bet_mode">
                    <input type="checkbox" class="free_bet_mode_switch" id="free_bet_mode_switch">
                    <span class="slider slider_select_free_bet_mode"></span>
                </label>
                <span class="free_bet_mode_label">Free Bet</span>
            </div>
    `;

}

function add_flag_div(div, is_lay) {

    div.innerHTML += `

    <div class="div_outside_bar_on_left_of_item">
     
        <div class="bar_on_left_of_item ${is_lay ? 'bar_on_left_of_item_lay' : ''}"></div>

    </div>

    `;

}

function add_stake_input(div, type, id) {
    div.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">${type} Stake</div>
            <input type="text" class="text-input" placeholder="Enter stake" id="${id}" autocomplete="off">
        </div>
    `;
}

function add_lay_terms_input(div, type_text, index) {

    div.innerHTML += `

    <div class="filter-item">
        <label class="filter-label" for="place-payout-fraction-input-${index}">${type_text}</label>
        <div class="text-input-container place_lay_fraction_input">
            <input type="text" class="text-input text-input-container currency_in_input" placeholder="Enter fraction" id="place-payout-fraction-input-${index}" autocomplete="off">
        </div>
    </div>
`;
}

function add_odds_input(div, type, index) {
    div.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">${type} Odds</div>
            <input type="text" class="text-input" placeholder="Enter odds" id="odds-input-${index}" autocomplete="off">
        </div>
    `;
}

function add_commission_input(div, type, index) {
    div.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">${type} Commission</div>
            <input type="text" class="text-input" placeholder="Enter commission" id="commission-input-${index}" autocomplete="off">
        </div>
    `;
}

function add_control_input_standard(control_input_div_select, state) {
    control_input_div_select.innerHTML += `

            <div class="bet_type_control">
                <div class="lay_type_control_container"">
                    <button class="bet-type-btn" data-type="Underlay">Underlay</button>
                    <button class="bet-type-btn active-lay-type" data-type="Standard">Standard</button>
                    <button class="bet-type-btn" data-type="Overlay">Overlay</button>
                </div>
            </div>


    `;
}

function add_platform_div_for_logging(logging_div, type_text, index) {


    logging_div.innerHTML += `
<div class="filter-item filter-item-profit-tracker filter-item-profit-tracker-platform-select" data-index="${index}" data-bet-id="">
    <label class="filter-label" for="platform-select-${index}">${type_text}</label>
    <div id="filters-dropdown-select-container-${index}" class="custom-select-container select-filters-container dropdown-option-platform-on-click" tabindex="0" data-platform-selector="filters-dropdown-select-container-${index}" data-button-div-selector="platform-dropdown-options-${index}">
        <div class="custom-select-trigger">
            <input id="platform-select-${index}" type="text" value="Other" readonly class="dropdown-option-platform-on-click" data-platform-selector="filters-dropdown-select-container-${index}" data-button-div-selector="platform-dropdown-options-${index}">
        </div>
        <div class="dropdown-options dropdown-options-platforms-select" id="platform-dropdown-options-${index}" data-type="${type_text}" data-input-selector="platform-select-${index}">
        </div>
    </div>
</div>

    `;

}


function add_event_listeners_for_dropdowns(scope, state, calculator_container_div) {

    // this is appending the options to the dropdowns
    let all_platforms = helper.get_all_platforms_profit_tracker();
    // select all .dropdown-options in the div and get their id
    let dropdown_containers = calculator_container_div.querySelectorAll('div.dropdown-options.dropdown-options-platforms-select');
    dropdown_containers.forEach(dropdown_container => {
        pt_helper.append_platforms_to_platform_selectors(dropdown_container, all_platforms, calculator_container_div, state)
    });


    // ADDING EVENT LISTENERS TO THE DROPDOWNS
    add_event_listener_for_dropdown_options_calculator(scope, state, calculator_container_div);
    pt_helper.add_event_listener_for_platform_divs(scope.querySelector('.calculator-container-div'));

}

// this is adding the event listener for the dropdown options
export function add_event_listener_for_dropdown_options_calculator(scope, state, div) {

    div.addEventListener('click', (event) => {

        if (event.target.classList.contains('platform-option-on-click')) {

            pt_helper.set_background_for_current_option_profit_tracker(event.target.dataset.value, event.target.parentElement);

            // get the data-input-selector
            let input_selector = event.target.dataset.inputSelector;
            let input = scope.querySelector(`#${input_selector}`);
            input.value = event.target.dataset.value;

            add_values_for_calculator(scope, state, false);

        }

    });

}


function add_div_for_info_and_profit(scope, state, calculator_container_div) {

    const info_and_profit_div = document.createElement('div');
    info_and_profit_div.className = 'info-and-profit-div';
    calculator_container_div.querySelector('.bottom_div_calculator_container').appendChild(info_and_profit_div);



    if (state.calculator_type == 'Standard') {
        add_desc_profit_div_standard(info_and_profit_div);
    } else if (state.calculator_type == 'Each Way') {
        add_desc_profit_div_each_way(info_and_profit_div);
    } else if (state.calculator_type == 'Extra Place') {
        add_desc_profit_div_extra_place(info_and_profit_div);
    }

}


function add_desc_profit_div_standard(bottom_div) {


    bottom_div.innerHTML += `
        <div class="div-in-bottom-div-info-and-profit">
            
        
            <div class="profit_display_profit_and_log_div profit_display_div_calculator">



                    <div class="filter-item filter-item-description">
                        <label class="filter-label">Description</label>
                        <textarea id="bet-description-input" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
                    </div>



                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_rating">
                            <span class="profit_and_log__item_title profit_and_log__item_title_rating">
                                Bet Rating
                            </span>
                            <span class="profit_and_log__item_value profit_and_log__item_value_rating">100.00%</span>
                    </div>


                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_qualifying_loss">
                        <span class="profit_and_log__item_title profit_and_log__item_title_qualifying_loss">
                            Qualifying Loss
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_qualifying_loss">£0.00</span>
                    </div>
                    

                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_potential_profit">
                        <span class="profit_and_log__item_title profit_and_log__item_title_potential_profit">
                            Potential Profit
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_potential_profit profit_and_log__item_value_positive">£39.00</span>
                    </div>



                    <div class="log-bet-button-div">
                            <button id="log-bet-button" class="log-bet-button">Log Bet</button>
                    </div>


            </div>



        </div>
    `;
}

function add_desc_profit_div_each_way(bottom_div) {


    bottom_div.innerHTML += `
        <div class="div-in-bottom-div-info-and-profit">
            
        
            <div class="profit_display_profit_and_log_div profit_display_div_calculator">



                    <div class="filter-item filter-item-description">
                        <label class="filter-label">Description</label>
                        <textarea id="bet-description-input" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
                    </div>



                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_rating">
                            <span class="profit_and_log__item_title profit_and_log__item_title_rating">
                                Bet Rating
                            </span>
                            <span class="profit_and_log__item_value profit_and_log__item_value_rating">100.00%</span>
                    </div>


                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_qualifying_loss">
                        <span class="profit_and_log__item_title profit_and_log__item_title_qualifying_loss">
                            Bet Profit
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_qualifying_loss">£0.00</span>
                    </div>
                    
                    <div class="log-bet-button-div">
                            <button id="log-bet-button" class="log-bet-button">Log Bet</button>
                    </div>


            </div>



        </div>
    `;
}

function add_desc_profit_div_extra_place(bottom_div) {


    bottom_div.innerHTML += `
        <div class="div-in-bottom-div-info-and-profit">
            
        
            <div class="profit_display_profit_and_log_div profit_display_div_calculator">



                    <div class="filter-item filter-item-description">
                        <label class="filter-label">Description</label>
                        <textarea id="bet-description-input" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
                    </div>

                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_rating">
                            <span class="profit_and_log__item_title profit_and_log__item_title_rating">
                                Implied Odds
                            </span>
                            <span class="profit_and_log__item_value profit_and_log__item_value_implied_odds">0</span>
                    </div>


                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_qualifying_loss">
                        <span class="profit_and_log__item_title profit_and_log__item_title_qualifying_loss">
                            Qualifying Loss
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_qualifying_loss">£0.00</span>
                    </div>
                    

                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_potential_profit">
                        <span class="profit_and_log__item_title profit_and_log__item_title_potential_profit">
                            Potential Profit
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_potential_profit profit_and_log__item_value_positive">£39.00</span>
                    </div>

                    
                    <div class="log-bet-button-div">
                            <button id="log-bet-button" class="log-bet-button">Log Bet</button>
                    </div>


            </div>



        </div>
    `;
}



















function add_values_for_calculator(scope, state, is_create) {



    // this is standard first,
    if (is_create) {

        // stake with back stake
        scope.querySelector('#back-stake-input').value = state.data_object.backstake || state.data_object.stake || state.data_object.each_way_stake || '';
        // Set odds and commission if platforms exist
        if (state.data_object.platforms) {
            state.data_object.platforms.forEach((platform, index) => {
                // Set odds for both back and lay
                try {
                    scope.querySelector(`#odds-input-${index + 1}`).value = platform.odds || '';
                } catch (error) {
                    // pass
                }
                try {
                    scope.querySelector(`#commission-input-${index + 1}`).value = platform.commission || '';
                } catch (error) {
                    // pass
                }
                try {
                    scope.querySelector(`#platform-select-${index + 1}`).value = platform.platform || 'Other';
                } catch (error) {
                    // pass
                }

            });
        }


        // set the place payout fraction
        let place_payout_fraction_input = scope.querySelector('#place-payout-fraction-input-1');
        if (place_payout_fraction_input) {
            place_payout_fraction_input.value = state.data_object.bookmaker_fraction.split('/')[1] || '';
        }


        let free_bet_switch = scope.querySelector('#free_bet_mode_switch');
        // then free bet mode 
        if (free_bet_switch) {
            if (state.data_object.isfree) {
                free_bet_switch.checked = true;
            } else {
                free_bet_switch.checked = false;
            }
        }


        // then lay type
        // remove all active-lay-type classes
        let have_lay_type_buttons = false;
        scope.querySelectorAll('.active-lay-type').forEach(btn => {
            btn.classList.remove('active-lay-type');
            have_lay_type_buttons = true;
        });
        // then add the active-lay-type class to the correct button
        if (have_lay_type_buttons) {
            if (state.data_object.laytype == 'Underlay') {
                scope.querySelector('.bet-type-btn[data-type="Underlay"]').classList.add('active-lay-type');
            } else if (state.data_object.laytype == 'Standard') {
                scope.querySelector('.bet-type-btn[data-type="Standard"]').classList.add('active-lay-type');
            } else if (state.data_object.laytype == 'Overlay') {
                scope.querySelector('.bet-type-btn[data-type="Overlay"]').classList.add('active-lay-type');
            }
        }



        // set description 
        scope.querySelector('#bet-description-input').value = state.data_object.description || '';

    }



    // SHOULD PROBABLY HAVE A FUNCTION HERE LIKE COLLECT VALUES STANDARD
    if (state.calculator_type == 'Standard') {
        get_and_create_all_values_standard(scope, state);
    } else if (state.calculator_type == 'Each Way' || state.calculator_type == 'Extra Place') {
        get_and_create_all_values_each_way(scope, state);
    }



    if (state.data_object.incomplete_data) {
        state.data_object.qualifying_loss = '0.00';
        state.data_object.potential_profit = '0.00';
    }


    // update the local data
    update_local_data(scope, state);




    if (state.calculator_type == 'Standard') {
        set_results_for_standard(scope, state);
    } else if (state.calculator_type == 'Each Way') {
        set_results_for_each_way(scope, state);
    } else if (state.calculator_type == 'Extra Place') {
        set_results_for_extra_place(scope, state);
    }


}

function update_local_data(scope, state) {

    // Initialize the throttling properties if they don't exist
    if (typeof state.updateLocalDataTimeoutId === 'undefined') {
        state.updateLocalDataTimeoutId = null;
    }
    if (typeof state.latestLocalData === 'undefined') {
        state.latestLocalData = null;
    }

    // Save the latest data
    state.latestLocalData = state.data_object;

    // If a timeout is already running, don't schedule another yet
    if (state.updateLocalDataTimeoutId !== null) {
        return;
    }

    // Otherwise, schedule an update for 1000ms later
    state.updateLocalDataTimeoutId = setTimeout(() => {
        // raise event and send to wix with the latest data
        let message_type = 'local_calc_data';
        let message = {
            local_calc_data: state.latestLocalData,
        }
        const raise_event = new CustomEvent(message_type, {
            detail: message,
            bubbles: true,       // Allows the event to bubble up through the DOM
            composed: true        // Allows the event to pass through shadow DOM boundaries
        });
        scope.dispatchEvent(raise_event);

        // Clear timeout and latest data tracker
        state.updateLocalDataTimeoutId = null;
        state.latestLocalData = null;
    }, MAX_UPDATE_INTERVAL_LOCAL_DATA);

}


function get_and_create_all_values_standard(scope, state) {

    state.data_object.laytype = scope.querySelector('.active-lay-type').dataset.type;
    state.data_object.isfree = scope.querySelector('#free_bet_mode_switch').checked;

    if (!state.data_object.platforms) {
        state.data_object.platforms = [{}, {}]
    }

    // set the platform data
    state.data_object.platforms[0].odds = scope.querySelector('#odds-input-1').value;
    state.data_object.platforms[1].odds = scope.querySelector('#odds-input-2').value;
    state.data_object.platforms[1].commission = scope.querySelector('#commission-input-2').value;
    state.data_object.platforms[0].platform = scope.querySelector('#platform-select-1').value;
    state.data_object.platforms[1].platform = scope.querySelector('#platform-select-2').value;

    state.data_object.backstake = scope.querySelector('#back-stake-input').value;

    state.data_object.description = scope.querySelector('#bet-description-input').value;

    calculate_standard_bet(scope, state);

}
function calculate_standard_bet(scope, state) {

    state.data_object.back_odds = parseFloat(scope.querySelector('#odds-input-1').value);
    state.data_object.lay_odds = parseFloat(scope.querySelector('#odds-input-2').value);
    state.data_object.lay_commission = (parseFloat(scope.querySelector('#commission-input-2').value)) / 100;
    state.data_object.back_stake = parseFloat(scope.querySelector('#back-stake-input').value);

    state.data_object = calculator_helper.calculate_standard(state.data_object);

}

function get_and_create_all_values_each_way(scope, state) {

    if (!state.data_object.platforms) {
        state.data_object.platforms = [{}, {}, {}]
    }

    // set the platform data
    state.data_object.platforms[0].odds = scope.querySelector('#odds-input-1').value;
    state.data_object.platforms[1].odds = scope.querySelector('#odds-input-2').value;
    state.data_object.platforms[2].odds = scope.querySelector('#odds-input-3').value;
    state.data_object.platforms[1].commission = scope.querySelector('#commission-input-2').value;
    state.data_object.platforms[2].commission = scope.querySelector('#commission-input-3').value;
    state.data_object.platforms[0].platform = scope.querySelector('#platform-select-1').value;
    state.data_object.platforms[1].platform = scope.querySelector('#platform-select-2').value;
    state.data_object.platforms[2].platform = scope.querySelector('#platform-select-3').value;

    state.data_object.backstake = scope.querySelector('#back-stake-input').value;

    state.data_object.description = scope.querySelector('#bet-description-input').value;

    state.data_object.bookmaker_fraction = '1/' + scope.querySelector('#place-payout-fraction-input-1').value;

    calculate_each_way_bet(scope, state);

}

function calculate_each_way_bet(scope, state) {

    state.data_object.each_way_odds = parseFloat(scope.querySelector('#odds-input-1').value);
    state.data_object.exchange_win_odds = parseFloat(scope.querySelector('#odds-input-2').value);
    state.data_object.exchange_place_odds = (parseFloat(scope.querySelector('#odds-input-3').value));
    state.data_object.exchange_win_commission = (parseFloat(scope.querySelector('#commission-input-2').value)) / 100;
    state.data_object.exchange_place_commission = (parseFloat(scope.querySelector('#commission-input-3').value)) / 100;
    state.data_object.each_way_stake = parseFloat(scope.querySelector('#back-stake-input').value);

    state.data_object = calculator_helper.calculate_each_way_and_extra_place(state.data_object, state.calculator_type == 'Extra Place');

}







function set_results_for_standard(scope, state) {

    if (!state.data_object.incomplete_data) {

        // then set lay stake using #lay-stake-span
        scope.querySelector('#lay-stake-span-2').textContent = '£' + state.data_object.lay_stake || '';
        scope.querySelector('#lay-stake-span-2').classList.add('copy-on-click');
        scope.querySelector('#copy-icon-2').classList.remove('hidden_row_above_columns');

        scope.querySelector('#lay-odds-span-2').textContent = state.data_object.lay_odds + ' Lay Odds' || '';

        // then set the profit items
        scope.querySelector('.profit_and_log__item_value_rating').textContent = state.data_object.rating || '0%';
        scope.querySelector('.profit_and_log__item_value_qualifying_loss').textContent = ('£' + state.data_object.qualifying_loss).replace('£-', '-£');
        select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_qualifying_loss'), state.data_object.qualifying_loss);
        scope.querySelector('.profit_and_log__item_value_potential_profit').textContent = ('£' + state.data_object.potential_profit).replace('£-', '-£');
        select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_potential_profit'), state.data_object.potential_profit);


    } else {

        set_results_to_default(scope, state);

    }

}


function set_results_for_each_way(scope, state) {

    if (!state.data_object.incomplete_data) {

        // then set lay stake using #lay-stake-span
        scope.querySelector('#lay-stake-span-2').textContent = '£' + state.data_object.lay_stake_win || '';
        scope.querySelector('#lay-stake-span-2').classList.add('copy-on-click');
        scope.querySelector('#copy-icon-2').classList.remove('hidden_row_above_columns');

        scope.querySelector('#lay-stake-span-3').textContent = '£' + state.data_object.lay_stake_place || '';
        scope.querySelector('#lay-stake-span-3').classList.add('copy-on-click');
        scope.querySelector('#copy-icon-3').classList.remove('hidden_row_above_columns');

        // then set the profit items
        scope.querySelector('.profit_and_log__item_value_rating').textContent = state.data_object.rating || '0%';
        scope.querySelector('.profit_and_log__item_value_qualifying_loss').textContent = ('£' + state.data_object.qualifying_loss).replace('£-', '-£');
        select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_qualifying_loss'), state.data_object.qualifying_loss);

    } else {

        set_results_to_default(scope, state);

    }

}


function set_results_for_extra_place(scope, state) {

    if (!state.data_object.incomplete_data) {

        // then set lay stake using #lay-stake-span
        scope.querySelector('#lay-stake-span-2').textContent = '£' + state.data_object.lay_stake_win || '';
        scope.querySelector('#lay-stake-span-2').classList.add('copy-on-click');
        scope.querySelector('#copy-icon-2').classList.remove('hidden_row_above_columns');

        scope.querySelector('#lay-stake-span-3').textContent = '£' + state.data_object.lay_stake_place || '';
        scope.querySelector('#lay-stake-span-3').classList.add('copy-on-click');
        scope.querySelector('#copy-icon-3').classList.remove('hidden_row_above_columns');

        // then set the profit items
        scope.querySelector('.profit_and_log__item_value_implied_odds').textContent = state.data_object.implied_odds || '0';
        scope.querySelector('.profit_and_log__item_value_qualifying_loss').textContent = ('£' + state.data_object.qualifying_loss).replace('£-', '-£');
        select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_qualifying_loss'), state.data_object.qualifying_loss);
        scope.querySelector('.profit_and_log__item_value_potential_profit').textContent = ('£' + state.data_object.potential_profit).replace('£-', '-£');
        select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_potential_profit'), state.data_object.potential_profit);


    } else {

        set_results_to_default(scope, state);

    }

}


function set_results_to_default(scope, state) {

    // then set lay stake using #lay-stake-span

    // if platforms and platforms > 1 loop over platforms try the following things

    let lay_bet_spans = scope.querySelectorAll('.select_bet_text_div_text');
    // store an index and loop bet rows
    lay_bet_spans.forEach(lay_bet_spans => {

        try {
            lay_bet_spans.querySelector('span[id^="lay-stake-span"]').textContent = '...';
        } catch (error) {
            // pass
        }

        try {
            lay_bet_spans.querySelector('span[id^="lay-stake-span"]').classList.remove('copy-on-click');
        } catch (error) {
            // pass
        }

        try {
            lay_bet_spans.querySelector('.copy-icon').classList.add('hidden_row_above_columns');
        } catch (error) {
            // pass
        }

        try {
            lay_bet_spans.querySelector('span[id^="lay-odds-span"]').textContent = '... Lay Odds';
        } catch (error) {
            // pass
        }

    });


    // then set the profit items

    // SELECT ALL .profit_and_log__item_value
    let profit_and_log_item_values = scope.querySelectorAll('.profit_and_log__item_value');
    profit_and_log_item_values.forEach(profit_and_log_item_value => {

        if (profit_and_log_item_value.classList.contains('profit_and_log__item_value_rating')) {
            profit_and_log_item_value.textContent = ('0%');
        } else if (profit_and_log_item_value.classList.contains('profit_and_log__item_value_implied_odds')) {
            profit_and_log_item_value.textContent = ('0');
        } else {
            profit_and_log_item_value.textContent = ('£0.00');
            select_boxes_helper.set_class_for_profit_info_item(profit_and_log_item_value, '0.00');
        }

    });

}





function set_all_values_to_default(scope, state) {

    // remove all active-lay-type classes
    let have_lay_type_buttons = false;
    scope.querySelectorAll('.active-lay-type').forEach(btn => {
        btn.classList.remove('active-lay-type');
        have_lay_type_buttons = true;
    });
    // then add the active-lay-type class to the correct button
    if (have_lay_type_buttons) {
        scope.querySelector('.bet-type-btn[data-type="Standard"]').classList.add('active-lay-type');
    }

    // make the free bet mode switch unchecked
    let free_bet_switch = scope.querySelector('#free_bet_mode_switch');
    if (free_bet_switch) {
        free_bet_switch.checked = false;
    }

    // set all text inputs to '' unless their id contains 'commission' then set to 0
    scope.querySelectorAll('input').forEach(input => {
        if (input.id.includes('commission')) {
            input.value = '0';
        } else if (input.id.includes('platform-select')) {
            //pass
        } else {
            input.value = '';
        }
    });


    // select all input.dropdown-option-platform-on-click
    scope.querySelectorAll('input.dropdown-option-platform-on-click').forEach(input => {
        input.value = 'Other';
    });

    // remove active from all .platform-option-on-click
    scope.querySelectorAll('.platform-option-on-click').forEach(option => {
        option.classList.remove('active');
    });


    // then add active to ALL .platform-option-on-click with data-value of 'Other'
    scope.querySelectorAll('.platform-option-on-click').forEach(option => {
        if (option.dataset.value == 'Other') {
            option.classList.add('active');
        }
    });


    // then also set the description to ''
    scope.querySelector('#bet-description-input').value = '';


    set_results_to_default(scope, state);

}






function add_event_listeners_for_calculator(scope, state, div) {

    // add event listener for on click anywhere and if target class is select button then call function with the target
    div.addEventListener('click', (event) => {

        if (event.target.classList.contains('copy-on-click')) {
            select_boxes_helper.copy_text_on_click_stake(event);
        }

        if (event.target.classList.contains('bet-type-btn')) {

            select_boxes_helper.change_lay_type_control_container(event);

            add_values_for_calculator(scope, state, false);

        }


        if (event.target.classList.contains('log-bet-button')) {
            // Get the latest data object from the div attribute
            log_bet(scope, state, div);
        }

        if (event.target.classList.contains('refresh-button-calculator-click')) {
            state.loaded_from_tracker = false;
            scope.querySelector('#log-bet-button').textContent = 'Log Bet';
            set_all_values_to_default(scope, state); // should find commission inputs and set to 0, then rest of inputs to ''    
            add_values_for_calculator(scope, state, false);
        }

    });

    // also add a function to listen to all 'input' or 'change' events on all inputs in the div
    div.querySelectorAll('input').forEach(input => { // CAPTURES FREE BET MODE SWITCH CHANGES TOO
        input.addEventListener('input', (event) => {
            add_values_for_calculator(scope, state, false);
        });
    });


    // and on change description 
    div.querySelector('#bet-description-input').addEventListener('input', (event) => {
        add_values_for_calculator(scope, state, false);
    });

}







function log_bet(scope, state) {

    state.data_object.date = pt_helper.convertInputDateToDisplayFormat(pt_helper.convertDateToInputFormat(new Date().toLocaleDateString('en-GB')));
    state.data_object.date_and_time = state.data_object.date.replace(/\/\d{4}/, '/' + state.data_object.date.split('/')[2].slice(-2)) + ' 12:00';

    state.data_object.iscalc = true;
    state.data_object.complete = false;
    if (!state.loaded_from_tracker) {
        state.data_object.betId = Math.random().toString(36).substring(2, 15) + '_' + Date.now(); // as they can log the same oddsmatcher bet multiple times
    }
    //data_object.userId = state.user_id;    add in userId on wix
    state.data_object.oddsmatcher_type = 'Manual';
    state.data_object.event = '';
    state.data_object.actualprofit = '';
    state.data_object.qualifying_loss = state.data_object.qualifying_loss.replace('£', '');
    state.data_object.potential_profit = state.data_object.potential_profit.replace('£', '');
    state.data_object.bet_outcome = '';
    state.data_object.calculator = state.calculator_type;


    if (state.data_object.platforms) {
        let platform_index = 1;
        state.data_object.platforms.forEach(platform => {

            if (!platform.commission) {
                platform.commission = '';
            }

            platform.link = '';
            platform.index = platform_index;
            platform_index++;
        });
    }


    console.log(state.data_object)
    const raise_event = new CustomEvent('logbet', {
        detail: { bet_object: state.data_object },
        bubbles: true,
        composed: true
    });

    scope.dispatchEvent(raise_event);

}






















export function handleResize(scope) {

    let width = window.innerWidth;
    const contentDiv = scope.getElementById('outer-container-div');
    contentDiv.style.width = `${width}px`;

}


export function addStyles(scope, state, styles_script) {

    return new Promise((resolve, reject) => {

        try {

            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', styles_script);

            link.onload = () => { resolve('done'); };

            scope.appendChild(link);

            const fontAwesomeLink = document.createElement('link');
            fontAwesomeLink.setAttribute('rel', 'stylesheet');
            fontAwesomeLink.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

            scope.appendChild(fontAwesomeLink);

        } catch (error) {
            return reject(error)
        }

    });
}


export function render(scope, state, html_script, general_info_script) {
    return fetch(html_script)
        .then(response => response.text())
        .then(html => {
            scope.innerHTML = html;
            return helper.loadExternalScript(general_info_script);
        })
        .catch(error => {
            console.error('Error loading script:', error);
        });
}