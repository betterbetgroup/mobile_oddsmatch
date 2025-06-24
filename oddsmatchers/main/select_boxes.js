import * as calculateHelpers from './calculate_functions.js'
import * as helper from './helper.js'


let copy_icon_url = 'https://img.icons8.com/?size=100&id=59773&format=png&color=ffffff';

const delay_for_copy_text = 1500;





export function select_clicked(scope, state, id) {

    // first find the element with class select_button and where the data-id is the id
    change_select_button_content(scope, state, id)

    // Add spinning animation to the select button and make the row take the same time to expand
    // DO LATER ON
    
    // check if there is a tr with select_button_div with that data-id of the id and if there is that already then return
    if (check_for_tr_with_select_button_div(scope, state, id)) {
        set_td_class_for_the_row(scope, state, id, false)
        return;
    }

    set_td_class_for_the_row(scope, state, id, true)

    // then find the tr where the data-id is the id and create and inject div
    create_and_inject_select_div(scope, state, id)



}



function change_select_button_content(scope, state, id) {

    const select_button = scope.querySelector('.select_button[data-id="' + id + '"]');
    if (select_button) {
        // if the content is + change it to × and vice versa
        if (select_button.textContent === '+') {
            select_button.textContent = '×'; // Using multiplication symbol × which is more vertically centered
        } else {
            select_button.textContent = '+';
        }
    }

}


function check_for_tr_with_select_button_div(scope, state, id) {
    const tr = scope.querySelector('.select_button_div_row[data-id="' + id + '"]');
    if (tr) {
        tr.remove();
        return tr;
    }
    return false;
}

function set_td_class_for_the_row(scope, state, id, is_add_class) {
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


function create_and_inject_select_div(scope, state, id) {

    const row = state.globalData.find(row => row._id === id);

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

    } else if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'bog') {

        // get the values from the row
        data_object.back_stake = parseFloat('10');
        data_object.back_odds = parseFloat(row.back_odds);
        data_object.lay_odds = parseFloat(row.lay_odds);
        data_object.lay_commission = parseFloat('0') / 100;

        // THINK NEEDS IS_FREE AND LAY TYPE
        data_object.isfree = false;
        data_object.laytype = 'Standard'

        data_object = calculateHelpers.calculate_standard(data_object);

    } 

    if (state.oddsmatcher_type == 'standard') {
        set_values_for_standard(state, div, row, data_object, true);
    } 
    
    if (state.oddsmatcher_type == 'bog') {
        set_values_for_bog(state, div, row, data_object, true);
    } 

    if (state.oddsmatcher_type == 'each_way') {

        data_object.each_way_stake = parseFloat('10');
        data_object.each_way_odds = parseFloat(row.bookmaker_each_way_odds);

        data_object.exchange_win_odds = parseFloat(row.exchange_win_odds);
        data_object.exchange_win_commission = parseFloat('0') / 100;

        data_object.exchange_place_odds = parseFloat(row.exchange_place_odds);
        data_object.exchange_place_commission = parseFloat('0') / 100;

        data_object.bookmaker_fraction = row.bookmaker_fraction;

        data_object = calculateHelpers.calculate_each_way(data_object);

        set_values_for_each_way(state, div, row, data_object, true);
    }


    add_event_listeners_for_items_in_select_div(scope, state, div, row, data_object);

}






function set_values_for_2up_bet_data(state, div, row, data_object, is_create) {

    add_in_back_bet_section(div, row, 'Back', data_object, is_create);
    add_in_back_bet_section(div, row, 'Lay', data_object, is_create);

    add_in_explanation_text_section(state, div, row, data_object, is_create);

    add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create);

}


function set_values_for_standard(state, div, row, data_object, is_create) {

    add_in_back_bet_section(div, row, 'Back', data_object, is_create);
    add_in_back_bet_section(div, row, 'Lay', data_object, is_create);

    add_in_explanation_text_section(state, div, row, data_object, is_create);

    if (is_create) {
        add_in_bet_controls_section(state, div, row, is_create);
    }

    add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create);

}


