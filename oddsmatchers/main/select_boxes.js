import * as calculateHelpers from './calculate_functions.js'
import * as helper from './helper.js'
import * as profit_tracker_helpers from './profit_tracker_helper.js'

let copy_icon_url = 'https://img.icons8.com/?size=100&id=59773&format=png&color=ffffff';

const delay_for_copy_text = 1500;





export function select_clicked(scope, state, id) {

    if (id == null) {
        create_and_inject_select_div(scope, state, id);
        return;
    }

    if (state.is_desktop) {
        change_select_button_content(scope, state, id);
    }

    // Add spinning animation to the select button and make the row take the same time to expand
    // DO LATER ON
    
    // check if there is a tr with select_button_div with that data-id of the id and if there is that already then return
    if (check_if_already_open_select_for_item(scope, state, id)) {
        set_td_class_for_the_row(scope, state, id, false);
        return;
    }

    set_td_class_for_the_row(scope, state, id, true)

    // then find the tr where the data-id is the id and create and inject div
    create_and_inject_select_div(scope, state, id);


    // first find the element with class select_button and where the data-id is the id
    if (!state.is_desktop) {
        change_arrow_div_setup_mobile(scope, state, id);
    }


}


function change_arrow_div_setup_mobile(scope, state, id) {

    let arrow_div = scope.querySelector('.arrow-div[data-id="' + id + '"]');
    if (!arrow_div) {
        return;
    }

    let is_open = (arrow_div.getAttribute('data-is-open') == 'false');
    arrow_div.remove();
    let mobile_card = scope.querySelector('.mobile-card.outer-mobile-card[data-id="' + id + '"] .mobile-card');


    inject_arrow_div(mobile_card, id, is_open);


}

function inject_arrow_div(item_div, id, is_open) {


    let arrow_div = document.createElement('div');
    arrow_div.setAttribute('data-id', id);
    arrow_div.setAttribute('data-is-open', is_open ? 'true' : 'false');
    arrow_div.setAttribute('class', 'arrow-div');
    arrow_div.innerHTML = `
        <img src="https://img.icons8.com/?size=100&id=99991&format=png&color=ffffff" data-id="${id}" alt="Arrow" class="arrow-image ${is_open ? 'arrow-image-open' : ''}">
    `;
    // inject the div into the item_div
    item_div.appendChild(arrow_div);

}



function change_select_button_content(scope, state, id) {


    const select_button = scope.querySelector('.select_button[data-id="' + id + '"]');
    if (select_button) {
        if (state.oddsmatcher_type == 'profit tracker') {
            let select_inner_html_profit_tracker = `<img class="select_img" data-id="${id}" src="https://img.icons8.com/?size=100&id=kCViyr9hZtLX&format=png&color=ffffff" alt="Edit">`;
            if (select_button.getAttribute('data-is-open') == 'true') {
                select_button.innerHTML = select_inner_html_profit_tracker;
                select_button.setAttribute('data-is-open', 'false');
            } else {
                select_button.textContent = '×'; // Using multiplication symbol × which is more vertically centered
                select_button.setAttribute('data-is-open', 'true');
            }

        } else {
            // if the content is + change it to × and vice versa
            if (select_button.textContent === '+') {
                select_button.textContent = '×'; // Using multiplication symbol × which is more vertically centered
            } else {
                select_button.textContent = '+';
            }
        }
    }

}


function check_if_already_open_select_for_item(scope, state, id) {

    if (state.is_desktop) {

        const tr = scope.querySelector('.select_button_div_row[data-id="' + id + '"]');
        if (tr) {
            tr.remove();
            return true;
        }
        return false;

    } else {

        const div = scope.querySelector('.select_button_div[data-id="' + id + '"]');
        if (div) {
            change_arrow_div_setup_mobile(scope, state, id);
            div.remove();
            return true;
        }
        return false;

    }


}


function set_td_class_for_the_row(scope, state, id, is_add_class) {

    if (!state.is_desktop) {
        return;
    }


    const tr = scope.querySelector('.table_data_row[data-id="' + id + '"]');
    if (tr) {
        tr.querySelectorAll('td').forEach(td => {
            td.classList.toggle('selected_row_td_original', is_add_class);
        });
        tr.querySelectorAll('div[class*="_profit_data"').forEach(div => {
            div.style.background = is_add_class ? 'var(--global-main-background-colour)' : '';
        });
    }
}




function prepend_empty_tr_to_table(scope, state, row) {
    // considering the code to make a row from create row in profit tracker desktop
    // prepend a tr to the table with empty values

    if (state.is_desktop) {

        // prepend a tr to the table
        let tr = document.createElement('tr');

        // Create empty tr with all td elements
        tr.className = 'table_data_row';
        tr.setAttribute('data-id', row.betId);

        tr.innerHTML = `
            <td class="date_and_time_data"></td>
            
            <td class="description_data">
                <div class="description-text"></div>
                <button class="more-button" data-bet-id="${row.betId}">more...</button>
            </td>

            <td>
                <div id="bookmaker_logo_${row.betId}" class="bookmaker_logo_div">
                    <a class="div_around_logo">
                        <img class='bookmaker_logo_img' src="${helper.get_bookmaker_image_profit_tracker_desktop(null)}">
                    </a>
                </div>
            </td>

            <td class="no_padding_margin">
                <div class="expected_profit_data">
                    <div id='qualifying_loss_${row.betId}' class='positive_profit_data'>£0.00</div>
                    <div id='potential_profit_${row.betId}' class='positive_profit_data'>£0.00</div>
                </div>
            </td>

            <td class="settled_data">
                <div class="expected_profit_data">
                    <input type="checkbox" data-id="${row.betId}" name="is_settled" class="settled_checkbox">
                </div>
            </td>

            <td class="no_padding_margin">
                <div class="expected_profit_data">
                    <div id='actual_profit_${row.betId}' class='final_profit_data positive_profit_data'>£0.00</div>
                </div>
            </td>
        `;


        // Create and append select button
        let selectButton = document.createElement('button');
        selectButton.innerHTML = `×`;
        selectButton.className = 'select_button';
        selectButton.setAttribute('data-id', row.betId);
        selectButton.setAttribute('data-is-open', 'true');
        selectButton.setAttribute('aria-label', row.betId);
        tr.appendChild(selectButton);

        // Prepend to tbody
        const tableBody = scope.querySelector('table tbody');
        tableBody.insertBefore(tr, tableBody.firstChild);

        helper.setupDescriptionTruncation(tr, row.betId, '', scope, state);


    } else {
        // Create mobile card for profit tracker
        const card = document.createElement('div');
        card.className = 'mobile-card outer-mobile-card';
        card.setAttribute('data-id', row.betId);

        card.innerHTML = `
            <div class="mobile-card">
                <div class="mobile-row mobile-row-date"><strong>Date:</strong> <span></span></div>
                

                <div class="mobile-row mobile-row-event hidden_row_above_columns">
                    <strong>Event:</strong>
                    <span>${row.event}</span>
                </div>

                <div class="mobile-row mobile-row-bet-outcome hidden_row_above_columns">
                    <strong>Bet:</strong>
                    <span>${row.bet_outcome}</span>
                </div>

                <div class="mobile-row mobile-row-bookmaker">
                    <strong>Platform:</strong>
                    <div class="div-outside-logo-img">
                        <a target="_blank" rel="noopener noreferrer">
                            <img src="${helper.get_bookmaker_image_profit_tracker_desktop(null)}" class="logo-img">
                        </a>
                    </div>
                </div>

                <div class="mobile-row mobile-row-description-container mobile-row-description">
                    <div class="mobile-row-description-title"><strong>Description:</strong></div>
                    <div class="mobile-row mobile-row-description"><span class="mobile-row-description-text"></span></div>
                </div>

                <div class="profit_info_div_outer">
                    <div class="profit_info_div_inner">
                        <div class="profit_info_div_inner_title">Qualifying Loss</div>
                        <div class="qualifying_loss_badge profit-badge">£0.00</div>
                    </div>
                    <div class="profit_info_div_inner">
                        <div class="profit_info_div_inner_title">Potential Profit</div>
                        <div class="potential_profit_badge profit-badge">£0.00</div>
                    </div>
                    <div class="profit_info_div_inner">
                        <div class="profit_info_div_inner_title">Bet<br>Settled<br></div>
                        
                        <div class="div-outside-switch item-complete-switch">
                            <div class="switch_container" >
                                <label class="switch">
                                    <input type="checkbox" class="show_filters_switch item_complete_switch" data-id=${row.betId} id="item-complete-switch-${row.betId}">
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="profit_info_div_inner">
                        <div class="profit_info_div_inner_title">Final<br>Profit</div>
                        <div class="final_profit_badge profit-badge not-complete-badge">£0.00</div>
                    </div>
                </div>
            </div>
        `;

        // Prepend to mobile container
        const mobileContainer = scope.querySelector('.mobile-container');
        mobileContainer.insertBefore(card, mobileContainer.firstChild);


    }

    create_and_inject_select_div(scope, state, row.betId);

    if (!state.is_desktop) {
        const mobileCard = scope.querySelector(`.mobile-card.outer-mobile-card[data-id="${row.betId}"] div.mobile-card`);
        inject_arrow_div(mobileCard, row.betId, state);
    }

}

function create_and_inject_select_div(scope, state, id) {


    let row = state.globalData.find(row => row._id === id);
    
    if (state.oddsmatcher_type == 'profit tracker') {
        row = state.globalData.find(row => row.betId === id);
    }

    if (row == undefined) {
        row = {
            betId: `bet_${Math.random().toString(36).substring(2, 6)}_${Date.now()}`,
            calculator: 'No Calculator',
            oddsmatcher_type: 'Manual',
            is_manual_log: true,
        }
        state.globalData.push(row);
        // PREPEND THE TR TO THE TABLE
        prepend_empty_tr_to_table(scope, state, state.globalData[state.globalData.length - 1]);
        return; // very important to return here to avoid recursion
    }


    
    if (state.is_desktop) {

        const tr = scope.querySelector('tr[data-id="' + id + '"]');

        if (tr) {

            // make it inject a row just below that row
            const newRow = document.createElement('tr');
            newRow.className = 'select_button_div_row';
            newRow.setAttribute('data-id', id);
            
            // Create td element properly and override default td styles
            const td = document.createElement('td');
            td.setAttribute('colspan', '100%');
            td.className = 'select_td';
            
            // Create the inner div
            const div = document.createElement('div');
            div.className = 'select_button_div';
            div.setAttribute('data-id', id);

            create_select_div_inner_html(scope, state, div, row)
            
            // Append elements
            td.appendChild(div);
            newRow.appendChild(td);
            tr.parentNode.insertBefore(newRow, tr.nextSibling);
            
        }

    } else {

        // make the version where it selects the div with this class .mobile-card.outer-mobile-card
        const mobileCard = scope.querySelector(`.mobile-card.outer-mobile-card[data-id="${id}"] div.mobile-card`);

        // Create the inner div
        const div = document.createElement('div');
        div.className = 'select_button_div';
        div.setAttribute('data-id', id);

        create_select_div_inner_html(scope, state, div, row)

        // then append it to the .mobile-card.outer-mobile-card
        if (mobileCard) {
            mobileCard.appendChild(div);
        }

    }

}







