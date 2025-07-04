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
        add_values_for_calculator(scope, state, true);
        return
    }


    set_all_values_to_default(scope, state)

}









export function runSpecificScript(scope, state) {

    window.addEventListener('resize', () => { handleResize(scope); });

    // setting up html for desktop and mobile should be the same function just small 
    // changes to the classes so can adjust flex direction




    // FIRST CREATE THE HTML FOR THE CALCULATOR
    add_html_for_calculator(scope, state);

    // THEN ADD EVENT LISTENERS
    add_event_listeners_for_calculator(scope, state, scope.querySelector('.calculator-container-div'));


}

function add_html_for_calculator(scope, state) {

    // get the calculator container div
    let calculator_container_div = scope.querySelector('.calculator-container-div');

    // all of them should have a refresh button div
    add_refresh_button_div(scope, state, calculator_container_div);


    if (state.calculator_type == 'Standard') {
        add_input_section_for_standard_calculator(scope, state, calculator_container_div);
    }


    // then add 2 divs one goes on left for info and profit one on right for logging
    calculator_container_div.innerHTML += `<div class="bottom_div_calculator_container"></div>`
    add_div_for_logging(scope, state, calculator_container_div);
    add_div_for_info_and_profit(scope, state, calculator_container_div);


    set_all_values_to_default(scope, state)


}


function add_values_for_calculator(scope, state, is_create) {

    // this is standard first,

    if (is_create) {

        // stake with back stake
        scope.querySelector('#back-stake-input').value = state.data_object.backstake || '';

        // then back odds
        scope.querySelector('#odds-input-1').value = state.data_object.platforms[0].odds || '';

        // then lay odds
        scope.querySelector('#odds-input-2').value = state.data_object.platforms[1].odds || '';

        // then lay commission
        scope.querySelector('#commission-input-2').value = state.data_object.platforms[1].commission || '';


        // then free bet mode 
        if (state.data_object.isfree) {
            scope.querySelector('#free_bet_mode_switch').checked = true;
        } else {
            scope.querySelector('#free_bet_mode_switch').checked = false;
        }


        // then lay type
        // remove all active-lay-type classes
        scope.querySelectorAll('.active-lay-type').forEach(btn => {
            btn.classList.remove('active-lay-type');
        });
        // then add the active-lay-type class to the correct button
        if (state.data_object.laytype == 'Underlay') {
            scope.querySelector('.bet-type-btn[data-type="Underlay"]').classList.add('active-lay-type');
        } else if (state.data_object.laytype == 'Standard') {
            scope.querySelector('.bet-type-btn[data-type="Standard"]').classList.add('active-lay-type');
        } else if (state.data_object.laytype == 'Overlay') {
            scope.querySelector('.bet-type-btn[data-type="Overlay"]').classList.add('active-lay-type');
        }

        // then set platform items 
        scope.querySelector('#platform-select-1').value = state.data_object.platforms[0].platform || 'Other';
        scope.querySelector('#platform-select-2').value = state.data_object.platforms[1].platform || 'Other';


        // set description 
        scope.querySelector('#bet-description-input').value = state.data_object.description || '';



    } 


    // SHOULD PROBABLY HAVE A FUNCTION HERE LIKE COLLECT VALUES STANDARD
    get_all_values_standard(scope, state);

    calculate_standard_bet(scope, state);



    if (!state.data_object.incomplete_data) {

        // then set lay stake using #lay-stake-span
        scope.querySelector('#lay-stake-span').textContent = '£' +state.data_object.lay_stake || '';
        scope.querySelector('#lay-stake-span').classList.add('copy-on-click');
        scope.querySelector('.copy-icon').classList.remove('hidden_row_above_columns');

        // then set lay odds using #lay-odds-span
        scope.querySelector('#lay-odds-span').textContent = parseFloat(state.data_object.platforms[1].odds).toFixed(2) || '';


        // then set the profit items
        scope.querySelector('.profit_and_log__item_value_rating').textContent = state.data_object.rating || '0%';
        scope.querySelector('.profit_and_log__item_value_qualifying_loss').textContent = ('£' + state.data_object.qualifying_loss).replace('£-', '-£');
        select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_qualifying_loss'), state.data_object.qualifying_loss);
        scope.querySelector('.profit_and_log__item_value_potential_profit').textContent = ('£' + state.data_object.potential_profit).replace('£-', '-£');
        select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_potential_profit'), state.data_object.potential_profit);


    } else {

        set_results_to_default_standard(scope, state);

    }

}

function set_results_to_default_standard(scope, state) {

    // then set lay stake using #lay-stake-span
    scope.querySelector('#lay-stake-span').textContent = '...';
    scope.querySelector('#lay-stake-span').classList.remove('copy-on-click');
    scope.querySelector('.copy-icon').classList.add('hidden_row_above_columns');

    // then set lay odds using #lay-odds-span
    scope.querySelector('#lay-odds-span').textContent = '...';

    // then set the profit items
    scope.querySelector('.profit_and_log__item_value_rating').textContent = '0%';
    scope.querySelector('.profit_and_log__item_value_qualifying_loss').textContent = ('£0.00');
    select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_qualifying_loss'), '0.00');
    scope.querySelector('.profit_and_log__item_value_potential_profit').textContent = ('£0.00');
    select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_potential_profit'), '0.00');


}