function set_values_for_bog(state, div, row, data_object, is_create) {

    add_in_back_bet_section(div, row, 'Back', data_object, is_create);
    add_in_back_bet_section(div, row, 'Lay', data_object, is_create);

    add_in_explanation_text_section(state, div, row, data_object, is_create);

    add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create);

}


 
function set_values_for_each_way(state, div, row, data_object, is_create) {

    add_in_back_bet_section(div, row, 'Each-Way', data_object, is_create);
    add_in_back_bet_section(div, row, 'Win-Lay', data_object, is_create);
    add_in_back_bet_section(div, row, 'Place-Lay', data_object, is_create);


    add_in_explanation_text_section(state, div, row, data_object, is_create);

    add_in_bottom_profit_and_log_section(state, div, row, data_object, is_create);

}









function add_in_back_bet_section(div, row, type_of_bet, data_object, is_create) {


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
        add_odds_input(rightDiv, row, type_of_bet, data_object.back_odds, is_create);
    }

    if (type_of_bet === 'Lay') {
        add_odds_input(rightDiv, row, type_of_bet, data_object.lay_odds, is_create);
        add_lay_commission_input(rightDiv, row, type_of_bet, data_object.lay_commission, is_create);
    }




    if (type_of_bet === 'Each-Way') {
        add_stake_input(rightDiv, row, type_of_bet, data_object.each_way_stake, is_create);
        add_odds_input(rightDiv, row, type_of_bet, data_object.each_way_odds, is_create);
    }

    if (type_of_bet === 'Win-Lay') {
        add_odds_input(rightDiv, row, type_of_bet, data_object.exchange_win_odds, is_create);
        add_lay_commission_input(rightDiv, row, type_of_bet, data_object.exchange_win_commission, is_create);
    }

    if (type_of_bet === 'Place-Lay') {
        add_odds_input(rightDiv, row, type_of_bet, data_object.exchange_place_odds, is_create);
        add_lay_commission_input(rightDiv, row, type_of_bet, data_object.exchange_place_commission, is_create);
    }
    
    





    let span_text_element = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + type_of_bet);
    set_text_for_span_in_middle(div, span_text_element, row, type_of_bet, data_object, is_create);


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