function create_select_div_inner_html(scope, state, div, row) {

    // THIS IS FOR 2UP BUT CAN ADJUST
    let data_object = {};
    

    if (state.oddsmatcher_type == '2up') {

        // get the values from the row
        data_object.back_stake = parseFloat('10');
        data_object.back_odds = parseFloat(row.back_odds);
        data_object.lay_odds = parseFloat(row.lay_odds);
        data_object.lay_commission = parseFloat('0') / 100;

        data_object = calculateHelpers.calculate_2up_bet_data(data_object);

        set_values_for_2up_bet_data(state, div, row, data_object, true);

    } else if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'bog' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {

        // get the values from the row
        data_object.back_stake = parseFloat('10');

        data_object.back_odds = parseFloat(row.back_odds);
        data_object.lay_odds = parseFloat(row.lay_odds);
        data_object.lay_commission = parseFloat('0') / 100;

        // THINK NEEDS IS_FREE AND LAY TYPE
        if (state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'free_bet_tutorial') {
            data_object.isfree = true;
        } else {
            data_object.isfree = false;
        }
        if (data_object.isfree) {
            data_object.back_stake = parseFloat('30');
        }

        data_object.laytype = 'Standard'

        data_object = calculateHelpers.calculate_standard(data_object);

    } 

    if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {
        set_values_for_standard(state, div, row, data_object, true);
    } 
    
    if (state.oddsmatcher_type == 'bog') {
        set_values_for_bog(state, div, row, data_object, true);
    } 

    if (state.oddsmatcher_type == 'each_way' || state.oddsmatcher_type == 'extra_place') {

        data_object.each_way_stake = parseFloat('10');
        data_object.each_way_odds = parseFloat(row.bookmaker_each_way_odds);

        data_object.exchange_win_odds = parseFloat(row.exchange_win_odds);
        data_object.exchange_win_commission = parseFloat('0') / 100;

        data_object.exchange_place_odds = parseFloat(row.exchange_place_odds);
        data_object.exchange_place_commission = parseFloat('0') / 100;

        data_object.bookmaker_fraction = row.bookmaker_fraction;

        data_object = calculateHelpers.calculate_each_way_and_extra_place(data_object, (state.oddsmatcher_type == 'extra_place'));

        set_values_for_each_way_and_extra_place(state, div, row, data_object, true);

    }

    if (state.oddsmatcher_type == 'dutching') {

        data_object.stake = parseFloat('10');

        data_object.outcome1_odds = parseFloat(row.first_odds);
        data_object.outcome1_commission = parseFloat('0') / 100;


        data_object.outcome2_odds = parseFloat(row.second_odds);
        data_object.outcome2_commission = parseFloat('0') / 100;

        if (row.outcomes == 3) {
            data_object.outcome3_odds = parseFloat(row.third_odds);
            data_object.outcome3_commission = parseFloat('0') / 100;
        }

        data_object.outcomes = row.outcomes;

        data_object.target = 'First';
        data_object.isfree = false;
        
        data_object = calculateHelpers.calculate_dutching(data_object);


        //need to add in controls for dutching as well as possibly stake going into controls section
        set_values_for_dutching(state, div, row, data_object, true);
    } 

    if (state.oddsmatcher_type == 'profit tracker') {
        profit_tracker_helpers.set_values_for_profit_tracker(scope, state, div, row, true);
    }



    add_event_listeners_for_items_in_select_div(scope, state, div, row, data_object);

}






function set_values_for_2up_bet_data(state, div, row, data_object, is_create) {

    add_in_bet_section(div, row, 'Back', data_object, is_create);
    add_in_bet_section(div, row, 'Lay', data_object, is_create);

    add_in_explanation_text_section(state, div, row, data_object, is_create);

    add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create);

}


function set_values_for_standard(state, div, row, data_object, is_create) {

    add_in_bet_section(div, row, 'Back', data_object, is_create);
    add_in_bet_section(div, row, 'Lay', data_object, is_create);

    add_in_explanation_text_section(state, div, row, data_object, is_create);

    if (is_create) {
        add_in_bet_controls_section(state, div, row, data_object, is_create);
    }

    add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create);

}


function set_values_for_bog(state, div, row, data_object, is_create) {

    add_in_bet_section(div, row, 'Back', data_object, is_create);
    add_in_bet_section(div, row, 'Lay', data_object, is_create);

    add_in_explanation_text_section(state, div, row, data_object, is_create);

    add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create);

}


function set_values_for_each_way_and_extra_place(state, div, row, data_object, is_create) {

    add_in_bet_section(div, row, 'Each-Way', data_object, is_create);
    add_in_bet_section(div, row, 'Win-Lay', data_object, is_create);
    add_in_bet_section(div, row, 'Place-Lay', data_object, is_create);

    add_in_explanation_text_section(state, div, row, data_object, is_create);

    add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create);

}


function set_values_for_dutching(state, div, row, data_object, is_create) {

    add_in_bet_section(div, row, 'First', data_object, is_create);
    add_in_bet_section(div, row, 'Second', data_object, is_create);

    if (row.outcomes >= 3) {
        add_in_bet_section(div, row, 'Third', data_object, is_create);
    }

    add_in_bet_controls_section_dutching(state, div, row, data_object, is_create);

    add_in_explanation_text_section(state, div, row, data_object, is_create);

    add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create);

}
















function add_in_bet_section(div, row, type_of_bet, data_object, is_create) {


    let is_dutching = row.outcomes && row.first_bookmaker; // so only if it has outcomes and first_bookmaker means it's dutching


    if (is_create) {

        let link = row.bookmaker_link;
        let platform = row.bookmaker;
        let class_for_bar_on_left_of_item = 'bar_on_left_of_item';

        if (type_of_bet === 'Lay') {
            link = row.exchange_link;
            platform = row.exchange;
            class_for_bar_on_left_of_item = 'bar_on_left_of_item bar_on_left_of_item_lay';
        }

        if (type_of_bet === 'Win-Lay') {
            link = row.win_exchange_link;
            platform = row.win_exchange;
            class_for_bar_on_left_of_item = 'bar_on_left_of_item bar_on_left_of_item_lay';
        }

        if (type_of_bet === 'Place-Lay') {
            link = row.place_exchange_link;
            platform = row.place_exchange;
            class_for_bar_on_left_of_item = 'bar_on_left_of_item bar_on_left_of_item_lay';
        }


        if (is_dutching) {
            link = row[`${type_of_bet.toLowerCase()}_link`];
            platform = row[`${type_of_bet.toLowerCase()}_bookmaker`];
            class_for_bar_on_left_of_item = 'bar_on_left_of_item bar_on_left_of_item_' + type_of_bet.toLowerCase();
        }


        div.innerHTML += `
            <div class="select_div_item select_bet_section">

                <div class="${class_for_bar_on_left_of_item}"></div>

                <div class="select_bet_div_item">
                    <div class="outer_bottom_select_bet_div">
                        <div class="inner_bottom_select_bet_div_left">

                            <div id="bookmaker_logo_${row._id}" class="bookmaker_logo_div bookmaker_logo_div_select_bet">
                                <a class="div_around_logo" ${link ? `href="${link}" target="_blank"` : ''} >
                                    <img class='bookmaker_logo_img bookmaker_logo_img_select_bet' src="${helper.get_bookmaker_image(platform)}" alt="${row.sport} ${platform}">
                                </a>
                            </div>

                            <div class="select_bet_text_div"> 
                                <span class="select_bet_text_div_text" id="select_bet_text_div_text_${row._id}_${type_of_bet}"></span>
                            </div>

                        </div>
                        <div class="inner_bottom_select_bet_div_right" id="right_div_${row._id}_${type_of_bet}">

                        </div>
                    </div>
                </div>
            </div>
        `

    }



    // Get the right div container
    const rightDiv = div.querySelector('#right_div_' + row._id + '_' + type_of_bet);

    if (type_of_bet === 'Back') {
        add_stake_input(rightDiv, row, type_of_bet, data_object.back_stake, is_create);
        add_odds_input(rightDiv, row, type_of_bet, data_object.back_odds, is_create, is_dutching);
    }

    if (type_of_bet === 'Lay') {
        add_odds_input(rightDiv, row, type_of_bet, data_object.lay_odds, is_create, is_dutching);
        add_lay_commission_input(rightDiv, row, type_of_bet, data_object.lay_commission, is_create);
    }




    if (type_of_bet === 'Each-Way') {
        add_stake_input(rightDiv, row, type_of_bet, data_object.each_way_stake, is_create);
        add_odds_input(rightDiv, row, type_of_bet, data_object.each_way_odds, is_create, is_dutching);
    }

    if (type_of_bet === 'Win-Lay') {
        add_odds_input(rightDiv, row, type_of_bet, data_object.exchange_win_odds, is_create, is_dutching);
        add_lay_commission_input(rightDiv, row, type_of_bet, data_object.exchange_win_commission, is_create);
    }

    if (type_of_bet === 'Place-Lay') {
        add_odds_input(rightDiv, row, type_of_bet, data_object.exchange_place_odds, is_create, is_dutching);
        add_lay_commission_input(rightDiv, row, type_of_bet, data_object.exchange_place_commission, is_create);
    }





    if (type_of_bet === 'First') {
        //add_stake_input(rightDiv, row, type_of_bet, data_object.stake, is_create);
        add_odds_input(rightDiv, row, type_of_bet, data_object.outcome1_odds, is_create, is_dutching);
        add_lay_commission_input(rightDiv, row, type_of_bet, data_object.outcome1_commission, is_create);
    }
    
    if (type_of_bet === 'Second') {
        add_odds_input(rightDiv, row, type_of_bet, data_object.outcome2_odds, is_create, is_dutching);
        add_lay_commission_input(rightDiv, row, type_of_bet, data_object.outcome2_commission, is_create);
    }

    if (type_of_bet === 'Third') {
        add_odds_input(rightDiv, row, type_of_bet, data_object.outcome3_odds, is_create, is_dutching);
        add_lay_commission_input(rightDiv, row, type_of_bet, data_object.outcome3_commission, is_create);
    }
    
    
    
    





    let span_text_element = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + type_of_bet);
    set_text_for_span_in_middle(div, span_text_element, row, type_of_bet, data_object, is_create, is_dutching);


}


function add_stake_input(rightDiv, row, type_of_bet, stake_input_value, is_create) {

    if (is_create) {
        // Create stake input
        const stakeLabel = document.createElement('div');
        stakeLabel.className = 'filter-label';
        stakeLabel.textContent = type_of_bet.replace('-', ' ') + ' Stake';
        
        const stakeInput = document.createElement('input');
        stakeInput.dataset._id = row._id
        stakeInput.className = 'text-input';
        stakeInput.id = type_of_bet + '-stake-input_' + row._id;
        stakeInput.placeholder = type_of_bet.replace('-', ' ') +' Stake';
        stakeInput.autocomplete = 'off';


        // Add all inputs to the right div
        const stakeFilterItem = document.createElement('div');
        stakeFilterItem.className = 'filter-item';
        stakeFilterItem.appendChild(stakeLabel);
        stakeFilterItem.appendChild(stakeInput);
        rightDiv.appendChild(stakeFilterItem);

    } 

    const stakeInput = rightDiv.querySelector('#' + type_of_bet + '-stake-input_' + row._id);
    stakeInput.setAttribute('value', stake_input_value); 

}


function add_odds_input(rightDiv, row, type_of_bet, odds_input_value, is_create, is_dutching) {

    if (is_create) {

        let input_text = type_of_bet.replace('-', ' ') + ' Odds'
        if (is_dutching) {
            input_text = 'Back Odds';
        }

        // Create back odds input
        const oddsLabel = document.createElement('div');
        oddsLabel.className = 'filter-label';
        oddsLabel.textContent = input_text;
        
        const oddsInput = document.createElement('input');
        oddsInput.dataset._id = row._id
        oddsInput.className = 'text-input';
        oddsInput.id = type_of_bet + '-odds-input_' + row._id;
        oddsInput.placeholder = input_text;
        oddsInput.autocomplete = 'off';

        
        const oddsFilterItem = document.createElement('div');
        oddsFilterItem.className = 'filter-item';
        oddsFilterItem.appendChild(oddsLabel);
        oddsFilterItem.appendChild(oddsInput);
        rightDiv.appendChild(oddsFilterItem);
    
    }

    const oddsInput = rightDiv.querySelector('#' + type_of_bet + '-odds-input_' + row._id);
    oddsInput.setAttribute('value', odds_input_value); 

}


