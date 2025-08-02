import * as calculator_helper from '../../oddsmatchers/main/calculate_functions.js';
import * as pt_helper from '../../oddsmatchers/main/profit_tracker_helper.js';
import * as helper from '../../oddsmatchers/main/helper.js';
import * as select_boxes_helper from '../../oddsmatchers/main/select_boxes.js';




const MAX_UPDATE_INTERVAL_LOCAL_DATA = 1000;
const MAX_WIDTH_FOR_MOBILE = 700;







export function process_new_final_data(data, scope, state) {
    state.data_loaded_from_wix = true;
    data = JSON.parse(data);

    state.is_premium_member = data.premium_member;


    if (data.is_calc) {
        console.log('show the calculator things and return - should include platforms, date etc')
        state.data_object = data.is_calc_data;
        state.loaded_from_tracker = true;
        scope.querySelector('#log-bet-button').textContent = 'Update Bet';
        try {
            add_values_for_calculator(scope, state, true);
        } catch (error) {
            console.log(error)
            state.loaded_from_tracker = false;
            scope.querySelector('#log-bet-button').textContent = 'Log Bet';
            state.data_object = data.local_calc_data;
            try {
                add_values_for_calculator(scope, state, true);
            } catch (error) {
                console.log(error)
            }
        }
        return
    }

    if (data.local_calc_data && Object.keys(data.local_calc_data).length > 0) {
        console.log('fill inputs with local data - should include platform, date etc')
        state.data_object = data.local_calc_data;
        console.log(state.data_object)
        try {
            add_values_for_calculator(scope, state, true);
        } catch (error) {
            console.log(error)
        }
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


    if (state.calculator_type == 'Standard' || state.calculator_type == '2up' || state.calculator_type == 'Bonus' || state.calculator_type == 'Refund If') {
        add_input_section_for_standard_calculator(scope, state, calculator_container_div);
    }

    if (state.calculator_type == 'Each Way' || state.calculator_type == 'Extra Place') {
        add_input_section_for_each_way_calculator(scope, state, calculator_container_div);
    }

    if (state.calculator_type == 'Dutching') {
        add_input_section_for_dutching_calculator(scope, state, calculator_container_div);
    }

    if (state.calculator_type == 'Sequential Lay') {
        add_input_section_for_sequential_lay_calculator(scope, state, calculator_container_div);
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


function add_refund_if_only_div(if_div, scope, state) {
    if_div.innerHTML += `
        <span class="if_text_next_to_trigger_event">If</span>
        <div class="filter-item trigger-filter-item">
            <div class="filter-label">Trigger Event</div>
            <input type="text" class="text-input" placeholder="Enter trigger event" id="trigger-event-input" autocomplete="off">
        </div>
    `;
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

    if (state.calculator_type == 'Standard') {
        add_free_bet_mode_control(first_row_div);
    }

    if (state.calculator_type == 'Bonus' || state.calculator_type == 'Refund If') {
        add_max_bonus_input(first_row_div);
        add_bonus_retention_input(first_row_div);
    }


    // select the lay-input-div
    add_flag_div(second_row_div, true);
    add_odds_input(second_row_div, 'Lay', 2);
    add_commission_input(second_row_div, 'Lay', 2);
    add_platform_div_for_logging(second_row_div, 'Lay Bet Exchange', 2);

    // adding in lay bet info
    add_lay_bet_info_div(scope, state, second_row_div, 2, `at <span id="lay-odds-span-2"`);





    if (state.calculator_type == 'Refund If') {

        // ADD AN IF DIV
        const if_div = document.createElement('div');
        if_div.className = 'calculator-bet-info-section-div if-div-calculator-div';
        input_section_div.appendChild(if_div);
        add_refund_if_only_div(if_div, scope, state);

        const third_row_div = document.createElement('div');
        third_row_div.className = 'calculator-bet-info-section-div lay-bet-calculator-div-refund-if';
        input_section_div.appendChild(third_row_div);

        // select the lay-input-div
        add_flag_div(third_row_div, true);
        add_odds_input(third_row_div, 'Lay', 3);
        add_commission_input(third_row_div, 'Lay', 3);
        add_platform_div_for_logging(third_row_div, 'Lay Bet Exchange', 3);

        // adding in lay bet info
        add_lay_bet_info_div(scope, state, third_row_div, 3, `at <span id="lay-odds-span-3"`);
    }




    // add the lay type div - make it be in the main div
    const lay_control_div = document.createElement('div');
    lay_control_div.className = 'calculator-bet-info-section-div control-div-bet-calculator-div';
    if (state.calculator_type == '2up') {

        add_control_input_2up(input_section_div);

    } else if (state.calculator_type == 'Bonus') {

        const control_div_bonus = document.createElement('div');
        control_div_bonus.className = 'calculator-bet-info-section-div control-div-bet-calculator-div control-div-bet-calculator-div-dutching';
        calculator_container_div.appendChild(control_div_bonus);
        add_control_input_bonus(control_div_bonus);

    } else if (state.calculator_type == 'Standard' || state.calculator_type == 'Refund If') {

        calculator_container_div.appendChild(lay_control_div);
        add_control_input_standard(lay_control_div);

    }

}

function add_2up_bet_section(scope, state) {


    let input_section_div = scope.querySelector('div.input-section-div.input-section-div-outer');

    if (scope.querySelector('#is_payout_switch').checked) {

        if (input_section_div.querySelector('div.calculator-bet-info-section-div.early-payout-div')) {
            return;
        }

        // add three divs to the input section div
        const is_payout_div = document.createElement('div');
        is_payout_div.className = 'calculator-bet-info-section-div early-payout-div';    
        input_section_div.appendChild(is_payout_div);

        // select the lay-input-div
        add_flag_div(is_payout_div, false);
        add_odds_input(is_payout_div, 'Back', 3);
        add_commission_input(is_payout_div, 'Back', 3);
        add_platform_div_for_logging(is_payout_div, 'Back Bet Platform', 3);

        add_lay_bet_info_div(scope, state, is_payout_div, 3, 'info_text_2up');


        let all_platforms = helper.get_all_platforms_profit_tracker();
        // select all .dropdown-options in the div and get their id
        let dropdown_containers = is_payout_div.querySelectorAll('div.dropdown-options.dropdown-options-platforms-select');
        dropdown_containers.forEach(dropdown_container => {
            pt_helper.append_platforms_to_platform_selectors(dropdown_container, all_platforms, is_payout_div, state)
        });

        // ALSO NEED TO ADD EVENT LISTENERS FOR THIS NEW DIV 

        // also add a function to listen to all 'input' or 'change' events on all inputs in the div
        is_payout_div.querySelectorAll('input').forEach(input => { // CAPTURES FREE BET MODE SWITCH CHANGES TOO
            input.addEventListener('input', (event) => {
                add_values_for_calculator(scope, state, false);
            });
        });


    } else {

        if (state.data_object.new_back_odds) {
            delete state.data_object.new_back_odds;
        }
        if (state.data_object.new_back_commission) {
            delete state.data_object.new_back_commission;
        }

        // delete the div if it exists
        if (input_section_div.querySelector('div.calculator-bet-info-section-div.early-payout-div')) {
            input_section_div.querySelector('div.calculator-bet-info-section-div.early-payout-div').remove();
        }
    }



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

function add_input_section_for_dutching_calculator(scope, state, calculator_container_div) {


    // take the container and add a div with three divs in it, dividing the space equally
    const input_section_div = document.createElement('div');
    input_section_div.className = 'input-section-div input-section-div-outer';
    calculator_container_div.appendChild(input_section_div);


    // select the back-input-div
    add_back_bet_row_dutching(scope, state, input_section_div, 1);
    add_back_bet_row_dutching(scope, state, input_section_div, 2);

    state.data_object.outcomes = 2;


    // then add another row 

    add_outcome_div_dutching(scope, state, input_section_div);






    // ADD A CONTROL DIV 
    const control_div_dutching = document.createElement('div');
    control_div_dutching.className = 'calculator-bet-info-section-div control-div-bet-calculator-div control-div-bet-calculator-div-dutching';
    calculator_container_div.appendChild(control_div_dutching);
    add_control_input_dutching(control_div_dutching, state);


    


    // THEN ADD LISTENERS HERE THAT CALL THE FUNCTIONS THAT LISTEN FOR CHANGES TO LEGS - perhaps put the + button in control div to add an extra outcome


}

function add_outcome_div_dutching(scope, state, input_section_div) {

    const row_div = document.createElement('div');
    row_div.className = 'calculator-bet-info-section-div';
    input_section_div.appendChild(row_div);

    row_div.innerHTML += `


        <div class="add-button-div">
            Add Outcome
            <button class="add-row-button add-outcome-on-click" id="add-row-button">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    `;

}

function add_back_bet_row_dutching(scope, state, input_section_div, index) {

    // if index is bigger than 2 prepend it since, the final one is added first

    const row_div = document.createElement('div');
    row_div.className = 'calculator-bet-info-section-div lay-bet-calculator-div';
    row_div.dataset.index = index;

    if (index > 2) {
        let row_divs = input_section_div.querySelectorAll('div.calculator-bet-info-section-div');
        let last_row_div = row_divs[row_divs.length - 1];
        input_section_div.insertBefore(row_div, last_row_div);
    } else {
        input_section_div.appendChild(row_div);
    }



    add_flag_div(row_div, false, true, index);
    add_odds_input(row_div, 'Back', index);
    add_commission_input(row_div, '', index);
    add_platform_div_for_logging(row_div, 'Back Bet Platform', index);

    add_lay_bet_info_div(scope, state, row_div, index, 'info_text_back');

    add_minus_button(row_div, index, false);


    if (index > 2) {
        let all_platforms = helper.get_all_platforms_profit_tracker();
        // select all .dropdown-options in the div and get their id
        let dropdown_containers = row_div.querySelectorAll('div.dropdown-options.dropdown-options-platforms-select');
        dropdown_containers.forEach(dropdown_container => {
            pt_helper.append_platforms_to_platform_selectors(dropdown_container, all_platforms, row_div, state)
        });

        // ALSO NEED TO ADD EVENT LISTENERS FOR THIS NEW DIV 

        // also add a function to listen to all 'input' or 'change' events on all inputs in the div
        row_div.querySelectorAll('input').forEach(input => { // CAPTURES FREE BET MODE SWITCH CHANGES TOO
            input.addEventListener('input', (event) => {
                add_values_for_calculator(scope, state, false);
            });
        });
    }


}






function add_input_section_for_sequential_lay_calculator(scope, state, calculator_container_div) {


    // take the container and add a div with three divs in it, dividing the space equally
    const input_section_div = document.createElement('div');
    input_section_div.className = 'input-section-div input-section-div-outer';
    calculator_container_div.appendChild(input_section_div);


    // select the back-input-div
    add_back_bet_row_sequential_lay(scope, state, input_section_div, 1);
    add_lay_bet_row_sequential_lay(scope, state, input_section_div, 2);
    add_lay_bet_row_sequential_lay(scope, state, input_section_div, 3);

    state.data_object.outcomes = 2;


    // then add another row 
    add_outcome_div_sequential_lay(scope, state, input_section_div);


    // ADD A CONTROL DIV 
    const control_div_sequential_lay = document.createElement('div');
    control_div_sequential_lay.className = 'calculator-bet-info-section-div control-div-bet-calculator-div';
    calculator_container_div.appendChild(control_div_sequential_lay);
    add_control_input_sequential_lay(control_div_sequential_lay, state);




    // ADD PROFIT DIV FOR SEQUENTIAL LAY
    add_profit_div_for_sequential_lay(scope, state, calculator_container_div);




    // THEN ADD LISTENERS HERE THAT CALL THE FUNCTIONS THAT LISTEN FOR CHANGES TO LEGS - perhaps put the + button in control div to add an extra outcome


}


function add_outcome_div_sequential_lay(scope, state, input_section_div) {

    const row_div = document.createElement('div');
    row_div.className = 'calculator-bet-info-section-div';
    input_section_div.appendChild(row_div);

    row_div.innerHTML += `


        <div class="add-button-div">
            Add Leg
            <button class="add-row-button add-outcome-on-click-sequential-lay" id="add-row-button-sequential-lay">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    `;

}

function add_lay_bet_row_sequential_lay(scope, state, input_section_div, index) {

    // if index is bigger than 2 prepend it since, the final one is added first

    const row_div = document.createElement('div');
    row_div.className = 'calculator-bet-info-section-div lay-bet-calculator-div';
    row_div.dataset.index = index;

    if (index > 3) {
        let row_divs = input_section_div.querySelectorAll('div.calculator-bet-info-section-div');
        let last_row_div = row_divs[row_divs.length - 1];
        input_section_div.insertBefore(row_div, last_row_div);
    } else {
        input_section_div.appendChild(row_div);
    }



    add_flag_div(row_div, true, true, index - 1);
    add_odds_input(row_div, 'Lay', index);
    add_commission_input(row_div, '', index);
    add_platform_div_for_logging(row_div, 'Leg ' + (index - 1) + ' Exchange', index);

    add_lay_bet_info_div(scope, state, row_div, index, 'info_text_lay');

    add_minus_button(row_div, index - 1, true);


    if (index > 3) {
        let all_platforms = helper.get_all_platforms_profit_tracker();
        // select all .dropdown-options in the div and get their id
        let dropdown_containers = row_div.querySelectorAll('div.dropdown-options.dropdown-options-platforms-select');
        dropdown_containers.forEach(dropdown_container => {
            pt_helper.append_platforms_to_platform_selectors(dropdown_container, all_platforms, row_div, state)
        });

        // ALSO NEED TO ADD EVENT LISTENERS FOR THIS NEW DIV 

        // also add a function to listen to all 'input' or 'change' events on all inputs in the div
        row_div.querySelectorAll('input').forEach(input => { // CAPTURES FREE BET MODE SWITCH CHANGES TOO
            input.addEventListener('input', (event) => {
                add_values_for_calculator(scope, state, false);
            });
        });
    }


}


function add_back_bet_row_sequential_lay(scope, state, input_section_div, index) {

    // if index is bigger than 2 prepend it since, the final one is added first

    const row_div = document.createElement('div');
    row_div.className = 'calculator-bet-info-section-div lay-bet-calculator-div';
    row_div.dataset.index = index;


    input_section_div.appendChild(row_div);



    add_flag_div(row_div, false, false, index);
    add_stake_input(row_div, 'Back', 'back-stake-input');
    add_odds_input(row_div, 'Back', index);
    add_platform_div_for_logging(row_div, 'Back Bet Bookmaker', index);

}


function add_profit_div_for_sequential_lay(scope, state, calculator_container_div) {

    calculator_container_div.innerHTML += `

        <div class="profit-div-sequential-lay">

        
        </div>
        
    `

    // ADD PROFIT LINE SEQUENTIAL LAY
    add_profit_row_for_sequential_lay(scope, state, 1, false)
    add_profit_row_for_sequential_lay(scope, state, 2, false)
    add_profit_row_for_sequential_lay(scope, state, 1, true)
    
    
}

function add_profit_row_for_sequential_lay(scope, state, index, is_adding_all) {

    let profit_div = scope.querySelector('.profit-div-sequential-lay');

    if (is_adding_all) {

        profit_div.innerHTML += `

        <div class="seq-lay-profit-row seq-lay-profit-row-all" id="seq-lay-profit-row-all" data-index="all">

            <span class="seq-lay-profit-row-item-text">Profit If All Legs Win</span>

            <span class="seq-lay-profit-row-item-value">£0.00</span>

        </div>
        
        `

    } else {

        let new_div = document.createElement('div');
        new_div.className = 'seq-lay-profit-row';
        new_div.id = `seq-lay-profit-row-${index}`;
        new_div.dataset.index = index;
        new_div.innerHTML = `            
            <span class="seq-lay-profit-row-item-text">Profit If Leg ${index} Loses</span>

            <span class="seq-lay-profit-row-item-value">£0.00</span>
            
        `;

        if (index > 2) {
            let row_divs = profit_div.querySelectorAll('div.seq-lay-profit-row');
            let last_row_div = row_divs[row_divs.length - 1];
            profit_div.insertBefore(new_div, last_row_div);
        } else {
            profit_div.appendChild(new_div);
        }

 

    }


}



function add_minus_button(div, index, is_sequential_lay) {

    let class_name_minus_button = 'minus-button';
    if (is_sequential_lay) {
        class_name_minus_button = 'minus-button-sequential-lay';
    }

    if (index == 1 || index == 2) {
        return;
    }

    // also add a small circular minus button that goes right to the end
    div.innerHTML += `
        <div class="minus-button-div">
            <button class="${class_name_minus_button}" id="minus-button-${index}" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

}


function add_lay_bet_info_div(scope, state, top_div, index, info_text) {

    let command_text = 'Lay';
    if (info_text == 'info_text_back') {
        info_text = 'on outcome ' + index;
        command_text = 'Back';
    }

    if (info_text == 'info_text_2up') {
        info_text = 'at <span id="back-odds-span-3"> Back Odds';
        command_text = 'Back';
    }

    if (info_text == 'info_text_lay') {
        info_text = 'on leg ' + (index - 1);
    }

    top_div.innerHTML += `
        <div class="select_bet_text_div lay_bet_info_div"> 
            <span class="select_bet_text_div_text" id="select_bet_text_div_text_iOarZiIyJHVdbIJe6gt1wY8GqVhyeCvleF9k_Lay">${command_text} <span id="lay-stake-span-${index}" class="copy-on-click "></span>
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

function add_flag_div(div, is_lay, is_show_index, index) {

    div.innerHTML += `

    <div class="div_outside_bar_on_left_of_item">
     
        <div class="bar_on_left_of_item ${is_lay ? 'bar_on_left_of_item_lay' : ''} ${is_show_index ? 'bar_on_left_of_item_show_index' : ''}"><span>${is_show_index ? index : ''}</span></div>

    </div>

    `;

}

function add_max_bonus_input(div) {
    div.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Maximum Bonus</div>
            <input type="text" class="text-input" placeholder="Enter maximum bonus" id="max-bonus-input" autocomplete="off">
        </div>
    `;
}
function add_bonus_retention_input(div) {
    div.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Bonus Retention (%)</div>
            <input type="text" class="text-input" placeholder="Enter bonus retention" id="bonus-retention-input" autocomplete="off">
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
            <input type="text" class="text-input" placeholder="Enter commission" id="commission-input-${index}" autocomplete="off" value="0">
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

function add_control_input_2up(control_input_div_select, state) {
    control_input_div_select.innerHTML += `

            <div class="free_bet_mode_control early-payout-switch-div">
                <label class="switch switch_select_free_bet_mode">
                    <input type="checkbox" class="free_bet_mode_switch" id="is_payout_switch">
                    <span class="slider slider_select_free_bet_mode"></span>
                </label>
                <span class="free_bet_mode_label">Bookmaker Has Paid Out Early</span>
            </div>


    `;
}

function add_control_input_bonus(control_input_div_select, state) {

    control_input_div_select.innerHTML += `

        <div class="select_div_item select_bet_controls_item dutching-select-controls-item bonus-select-controls-item">

    
            <div class="free_bet_mode_label setting-mode-bonus-div">

                <span class="label_for_mode">Bonus Applied if Bet</span>

                <div class="bet_type_control bonus-mode-control-container">
                    <div class="lay_type_control_container"">
                        <button class="bet-type-btn active-mode-type" data-type="Wins">Wins</button>
                        <button class="bet-type-btn" data-type="Loses">Loses</button>
                    </div>
                </div>

            </div>


            <div class="bet_type_control">
                <div class="lay_type_control_container"">
                    <button class="bet-type-btn" data-type="Underlay">Underlay</button>
                    <button class="bet-type-btn active-lay-type" data-type="Standard">Standard</button>
                    <button class="bet-type-btn" data-type="Overlay">Overlay</button>
                </div>
            </div>


            <div class="free_bet_mode_control free-bet-mode-input-dutching-select">
                <label class="switch switch_select_free_bet_mode">
                    <input type="checkbox" class="free_bet_mode_switch" id="free_bet_mode_switch">
                    <span class="slider slider_select_free_bet_mode"></span>
                </label>
                <span class="free_bet_mode_label">Free Bet</span>
            </div>

        </div>

    `;
}

function add_control_input_dutching(control_input_div_select, state) {

    let first_stake_text = 'Target First Selection';
    let total_stake_text = 'Target Total Stake';
    if (window.innerWidth < MAX_WIDTH_FOR_MOBILE) {
        first_stake_text = 'First Stake';
        total_stake_text = 'Total Stake';
    }

    control_input_div_select.innerHTML += `


        <div class="select_div_item select_bet_controls_item dutching-select-controls-item">

    
            <div class="filter-item filter-item-text-input-dutching-select">
                <div class="filter-label" id="stake-input-label">First Selection Stake</div>
                <input class="text-input" placeholder="Enter stake" id="back-stake-input" autocomplete="off">
            </div>


            <div class="bet_type_control">
                <div class="lay_type_control_container" data-_id="dutching-control-div">
                    <button class="bet-type-btn target-type-btn active-lay-type" data-type="First">${first_stake_text}</button>
                    <button class="bet-type-btn target-type-btn" data-type="Total">${total_stake_text}</button>
                </div>
            </div>


            <div class="free_bet_mode_control free-bet-mode-input-dutching-select">
                <label class="switch switch_select_free_bet_mode">
                    <input type="checkbox" class="free_bet_mode_switch" id="free_bet_mode_switch">
                    <span class="slider slider_select_free_bet_mode"></span>
                </label>
                <span class="free_bet_mode_label">Free Bet</span>
            </div>

        </div>


    `;
}

function add_control_input_sequential_lay(control_input_div_select, state) {

    control_input_div_select.innerHTML += `


        <div class="select_div_item select_bet_controls_item sequential-lay-select-controls-item">


            <div class="bet_type_control">
                <div class="lay_type_control_container" data-_id="dutching-control-div">
                    <button class="bet-type-btn target-type-btn" data-type="Underlay">Underlay</button>
                    <button class="bet-type-btn target-type-btn" data-type="Underlay Lock In">Lock In</button>
                    <button class="bet-type-btn target-type-btn active-lay-type" data-type="Standard Bet">Standard</button>
                    <button class="bet-type-btn target-type-btn" data-type="Standard Free">Free Bet</button>
                </div>
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



    if (state.calculator_type == 'Standard' || state.calculator_type == 'Bonus') {
        add_desc_profit_div_standard(info_and_profit_div);
    } else if (state.calculator_type == '2up') {
        add_desc_profit_div_2up(info_and_profit_div);
    } else if (state.calculator_type == 'Each Way') {
        add_desc_profit_div_each_way(info_and_profit_div);
    } else if (state.calculator_type == 'Extra Place') {
        add_desc_profit_div_extra_place(info_and_profit_div);
    } else if (state.calculator_type == 'Dutching') {
        add_desc_profit_div_dutching(info_and_profit_div);
    } else if (state.calculator_type == 'Sequential Lay') {
        add_desc_profit_div_sequential_lay(info_and_profit_div);
    } else if (state.calculator_type == 'Refund If') {
        add_desc_profit_div_refund_if(info_and_profit_div);
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




                    <div class="div_around_profit_display_items">



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


                    </div>



                    <div class="log-bet-button-div">
                            <button id="log-bet-button" class="log-bet-button">Log Bet</button>
                    </div>


            </div>



        </div>
    `;
}


function add_desc_profit_div_refund_if(bottom_div) {


    bottom_div.innerHTML += `
        <div class="div-in-bottom-div-info-and-profit">
            
        
            <div class="profit_display_profit_and_log_div profit_display_div_calculator">



                    <div class="filter-item filter-item-description">
                        <label class="filter-label">Description</label>
                        <textarea id="bet-description-input" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
                    </div>



                    <div class="div_around_profit_display_items div_around_profit_display_items_two_results">


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


                    </div>
                    

                    
                    <div class="log-bet-button-div">
                            <button id="log-bet-button" class="log-bet-button">Log Bet</button>
                    </div>


            </div>



        </div>
    `;
}





function add_desc_profit_div_2up(bottom_div) {


    bottom_div.innerHTML += `
        <div class="div-in-bottom-div-info-and-profit">
            
        
            <div class="profit_display_profit_and_log_div profit_display_div_calculator">



                    <div class="filter-item filter-item-description">
                        <label class="filter-label">Description</label>
                        <textarea id="bet-description-input" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
                    </div>



                    <div class="div_around_profit_display_items">



                        <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_rating">
                                <span class="profit_and_log__item_title profit_and_log__item_title_rating">
                                    Bet Rating
                                </span>
                                <span class="profit_and_log__item_value profit_and_log__item_value_rating">100.00%</span>
                        </div>


                        <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_qualifying_loss">
                            <span class="profit_and_log__item_title profit_and_log__item_title_qualifying_loss">
                                No FTA Profit
                            </span>

                            <span class="profit_and_log__item_value profit_and_log__item_value_qualifying_loss">£0.00</span>
                        </div>
                        

                        <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_potential_profit">
                            <span class="profit_and_log__item_title profit_and_log__item_title_potential_profit">
                                FTA Profit
                            </span>

                            <span class="profit_and_log__item_value profit_and_log__item_value_potential_profit profit_and_log__item_value_positive">£39.00</span>
                        </div>

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



                    <div class="div_around_profit_display_items div_around_profit_display_items_two_results">



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



                    <div class="div_around_profit_display_items">

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


                    </div>

                    
                    <div class="log-bet-button-div">
                            <button id="log-bet-button" class="log-bet-button">Log Bet</button>
                    </div>


            </div>



        </div>
    `;
}

function add_desc_profit_div_dutching(bottom_div) {


    bottom_div.innerHTML += `
        <div class="div-in-bottom-div-info-and-profit">
            
        
            <div class="profit_display_profit_and_log_div profit_display_div_calculator">



                    <div class="filter-item filter-item-description">
                        <label class="filter-label">Description</label>
                        <textarea id="bet-description-input" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
                    </div>



                    <div class="div_around_profit_display_items div_around_profit_display_items_two_results">

                        <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_rating">
                                <span class="profit_and_log__item_title profit_and_log__item_title_rating">
                                    Bet Rating 
                                </span>
                                <span class="profit_and_log__item_value profit_and_log__item_value_rating">0%</span>
                        </div>


                        <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_qualifying_loss">
                            <span class="profit_and_log__item_title profit_and_log__item_title_qualifying_loss">
                                Bet Profit
                            </span>

                            <span class="profit_and_log__item_value profit_and_log__item_value_qualifying_loss">£0.00</span>
                        </div>


                    </div>
                    

                    
                    <div class="log-bet-button-div">
                            <button id="log-bet-button" class="log-bet-button">Log Bet</button>
                    </div>


            </div>



        </div>
    `;
}

function add_desc_profit_div_sequential_lay(bottom_div) {


    bottom_div.innerHTML += `
        <div class="div-in-bottom-div-info-and-profit">
            
        
            <div class="profit_display_profit_and_log_div profit_display_div_calculator">


                    <div class="filter-item filter-item-description">
                        <label class="filter-label">Description</label>
                        <textarea id="bet-description-input" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
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


        let is_payout_switch = scope.querySelector('#is_payout_switch');
        // then free bet mode 
        if (is_payout_switch) {
            if (state.data_object.is_payout) {
                is_payout_switch.checked = true;
            } else {
                is_payout_switch.checked = false;
            }
        }



        if (state.calculator_type == '2up') {
            add_2up_bet_section(scope, state);
        }




        if (state.calculator_type == 'Dutching') {


            // SELECT ALL INPUT ROWS WITH A MINUS SIGN - THIS IS FOR WHEN THEY ADD LEGS THEN CLICK EXAMPLE IN GUIDES PAGE
            let input_sections = scope.querySelectorAll('div.calculator-bet-info-section-div');
            input_sections.forEach(section => {
                let minus_button = section.querySelector('div.minus-button-div');
                if (minus_button) {
                    section.remove();
                }
            });




            // get the odds, commission, platform, and stake    
            let input_section_div = scope.querySelector('div.input-section-div.input-section-div-outer');
    
            // create a loop that is the length of the outcomes
            for (let i = 1; i <= state.data_object.outcomes; i++) {
    
                // select the back-input-div
                if (i > 2) {
                    add_back_bet_row_dutching(scope, state, input_section_div, i);
                }
    
            }
        }



        if (state.calculator_type == 'Sequential Lay') {


            // SELECT ALL INPUT ROWS WITH A MINUS SIGN - THIS IS FOR WHEN THEY ADD LEGS THEN CLICK EXAMPLE IN GUIDES PAGE
            let input_sections = scope.querySelectorAll('div.calculator-bet-info-section-div');
            input_sections.forEach(section => {
                let minus_button = section.querySelector('div.minus-button-div');
                if (minus_button) {
                    section.remove();
                }
            });



            // same for profit rows 
            let profit_rows = scope.querySelectorAll('div.seq-lay-profit-row');
            profit_rows.forEach(row => {
                if (row.dataset.index == 'all' || parseInt(row.dataset.index) <= 2) {
                    // pass
                } else {
                    row.remove();
                }
            });



            // get the odds, commission, platform, and stake    
            let input_section_div = scope.querySelector('div.input-section-div.input-section-div-outer');
    
            // create a loop that is the length of the outcomes
            for (let i = 1; i <= state.data_object.outcomes; i++) {
    
                // select the back-input-div
                if (i > 2) {
                    add_lay_bet_row_sequential_lay(scope, state, input_section_div, i + 1);

                    add_profit_row_for_sequential_lay(scope, state, i, false);

                }
    
            }
        }

        if (state.calculator_type == 'Bonus' || state.calculator_type == 'Refund If') {
            scope.querySelector('#max-bonus-input').value = state.data_object.max_bonus || state.data_object.backstake || '';
            scope.querySelector('#bonus-retention-input').value = parseFloat(state.data_object.bonus_retention) * 100 || '80';
        }

        if (state.calculator_type == 'Refund If') {
            scope.querySelector('#trigger-event-input').value = state.data_object.trigger_text || '';
        }
        

        // stake with back stake
        scope.querySelector('#back-stake-input').value = state.data_object.backstake || state.data_object.stake || state.data_object.each_way_stake || state.data_object.back_stake || '';
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
        let have_mode_type_buttons = false;
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
            } else if (state.data_object.target == 'First') {
                scope.querySelector('.bet-type-btn[data-type="First"]').classList.add('active-lay-type');
            } else if (state.data_object.target == 'Total') {
                scope.querySelector('.bet-type-btn[data-type="Total"]').classList.add('active-lay-type');
            } else if (state.data_object.method == 'Underlay Lock In') {
                scope.querySelector('.bet-type-btn[data-type="Underlay Lock In"]').classList.add('active-lay-type');
            } else if (state.data_object.method == 'Underlay') {
                scope.querySelector('.bet-type-btn[data-type="Underlay"]').classList.add('active-lay-type');
            } else if (state.data_object.method == 'Standard Bet') {
                scope.querySelector('.bet-type-btn[data-type="Standard Bet"]').classList.add('active-lay-type');
            } else if (state.data_object.method == 'Standard Free') {
                scope.querySelector('.bet-type-btn[data-type="Standard Free"]').classList.add('active-lay-type');
            }
        }

        scope.querySelectorAll('.active-mode-type').forEach(btn => {
            btn.classList.remove('active-mode-type');
            have_mode_type_buttons = true;
        });

        if (have_mode_type_buttons) {
            if (state.data_object.mode == 'Wins') {
                scope.querySelector('.bet-type-btn[data-type="Wins"]').classList.add('active-mode-type');
            } else if (state.data_object.mode == 'Loses') {
                scope.querySelector('.bet-type-btn[data-type="Loses"]').classList.add('active-mode-type');
            }
        }



        // set description 
        scope.querySelector('#bet-description-input').value = state.data_object.description || '';

    }


    if (state.calculator_type == '2up') {
        add_2up_bet_section(scope, state);
    }


    // SHOULD PROBABLY HAVE A FUNCTION HERE LIKE COLLECT VALUES STANDARD
    if (state.calculator_type == 'Standard' || state.calculator_type == '2up') {
        get_and_create_all_values_standard(scope, state);
    } else if (state.calculator_type == 'Each Way' || state.calculator_type == 'Extra Place') {
        get_and_create_all_values_each_way(scope, state);
    } else if (state.calculator_type == 'Dutching') {
        get_and_create_all_values_dutching(scope, state);
    } else if (state.calculator_type == 'Sequential Lay') {
        get_and_create_all_values_sequential_lay(scope, state);
    } else if (state.calculator_type == 'Bonus') {
        get_and_create_all_values_bonus(scope, state);
    } else if (state.calculator_type == 'Refund If') {
        get_and_create_all_values_refund_if(scope, state);
    }



    if (state.data_object.incomplete_data) {
        state.data_object.qualifying_loss = '0.00';
        state.data_object.potential_profit = '0.00';
    }


    // update the local data
    update_local_data(scope, state);




    if (state.calculator_type == 'Standard' || state.calculator_type == '2up') {
        set_results_for_standard(scope, state);
    } else if (state.calculator_type == 'Each Way') {
        set_results_for_each_way(scope, state);
    } else if (state.calculator_type == 'Extra Place') {
        set_results_for_extra_place(scope, state);
    } else if (state.calculator_type == 'Dutching') {
        set_results_for_dutching(scope, state);
    } else if (state.calculator_type == 'Sequential Lay') {
        set_results_for_sequential_lay(scope, state);
    } else if (state.calculator_type == 'Bonus') {
        set_results_for_bonus(scope, state);
    } else if (state.calculator_type == 'Refund If') {
        set_results_for_refund_if(scope, state);
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

    if (state.calculator_type == 'Standard') {

        state.data_object.laytype = scope.querySelector('.active-lay-type').dataset.type;
        state.data_object.isfree = scope.querySelector('#free_bet_mode_switch').checked;

    }



    state.data_object.platforms = [];


    // set the platform data

    state.data_object.platforms.push({
        index: 1,
        odds: scope.querySelector('#odds-input-1').value,
        platform: scope.querySelector('#platform-select-1').value,
    })

    state.data_object.platforms.push({
        index: 2,
        odds: scope.querySelector('#odds-input-2').value,
        platform: scope.querySelector('#platform-select-2').value,
        commission: scope.querySelector('#commission-input-2').value
    })


    if (state.calculator_type == '2up') {

        // get the is_payout from the switch -- this also needs to be set on load
        state.data_object.is_payout = scope.querySelector('#is_payout_switch').checked;

        if (state.data_object.is_payout) {
            state.data_object.platforms.push({
                index: 3,
                odds: scope.querySelector('#odds-input-3').value,
                platform: scope.querySelector('#platform-select-3').value,
                commission: scope.querySelector('#commission-input-3').value
            })
        }
    }


    state.data_object.backstake = scope.querySelector('#back-stake-input').value;

    state.data_object.description = scope.querySelector('#bet-description-input').value;

    calculate_standard_bet(scope, state);

}
function calculate_standard_bet(scope, state) {

    state.data_object.back_odds = parseFloat(scope.querySelector('#odds-input-1').value);
    state.data_object.lay_odds = parseFloat(scope.querySelector('#odds-input-2').value);
    state.data_object.lay_commission = (parseFloat(scope.querySelector('#commission-input-2').value)) / 100;
    state.data_object.back_stake = parseFloat(scope.querySelector('#back-stake-input').value);

    if (state.calculator_type == '2up') {
        if (state.data_object.is_payout) {
            state.data_object.new_back_odds = parseFloat(scope.querySelector('#odds-input-3').value);
            state.data_object.new_back_commission = (parseFloat(scope.querySelector('#commission-input-3').value)) / 100;
        } 
    }

    if (state.calculator_type == '2up') {
        state.data_object = calculator_helper.calculate_2up_bet_data(state.data_object);
    } else {
        state.data_object = calculator_helper.calculate_standard(state.data_object);
    }

}



function get_and_create_all_values_bonus(scope, state) {


    state.data_object.laytype = scope.querySelector('.active-lay-type').dataset.type;
    state.data_object.mode = scope.querySelector('.active-mode-type').dataset.type;
    state.data_object.isfree = scope.querySelector('#free_bet_mode_switch').checked;

    state.data_object.max_bonus = scope.querySelector('#max-bonus-input').value;
    state.data_object.bonus_retention = scope.querySelector('#bonus-retention-input').value;


    state.data_object.platforms = [];


    // set the platform data

    state.data_object.platforms.push({
        index: 1,
        odds: scope.querySelector('#odds-input-1').value,
        platform: scope.querySelector('#platform-select-1').value,
    })

    state.data_object.platforms.push({
        index: 2,
        odds: scope.querySelector('#odds-input-2').value,
        platform: scope.querySelector('#platform-select-2').value,
        commission: scope.querySelector('#commission-input-2').value
    })



    state.data_object.backstake = scope.querySelector('#back-stake-input').value;

    state.data_object.description = scope.querySelector('#bet-description-input').value;

    calculate_bonus_bet(scope, state);

}

function calculate_bonus_bet(scope, state) {

    state.data_object.back_odds = parseFloat(scope.querySelector('#odds-input-1').value);
    state.data_object.lay_odds = parseFloat(scope.querySelector('#odds-input-2').value);
    state.data_object.lay_commission = (parseFloat(scope.querySelector('#commission-input-2').value)) / 100;
    state.data_object.back_stake = parseFloat(scope.querySelector('#back-stake-input').value);

    state.data_object.max_bonus = parseFloat(scope.querySelector('#max-bonus-input').value);
    state.data_object.bonus_retention = parseFloat(scope.querySelector('#bonus-retention-input').value) / 100;


    state.data_object = calculator_helper.calculate_bonus(state.data_object);

}



function get_and_create_all_values_refund_if(scope, state) {


    state.data_object.laytype = scope.querySelector('.active-lay-type').dataset.type;

    state.data_object.max_bonus = scope.querySelector('#max-bonus-input').value;
    state.data_object.bonus_retention = scope.querySelector('#bonus-retention-input').value;

    state.data_object.trigger_text = scope.querySelector('#trigger-event-input').value;


    state.data_object.platforms = [];


    // set the platform data

    state.data_object.platforms.push({
        index: 1,
        odds: scope.querySelector('#odds-input-1').value,
        platform: scope.querySelector('#platform-select-1').value,
    })

    state.data_object.platforms.push({
        index: 2,
        odds: scope.querySelector('#odds-input-2').value,
        platform: scope.querySelector('#platform-select-2').value,
        commission: scope.querySelector('#commission-input-2').value
    })

    state.data_object.platforms.push({
        index: 3,
        odds: scope.querySelector('#odds-input-3').value,
        platform: scope.querySelector('#platform-select-3').value,
        commission: scope.querySelector('#commission-input-3').value
    })



    state.data_object.backstake = scope.querySelector('#back-stake-input').value;

    state.data_object.description = scope.querySelector('#bet-description-input').value;

    calculate_refund_if_bet(scope, state);

}

function calculate_refund_if_bet(scope, state) {

    state.data_object.back_odds = parseFloat(scope.querySelector('#odds-input-1').value);
    state.data_object.lay_odds = parseFloat(scope.querySelector('#odds-input-2').value);
    state.data_object.lay_commission = (parseFloat(scope.querySelector('#commission-input-2').value)) / 100;
    state.data_object.back_stake = parseFloat(scope.querySelector('#back-stake-input').value);

    state.data_object.second_lay_odds = parseFloat(scope.querySelector('#odds-input-3').value);
    state.data_object.second_lay_commission = (parseFloat(scope.querySelector('#commission-input-3').value)) / 100;

    state.data_object.max_bonus = parseFloat(scope.querySelector('#max-bonus-input').value);
    state.data_object.bonus_retention = parseFloat(scope.querySelector('#bonus-retention-input').value) / 100;

    console.log(state.data_object)

    state.data_object = calculator_helper.calculate_refund_if(state.data_object);

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


function get_and_create_all_values_dutching(scope, state) {


    // need to get the target
    // need to get the stake
    // need to get isfree
    // need to get commissions and odds - and set platforms while at it


    state.data_object.target = scope.querySelector('.active-lay-type').dataset.type;
    state.data_object.isfree = scope.querySelector('#free_bet_mode_switch').checked;
    state.data_object.stake = scope.querySelector('#back-stake-input').value;




    let label_text = 'First Selection Stake';
    let free_bet_mode_control = scope.querySelector('.free_bet_mode_control');
    free_bet_mode_control.style.opacity = '1';
    free_bet_mode_control.style.visibility = 'visible';
    if (!state.is_desktop) {
        free_bet_mode_control.style.display = 'flex';
    }

    if (state.data_object.target === 'Total') {
        label_text = 'Total Stake';
        free_bet_mode_control.style.opacity = '0';
        free_bet_mode_control.style.visibility = 'hidden';
        if (!state.is_desktop) {
            free_bet_mode_control.style.display = 'none';
        }
    } 

    let stake_label = scope.querySelector('#stake-input-label');
    stake_label.textContent = label_text;





    state.data_object.platforms = [];

    let index = 1;
    // select all .lay-bet-calculator-div
    let lay_bet_calculator_divs = scope.querySelectorAll('.lay-bet-calculator-div');
    lay_bet_calculator_divs.forEach(lay_bet_calculator_div => {

        state.data_object.platforms.push({
            index: index,
            odds: lay_bet_calculator_div.querySelector(`#odds-input-${index}`).value,
            commission: lay_bet_calculator_div.querySelector(`#commission-input-${index}`).value,
            platform: lay_bet_calculator_div.querySelector(`#platform-select-${index}`).value,
            link: ''
        });

        index++;
        
    });

    state.data_object.description = scope.querySelector('#bet-description-input').value;

    calculate_dutching_bet(scope, state);


}

function calculate_dutching_bet(scope, state) {

    // NOW BREAK DOWN PLATFORMS INTO ODDS AND COMMISSIONS

    state.data_object.platforms.forEach(platform => {

        state.data_object[`outcome${platform.index}_odds`] = parseFloat(platform.odds);
        state.data_object[`outcome${platform.index}_commission`] = parseFloat(platform.commission) / 100;

    });

    state.data_object = calculator_helper.calculate_dutching(state.data_object);

}



function get_and_create_all_values_sequential_lay(scope, state) {


    state.data_object.method = scope.querySelector('.active-lay-type').dataset.type;
    state.data_object.back_stake = scope.querySelector('#back-stake-input').value;
    state.data_object.back_odds = scope.querySelector('#odds-input-1').value;

    state.data_object.platforms = [];

    let index = 1;
    // select all .lay-bet-calculator-div
    let lay_bet_calculator_divs = scope.querySelectorAll('.lay-bet-calculator-div');
    lay_bet_calculator_divs.forEach(lay_bet_calculator_div => {

        let commission_input = lay_bet_calculator_div.querySelector(`input[placeholder="Enter commission"]`);
        let commission_value = '';
        if (commission_input) {
            commission_value = commission_input.value;
        }
            

        state.data_object.platforms.push({
            index: index,
            odds: lay_bet_calculator_div.querySelector(`input[placeholder="Enter odds"]`).value,
            commission: commission_value,
            platform: lay_bet_calculator_div.querySelector(`input[id^="platform-select"]`).value,
            link: ''
        });

        index++;
        
    });

    state.data_object.description = scope.querySelector('#bet-description-input').value;

    calculate_sequential_lay_bet(scope, state);


}

function calculate_sequential_lay_bet(scope, state) {

    // NOW BREAK DOWN PLATFORMS INTO ODDS AND COMMISSIONS
    state.data_object.back_stake = parseFloat(scope.querySelector('#back-stake-input').value);
    state.data_object.back_odds = parseFloat(scope.querySelector('#odds-input-1').value);

    state.data_object.platforms.forEach(platform => {

        if (platform.index != 1) {
        
            state.data_object[`leg${(platform.index - 1)}_odds`] = parseFloat(platform.odds);
            state.data_object[`leg${(platform.index - 1)}_commission`] = parseFloat(platform.commission) / 100;
    
        }

    });

    state.data_object = calculator_helper.calculate_sequential_lay(state.data_object);


}






function set_results_for_standard(scope, state) {

    if (!state.data_object.incomplete_data) {

        // then set lay stake using #lay-stake-span
        scope.querySelector('#lay-stake-span-2').textContent = '£' + state.data_object.lay_stake || '';
        scope.querySelector('#lay-stake-span-2').classList.add('copy-on-click');
        scope.querySelector('#copy-icon-2').classList.remove('hidden_row_above_columns');

        scope.querySelector('#lay-odds-span-2').textContent = state.data_object.lay_odds + ' Lay Odds' || '';


        if (state.calculator_type == '2up' && state.data_object.is_payout) {

            if (!state.data_object.incomplete_new_data) {

                scope.querySelector('#lay-stake-span-3').textContent = '£' + state.data_object.new_back_stake || '';
                scope.querySelector('#lay-stake-span-3').classList.add('copy-on-click');
                scope.querySelector('#copy-icon-3').classList.remove('hidden_row_above_columns');

                scope.querySelector('#back-odds-span-3').textContent = state.data_object.new_back_odds + ' Back Odds' || '';

            } else {
                set_new_data_to_default(scope, state);
            }

        }

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



function set_results_for_bonus(scope, state) {

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


function set_results_for_refund_if(scope, state) {

    if (!state.data_object.incomplete_data) {

        // then set lay stake using #lay-stake-span
        scope.querySelector('#lay-stake-span-2').textContent = ('£' + state.data_object.lay_stake).replace('£-', '-£') || '';
        scope.querySelector('#lay-stake-span-2').classList.add('copy-on-click');
        scope.querySelector('#copy-icon-2').classList.remove('hidden_row_above_columns');

        scope.querySelector('#lay-odds-span-2').textContent = state.data_object.lay_odds + ' Lay Odds' || '';


        scope.querySelector('#lay-stake-span-3').textContent = ('£' + state.data_object.second_lay_stake).replace('£-', '-£') || '';
        scope.querySelector('#lay-stake-span-3').classList.add('copy-on-click');
        scope.querySelector('#copy-icon-3').classList.remove('hidden_row_above_columns');

        scope.querySelector('#lay-odds-span-3').textContent = state.data_object.second_lay_odds + ' Lay Odds' || '';


        // then set the profit items
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


function set_results_for_dutching(scope, state) {

        if (!state.data_object.incomplete_data) {


            // make it loop over platforms 
            state.data_object.platforms.forEach(platform => {

                scope.querySelector(`#lay-stake-span-${platform.index}`).textContent = '£' + state.data_object[`outcome${platform.index}_stake`] || '';
                scope.querySelector(`#lay-stake-span-${platform.index}`).classList.add('copy-on-click');
                scope.querySelector(`#copy-icon-${platform.index}`).classList.remove('hidden_row_above_columns');

            });

    
            // then set the profit items
            scope.querySelector('.profit_and_log__item_value_rating').textContent = state.data_object.rating || '0%';
            scope.querySelector('.profit_and_log__item_value_qualifying_loss').textContent = ('£' + state.data_object.qualifying_loss).replace('£-', '-£');
            select_boxes_helper.set_class_for_profit_info_item(scope.querySelector('.profit_and_log__item_value_qualifying_loss'), state.data_object.qualifying_loss);
    
    
        } else {
    
            set_results_to_default(scope, state);
    
        }
    
    
}



function set_results_for_sequential_lay(scope, state) {

    if (!state.data_object.incomplete_data) {


        // make it loop over platforms 
        state.data_object.platforms.forEach(platform => {

            if (platform.index != 1) {

                scope.querySelector(`#lay-stake-span-${platform.index}`).textContent = '£' + state.data_object[`leg${platform.index - 1}_stake`] || '';
                scope.querySelector(`#lay-stake-span-${platform.index}`).classList.add('copy-on-click');
                scope.querySelector(`#copy-icon-${platform.index}`).classList.remove('hidden_row_above_columns');

            }

        });


        
        // THEN SELECT ALL .seq-lay-profit-row-item-value AND SET TO ...
        let seq_lay_profit_row_item_values = scope.querySelectorAll('.seq-lay-profit-row');
        seq_lay_profit_row_item_values.forEach(seq_lay_profit_row_item_value => {

            let index = seq_lay_profit_row_item_value.dataset.index;
            let profit_value = '';

            if (index == 'all') {

                profit_value = state.data_object.profit_all_legs_win;

            } else {

                profit_value = state.data_object[`leg${index}_profit`];

            }


            seq_lay_profit_row_item_value.querySelector('.seq-lay-profit-row-item-value').textContent = ('£' + profit_value).replace('£-', '-£');
            select_boxes_helper.set_class_for_profit_info_item(seq_lay_profit_row_item_value.querySelector('.seq-lay-profit-row-item-value'), profit_value);


        });




        

    } else {

        set_results_to_default(scope, state);

    }


}

function set_new_data_to_default(scope, state) {

    try {
        scope.querySelector('#back-odds-span-3').textContent = '... Back Odds';
    } catch (error) {
        // pass
    }

    try {
        scope.querySelector('#lay-stake-span-3').textContent = '...';
    } catch (error) {
        // pass
    }

    try {
        scope.querySelector('#lay-stake-span-3').classList.remove('copy-on-click');
    } catch (error) {
        // pass
    }

    try {
        scope.querySelector('#copy-icon-3').classList.add('hidden_row_above_columns');
    } catch (error) {
        // pass
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



    try {
        scope.querySelector('#back-odds-span-3').textContent = '... Back Odds';
    } catch (error) {
        // pass
    }


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



    let profit_divs_seq_lay = scope.querySelectorAll('.seq-lay-profit-row');
    profit_divs_seq_lay.forEach(profit_div_seq_lay => {

        profit_div_seq_lay.querySelector('.seq-lay-profit-row-item-value').textContent = ('£0.00');
        select_boxes_helper.set_class_for_profit_info_item(profit_div_seq_lay.querySelector('.seq-lay-profit-row-item-value'), '0.00');

    });

}





function set_all_values_to_default(scope, state) {

    // remove all active-lay-type classes
    let have_lay_type_buttons = false;
    scope.querySelectorAll('.active-lay-type').forEach(btn => {
        btn.classList.remove('active-lay-type');
        have_lay_type_buttons = true;
    });

    // remove all active-lay-type classes
    let have_mode_type_buttons = false;
    scope.querySelectorAll('.active-mode-type').forEach(btn => {
        btn.classList.remove('active-mode-type');
        have_mode_type_buttons = true;
    });

    // then add the active-lay-type class to the correct button
    if (have_lay_type_buttons) {
        try {
            scope.querySelector('.bet-type-btn[data-type="Standard"]').classList.add('active-lay-type');
        } catch {
            // pass
        }


        try {
            scope.querySelector('.bet-type-btn[data-type="First"]').classList.add('active-lay-type');
        } catch {
            // pass
        }


        try {
            scope.querySelector('.bet-type-btn[data-type="Standard Bet"]').classList.add('active-lay-type');
        } catch {
            // pass
        }

    }

    if (have_mode_type_buttons) {
        try {
            scope.querySelector('.bet-type-btn[data-type="Wins"]').classList.add('active-mode-type');
        } catch {
            // pass
        }
    }

    // make the free bet mode switch unchecked
    let free_bet_switch = scope.querySelector('#free_bet_mode_switch');
    if (free_bet_switch) {
        free_bet_switch.checked = false;
    }

    let is_payout_switch = scope.querySelector('#is_payout_switch');
    if (is_payout_switch) {
        is_payout_switch.checked = false;
    }

    // set all text inputs to '' unless their id contains 'commission' then set to 0
    scope.querySelectorAll('input').forEach(input => {
        if (input.id.includes('commission')) {
            input.value = '0';
        } else if (input.id.includes('platform-select')) {
            //pass
        } else if (input.id.includes('retention')) {
            input.value = '80';
        } else if (input.id.includes('max-bonus-input')) {
            input.value = scope.querySelector('#back-stake-input').value;
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

        if (event.target.classList.contains('add-outcome-on-click')) {
            state.data_object.outcomes++;
            add_back_bet_row_dutching(scope, state, scope.querySelector('div.input-section-div.input-section-div-outer'), state.data_object.outcomes);
            add_values_for_calculator(scope, state, false);
        }

        if (event.target.classList.contains('add-outcome-on-click-sequential-lay')) {
            state.data_object.outcomes++;
            add_lay_bet_row_sequential_lay(scope, state, scope.querySelector('div.input-section-div.input-section-div-outer'), state.data_object.outcomes + 1);
            add_profit_row_for_sequential_lay(scope, state, state.data_object.outcomes, false);
            add_values_for_calculator(scope, state, false);
        }

        if (event.target.classList.contains('minus-button')) {
            let index = parseInt(event.target.closest('div.lay-bet-calculator-div').dataset.index);
            state.data_object.outcomes--;
            let row_to_remove = div.querySelector(`div.lay-bet-calculator-div[data-index="${index}"]`);
            row_to_remove.remove();
            make_adjustments_for_removing_row_dutching(scope, state, index);
            
        }

        if (event.target.classList.contains('minus-button-sequential-lay')) {
            let index = parseInt(event.target.closest('div.lay-bet-calculator-div').dataset.index);
            state.data_object.outcomes--;
            let row_to_remove = div.querySelector(`div.lay-bet-calculator-div[data-index="${index}"]`);
            row_to_remove.remove();
            let profit_row_to_remove = div.querySelector(`div.seq-lay-profit-row[data-index="${index - 1}"]`);
            profit_row_to_remove.remove();
            make_adjustments_for_removing_profit_row_sequential_lay(scope, state, index - 1);
            make_adjustments_for_removing_row_sequential_lay(scope, state, index);
        }

    });


    div.querySelectorAll('input').forEach(input => { // CAPTURES FREE BET MODE SWITCH CHANGES TOO
        input.addEventListener('input', (event) => {
            add_values_for_calculator(scope, state, false);
            if (input.id.includes('back-stake-input') && (state.calculator_type == 'Bonus' || state.calculator_type == 'Refund If')) {
                scope.querySelector('#max-bonus-input').value = input.value;
            }
        });
    });


    try {
        // and on change description 
        div.querySelector('#bet-description-input').addEventListener('input', (event) => {
            add_values_for_calculator(scope, state, false);
        });
    } catch (error) {
        // pass
    }

}


function make_adjustments_for_removing_row_dutching(scope, state, index) {

    try {
        delete state.data_object[`outcome${index}_odds`];
    } catch { }
    try {
        delete state.data_object[`outcome${index}_commission`];
    } catch {}
    try {
        delete state.data_object[`outcome${index}_stake`];
    } catch {}

    // loop over all .lay-bet-calculator-div
    scope.querySelectorAll('div.lay-bet-calculator-div').forEach(row_div => {

        if (row_div.dataset.index > index) {

            let old_index = parseInt(row_div.dataset.index);

            let old_odds = row_div.querySelector(`#odds-input-${old_index}`).value;
            let old_commission = row_div.querySelector(`#commission-input-${old_index}`).value;
            let old_platform = row_div.querySelector('input.dropdown-option-platform-on-click').value;

            
            try {
                delete state.data_object[`outcome${old_index}_odds`];
            } catch { }
            try {
                delete state.data_object[`outcome${old_index}_commission`];
            } catch {}
            try {
                delete state.data_object[`outcome${old_index}_stake`];
            } catch {}

            row_div.dataset.index = old_index - 1;

            row_div.innerHTML = '';

            // TAKEN STAIGHT FROM THE ADD_BACK_BET_ROW_DUTCHING FUNCTION

            add_flag_div(row_div, false, true, old_index - 1);
            add_odds_input(row_div, 'Back', old_index - 1);
            add_commission_input(row_div, '', old_index - 1);
            add_platform_div_for_logging(row_div, 'Back Bet Platform', old_index - 1);
            add_lay_bet_info_div(scope, state, row_div, old_index - 1, 'info_text_back');
            add_minus_button(row_div, old_index - 1, false);


            row_div.querySelector(`#odds-input-${old_index - 1}`).value = old_odds;
            row_div.querySelector(`#commission-input-${old_index - 1}`).value = old_commission
            row_div.querySelector('input.dropdown-option-platform-on-click').value = old_platform


            let all_platforms = helper.get_all_platforms_profit_tracker();
            // select all .dropdown-options in the div and get their id
            let dropdown_containers = row_div.querySelectorAll('div.dropdown-options.dropdown-options-platforms-select');
            dropdown_containers.forEach(dropdown_container => {
                pt_helper.append_platforms_to_platform_selectors(dropdown_container, all_platforms, row_div, state)
            });
    
            // ALSO NEED TO ADD EVENT LISTENERS FOR THIS NEW DIV 
    
            // also add a function to listen to all 'input' or 'change' events on all inputs in the div
            row_div.querySelectorAll('input').forEach(input => { // CAPTURES FREE BET MODE SWITCH CHANGES TOO
                input.addEventListener('input', (event) => {
                    add_values_for_calculator(scope, state, false);
                });
            });



        }

    });


    add_values_for_calculator(scope, state, false);


}






function make_adjustments_for_removing_row_sequential_lay(scope, state, index) {


    // NEED TO MAKE SURE ALSO UPDATING THE PROFIT ROWS TO HAVE THE CORRECT INDEXES etc


    try {
        delete state.data_object[`leg${index - 1}_odds`];
    } catch { }
    try {
        delete state.data_object[`leg${index - 1}_commission`];
    } catch {}
    try {
        delete state.data_object[`leg${index - 1}_stake`];
    } catch {}
    try {
        delete state.data_object[`leg${index - 1}_profit`];
    } catch {}
    try {
        delete state.data_object[`leg${index - 1}_liability`];
    } catch {}

    // loop over all .lay-bet-calculator-div
    scope.querySelectorAll('div.lay-bet-calculator-div').forEach(row_div => {

        if (row_div.dataset.index > index) {

            let old_index = parseInt(row_div.dataset.index);

            let old_odds = row_div.querySelector(`#odds-input-${old_index}`).value;
            let old_commission = row_div.querySelector(`#commission-input-${old_index}`).value;
            let old_platform = row_div.querySelector('input.dropdown-option-platform-on-click').value;

            try {
                delete state.data_object[`leg${old_index - 1}_odds`];
            } catch { }
            try {
                delete state.data_object[`leg${old_index - 1}_commission`];
            } catch {}
            try {
                delete state.data_object[`leg${old_index - 1}_stake`];
            } catch {}
            try {
                delete state.data_object[`leg${old_index - 1}_profit`];
            } catch {}
            try {
                delete state.data_object[`leg${old_index - 1}_liability`];
            } catch {}

            row_div.dataset.index = old_index - 1;

            row_div.innerHTML = '';

            // TAKEN STAIGHT FROM THE ADD_LAY_BET_ROW_SEQUENTIAL_LAY FUNCTION

            add_flag_div(row_div, true, true, parseInt(row_div.dataset.index) - 1);
            add_odds_input(row_div, 'Lay', parseInt(row_div.dataset.index));
            add_commission_input(row_div, '', parseInt(row_div.dataset.index));
            add_platform_div_for_logging(row_div, 'Leg ' + (parseInt(row_div.dataset.index) - 1) + ' Exchange', parseInt(row_div.dataset.index));
            add_lay_bet_info_div(scope, state, row_div, parseInt(row_div.dataset.index), 'info_text_lay');
            add_minus_button(row_div, parseInt(row_div.dataset.index) - 1, true);


            row_div.querySelector(`#odds-input-${parseInt(row_div.dataset.index)}`).value = old_odds;
            row_div.querySelector(`#commission-input-${parseInt(row_div.dataset.index)}`).value = old_commission
            row_div.querySelector('input.dropdown-option-platform-on-click').value = old_platform


            let all_platforms = helper.get_all_platforms_profit_tracker();
            // select all .dropdown-options in the div and get their id
            let dropdown_containers = row_div.querySelectorAll('div.dropdown-options.dropdown-options-platforms-select');
            dropdown_containers.forEach(dropdown_container => {
                pt_helper.append_platforms_to_platform_selectors(dropdown_container, all_platforms, row_div, state)
            });
    
            // ALSO NEED TO ADD EVENT LISTENERS FOR THIS NEW DIV 
    
            // also add a function to listen to all 'input' or 'change' events on all inputs in the div
            row_div.querySelectorAll('input').forEach(input => { // CAPTURES FREE BET MODE SWITCH CHANGES TOO
                input.addEventListener('input', (event) => {
                    add_values_for_calculator(scope, state, false);
                });
            });



        }

    });











    add_values_for_calculator(scope, state, false);


}

function make_adjustments_for_removing_profit_row_sequential_lay(scope, state, index) {

    let profit_divs_seq_lay = scope.querySelectorAll('.seq-lay-profit-row');
    profit_divs_seq_lay.forEach(profit_div_seq_lay => {

        if (profit_div_seq_lay.dataset.index != 'all' && parseInt(profit_div_seq_lay.dataset.index) > index) {
            let old_index = parseInt(profit_div_seq_lay.dataset.index);

            profit_div_seq_lay.dataset.index = old_index - 1;
            profit_div_seq_lay.id = `seq-lay-profit-row-${old_index - 1}`;
            profit_div_seq_lay.querySelector('.seq-lay-profit-row-item-text').textContent = `Profit If Leg ${old_index - 1} Loses`;
        }
        
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
    state.data_object.qualifying_loss = (state.data_object.qualifying_loss || '0.00').toString().replace(/£/g, '').trim();
    state.data_object.potential_profit = (state.data_object.potential_profit || '0.00').toString().replace(/£/g, '').trim();
    state.data_object.bet_outcome = '';

    

    /* 


    if (state.calculator_type == 'Standard') {
        state.data_object.calculator = 'Standard'
    }

    if (state.calculator_type == '2up') {
        state.data_object.calculator = '2up'
    }

    if (state.calculator_type == 'Each Way') {
        state.data_object.calculator = 'Each Way'
    }

    if (state.calculator_type == 'Extra Place') {
        state.data_object.calculator = 'Extra Place'
    }

    if (state.calculator_type == 'Dutching') {
        state.data_object.calculator = 'Dutching'
    }

    if (state.calculator_type == 'Sequential Lay') {
        state.data_object.calculator = 'Sequential Lay';
    }


    */

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

    if (window.innerWidth < MAX_WIDTH_FOR_MOBILE) {
        return;
    }

    
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