function add_odds_input(rightDiv, row, type_of_bet, odds_input_value, is_create) {

    if (is_create) {

        // Create back odds input
        const oddsLabel = document.createElement('div');
        oddsLabel.className = 'filter-label';
        oddsLabel.textContent = type_of_bet.replace('-', ' ') + ' Odds';
        
        const oddsInput = document.createElement('input');
        oddsInput.dataset._id = row._id
        oddsInput.className = 'text-input';
        oddsInput.id = type_of_bet + '-odds-input_' + row._id;
        oddsInput.placeholder = type_of_bet.replace('-', ' ') + ' Odds';
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


function set_text_for_span_in_middle(div, span_text_element, row, type_of_bet, data_object, is_create) {

    if (is_create) {

        let type_of_bet_text = type_of_bet;

        if (type_of_bet === 'Each-Way') {
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
    if (row.outcome === 'Draw') {
        outcome = 'a Draw';
    }
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


    if (!data_object.incomplete_data) {

        div.querySelector('#span_bet_stake_info_' + row._id + '_' + type_of_bet).textContent = '£' + stake;
        div.querySelector('#span_outcome_info_' + row._id + '_' + type_of_bet).textContent = outcome;
        div.querySelector('#odds-select-bet_' + row._id + '_' + type_of_bet).textContent = odds + ' ' + type_of_bet.replace('-', ' ').replace('Win ', '').replace('Place ', '') + ' Odds';

    } else {
        div.querySelector('#span_bet_stake_info_' + row._id + '_' + type_of_bet).textContent = '£' + '0';
        div.querySelector('#span_outcome_info_' + row._id + '_' + type_of_bet).textContent = outcome;
        div.querySelector('#odds-select-bet_' + row._id + '_' + type_of_bet).textContent = type_of_bet.replace('-', ' ').replace('Win ', '').replace('Place ', '') + ' Odds';  
    }


    // then add in variations for different types etc, one by one 

}














function add_in_bet_controls_section(state, div, row, is_create) {

    // do it using div.innerHTML += and add certain classes, then add these to the styles.css in desktop_oddsmatchers/main/styles.css
    
    div.innerHTML += `
        <div class="select_div_item select_bet_section select_bet_controls_item">
            <div class="free_bet_mode_control">
                <span class="free_bet_mode_label">Free Bet Mode</span>
                <label class="switch switch_select_free_bet_mode">
                    <input type="checkbox" class="free_bet_mode_switch" id="free_bet_mode_switch_${row._id}">
                    <span class="slider slider_select_free_bet_mode"></span>
                </label>
            </div>
        </div>
    `;

    let include_lay_type_control_list = ['standard', 'dutching']

    if (include_lay_type_control_list.includes(state.oddsmatcher_type)) {
        div.querySelector('.select_bet_controls_item').innerHTML += `
            <div class="bet_type_control">
                <div class="lay_type_control_container" data-_id="${row._id}">
                    <button class="bet-type-btn" data-type="Underlay">Underlay</button>
                    <button class="bet-type-btn active-lay-type" data-type="Standard">Standard</button>
                    <button class="bet-type-btn" data-type="Overlay">Overlay</button>
                </div>
            </div>
        `;
    }

    
}








function add_in_explanation_text_section(state, div, row, data_object, is_create) {


    if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == '2up' || state.oddsmatcher_type == 'bog') {
        add_in_explanation_text_section_standard(state, div, row, data_object, is_create);
    }

    if (state.oddsmatcher_type == 'each_way' || state.oddsmatcher_type == 'extra_place') {
        add_in_explanation_text_each_way_and_extra_place(state, div, row, data_object, is_create);
    }


    let selector = '#explanation_text_div_item_' + row._id;
    if (data_object.incomplete_data) {
        div.querySelector(selector).classList.add('hidden_row_above_columns');
        return;
    } else {
        div.querySelector(selector).classList.remove('hidden_row_above_columns');
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

        add_in_first_outcome_text(state, div, row, data_object, is_create)


        add_in_second_outcome_text(state, div, row, data_object, is_create)

        if (state.oddsmatcher_type == '2up') {
            add_in_twoup_outcome_text(state, div, row, data_object, is_create)
        }

    }

    // OBVIOUSLY IS THEN SLIGHTLY DIFFERENT IF DUTCHING OR EXTRA PLACE ETC

    // TRY MAKE SOME FUNCTIONS OUT OF THIS SO THERE'S NOT LOADS OF THEM 

}

function add_in_explanation_text_each_way_and_extra_place(state, div, row, data_object, is_create) {


    if (is_create) {

        let horse_wins_span = `<span class="span_win_outcome_info_${row._id}"></span>`;

        let horse_places_span = `<span class="span_place_outcome_info_${row._id}"></span>`;

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




        add_in_first_outcome_text_ew_and_ep(state, div, row, data_object, is_create)


        add_in_second_outcome_text_ew_and_ep(state, div, row, data_object, is_create)


        add_in_third_outcome_text_ew_and_ep(state, div, row, data_object, is_create)

        
    }

        
        

    

    // OBVIOUSLY IS THEN SLIGHTLY DIFFERENT IF DUTCHING OR EXTRA PLACE ETC

    // TRY MAKE SOME FUNCTIONS OUT OF THIS SO THERE'S NOT LOADS OF THEM 

}







function add_in_first_outcome_text(state,div, row, data_object, is_create) {

    let outcome_text = row.outcome + ' win';

    if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'bog') {
        outcome_text = process_standard_outcome_text(row, data_object, true);
    } 

    let class_for_total_profit_back_win = 'select_profit_explanation_profit';
    let back_win_value_negative = false;
    if (data_object.total_profit_if_back_win.includes('-')) {
        back_win_value_negative = true;
        data_object.total_profit_if_back_win = data_object.total_profit_if_back_win.replace('-', '-£');
        class_for_total_profit_back_win = 'select_profit_explanation_loss';
    } else {
        data_object.total_profit_if_back_win = '£' + data_object.total_profit_if_back_win;
    }

    div.querySelectorAll(`.span_outcome_info_${row._id}`).forEach(span => {
        span.textContent = outcome_text;
    });

    div.querySelector(`#span_back_win_profit_${row._id}`).textContent = '£' + data_object.bookmaker_profit_if_back_win;

    div.querySelector(`#span_lay_loss_profit_${row._id}`).textContent = '£' + data_object.exchange_profit_if_back_win.replace('-', '');

    div.querySelector(`#gain_or_lose_text_back_win_${row._id}`).textContent = back_win_value_negative ? 'lose' : 'gain';

    let span_overall_profit_back_win = div.querySelector(`#span_overall_profit_back_win_${row._id}`);
    span_overall_profit_back_win.textContent = data_object.total_profit_if_back_win;
    span_overall_profit_back_win.classList.remove(...span_overall_profit_back_win.classList);
    span_overall_profit_back_win.classList.add(class_for_total_profit_back_win);

}

function add_in_second_outcome_text(state, div, row, data_object, is_create) {

    let other_outcome_text = row.outcome + ` don't win`;

    if (state.oddsmatcher_type == '2up') {
        other_outcome_text = row.outcome + ` don't win and don't go 2 goals up at any point in the game`;
    }

    if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'bog') {
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

    let second_outcome_text = `${row.horse} doesn't win the race but finishes in the top ${row.bookmaker_places}`;
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



        if (state.oddsmatcher_type == '2up' || state.oddsmatcher_type == 'standard') {
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
        } else if (state.oddsmatcher_type == 'each_way') {

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

        }


    }




    let selector = '#select_bet_div_profit_and_log_' + row._id;
    if (data_object.incomplete_data) {
        div.querySelector(selector).classList.add('hidden_row_above_columns');
        return;
    } else {
        div.querySelector(selector).classList.remove('hidden_row_above_columns');
    }


    let description = '';
    if (state.oddsmatcher_type == '2up') {
        description = row.outcome + ' to go 2 goals up in ' + row.fixture + ', back bet placed on ' + row.bookmaker + ' @ ' + data_object.back_odds + ', lay bet placed on ' + row.exchange + ' @ ' + data_object.lay_odds + ".";        
    } else if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == 'bog') {
        description = get_description_for_standard_bet(div, row, data_object);
    } else if (state.oddsmatcher_type == 'each_way') {
        description = get_description_for_each_way_bet(div, row, data_object);
    }
    div.querySelector(`#bet-description-input_${row._id}`).value = description;



    // THEN CODE INJECTING IN THE PROFIT DATA TO THE LEFT DIV

    div.querySelector('.profit_and_log__item_value_rating').textContent = data_object.rating;

    let qualifying_loss_element = div.querySelector('.profit_and_log__item_value_qualifying_loss')
    qualifying_loss_element.textContent = ('£' + data_object.qualifying_loss).replace('£-', '-£');
    set_class_for_profit_info_item(qualifying_loss_element, data_object.qualifying_loss);
    

    if (state.oddsmatcher_type == 'standard' || state.oddsmatcher_type == '2up') {
        let potential_profit_element = div.querySelector('.profit_and_log__item_value_potential_profit')
        potential_profit_element.textContent = ('£' + data_object.potential_profit).replace('£-', '-£');
        set_class_for_profit_info_item(potential_profit_element, data_object.potential_profit);
    } 

    if (state.oddsmatcher_type == 'bog') {
        let potential_profit_element = div.querySelector('.profit_and_log__item_value_potential_profit')
        potential_profit_element.textContent = data_object.ROI + '%';
    } 




}