function add_lay_commission_input(rightDiv, row, type_of_bet, lay_commission_value, is_create) {


    let commission_input_id = `commission-input_${row._id}`

    if (type_of_bet === 'Place-Lay') {
        commission_input_id = `commission-input_place_${row._id}`;
    }


    if (type_of_bet === 'First' || type_of_bet === 'Second' || type_of_bet === 'Third') {
        commission_input_id = `commission-input_${type_of_bet.toLowerCase()}_${row._id}`;
    }


    if (is_create) {

        // Create commission input
        const commissionLabel = document.createElement('div');
        commissionLabel.className = 'filter-label';
        commissionLabel.textContent = 'Commission (%)';
        
        const commissionInput = document.createElement('input');
        commissionInput.dataset._id = row._id
        commissionInput.className = 'text-input';
        commissionInput.id = commission_input_id;
        commissionInput.placeholder = 'Commission';
        commissionInput.autocomplete = 'off';


        const commissionFilterItem = document.createElement('div');
        commissionFilterItem.className = 'filter-item';
        commissionFilterItem.appendChild(commissionLabel);
        commissionFilterItem.appendChild(commissionInput);
        rightDiv.appendChild(commissionFilterItem);

    }

    const commissionInput = rightDiv.querySelector('#' + commission_input_id);
    commissionInput.setAttribute('value', lay_commission_value); 

}


function set_text_for_span_in_middle(div, span_text_element, row, type_of_bet, data_object, is_create, is_dutching) {

    if (is_create) {

        let type_of_bet_text = type_of_bet;

        if (type_of_bet === 'Each-Way' || is_dutching) {
            type_of_bet_text = 'Back';
        }

        if (type_of_bet === 'Win-Lay' || type_of_bet === 'Place-Lay') {
            type_of_bet_text = 'Lay';
        }

        span_text_element.innerHTML =
        `${type_of_bet_text} <span id="span_bet_stake_info_${row._id}_${type_of_bet}" class="copy-on-click "></span>
            <img src="${copy_icon_url}" class="copy-icon" alt="(Copy)" />
            on <span id="span_outcome_info_${row._id}_${type_of_bet}"></span> at
            <span id="odds-select-bet_${row._id}_${type_of_bet}" class="odds-select-bet"></span>            
        `;
    }

    let outcome = row.outcome;
    let stake;
    let odds;

    if (type_of_bet === 'Back') {
        stake = data_object.back_stake;
        odds = data_object.back_odds;
    } else if (type_of_bet === 'Lay') {
        stake = data_object.lay_stake;
        odds = data_object.lay_odds;
    }


    if (type_of_bet === 'Each-Way') {
        stake = data_object.each_way_stake;
        odds = data_object.each_way_odds;
        outcome = `'${row.horse}'`;
    }
    if (type_of_bet === 'Win-Lay') {
        stake = data_object.lay_stake_win;
        odds = data_object.exchange_win_odds;
        outcome = `'${row.horse}' to Win`;
    }
    if (type_of_bet === 'Place-Lay') {
        stake = data_object.lay_stake_place;
        odds = data_object.exchange_place_odds;
        outcome = `'${row.horse}' to Place`;
    }



    if (type_of_bet === 'First') {
        stake = data_object.outcome1_stake;
        odds = data_object.outcome1_odds;
        outcome = `${row.first_outcome}`;
    }

    if (type_of_bet === 'Second') {
        stake = data_object.outcome2_stake;
        odds = data_object.outcome2_odds;
        outcome = `${row.second_outcome}`;
    }

    if (type_of_bet === 'Third') {
        stake = data_object.outcome3_stake;
        odds = data_object.outcome3_odds;
        outcome = `${row.third_outcome}`;
    }
    
    if (outcome === 'Draw' || row.outcome === 'Draw') {
        outcome = 'a Draw';
    }


    let type_of_bet_text = type_of_bet.replace('-', ' ').replace('Win ', '').replace('Place ', '');
    if (is_dutching) {
        type_of_bet_text = ''
    }


    if (!data_object.incomplete_data) {
        div.querySelector('#span_bet_stake_info_' + row._id + '_' + type_of_bet).textContent = '£' + stake;
        div.querySelector('#span_outcome_info_' + row._id + '_' + type_of_bet).textContent = outcome;
        div.querySelector('#odds-select-bet_' + row._id + '_' + type_of_bet).textContent = odds + ' ' + type_of_bet_text + ' Odds';

    } else {
        div.querySelector('#span_bet_stake_info_' + row._id + '_' + type_of_bet).textContent = '£' + '0';
        div.querySelector('#span_outcome_info_' + row._id + '_' + type_of_bet).textContent = outcome;
        div.querySelector('#odds-select-bet_' + row._id + '_' + type_of_bet).textContent = type_of_bet_text + ' Odds';  
    }


    // then add in variations for different types etc, one by one 

}



