function set_all_values_to_default(scope, state) {

    console.log('setting all values to default');

    // make the laytype buttons standard active
    // remove all active-lay-type classes
    scope.querySelectorAll('.active-lay-type').forEach(btn => {
        btn.classList.remove('active-lay-type');
    });
    // then add the active-lay-type class to the correct button
    scope.querySelector('.bet-type-btn[data-type="Standard"]').classList.add('active-lay-type');

    // make the free bet mode switch unchecked
    scope.querySelector('#free_bet_mode_switch').checked = false;

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


    set_results_to_default_standard(scope, state);

}

function get_all_values_standard(scope, state) {

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

    update_local_data(scope, state);

}


function update_local_data(scope, state) {

    // Debounce timer variable
    let debounceTimer;

    // make a function that will raise the event
    function raise_event() {
        // raise event and send to wix 
        let message_type = 'local_calc_data';
        let message = {
            local_calc_data: state.data_object,
        }
        const raise_event = new CustomEvent(message_type, {
            detail: message,  
            bubbles: true,       // Allows the event to bubble up through the DOM
            composed: true        // Allows the event to pass through shadow DOM boundaries
        });
        scope.dispatchEvent(raise_event); 
    }

    // Debounced function that waits 1000ms before raising the event
    function debounced_raise_event() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(raise_event, MAX_UPDATE_INTERVAL_LOCAL_DATA);
    }

    // Call the debounced function whenever data changes
    debounced_raise_event();

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
            get_all_values_standard(scope, state);
        }

    });

    // also add a function to listen to all 'input' or 'change' events on all inputs in the div
    div.querySelectorAll('input').forEach(input => { // CAPTURES FREE BET MODE SWITCH CHANGES TOO
        input.addEventListener('input', (event) => {
            add_values_for_calculator(scope, state, false);
        });
    });


    // and on change description 
    div.querySelector('#bet-description-input').addEventListener('change', (event) => {
        add_values_for_calculator(scope, state, false);
    });

}



function calculate_standard_bet(scope, state) {

    state.data_object.back_odds = parseFloat(scope.querySelector('#odds-input-1').value);
    state.data_object.lay_odds = parseFloat(scope.querySelector('#odds-input-2').value);
    state.data_object.lay_commission = (parseFloat(scope.querySelector('#commission-input-2').value)) / 100;
    state.data_object.back_stake = parseFloat(scope.querySelector('#back-stake-input').value);

    state.data_object = calculator_helper.calculate_standard(state.data_object);
     
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
    input_section_div.className = 'input-section-div';
    calculator_container_div.appendChild(input_section_div);

    // add three divs to the input section div
    const back_bet_input_div = document.createElement('div');
    back_bet_input_div.className = 'calc-input-div-standard back-input-div';

    const lay_bet_input_div = document.createElement('div');
    lay_bet_input_div.className = 'calc-input-div-standard lay-input-div';

    const control_input_div = document.createElement('div');
    control_input_div.className = 'calc-input-div-standard control-input-div';
    
    input_section_div.appendChild(back_bet_input_div);
    input_section_div.appendChild(lay_bet_input_div);
    input_section_div.appendChild(control_input_div);





    // select the back-input-div
    let back_input_div_select = input_section_div.querySelector('.back-input-div');
    add_backstake_input(back_input_div_select);
    add_back_odds_input(back_input_div_select);

    // select the lay-input-div
    let lay_input_div_select = input_section_div.querySelector('.lay-input-div');
    add_lay_odds_input(lay_input_div_select);
    add_lay_commission_input(lay_input_div_select);

    // select the control-input-div
    let control_input_div_select = input_section_div.querySelector('.control-input-div');
    add_control_input_standard(control_input_div_select);
    
    
}







function add_backstake_input(back_input_div_select) {
    back_input_div_select.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Back Stake</div>
            <input type="text" class="text-input" placeholder="Enter stake" id="back-stake-input" autocomplete="off">
        </div>
    `;
}

function add_back_odds_input(back_input_div_select) {
    back_input_div_select.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Back Odds</div>
            <input type="text" class="text-input" placeholder="Enter odds" id="odds-input-1" autocomplete="off">
        </div>
    `;
}

function add_lay_odds_input(lay_input_div_select) {
    lay_input_div_select.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Lay Odds</div>
            <input type="text" class="text-input" placeholder="Enter odds" id="odds-input-2" autocomplete="off">
        </div>
    `;
}

function add_lay_commission_input(lay_input_div_select) {
    lay_input_div_select.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Lay Commission</div>
            <input type="text" class="text-input" placeholder="Enter commission" id="commission-input-2" autocomplete="off">
        </div>
    `;
}