function set_class_for_profit_info_item(element, value) {
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


function get_description_for_standard_bet(div, row, data_object) {

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
    } else {
        description += `Betting `;
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

function get_description_for_each_way_bet(div, row, data_object) {

    let description = '';


    description += `Each way bet on '${row.horse}' at the ${row.fixture}. The bookmaker is paying ${row.bookmaker_places} places.`;;

    let back_bet_text = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Each-Way').textContent.replace(/\s+/g, ' ').trim();
    description += ` ${back_bet_text.replace('Back', 'Backing').replace(`on '${row.horse}'`, `E/W on '${row.horse}'`)}.`;

    let win_lay_bet_text = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Win-Lay').textContent.replace(/\s+/g, ' ').trim();
    description += ` ${win_lay_bet_text.replace('Lay', 'Laying')}.`;

    let place_lay_bet_text = div.querySelector('#select_bet_text_div_text_' + row._id + '_' + 'Place-Lay').textContent.replace(/\s+/g, ' ').trim();
    description += ` ${place_lay_bet_text.replace('Lay', 'Laying')}.`;

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

function copy_text_on_click_stake(event) {

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

function change_lay_type_control_container(event) {

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

function log_bet(scope, state, div, row, data_object) {
    

    data_object.date_and_time = row.date_and_time
    data_object.description = scope.querySelector(`#bet-description-input_${row._id}`).value;
    data_object.iscalc = true;
    data_object.complete = false;
    data_object.betId = row._id + '_' + Date.now(); // as they can log the same oddsmatcher bet multiple times
    //data_object.userId = state.user_id;    add in userId on wix
    data_object.oddsmatcher_type = state.oddsmatcher_type;
    data_object.bookmaker_link = row.bookmaker_link;
    data_object.exchange_link = row.exchange_link;
    data_object.fixture = row.fixture;
    data_object.actualprofit = '';
    data_object.bookie = row.bookmaker;
    data_object.exchange = row.exchange;
    data_object.qualifying_loss = data_object.qualifying_loss.replace('£', '');
    data_object.potential_profit = data_object.potential_profit.replace('£', '');







    if (state.oddsmatcher_type == '2up' || state.oddsmatcher_type == 'standard') {
        data_object.backodds = data_object.back_odds.replace('£', '');
        data_object.layodds = data_object.lay_odds.replace('£', '');
        data_object.backstake = data_object.back_stake.replace('£', '');
        data_object.commission = data_object.lay_commission.replace('£', '');
        data_object.stakereturned = false;
    }

    if (state.oddsmatcher_type == '2up') {
        data_object.outcome = row.outcome + ' 2up';
        data_object.ispayout = false;
        data_object.calculator = '2up';
    }

    // IT SHOULD ALREADY HAVE THE ISFREE AND LAYTYPE
    if (state.oddsmatcher_type == 'standard') {
        data_object.calculator = 'standard';
    }


    if (state.oddsmatcher_type == 'each_way') {
        data_object.exchange = row.win_exchange;
        data_object.exchange_link = row.win_exchange_link;
    }

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
        data_object.row = row;

        data_object = calculateHelpers.calculate_2up_bet_data(data_object);

        set_values_for_2up_bet_data(state, div, row, data_object, false);

        div.setAttribute('data-current-data-object', JSON.stringify(data_object));

    } else if (state.oddsmatcher_type == 'standard') {
    
        data_object.back_stake = parseFloat(scope.querySelector(`#Back-stake-input_${row._id}`).value);
        data_object.back_odds = parseFloat(scope.querySelector(`#Back-odds-input_${row._id}`).value);
        data_object.lay_odds = parseFloat(scope.querySelector(`#Lay-odds-input_${row._id}`).value);
        data_object.lay_commission = parseFloat(scope.querySelector(`#commission-input_${row._id}`).value) / 100;
        data_object.isfree = div.querySelector('.free_bet_mode_switch').checked;
        const activeLayTypeButton = div.querySelector('.bet-type-btn.active-lay-type');
        data_object.laytype = activeLayTypeButton.dataset.type;
        data_object.row = row;

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
        data_object.row = row;

        data_object = calculateHelpers.calculate_standard(data_object);

        console.log(data_object)

        set_values_for_bog(state, div, row, data_object, false);

        div.setAttribute('data-current-data-object', JSON.stringify(data_object));

    } else if (state.oddsmatcher_type == 'each_way') {

        data_object.each_way_stake = parseFloat(scope.querySelector(`#Each-Way-stake-input_${row._id}`).value);
        data_object.each_way_odds = parseFloat(scope.querySelector(`#Each-Way-odds-input_${row._id}`).value);
        data_object.exchange_win_odds = parseFloat(scope.querySelector(`#Win-Lay-odds-input_${row._id}`).value);
        data_object.exchange_place_odds = parseFloat(scope.querySelector(`#Place-Lay-odds-input_${row._id}`).value);
        data_object.exchange_win_commission = parseFloat(scope.querySelector(`#commission-input_${row._id}`).value) / 100;
        data_object.exchange_place_commission = parseFloat(scope.querySelector(`#commission-input_place_${row._id}`).value) / 100;
        data_object.bookmaker_fraction = row.bookmaker_fraction;
        data_object.row = row;

        data_object = calculateHelpers.calculate_each_way(data_object);

        set_values_for_each_way(state, div, row, data_object, false);

        div.setAttribute('data-current-data-object', JSON.stringify(data_object));

    }



}