function add_in_bet_controls_section(state, div, row, data_object, is_create) {

    // do it using div.innerHTML += and add certain classes, then add these to the styles.css in desktop_oddsmatchers/main/styles.css


    let is_free_checked = (state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'free_bet_tutorial') ? true : false;
    
    div.innerHTML += `
        <div class="select_div_item select_bet_controls_item">
            <div class="free_bet_mode_control">
                <span class="free_bet_mode_label">Free Bet Mode</span>
                <label class="switch switch_select_free_bet_mode">
                    <input type="checkbox" class="free_bet_mode_switch" id="free_bet_mode_switch_${row._id}" ${is_free_checked ? 'checked' : ''}>
                    <span class="slider slider_select_free_bet_mode"></span>
                </label>
            </div>
        </div>
    `;


    div.querySelector('.select_bet_controls_item').innerHTML += `
        <div class="bet_type_control">
            <div class="lay_type_control_container" data-_id="${row._id}">
                <button class="bet-type-btn" data-type="Underlay">Underlay</button>
                <button class="bet-type-btn active-lay-type" data-type="Standard">Standard</button>
                <button class="bet-type-btn" data-type="Overlay">Overlay</button>
            </div>
        </div>
    `;



    if (state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {

        div.querySelector('.select_bet_controls_item').style.display = 'none';

    }


    
}


function add_in_bet_controls_section_dutching(state, div, row, data_object, is_create) {

    
    if (is_create) {

        div.innerHTML += `
            <div class="select_div_item select_bet_controls_item dutching-select-controls-item">

            </div>
        `;


        div.querySelector('.select_bet_controls_item').innerHTML += `
            <div class="filter-item filter-item-text-input-dutching-select">
                <div class="filter-label" id="stake-input-label_${row._id}"></div>
                <input data-_id="${row._id}" class="text-input" id="data-stake-input_${row._id}" placeholder="Enter Stake" autocomplete="off">
            </div>

        `;

        

        // WHEN THIS CHANGES IT NEEDS TO CHANGE INFO IN THE BACK ODDS INPUT AND IN DATA_OBJECT
        div.querySelector('.select_bet_controls_item').innerHTML += `
            <div class="bet_type_control">
                <div class="lay_type_control_container" data-_id="${row._id}">
                    <button class="bet-type-btn target-type-btn active-lay-type" data-type="First">Target First Selection</button>
                    <button class="bet-type-btn target-type-btn" data-type="Total">Target Total Stake</button>
                </div>
            </div>
        `;


        div.querySelector('.select_bet_controls_item').innerHTML += `
            <div class="free_bet_mode_control free-bet-mode-input-dutching-select">
                <span class="free_bet_mode_label">Free Bet Mode</span>
                <label class="switch switch_select_free_bet_mode">
                    <input type="checkbox" class="free_bet_mode_switch" id="free_bet_mode_switch_${row._id}">
                    <span class="slider slider_select_free_bet_mode"></span>
                </label>
            </div>

        `;

    }

    // how can i hide this div free_bet_mode_control so it's still taking up space but not visible?

    let label_text = 'First Selection Stake';
    let free_bet_mode_control = div.querySelector('.free_bet_mode_control');
    free_bet_mode_control.style.opacity = '1';
    free_bet_mode_control.style.visibility = 'visible';
    if (!state.is_desktop) {
        free_bet_mode_control.style.display = 'flex';
    }
    if (data_object.target === 'Total') {
        label_text = 'Total Stake';
        free_bet_mode_control.style.opacity = '0';
        free_bet_mode_control.style.visibility = 'hidden';
        if (!state.is_desktop) {
            free_bet_mode_control.style.display = 'none';
        }
    } 

    let stake_label = div.querySelector('#stake-input-label_' + row._id);
    stake_label.textContent = label_text;

    let stakeInput = div.querySelector('#data-stake-input_' + row._id);
    stakeInput.setAttribute('value', data_object.stake); 

    
}











function add_in_explanation_title_mobile(state, div, row, data_object, is_create) {

    div.innerHTML += `
        <div id="explanation_text_title_item_${row._id}" class="select_div_item select_bet_explanation_text_item select_bet_explanation_title_item">
            <div class="explanation_text_div">
                <span class="explanation_text_div_text">
                    Profit Breakdown
                </span>
            </div>
        </div>
    `;

}

function truncate_explanation_text_mobile(state, div, row, data_object, is_create, explanation_text_div_item_inner_html_expanded) {


    // no take the div and add in a ...less button to the end so that it goes in with the text
    // but it should go in with the text like this ...less --- like that exact line where it's literally words in the text
    let explanation_text_div_item = div.querySelector('#explanation_text_div_item_' + row._id);
    let spans = explanation_text_div_item.querySelectorAll('.explanation_text_div_text');
    let smaller_spans = spans[spans.length - 1].querySelectorAll('span');
    let lastSpan = smaller_spans[smaller_spans.length - 1];
    lastSpan.insertAdjacentHTML('afterend', `<span id="explanation_text_show_less_button_${row._id}" class="explanation_text_expand_or_collapse explanation_text_less_button"> ...less</span>`);

    // now save this inner_html of the explanation_text_div_item.
    
    if (explanation_text_div_item_inner_html_expanded == null) {
        explanation_text_div_item_inner_html_expanded = explanation_text_div_item.innerHTML;
    }

    // now take the first span in spans change it so it's the html but with only the first half of the text
    let firstSpan = spans[0];

    // split the first span's HTML by </span> and find the median index
    let spanTags = firstSpan.innerHTML.split('</span>');
    let medianIndex = Math.floor(spanTags.length / 2);

    // keep only the first half of spans and add back the closing tag
    firstSpan.innerHTML = spanTags.slice(0, medianIndex).join('</span>') + '</span>';

    // then remove all other spans other than firstSpan
    for (let i = 0; i < spans.length; i++) {
        if (spans[i] !== firstSpan) {
            spans[i].style.display = 'none';
        }
    }

    // now append a ...more button to the first span
    firstSpan.innerHTML += `<span id="explanation_text_show_more_button_${row._id}" class="explanation_text_expand_or_collapse explanation_text_more_button"> ...more</span>`;



    // Use event delegation on the parent div to handle clicks on the more button
    div.addEventListener('click', (event) => {
        if (event.target.id === `explanation_text_show_more_button_${row._id}`) {
            div.querySelector('#explanation_text_div_item_' + row._id).innerHTML = explanation_text_div_item_inner_html_expanded;
            state.truncated = false;
            data_object = JSON.parse(div.getAttribute('data-current-data-object'));
            add_text_spans(state, div, row, data_object, is_create);
        }
        
        if (event.target.id === `explanation_text_show_less_button_${row._id}`) {
            state.truncated = true;
            // Instead of re-running truncation, just restore the truncated version
            // We need to recreate the truncated version from the original content
            let explanation_text_div_item = div.querySelector('#explanation_text_div_item_' + row._id);
            let spans = explanation_text_div_item.querySelectorAll('.explanation_text_div_text');
            
            // Take the first span and truncate it
            let firstSpan = spans[0];
            let spanTags = firstSpan.innerHTML.split('</span>');
            let medianIndex = Math.floor(spanTags.length / 2);
            let truncatedSpan = spanTags.slice(0, medianIndex).join('</span>');
            firstSpan.innerHTML = truncatedSpan;
            
            // Remove all other spans except the first
            for (let i = 0; i < spans.length; i++) {
                if (spans[i] !== firstSpan) {
                    spans[i].style.display = 'none';
                }
            }
            
            // Add the ...more button back
            firstSpan.innerHTML += `<span id="explanation_text_show_more_button_${row._id}" class="explanation_text_expand_or_collapse explanation_text_more_button"> ...more</span>`;
        }
    });

}






function add_in_explanation_text_section(state, div, row, data_object, is_create) {

    if (!state.is_desktop && is_create) {
        add_in_explanation_title_mobile(state, div, row, data_object, is_create);
        state.truncated = true;
    }

    state.normal_list = (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == '2up' || state.oddsmatcher_type == 'bog' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial');

    state.horse_list = (state.oddsmatcher_type == 'each_way' || state.oddsmatcher_type == 'extra_place');

    state.dutching_list = (state.oddsmatcher_type == 'dutching');

    if (state.normal_list) {
        add_in_explanation_text_section_standard(state, div, row, data_object, is_create);
    }

    if (state.horse_list) {
        add_in_explanation_text_each_way_and_extra_place(state, div, row, data_object, is_create);
    }

    if (state.dutching_list) {
        add_in_explanation_text_dutching(state, div, row, data_object, is_create);
    }


    let selector = '#explanation_text_div_item_' + row._id;
    if (data_object.incomplete_data) {
        div.querySelector(selector).classList.add('hidden_row_above_columns');
    } else {
        div.querySelector(selector).classList.remove('hidden_row_above_columns');
    }

    let mobile_title_selector = '#explanation_text_title_item_' + row._id;
    if (!state.is_desktop && data_object.incomplete_data) {
        div.querySelector(mobile_title_selector).classList.add('hidden_row_above_columns'); // profit breakdown title
    } else if (!state.is_desktop && !data_object.incomplete_data) {
        div.querySelector(mobile_title_selector).classList.remove('hidden_row_above_columns'); // profit breakdown title
    }


    if (!state.is_desktop && is_create && !data_object.incomplete_data) {
        truncate_explanation_text_mobile(state, div, row, data_object, is_create, null);
    }



}

function add_in_explanation_text_section_standard(state, div, row, data_object, is_create) {


    if (is_create) {

        let outcome_span = `<span class="span_outcome_info_${row._id}"></span>`;

        let other_outcome_span = `<span class="span_other_outcome_info_${row._id}"></span>`;

        let twoup_outcome_span = `<span class="span_twoup_outcome_info_${row._id}"></span>`;

        div.innerHTML += `
            <div id="explanation_text_div_item_${row._id}" class="select_div_item select_bet_explanation_text_item">
                <div class="explanation_text_div">
                    <span class="explanation_text_div_text">
                        • If ${outcome_span}, you will win your back bet on ${row.bookmaker} 
                        and therefore gain <span id="span_back_win_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.bookmaker}. 
                        However, you will also lose your lay bet on ${row.exchange} 
                        and therefore you will simultaneously lose <span id="span_lay_loss_profit_${row._id}" class="select_profit_explanation_loss"></span> on ${row.exchange}. 
                        This means that overall you will <span id="gain_or_lose_text_back_win_${row._id}"></span>
                        <span id="span_overall_profit_back_win_${row._id}"></span> if ${outcome_span}.
                    </span>

                    <span class="explanation_text_div_text">
                        • If ${other_outcome_span}, you will lose your back bet on ${row.bookmaker} 
                        and therefore lose <span id="span_lay_win_back_profit_${row._id}" class="select_profit_explanation_loss"></span> on ${row.bookmaker}. 
                        However, you will also win your lay bet on ${row.exchange} 
                        and therefore you will simultaneously gain <span id="span_lay_win_lay_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.exchange}. 
                        This means that overall you will <span id="gain_or_lose_text_lay_win_${row._id}"></span>
                        <span id="span_overall_profit_lay_win_${row._id}"></span> if ${other_outcome_span}.
                    </span>

                    ${state.oddsmatcher_type == '2up' ? `
                        <span class="explanation_text_div_text">
                            • If ${twoup_outcome_span}, you will win your back bet on ${row.bookmaker} due to the 2up promotion
                            and therefore gain <span id="span_twoup_back_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.bookmaker}. 
                            You will also win your lay bet on ${row.exchange} since they didn't end up winning the game, 
                            therefore you will simultaneously gain <span id="span_twoup_lay_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.exchange}. 
                            This means that overall you will <span id="gain_or_lose_text_twoup_${row._id}"></span>
                            <span id="span_overall_profit_twoup_${row._id}"></span> if ${twoup_outcome_span}.
                        </span>
                    ` : ''}
                    
                </div>
            </div>
        `;

    }


    if (!data_object.incomplete_data) {

        add_text_spans(state, div, row, data_object, is_create);

    }

}

function add_in_explanation_text_each_way_and_extra_place(state, div, row, data_object, is_create) {


    let is_extra_place = state.oddsmatcher_type == 'extra_place';


    if (is_create) {

        let horse_wins_span = `<span class="span_win_outcome_info_${row._id}"></span>`;

        let horse_places_span = `<span class="span_place_outcome_info_${row._id}"></span>`;

        let extra_places_span = `<span class="span_extra_places_outcome_info_${row._id}"></span>`;

        let horse_doesnt_win_or_place_span = `<span class="span_no_win_or_place_outcome_info_${row._id}"></span>`;

        div.innerHTML += `
            <div id="explanation_text_div_item_${row._id}" class="select_div_item select_bet_explanation_text_item">
                <div class="explanation_text_div">


                    <!-- HORSE WINS -->
                    <span class="explanation_text_div_text">
                        • If ${horse_wins_span}, you will win both parts of your each way bet on ${row.bookmaker} 
                        and therefore you will gain <span id="span_back_win_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.bookmaker} <span id="span_back_win_profit_breakdown_${row._id}"></span>.
                        However, this also means you will lose both lay bets.
                        You will lose <span id="span_win_lay_loss_profit_${row._id}" class="select_profit_explanation_loss"></span> on ${row.win_exchange} due to the win lay bet. 
                        You will also lose <span id="span_place_lay_loss_profit_${row._id}" class="select_profit_explanation_loss"></span> on ${row.place_exchange} due to the place lay bet. 
                        Overall you will <span id="gain_or_lose_text_back_win_${row._id}"></span>
                        <span id="span_overall_profit_back_win_${row._id}"></span> if ${horse_wins_span}.
                    </span>


                    <!-- HORSE PLACES BUT DOENS'T WIN -->
                    <span class="explanation_text_div_text">
                        • If ${horse_places_span}, you will only win the place part of your each way bet on ${row.bookmaker}.
                        Overall on ${row.bookmaker} you will <span id="horse_places_gain_or_lose_text_${row._id}"></span>
                        <span id="span_each_way_profit_horse_places_${row._id}"></span> <span id="span_place_only_win_profit_breakdown_${row._id}"></span>.
                        However, this means you will win your win lay bet
                        and gain <span id="span_lay_win_lay_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.win_exchange}, 
                        as well as lose your place lay bet
                        and lose <span id="span_lay_place_loss_profit_${row._id}" class="select_profit_explanation_loss"></span> on ${row.place_exchange}. 
                        This means that overall you will <span id="gain_or_lose_text_lay_place_${row._id}"></span>
                        <span id="span_overall_profit_lay_place_${row._id}"></span> if ${horse_places_span}.
                    </span>



                    <!-- EXTRA PLACE -->
                    ${is_extra_place ? `
                    <span class="explanation_text_div_text">
                        • If ${extra_places_span} you make a large profit as you essentially win 3 of your 4 bets.
                        You will win half of your each way bet and therefore on ${row.bookmaker} you will <span id="extra_place_gain_or_lose_text_${row._id}"></span>
                        <span id="span_each_way_profit_extra_place_${row._id}"></span> <span id="span_extra_place_win_profit_breakdown_${row._id}"></span>.
                        Despite winning your back bet on the place you will still win both of your lay bets as ${row.place_exchange} were only doing ${row.exchange_places} places.
                        You will gain <span id="span_extra_place_lay_win_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.win_exchange} due to the win lay bet. 
                        You will also gain <span id="span_extra_place_lay_place_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.place_exchange} due to the place lay bet. 
                        Overall you will gain 
                        <span id="span_overall_profit_extra_place_${row._id}"></span> if ${extra_places_span}.
                    </span>
                    ` : ''}



                    <!-- HORSE DOESN'T WIN OR PLACE -->
                    <span class="explanation_text_div_text">
                        • If ${horse_doesnt_win_or_place_span}, you will lose both parts of your each way bet on ${row.bookmaker} 
                        and therefore in total you will lose <span id="span_no_win_or_place_bookmaker_profit_${row._id}" class="select_profit_explanation_loss"></span> on ${row.bookmaker}. 
                        However, this means you will win both of your lay bets.
                        You will gain <span id="span_no_win_or_place_lay_win_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.win_exchange} due to the win lay bet. 
                        You will also gain <span id="span_no_win_or_place_lay_place_profit_${row._id}" class="select_profit_explanation_profit"></span> on ${row.place_exchange} due to the place lay bet. 
                        This means that overall you will <span id="gain_or_lose_text_no_win_or_place_${row._id}"></span>
                        <span id="span_overall_profit_no_win_or_place_${row._id}"></span> if ${horse_doesnt_win_or_place_span}.
                    </span>
                    


                </div>
            </div>
        `;

    }


    if (!data_object.incomplete_data) {


        add_text_spans(state, div, row, data_object, is_create);
        
    }


}

function add_in_explanation_text_dutching(state, div, row, data_object, is_create) {

    let three_outcomes = row.outcomes >= 3;

    if (is_create) {

        let outcome1_span = `<span class="span_outcome1_info${row._id}"></span>`;

        let outcome2_span = `<span class="span_outcome2_info${row._id}"></span>`;

        let outcome3_span = `<span class="span_outcome3_info${row._id}"></span>`;

        div.innerHTML += `
            <div id="explanation_text_div_item_${row._id}" class="select_div_item select_bet_explanation_text_item">
                <div class="explanation_text_div">


                    <!-- FIRST OUTCOME -->
                    <span class="explanation_text_div_text">
                        • If ${outcome1_span}, you will profit <span id="outcome1_w_outcome1_profit_${row._id}" class="select_profit_explanation_profit"></span>
                        on ${row.first_bookmaker}.
                        This also means you will lose <span id="outcome1_w_outcome2_profit_${row._id}" class="select_profit_explanation_loss"></span>
                        on ${row.second_bookmaker}.
                        ${three_outcomes ? `
                            You will also lose <span id="outcome1_w_outcome3_profit_${row._id}" class="select_profit_explanation_loss"></span>
                            on ${row.third_bookmaker}.
                        ` : ''}
                        Overall you will <span id="gain_or_lose_text_outcome1_${row._id}"></span>
                        <span id="span_overall_profit_outcome1_${row._id}"></span> if ${outcome1_span}.
                    </span>


                    <!-- SECOND OUTCOME -->
                    <span class="explanation_text_div_text">
                        • If ${outcome2_span}, you will profit <span id="outcome2_w_outcome2_profit_${row._id}" class="select_profit_explanation_profit"></span>
                        on ${row.second_bookmaker}.
                        This also means you will lose <span id="outcome2_w_outcome1_profit_${row._id}" class="select_profit_explanation_loss"></span>
                        on ${row.first_bookmaker}.
                        ${three_outcomes ? `
                            You will also lose <span id="outcome2_w_outcome3_profit_${row._id}" class="select_profit_explanation_loss"></span>
                            on ${row.third_bookmaker}.
                        ` : ''}
                        Overall you will <span id="gain_or_lose_text_outcome2_${row._id}"></span>
                        <span id="span_overall_profit_outcome2_${row._id}"></span> if ${outcome2_span}.
                    </span>
                


                    <!-- THIRD OUTCOME -->
                    ${three_outcomes ? `

                        <span class="explanation_text_div_text">
                            • If ${outcome3_span}, you will profit <span id="outcome3_w_outcome3_profit_${row._id}" class="select_profit_explanation_profit"></span>
                            on ${row.third_bookmaker}.
                            This also means you will lose <span id="outcome3_w_outcome1_profit_${row._id}" class="select_profit_explanation_loss"></span>
                            on ${row.first_bookmaker}.
                            You will also lose <span id="outcome3_w_outcome2_profit_${row._id}" class="select_profit_explanation_loss"></span>
                            on ${row.second_bookmaker}.
                            Overall you will <span id="gain_or_lose_text_outcome3_${row._id}"></span>
                            <span id="span_overall_profit_outcome3_${row._id}"></span> if ${outcome3_span}.
                        </span>
                    
                    ` : ''}
                    
                    

                </div>
            </div>
        `;
            

        
        

    }


    if (!data_object.incomplete_data) {

        add_text_spans(state, div, row, data_object, is_create);

    }

        

}

function add_text_spans(state, div, row, data_object, is_create) {

    if (state.normal_list) {
        add_text_spans_standard(state, div, row, data_object, is_create);
    }

    if (state.horse_list) {
        add_text_spans_ew_and_ep(state, div, row, data_object, is_create);
    }

    if (state.dutching_list) {
        add_text_spans_dutching(state, div, row, data_object, is_create, row.outcomes == 3);
    }

}







function add_text_spans_standard(state, div, row, data_object, is_create) {

    add_in_first_outcome_text(state, div, row, data_object, is_create);

    if (state.truncated) {
        return;
    }

    add_in_second_outcome_text(state, div, row, data_object, is_create);

    if (state.oddsmatcher_type == '2up') {
        add_in_twoup_outcome_text(state, div, row, data_object, is_create);
    }

}


function add_in_first_outcome_text(state,div, row, data_object, is_create) {

    let outcome_text = row.outcome + ' win';

    if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'bog' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {
        outcome_text = process_standard_outcome_text(row, data_object, true);
    } 


    div.querySelectorAll(`.span_outcome_info_${row._id}`).forEach(span => {
        span.textContent = outcome_text;
    });

    div.querySelector(`#span_back_win_profit_${row._id}`).textContent = '£' + data_object.bookmaker_profit_if_back_win;

    div.querySelector(`#span_lay_loss_profit_${row._id}`).textContent = '£' + data_object.exchange_profit_if_back_win.replace('-', '');




    // THIS IS CUTOFF POINT FOR ...MORE MOBILE
    if (!state.is_desktop && state.truncated) {
        return;
    }





    div.querySelector(`#gain_or_lose_text_back_win_${row._id}`).textContent = data_object.total_profit_if_back_win.includes('-') ? 'lose' : 'gain';



    let span_overall_profit_back_win = div.querySelector(`#span_overall_profit_back_win_${row._id}`);

    set_class_and_profit_text_for_span(span_overall_profit_back_win, data_object.total_profit_if_back_win, true);


}

function add_in_second_outcome_text(state, div, row, data_object, is_create) {

    let other_outcome_text = row.outcome + ` don't win`;

    if (state.oddsmatcher_type == '2up') {
        other_outcome_text = row.outcome + ` don't win and don't go 2 goals up at any point in the game`;
    }

    if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'bog' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {
        other_outcome_text = process_standard_outcome_text(row, data_object, false);
    } 

    let class_for_total_profit_lay_win = 'select_profit_explanation_profit';
    let lay_win_value_negative = false;
    if (data_object.total_profit_if_lay_win.includes('-')) {
        lay_win_value_negative = true;
        data_object.total_profit_if_lay_win = data_object.total_profit_if_lay_win.replace('-', '-£');
        class_for_total_profit_lay_win = 'select_profit_explanation_loss';
    } else {
        data_object.total_profit_if_lay_win = '£' + data_object.total_profit_if_lay_win;
    }

    div.querySelectorAll(`.span_other_outcome_info_${row._id}`).forEach(span => {
        span.textContent = other_outcome_text;
    });

    div.querySelector(`#span_lay_win_back_profit_${row._id}`).textContent = '£' + data_object.bookmaker_profit_if_lay_win.replace('-', '');

    div.querySelector(`#span_lay_win_lay_profit_${row._id}`).textContent = '£' + data_object.exchange_profit_if_lay_win;

    div.querySelector(`#gain_or_lose_text_lay_win_${row._id}`).textContent = lay_win_value_negative ? 'lose' : 'gain';

    let span_overall_profit_lay_win = div.querySelector(`#span_overall_profit_lay_win_${row._id}`);
    span_overall_profit_lay_win.textContent = data_object.total_profit_if_lay_win;
    span_overall_profit_lay_win.classList.remove(...span_overall_profit_lay_win.classList);
    span_overall_profit_lay_win.classList.add(class_for_total_profit_lay_win);



}

function process_standard_outcome_text(row, data_object, is_first) {

    let outcome_text = row.outcome + ' win';
    if (!is_first) {
        outcome_text = row.outcome + ` don't win`;
    }
   
    if (row.outcome === 'Draw' && is_first) {
        outcome_text = 'a draw occurs';
    } else if (row.outcome === 'Draw' && !is_first) {
        outcome_text = `a draw doesn't occur`;
    }

    // MATCH ODDS IS THE DEFAULT

    if (row.market_type == 'BTTS') {
        if ((is_first && row.outcome == 'BTTS') || (!is_first && row.outcome != 'BTTS')) {
            outcome_text = 'both teams score';
        } else {
            outcome_text = `both teams don't score`;
        }
    } else if (row.market_type == 'Over/Under') {
        if (is_first) {
            outcome_text = `there are ${row.outcome}`;
        } else {
            outcome_text = `there aren't ${row.outcome}`;
        }
    } else if (row.market_type == 'Winner' || row.market_type == 'BOG') { // SO THIS IS HORSE RACING
        if (is_first) {
            outcome_text = `${row.outcome} wins the race`;
        } else {
            outcome_text = `${row.outcome} doesn't win the race`;
        }
    }


    return outcome_text;


}

function add_in_twoup_outcome_text(state, div, row, data_object, is_create) {

    let twoup_outcome_text = row.outcome + ` go 2 goals up in the game but don't end up winning`;

    let class_for_total_profit_twoup = 'select_profit_explanation_profit';
    let twoup_value_negative = false;
    if (data_object.twouptotal.includes('-')) {
        twoup_value_negative = true;
        data_object.twouptotal = data_object.twouptotal.replace('-', '-£');
        class_for_total_profit_twoup = 'select_profit_explanation_loss';
    } else {
        data_object.twouptotal = '£' + data_object.twouptotal;
    }

    div.querySelectorAll(`.span_twoup_outcome_info_${row._id}`).forEach(span => {
        span.textContent = twoup_outcome_text;
    });

    div.querySelector(`#span_twoup_back_profit_${row._id}`).textContent = '£' + data_object.twoupbookmaker.replace('-', '');

    div.querySelector(`#span_twoup_lay_profit_${row._id}`).textContent = '£' + data_object.twoupexchange;

    div.querySelector(`#gain_or_lose_text_twoup_${row._id}`).textContent = twoup_value_negative ? 'lose' : 'gain';

    let span_overall_profit_twoup = div.querySelector(`#span_overall_profit_twoup_${row._id}`);
    span_overall_profit_twoup.textContent = data_object.twouptotal;
    span_overall_profit_twoup.classList.remove(...span_overall_profit_twoup.classList);
    span_overall_profit_twoup.classList.add(class_for_total_profit_twoup);


}






function add_text_spans_ew_and_ep(state, div, row, data_object, is_create) {

    add_in_first_outcome_text_ew_and_ep(state, div, row, data_object, is_create);

    if (state.truncated) {
        return;
    }

    add_in_second_outcome_text_ew_and_ep(state, div, row, data_object, is_create);


    if (state.oddsmatcher_type == 'extra_place') {
        add_in_extra_place_outcome_text(state, div, row, data_object, is_create);
    }


    add_in_third_outcome_text_ew_and_ep(state, div, row, data_object, is_create)

}

function add_in_first_outcome_text_ew_and_ep(state, div, row, data_object, is_create) {


    let first_outcome_text = `${row.horse} wins the race`;
    // select all spans with class .span_win_outcome_info_${row._id} and set the text to the first_outcome_text
    div.querySelectorAll(`.span_win_outcome_info_${row._id}`).forEach(span => {
        span.textContent = first_outcome_text;
    });


    // select the element with id span_back_win_profit_${row._id} 
    let span_back_win_profit = div.querySelector(`#span_back_win_profit_${row._id}`);
    span_back_win_profit.textContent = '£' + data_object.total_bookmaker_gain_if_win_and_place;


    // select the element with id span_back_win_profit_breakdown${row._id} 
    let span_back_win_profit_breakdown = div.querySelector(`#span_back_win_profit_breakdown_${row._id}`);
    span_back_win_profit_breakdown.textContent = `(£${data_object.bookmaker_profit_win_wins} + £${data_object.bookmaker_profit_place_place})`


    // select the element with id span_win_lay_loss_profit_${row._id}
    let span_win_lay_loss_profit = div.querySelector(`#span_win_lay_loss_profit_${row._id}`);
    span_win_lay_loss_profit.textContent = '£' + data_object.exchange_profit_win_wins.replace('-', '');





    // THIS IS CUTOFF POINT FOR ...MORE MOBILE
    if (!state.is_desktop && state.truncated) {
        return;
    }







    // select element with id span_place_lay_loss_profit_${row._id}
    let span_place_lay_loss_profit = div.querySelector(`#span_place_lay_loss_profit_${row._id}`);
    span_place_lay_loss_profit.textContent = ('£' + data_object.exchange_profit_place_place).replace('-', '');


    // select this row span_overall_profit_back_win_${row._id}
    let span_overall_profit_back_win = div.querySelector(`#span_overall_profit_back_win_${row._id}`);
    set_class_and_profit_text_for_span(span_overall_profit_back_win, data_object.total_profit_if_wins, true);

    // select gain_or_lose_text_back_win_${row._id}
    let gain_or_lose_text_back_win = div.querySelector(`#gain_or_lose_text_back_win_${row._id}`);
    gain_or_lose_text_back_win.textContent = data_object.total_profit_if_wins.toString().includes('-') ? 'lose' : 'gain';


}

function add_in_second_outcome_text_ew_and_ep(state, div, row, data_object, is_create) {

    let second_outcome_text = `${row.horse} doesn't win the race but finishes in the top ${row.exchange_places}`;
    // select all spans with class .span_place_outcome_info_${row._id} and set the text to the second_outcome_text
    div.querySelectorAll(`.span_place_outcome_info_${row._id}`).forEach(span => {
        span.textContent = second_outcome_text;
    });

    // select this element span_each_way_profit_horse_places_${row._id}
    let span_each_way_profit_horse_places = div.querySelector(`#span_each_way_profit_horse_places_${row._id}`);
    set_class_and_profit_text_for_span(span_each_way_profit_horse_places, data_object.total_bookmaker_gain_if_not_win_but_places, false);
    
    // select this element horse_places_gain_or_lose_text_${row._id}
    let horse_places_gain_or_lose_text = div.querySelector(`#horse_places_gain_or_lose_text_${row._id}`);
    horse_places_gain_or_lose_text.textContent = data_object.total_bookmaker_gain_if_not_win_but_places.toString().includes('-') ? 'lose' : 'gain';

    // select this span_place_only_win_profit_breakdown_${row._id}
    let span_place_only_win_profit_breakdown = div.querySelector(`#span_place_only_win_profit_breakdown_${row._id}`);
    span_place_only_win_profit_breakdown.textContent = `(£${data_object.bookmaker_profit_place_place} - £${data_object.each_way_stake})`;

    // get this element span_lay_win_lay_profit_${row._id}
    let span_lay_win_lay_profit = div.querySelector(`#span_lay_win_lay_profit_${row._id}`);
    set_class_and_profit_text_for_span(span_lay_win_lay_profit, data_object.exchange_profit_win_place, false);

    // get this span_lay_place_loss_profit_${row._id}
    let span_lay_place_loss_profit = div.querySelector(`#span_lay_place_loss_profit_${row._id}`);
    set_class_and_profit_text_for_span(span_lay_place_loss_profit, data_object.exchange_profit_place_place, false);


    // select this element span_overall_profit_lay_place_${row._id}
    let span_overall_profit_lay_place = div.querySelector(`#span_overall_profit_lay_place_${row._id}`);
    set_class_and_profit_text_for_span(span_overall_profit_lay_place, data_object.total_profit_if_place, true);


    // get this element gain_or_lose_text_lay_place_${row._id}
    let gain_or_lose_text_lay_place = div.querySelector(`#gain_or_lose_text_lay_place_${row._id}`);
    gain_or_lose_text_lay_place.textContent = data_object.total_profit_if_place.toString().includes('-') ? 'lose' : 'gain';

}

function add_in_extra_place_outcome_text(state, div, row, data_object, is_create) {

    let bookmaker_place;
    if (row.bookmaker_places == 1) {
        bookmaker_place = '1st';
    } else if (row.bookmaker_places == 2) {
        bookmaker_place = '2nd';
    } else if (row.bookmaker_places == 3) {
        bookmaker_place = '3rd';
    } else {
        bookmaker_place = row.bookmaker_places + 'th';
    }

    let extra_place_outcome_text = `${row.horse} finishes exactly ${bookmaker_place}`;
    // select all spans with class .span_place_outcome_info_${row._id} and set the text to the second_outcome_text
    div.querySelectorAll(`.span_extra_places_outcome_info_${row._id}`).forEach(span => {
        span.textContent = extra_place_outcome_text;
    });


    // select this element span_each_way_profit_extra_place_${row._id}
    let span_each_way_profit_extra_place = div.querySelector(`#span_each_way_profit_extra_place_${row._id}`);
    set_class_and_profit_text_for_span(span_each_way_profit_extra_place, data_object.bookmaker_profit_if_extra_place, false);


    // select this element extra_place_gain_or_lose_text_${row._id}
    let extra_place_gain_or_lose_text = div.querySelector(`#extra_place_gain_or_lose_text_${row._id}`);
    extra_place_gain_or_lose_text.textContent = data_object.bookmaker_profit_if_extra_place.toString().includes('-') ? 'lose' : 'gain';



    // select this element span_extra_place_win_profit_breakdown_${row._id}
    let span_extra_place_win_profit_breakdown = div.querySelector(`#span_extra_place_win_profit_breakdown_${row._id}`);
    span_extra_place_win_profit_breakdown.textContent = `(£${data_object.bookmaker_profit_place_place} - £${data_object.each_way_stake})`;


    // select this element span_extra_place_lay_win_profit_${row._id}
    let span_extra_place_lay_win_profit = div.querySelector(`#span_extra_place_lay_win_profit_${row._id}`);
    set_class_and_profit_text_for_span(span_extra_place_lay_win_profit, data_object.exchange_profit_win_none, false);


    // select this element span_extra_place_lay_place_profit_${row._id}
    let span_extra_place_lay_place_profit = div.querySelector(`#span_extra_place_lay_place_profit_${row._id}`);
    set_class_and_profit_text_for_span(span_extra_place_lay_place_profit, data_object.exchange_profit_place_none, false);


    // select this element span_overall_profit_no_win_or_place_
    let span_overall_profit_extra_place = div.querySelector(`#span_overall_profit_extra_place_${row._id}`);
    set_class_and_profit_text_for_span(span_overall_profit_extra_place, data_object.total_profit_if_extra_place, true);





}

function add_in_third_outcome_text_ew_and_ep(state, div, row, data_object, is_create) {

    let third_outcome_text = `${row.horse} doesn't win the race and doesn't finish in the top ${row.bookmaker_places}`;
    // select all spans with class .span_no_win_or_place_outcome_info_${row._id} and set the text to the third_outcome_text
    div.querySelectorAll(`.span_no_win_or_place_outcome_info_${row._id}`).forEach(span => {
        span.textContent = third_outcome_text;
    });


    // select this element span_no_win_or_place_bookmaker_profit_${row._id}
    let span_no_win_or_place_bookmaker_profit = div.querySelector(`#span_no_win_or_place_bookmaker_profit_${row._id}`);
    span_no_win_or_place_bookmaker_profit.textContent = '£' + data_object.total_bookmaker_loss_if_not_win_or_place.replace('-', '');


    // select this element span_no_win_or_place_lay_win_profit_${row._id}
    let span_no_win_or_place_lay_win_profit = div.querySelector(`#span_no_win_or_place_lay_win_profit_${row._id}`);
    set_class_and_profit_text_for_span(span_no_win_or_place_lay_win_profit, data_object.exchange_profit_win_none, false);


    // select this element span_no_win_or_place_lay_place_profit_${row._id}
    let span_no_win_or_place_lay_place_profit = div.querySelector(`#span_no_win_or_place_lay_place_profit_${row._id}`);
    set_class_and_profit_text_for_span(span_no_win_or_place_lay_place_profit, data_object.exchange_profit_place_none, false);


    // select this element span_overall_profit_no_win_or_place_${row._id}
    let span_overall_profit_no_win_or_place = div.querySelector(`#span_overall_profit_no_win_or_place_${row._id}`);
    set_class_and_profit_text_for_span(span_overall_profit_no_win_or_place, data_object.total_profit_if_none, true);


    // select this element gain_or_lose_text_no_win_or_place_${row._id}
    let gain_or_lose_text_no_win_or_place = div.querySelector(`#gain_or_lose_text_no_win_or_place_${row._id}`);
    gain_or_lose_text_no_win_or_place.textContent = data_object.total_profit_if_none.toString().includes('-') ? 'lose' : 'gain';

}


function set_class_and_profit_text_for_span(span, profit_text, add_minus_sign) {

    if (add_minus_sign) {
        span.textContent = ('£' + profit_text.toString()).replace('£-', '-£');
    } else {
        span.textContent = '£' + profit_text.toString().replace('-', '');
    }

    span.classList.remove(...span.classList);
    let class_for_total_profit_back_win = 'select_profit_explanation_profit';
    if (profit_text.toString().includes('-')) {
        class_for_total_profit_back_win = 'select_profit_explanation_loss';
    }
    span.classList.add(class_for_total_profit_back_win);

}









function add_text_spans_dutching(state, div, row, data_object, is_create, three_outcomes) {

    add_in_first_outcome_text_dutching(state, div, row, data_object, is_create, three_outcomes);

    if (state.truncated) {
        return;
    }


    add_in_second_outcome_text_dutching(state, div, row, data_object, is_create, three_outcomes);


    if (three_outcomes) {
        add_in_third_outcome_text_dutching(state, div, row, data_object, is_create, three_outcomes)
    }

}

function add_in_first_outcome_text_dutching(state, div, row, data_object, is_create, three_outcomes) {

    let outcome_text = process_outcome_text_dutching(row, data_object, row.first_outcome);
    div.querySelectorAll(`.span_outcome1_info${row._id}`).forEach(span => {
        span.textContent = outcome_text;
    });


    div.querySelector(`#outcome1_w_outcome1_profit_${row._id}`).textContent = '£' + data_object.outcome1_w_bookmaker_profit;

    div.querySelector(`#outcome1_w_outcome2_profit_${row._id}`).textContent = '£' + data_object.outcome2_stake;

    if (three_outcomes) {
        div.querySelector(`#outcome1_w_outcome3_profit_${row._id}`).textContent = '£' + data_object.outcome3_stake;
    }







    // THIS IS CUTOFF POINT FOR ...MORE MOBILE
    if (!state.is_desktop && state.truncated) {
        return;
    }









    let span_overall_profit_outcome1 = div.querySelector(`#span_overall_profit_outcome1_${row._id}`);
    set_class_and_profit_text_for_span(span_overall_profit_outcome1, data_object.total_profit_if_outcome1, true);

    let gain_or_lose_text_outcome1 = div.querySelector(`#gain_or_lose_text_outcome1_${row._id}`);
    gain_or_lose_text_outcome1.textContent = data_object.total_profit_if_outcome1.toString().includes('-') ? 'lose' : 'gain';


}

function add_in_second_outcome_text_dutching(state, div, row, data_object, is_create, three_outcomes) {

    let outcome_text = process_outcome_text_dutching(row, data_object, row.second_outcome);
    div.querySelectorAll(`.span_outcome2_info${row._id}`).forEach(span => {
        span.textContent = outcome_text;
    });

    if (!data_object.isfree) {
        div.querySelector(`#outcome2_w_outcome1_profit_${row._id}`).textContent = '£' + data_object.outcome1_stake;
    } else {
        div.querySelector(`#outcome2_w_outcome1_profit_${row._id}`).textContent = '£0.00';
    }

    
    div.querySelector(`#outcome2_w_outcome2_profit_${row._id}`).textContent = '£' + data_object.outcome2_w_bookmaker_profit;

    if (three_outcomes) {
        div.querySelector(`#outcome2_w_outcome3_profit_${row._id}`).textContent = '£' + data_object.outcome3_stake;
    }


    let span_overall_profit_outcome1 = div.querySelector(`#span_overall_profit_outcome2_${row._id}`);
    set_class_and_profit_text_for_span(span_overall_profit_outcome1, data_object.total_profit_if_outcome2, true);

    let gain_or_lose_text_outcome1 = div.querySelector(`#gain_or_lose_text_outcome2_${row._id}`);
    gain_or_lose_text_outcome1.textContent = data_object.total_profit_if_outcome2.toString().includes('-') ? 'lose' : 'gain';


}

function add_in_third_outcome_text_dutching(state, div, row, data_object, is_create, three_outcomes) {

    let outcome_text = process_outcome_text_dutching(row, data_object, row.third_outcome);
    div.querySelectorAll(`.span_outcome3_info${row._id}`).forEach(span => {
        span.textContent = outcome_text;
    });


    if (!data_object.isfree) {
        div.querySelector(`#outcome3_w_outcome1_profit_${row._id}`).textContent = '£' + data_object.outcome1_stake;
    } else {
        div.querySelector(`#outcome3_w_outcome1_profit_${row._id}`).textContent = '£0.00';
    }

    div.querySelector(`#outcome3_w_outcome2_profit_${row._id}`).textContent = '£' + data_object.outcome2_stake;

    if (three_outcomes) {
        div.querySelector(`#outcome3_w_outcome3_profit_${row._id}`).textContent = '£' + data_object.outcome3_w_bookmaker_profit;
    }


    let span_overall_profit_outcome1 = div.querySelector(`#span_overall_profit_outcome3_${row._id}`);
    set_class_and_profit_text_for_span(span_overall_profit_outcome1, data_object.total_profit_if_outcome3, true);

    let gain_or_lose_text_outcome1 = div.querySelector(`#gain_or_lose_text_outcome3_${row._id}`);
    gain_or_lose_text_outcome1.textContent = data_object.total_profit_if_outcome3.toString().includes('-') ? 'lose' : 'gain';


}


function process_outcome_text_dutching(row, data_object, outcome) {

    let outcome_text = outcome + ' win';
   
    if (outcome === 'Draw') {
        outcome_text = 'a draw occurs';
    }



    if (row.market_type == 'BTTS') {
        if (outcome == 'BTTS') {
            outcome_text = 'both teams score';
        } else {
            outcome_text = `both teams don't score`;
        }
    } else if (row.market_type == 'Over/Under') {
        outcome_text = `there are ${outcome}`;
    } 


    return outcome_text;


}

















function add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create) {

    if (is_create) {

        div.innerHTML += `

            <div class="select_div_item select_bet_div_profit_and_log" id="select_bet_div_profit_and_log_${row._id}">

                <div class="outer_bottom_select_bet_div outer_bottom_select_bet_div_log_and_description_and_profit">
                    
                
                    <div class="select_bet_div_profit_and_log_left" id="left_div_profit_and_log_${row._id}">

                    </div>


                    <div class="select_bet_div_profit_and_log_right" id="right_div_profit_and_log_${row._id}">
                        <div class="filter-item filter-item-description">
                            <label class="filter-label">Description</label>
                            <textarea id="bet-description-input_${row._id}" class="bet-description-input" placeholder="Add bet description..."></textarea>
                        </div>
                        <div class="log-bet-button-div">
                            <button id="log-bet-button_${row._id}" class="log-bet-button">Log Bet</button>
                        </div>
                    </div>




                </div>

            </div>        
        `;



        if (state.oddsmatcher_type == '2up' || state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {
            div.querySelector('#left_div_profit_and_log_' + row._id).innerHTML += `
                <div class="profit_display_profit_and_log_div">

                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_rating">
                            <span class="profit_and_log__item_title profit_and_log__item_title_rating">
                                Bet Rating
                            </span>
                            <span class="profit_and_log__item_value profit_and_log__item_value_rating">
                                
                            </span>
                    </div>


                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_qualifying_loss">
                        <span class="profit_and_log__item_title profit_and_log__item_title_qualifying_loss">
                            Qualifying Loss
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_qualifying_loss">
                            
                        </span>
                    </div>
                    

                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_potential_profit">
                        <span class="profit_and_log__item_title profit_and_log__item_title_potential_profit">
                            Potential Profit
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_potential_profit">
                            
                        </span>
                    </div>


                </div>

            `;
        }


        if (state.oddsmatcher_type == 'bog') {
            div.querySelector('#left_div_profit_and_log_' + row._id).innerHTML += `
                <div class="profit_display_profit_and_log_div">

                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_rating">
                            <span class="profit_and_log__item_title profit_and_log__item_title_rating">
                                Bet Rating
                            </span>
                            <span class="profit_and_log__item_value profit_and_log__item_value_rating">
                                
                            </span>
                    </div>


                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_potential_profit">
                        <span class="profit_and_log__item_title profit_and_log__item_title_potential_profit">
                            Bet ROI
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_potential_profit">
                            
                        </span>
                    </div>


                    <!-- QUALIFYING LOSS IS THE PROFIT - have put it after roi -->
                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_qualifying_loss">
                        <span class="profit_and_log__item_title profit_and_log__item_title_qualifying_loss">
                            Bet Profit
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_qualifying_loss">
                            
                        </span>
                    </div>

            `;
        } else if (state.oddsmatcher_type == 'each_way' || state.oddsmatcher_type == 'dutching') {

            div.querySelector('#left_div_profit_and_log_' + row._id).innerHTML += `
                <div class="profit_display_profit_and_log_div">

                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_rating">
                            <span class="profit_and_log__item_title profit_and_log__item_title_rating">
                                Bet Rating
                            </span>
                            <span class="profit_and_log__item_value profit_and_log__item_value_rating">
                                
                            </span>
                    </div>


                    <!-- QUALIFYING LOSS IS THE PROFIT - have put it after roi -->
                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_qualifying_loss">
                        <span class="profit_and_log__item_title profit_and_log__item_title_qualifying_loss">
                            Bet Profit
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_qualifying_loss">
                            
                        </span>
                    </div>

            `;

        } else if (state.oddsmatcher_type == 'extra_place') {

            div.querySelector('#left_div_profit_and_log_' + row._id).innerHTML += `
                <div class="profit_display_profit_and_log_div">

                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_rating">
                            <span class="profit_and_log__item_title profit_and_log__item_title_rating">
                                Implied Odds
                            </span>
                            <span class="profit_and_log__item_value profit_and_log__item_value_rating">
                                
                            </span>
                    </div>


                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_qualifying_loss">
                        <span class="profit_and_log__item_title profit_and_log__item_title_qualifying_loss">
                            Qualifying Loss
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_qualifying_loss">
                            
                        </span>
                    </div>
                    

                    <div class="profit_display_profit_and_log_div_item profit_display_profit_and_log_div_item_potential_profit">
                        <span class="profit_and_log__item_title profit_and_log__item_title_potential_profit">
                            Potential Profit
                        </span>

                        <span class="profit_and_log__item_value profit_and_log__item_value_potential_profit">
                            
                        </span>
                    </div>


                </div>

            `;

        }


    }



    // HIDE OR SHOW IF VALUES
    let selector = '#select_bet_div_profit_and_log_' + row._id;
    if (data_object.incomplete_data) {
        div.querySelector(selector).classList.add('hidden_row_above_columns');
        return;
    } else {
        div.querySelector(selector).classList.remove('hidden_row_above_columns');
    }




    // ADD IN THE DESCRIPTION

    let description = '';
    if (state.oddsmatcher_type == '2up') {
        description = row.outcome + ' to go 2 goals up in ' + row.fixture + ', back bet placed on ' + row.bookmaker + ' @ ' + data_object.back_odds + ', lay bet placed on ' + row.exchange + ' @ ' + data_object.lay_odds + ".";        
    } else if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'bog' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {
        description = get_description_for_standard_bet(state, div, row, data_object);
    } else if (state.oddsmatcher_type == 'each_way' || state.oddsmatcher_type == 'extra_place') {
        description = get_description_for_each_way_or_ep_bet(div, row, data_object, state.oddsmatcher_type == 'extra_place');
    } else if (state.oddsmatcher_type == 'dutching') {
        description = get_description_for_dutching_bet(div, row, data_object);
    }
    div.querySelector(`#bet-description-input_${row._id}`).value = description;





    // THEN CODE INJECTING IN THE PROFIT DATA TO THE LEFT DIV

    if (state.oddsmatcher_type == 'extra_place') {
        div.querySelector('.profit_and_log__item_value_rating').textContent = data_object.implied_odds;
    } else {
        div.querySelector('.profit_and_log__item_value_rating').textContent = data_object.rating;
    }

    let qualifying_loss_element = div.querySelector('.profit_and_log__item_value_qualifying_loss')
    qualifying_loss_element.textContent = ('£' + data_object.qualifying_loss).replace('£-', '-£');
    set_class_for_profit_info_item(qualifying_loss_element, data_object.qualifying_loss);
    

    if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == '2up' || state.oddsmatcher_type == 'extra_place' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {
        let potential_profit_element = div.querySelector('.profit_and_log__item_value_potential_profit')
        potential_profit_element.textContent = ('£' + data_object.potential_profit).replace('£-', '-£');
        set_class_for_profit_info_item(potential_profit_element, data_object.potential_profit);
    } 

    if (state.oddsmatcher_type == 'bog') {
        let potential_profit_element = div.querySelector('.profit_and_log__item_value_potential_profit')
        potential_profit_element.textContent = data_object.ROI + '%';
    } 




}

export function set_class_for_profit_info_item(element, value) {
    if (value === '0.00') {
        element.classList.remove('profit_and_log__item_value_negative');
        element.classList.remove('profit_and_log__item_value_positive');
    } else if (value.includes('-')) {
        element.classList.add('profit_and_log__item_value_negative');
        element.classList.remove('profit_and_log__item_value_positive');
    } else {
        element.classList.add('profit_and_log__item_value_positive');
        element.classList.remove('profit_and_log__item_value_negative');
    }
}


function get_description_for_standard_bet(state, div, row, data_object) {

    let description = '';

    let fixture_text = row.fixture;
    let outcome_text = row.outcome;

    let market_type_specific_text = 'for';
    if (row.market_type == 'Winner' || row.market_type == 'BOG') {
        market_type_specific_text = 'at the';
        outcome_text = row.outcome + ' to win';
    }

    
    if (row.outcome == 'Draw') {
        outcome_text =  'a draw';
    } else if (row.market_type == 'Match Odds') {
        fixture_text = fixture_text.replace(row.outcome + ' v ', '');
        market_type_specific_text = 'against';

    }

    if (row.market_type == 'BOG') {
        description += `BOG Bet `;
    } 
    
    
    if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'standard_free') {
        if (data_object.isfree) {
            description += `Free Bet `;
        } else {
            description += `Betting `;
        }
    } else if (state.oddsmatcher_type == 'qualifying_bet_tutorial') {
        description += `Qualifying Bet `;
    } else if (state.oddsmatcher_type == 'free_bet_tutorial') {
        description += `Free Bet `;
    }

    description += `on ${outcome_text} ${market_type_specific_text} ${fixture_text}.`;

    let back_bet_text = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Back').textContent.replace(/\s+/g, ' ').trim();
    description += ` ${back_bet_text.replace('Back', 'Backing')}.`;

    let lay_bet_text = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Lay').textContent.replace(/\s+/g, ' ').trim();
    description += ` ${lay_bet_text.replace('Lay', 'Laying')}.`;


    if (row.market_type == 'BOG') {
        description += ` If the back odds rise above ${data_object.lay_odds} before the race begins at ${row.fixture.split(' ')[0]} then we should make a profit.`;
    }


    return description;

}

function get_description_for_each_way_or_ep_bet(div, row, data_object, is_extra_place) {

    let description = '';

    if (is_extra_place) {
        description += `Extra place bet on '${row.horse}' at the ${row.fixture}. The bookmaker is paying for ${row.bookmaker_places} places while the exchange is paying for ${row.exchange_places} places.`;
    } else {
        description += `Each way bet on '${row.horse}' at the ${row.fixture}. The bookmaker is paying for ${row.bookmaker_places} places.`;
    }

    let back_bet_text = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Each-Way').textContent.replace(/\s+/g, ' ').trim();
    description += ` ${back_bet_text.replace('Back', 'Backing').replace(`on '${row.horse}'`, `E/W on '${row.horse}'`)}.`;

    let win_lay_bet_text = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Win-Lay').textContent.replace(/\s+/g, ' ').trim();
    description += ` ${win_lay_bet_text.replace('Lay', 'Laying')}.`;

    let place_lay_bet_text = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Place-Lay').textContent.replace(/\s+/g, ' ').trim();
    description += ` ${place_lay_bet_text.replace('Lay', 'Laying')}.`;

    return description;

}


function get_description_for_dutching_bet(div, row, data_object, is_extra_place) {

    let description = '';

    description += `Dutching the ${row.fixture} game.`;

    let first_bet = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'First').textContent.replace(/\s+/g, ' ').trim()
    description += ` ${first_bet.replace('Back', 'Backing')}`;
    description += ` on ${row.first_bookmaker}.`

    let second_bet = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Second').textContent.replace(/\s+/g, ' ').trim();
    description += ` ${second_bet.replace('Back', 'Backing')}`;
    description += ` on ${row.second_bookmaker}.`

    if (row.outcomes >= 3) {
        let third_bet = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Third').textContent.replace(/\s+/g, ' ').trim();
        description += ` ${third_bet.replace('Back', 'Backing')}`;
        description += ` on ${row.third_bookmaker}.`
    }

    return description;

}
