function add_control_input_standard(control_input_div_select, state) {
    control_input_div_select.innerHTML += `

            <div class="free_bet_mode_control">
                <label class="switch switch_select_free_bet_mode">
                    <input type="checkbox" class="free_bet_mode_switch" id="free_bet_mode_switch">
                    <span class="slider slider_select_free_bet_mode"></span>
                </label>
                <span class="free_bet_mode_label">Free Bet Mode</span>
            </div>


            <div class="bet_type_control">
                <div class="lay_type_control_container"">
                    <button class="bet-type-btn" data-type="Underlay">Underlay</button>
                    <button class="bet-type-btn active-lay-type" data-type="Standard">Standard</button>
                    <button class="bet-type-btn" data-type="Overlay">Overlay</button>
                </div>
            </div>


    `;
}









function add_div_for_info_and_profit(scope, state, calculator_container_div) {
    const info_and_profit_div = document.createElement('div');
    info_and_profit_div.className = 'info-and-profit-div';
    calculator_container_div.querySelector('.bottom_div_calculator_container').appendChild(info_and_profit_div);

    
    // make a top div 
    let top_div = document.createElement('div');
    top_div.className = 'top-div-info-and-profit';
    info_and_profit_div.appendChild(top_div);


    add_lay_bet_info_div(top_div);




    // make a bottom div
    let bottom_div = document.createElement('div');
    bottom_div.className = 'bottom-div-info-and-profit';
    info_and_profit_div.appendChild(bottom_div);



    add_profit_div_standard(bottom_div);


}




function add_div_for_logging(scope, state, calculator_container_div) {

    const logging_div = document.createElement('div');
    logging_div.className = 'logging-div';
    calculator_container_div.querySelector('.bottom_div_calculator_container').appendChild(logging_div);

    let upper_logging_div = document.createElement('div');
    upper_logging_div.className = 'upper-logging-div';
    logging_div.appendChild(upper_logging_div);

    add_platform_div_for_logging(upper_logging_div, 'Back', 1);
    add_platform_div_for_logging(upper_logging_div, 'Lay', 2);


    
    let all_platforms = helper.get_all_platforms_profit_tracker();

    
    // select all .dropdown-options in the div and get their id
    let dropdown_containers = logging_div.querySelectorAll('div.dropdown-options.dropdown-options-platforms-select');
    dropdown_containers.forEach(dropdown_container => {
        pt_helper.append_platforms_to_platform_selectors(dropdown_container, all_platforms, logging_div, state)
    });



    add_event_listener_for_dropdown_options_calculator(scope, state, logging_div);

    pt_helper.add_event_listener_for_platform_divs(scope.querySelector('.calculator-container-div'));



    // then add description box to the bottom

    logging_div.innerHTML += `

                
        <div class="filter-item filter-item-description">
            <label class="filter-label">Description</label>
            <textarea id="bet-description-input" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
        </div>


`;


}

function add_platform_div_for_logging(logging_div, type, index) {

    logging_div.innerHTML += `
<div class="filter-item filter-item-profit-tracker filter-item-profit-tracker-platform-select" data-index="1" data-bet-id="">
    <label class="filter-label" for="platform-select-${index}">${type} Bookmaker or Exchange</label>
    <div id="filters-dropdown-select-container-${index}" class="custom-select-container select-filters-container dropdown-option-platform-on-click" tabindex="0" data-platform-selector="filters-dropdown-select-container-${index}" data-button-div-selector="platform-dropdown-options-${index}">
        <div class="custom-select-trigger">
            <input id="platform-select-${index}" type="text" value="Other" readonly class="dropdown-option-platform-on-click" data-platform-selector="filters-dropdown-select-container-${index}" data-button-div-selector="platform-dropdown-options-${index}">
        </div>
        <div class="dropdown-options dropdown-options-platforms-select" id="platform-dropdown-options-${index}" data-input-selector="platform-select-${index}" data-odds-input-selector="platform-odds-${index}_" data-odds-label-selector="platform-odds-label-${index}_" data-link-selector="platform-link-${index}_">
        </div>
    </div>
</div>

    `;

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









function add_lay_bet_info_div(top_div) {
    top_div.innerHTML += `
        <div class="select_bet_text_div lay_bet_info_div"> 
            <span class="select_bet_text_div_text" id="select_bet_text_div_text_iOarZiIyJHVdbIJe6gt1wY8GqVhyeCvleF9k_Lay">Lay <span id="lay-stake-span" class="copy-on-click "></span>
            <img src="https://img.icons8.com/?size=100&amp;id=59773&amp;format=png&amp;color=ffffff" class="copy-icon" alt="(Copy)">
            at
            <span id="lay-odds-span" class="odds-select-bet"></span> Lay Odds            
            </span>
        </div>
    `;
}

function add_profit_div_standard(bottom_div) {
    bottom_div.innerHTML += `
        <div class="div-in-bottom-div-info-and-profit">
            
        
<div class="profit_display_profit_and_log_div profit_display_div_calculator">

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
    `;
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
    state.data_object.event = 'Manual';
    state.data_object.actualprofit = '';
    state.data_object.qualifying_loss = state.data_object.qualifying_loss.replace('£', '');
    state.data_object.potential_profit = state.data_object.potential_profit.replace('£', '');
    state.data_object.bet_outcome = '';
    state.data_object.calculator = state.calculator_type;


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

        } catch(error) {
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