function add_event_listeners_for_items_in_select_div(scope, state, div, row, data_object) {

    // Check if listeners have already been added to this div
    if (div.hasAttribute('data-listeners-added')) {
        // Update the data object reference for existing listeners
        div.setAttribute('data-current-data-object', JSON.stringify(data_object));
        return; // Already has listeners, skip
    }

    // Mark that listeners have been added
    div.setAttribute('data-listeners-added', 'true');
    div.setAttribute('data-current-data-object', JSON.stringify(data_object));

    // add event listener for on click anywhere and if target class is select button then call function with the target
    div.addEventListener('click', (event) => {

        if (event.target.classList.contains('copy-on-click')) {
            copy_text_on_click_stake(event);
        }

        if (event.target.classList.contains('bet-type-btn')) {

            change_lay_type_control_container(event);

            calculate_and_display_bet_data(scope, state, div, row);

        }

        if (event.target.classList.contains('free_bet_mode_switch')) {
            calculate_and_display_bet_data(scope, state, div, row);
        }

        if (event.target.classList.contains('log-bet-button')) {
            // Get the latest data object from the div attribute
            const currentDataObject = JSON.parse(div.getAttribute('data-current-data-object'));
            log_bet(scope, state, div, row, currentDataObject);
        }

    });

    // also add a function to listen to all 'input' or 'change' events on all inputs in the div
    div.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (event) => {
            calculate_and_display_bet_data(scope, state, div, row);
        });
    });

}

export function copy_text_on_click_stake(event) {

    let element = event.target;
    const originalText = event.target.textContent;
    navigator.clipboard.writeText(originalText.replace('£', '').replace(' ', ''));
    event.target.classList.remove('copy-on-click');
    event.target.textContent = 'Copied!';
    setTimeout(() => {
        element.textContent = originalText;
        element.classList.add('copy-on-click');
    }, delay_for_copy_text);

}

export function change_lay_type_control_container(event) {

    // select the parent element
    const parentElement = event.target.closest('.lay_type_control_container');
    // selecg all bet-type-btn in parentElement
    const betTypeButtons = parentElement.querySelectorAll('.bet-type-btn');
    betTypeButtons.forEach(button => {
        button.classList.remove('active-lay-type');
    });
    // change the class of the button to active-lay-type
    event.target.classList.add('active-lay-type');
    
}

function get_date_from_date_and_time(date_and_time) {
    // convert from "20/08/24" to dd/mm/yyyy
    let date = date_and_time.split(' ')[0];
    let day = date.split('/')[0];
    let month = date.split('/')[1];
    let year = '20' + date.split('/')[2]; // Add '20' prefix to convert 2-digit year to 4-digit
    return day + '/' + month + '/' + year;
}

function log_bet(scope, state, div, row, data_object) {
    

    data_object.date_and_time = row.date_and_time;
    data_object.date = get_date_from_date_and_time(row.date_and_time);
    data_object.description = scope.querySelector(`#bet-description-input_${row._id}`).value;
    data_object.iscalc = true;
    data_object.complete = false;
    data_object.betId = row._id + '_' + Date.now(); // as they can log the same oddsmatcher bet multiple times
    //data_object.userId = state.user_id;    add in userId on wix
    data_object.oddsmatcher_type = state.oddsmatcher_type;
    data_object.event = row.fixture;
    data_object.actualprofit = '';
    data_object.qualifying_loss = data_object.qualifying_loss.replace('£', '');
    data_object.potential_profit = data_object.potential_profit.replace('£', '');
    data_object.item_row = row; 
    data_object.bet_outcome = row.outcome;
    data_object.ispayout = false;
    data_object.stakereturned = false;
    data_object.calculator = 'Standard';

    let platforms = [];


    if (state.oddsmatcher_type == '2up' || state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'bog' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {
        data_object.backstake = div.querySelector('#Back-stake-input_' + row._id).value;
        // help me make my platforms array in here
        platforms.push({
            'index': 1,
            'platform': row.bookmaker,
            'odds': div.querySelector('#Back-odds-input_' + row._id).value,
            'link': row.bookmaker_link,
            'commission': null
        })
        platforms.push({
            'index': 2,
            'platform': row.exchange,
            'odds': div.querySelector('#Lay-odds-input_' + row._id).value,
            'link': row.exchange_link,
            'commission': div.querySelector('#commission-input_' + row._id).value
        })
    }

    if (state.oddsmatcher_type == '2up') {
        data_object.bet_outcome = row.outcome + ' 2up';
        data_object.calculator = '2up';
    }


    if (state.oddsmatcher_type == 'each_way' || state.oddsmatcher_type == 'extra_place') {

        data_object.backstake = div.querySelector('#Each-Way-stake-input_' + row._id).value;

        row.bet_outcome = row.horse;
        platforms.push({
            'index': 1,
            'platform': row.bookmaker,
            'odds': div.querySelector('#Each-Way-odds-input_' + row._id).value,
            'link': row.bookmaker_link,
            'commission': null
        })
        platforms.push({
            'index': 2,
            'platform': row.win_exchange,
            'odds': div.querySelector('#Win-Lay-odds-input_' + row._id).value,
            'link': row.win_exchange_link,
            'commission': div.querySelector('#commission-input_' + row._id).value
        })
        platforms.push({
            'index': 3,
            'platform': row.place_exchange,
            'odds': div.querySelector('#Place-Lay-odds-input_' + row._id).value,
            'link': row.place_exchange_link,
            'commission': div.querySelector('#commission-input_place_' + row._id).value
        })
        data_object.calculator = 'Each Way';
    }

    if (state.oddsmatcher_type == 'extra_place') {
        data_object.calculator = 'Extra Place';
    }

    if (state.oddsmatcher_type == 'dutching') {
        data_object.bet_outcome = 'Dutching';
        data_object.calculator = 'Dutching';

        platforms.push({
            'index': 1,
            'platform': row.first_bookmaker,
            'odds': div.querySelector('#First-odds-input_' + row._id).value,
            'link': row.first_link,
            'commission': div.querySelector('#commission-input_first_' + row._id).value
        })
        platforms.push({
            'index': 2,
            'platform': row.second_bookmaker,
            'odds': div.querySelector('#Second-odds-input_' + row._id).value,
            'link': row.second_link,
            'commission': div.querySelector('#commission-input_second_' + row._id).value
        })
        if (row.outcomes >= 3) {
            platforms.push({
                'index': 3,
                'platform': row.third_bookmaker,
                'odds': div.querySelector('#Third-odds-input_' + row._id).value,
                'link': row.third_link,
                'commission': div.querySelector('#commission-input_third_' + row._id).value
            })
        }
    }


    // how do I remove a ._id from the data_object
    if (data_object.hasOwnProperty('_id')) {
        delete data_object._id;
    }



    data_object.platforms = platforms;


    console.log(data_object)
    const raise_event = new CustomEvent('logbet', {
        detail: { bet_object: data_object },  
        bubbles: true,       
        composed: true        
    });

    scope.dispatchEvent(raise_event); 

}







function calculate_and_display_bet_data(scope, state, div, row) {

    let data_object = {}

    if (state.oddsmatcher_type == '2up') {
        data_object.back_stake = parseFloat(scope.querySelector(`#Back-stake-input_${row._id}`).value);
        data_object.back_odds = parseFloat(scope.querySelector(`#Back-odds-input_${row._id}`).value);
        data_object.lay_odds = parseFloat(scope.querySelector(`#Lay-odds-input_${row._id}`).value);
        data_object.lay_commission = parseFloat(scope.querySelector(`#commission-input_${row._id}`).value) / 100;

        data_object = calculateHelpers.calculate_2up_bet_data(data_object);

        set_values_for_2up_bet_data(state, div, row, data_object, false);

        div.setAttribute('data-current-data-object', JSON.stringify(data_object));

    } else if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'standard_free' || state.oddsmatcher_type == 'qualifying_bet_tutorial' || state.oddsmatcher_type == 'free_bet_tutorial') {
    
        data_object.back_stake = parseFloat(scope.querySelector(`#Back-stake-input_${row._id}`).value);
        data_object.back_odds = parseFloat(scope.querySelector(`#Back-odds-input_${row._id}`).value);
        data_object.lay_odds = parseFloat(scope.querySelector(`#Lay-odds-input_${row._id}`).value);
        data_object.lay_commission = parseFloat(scope.querySelector(`#commission-input_${row._id}`).value) / 100;
        data_object.isfree = div.querySelector('.free_bet_mode_switch').checked;

        if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'standard_free') {
            const activeLayTypeButton = div.querySelector('.bet-type-btn.active-lay-type');
            data_object.laytype = activeLayTypeButton.dataset.type;
        } else {
            data_object.laytype = 'Standard';
        }

        data_object = calculateHelpers.calculate_standard(data_object);

        set_values_for_standard(state, div, row, data_object, false);

        div.setAttribute('data-current-data-object', JSON.stringify(data_object));

    } else if (state.oddsmatcher_type == 'bog') {

        data_object.back_stake = parseFloat(scope.querySelector(`#Back-stake-input_${row._id}`).value);
        data_object.back_odds = parseFloat(scope.querySelector(`#Back-odds-input_${row._id}`).value);
        data_object.lay_odds = parseFloat(scope.querySelector(`#Lay-odds-input_${row._id}`).value);
        data_object.lay_commission = parseFloat(scope.querySelector(`#commission-input_${row._id}`).value) / 100;
        data_object.isfree = false;
        data_object.laytype = 'Standard'

        data_object = calculateHelpers.calculate_standard(data_object);

        console.log(data_object)

        set_values_for_bog(state, div, row, data_object, false);

        div.setAttribute('data-current-data-object', JSON.stringify(data_object));

    } else if (state.oddsmatcher_type == 'each_way' || state.oddsmatcher_type == 'extra_place') {

        data_object.each_way_stake = parseFloat(scope.querySelector(`#Each-Way-stake-input_${row._id}`).value);
        data_object.each_way_odds = parseFloat(scope.querySelector(`#Each-Way-odds-input_${row._id}`).value);
        data_object.exchange_win_odds = parseFloat(scope.querySelector(`#Win-Lay-odds-input_${row._id}`).value);
        data_object.exchange_place_odds = parseFloat(scope.querySelector(`#Place-Lay-odds-input_${row._id}`).value);
        data_object.exchange_win_commission = parseFloat(scope.querySelector(`#commission-input_${row._id}`).value) / 100;
        data_object.exchange_place_commission = parseFloat(scope.querySelector(`#commission-input_place_${row._id}`).value) / 100;
        data_object.bookmaker_fraction = row.bookmaker_fraction;

        data_object = calculateHelpers.calculate_each_way_and_extra_place(data_object, (state.oddsmatcher_type == 'extra_place'));

        set_values_for_each_way_and_extra_place(state, div, row, data_object, false);

        div.setAttribute('data-current-data-object', JSON.stringify(data_object));

    } else if (state.oddsmatcher_type == 'dutching') {

        data_object.outcome1_odds = parseFloat(scope.querySelector(`#First-odds-input_${row._id}`).value);
        data_object.outcome1_commission = parseFloat(scope.querySelector(`#commission-input_first_${row._id}`).value) / 100;
        data_object.outcome2_odds = parseFloat(scope.querySelector(`#Second-odds-input_${row._id}`).value);
        data_object.outcome2_commission = parseFloat(scope.querySelector(`#commission-input_second_${row._id}`).value) / 100;

        data_object.outcomes = row.outcomes;

        if (row.outcomes >= 3) {
            data_object.outcome3_odds = parseFloat(scope.querySelector(`#Third-odds-input_${row._id}`).value);
            data_object.outcome3_commission = parseFloat(scope.querySelector(`#commission-input_third_${row._id}`).value) / 100;
        }

        data_object.stake = parseFloat(scope.querySelector('#data-stake-input_' + row._id).value);

        data_object.isfree = div.querySelector('.free_bet_mode_switch').checked;
        const activeTarget = div.querySelector('.bet-type-btn.active-lay-type');
        data_object.target = activeTarget.dataset.type;
        if (data_object.target != 'First') {
            data_object.isfree = false;
        }

        data_object = calculateHelpers.calculate_dutching(data_object);

        set_values_for_dutching(state, div, row, data_object, false);

        div.setAttribute('data-current-data-object', JSON.stringify(data_object));

    }



}
