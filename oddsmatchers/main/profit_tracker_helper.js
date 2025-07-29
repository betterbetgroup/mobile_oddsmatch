import * as helper from './helper.js';



const MAX_UPDATE_INTERVAL_DATABASE = 1500;



export function convertDateToInputFormat(dateString) {
    if (!dateString) return '';
    
    // Convert from DD/MM/YYYY to YYYY-MM-DD
    const dateParts = dateString.split('/');
    if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    return '';
}

export function convertInputDateToDisplayFormat(dateString) {
    if (!dateString) return '';
    
    // Convert from YYYY-MM-DD to DD/MM/YYYY
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
        const [year, month, day] = dateParts;
        return `${day}/${month}/${year}`;
    }
    
    return '';
}





export function set_values_for_profit_tracker(scope, state, div, row, is_create) {
    

    load_data_for_profit_tracker_select_first_section(scope,state, div, row, is_create);

    // add in description and profit div
    add_in_description_and_profit_div(scope, state, div, row, is_create);

    // then add in event listeners for everything so it's all in one place
    add_event_listener_for_updating_data(scope, state, div, row);

}





function add_event_listener_for_updating_data(scope, state, div, row) {
    // add event listener for the inputs
    let inputs = div.querySelectorAll('input.text-input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            update_global_data(scope, state, div, row);
        });
    });

    // add event listener for the text area
    let text_area = div.querySelector('textarea');
    text_area.addEventListener('input', () => {
        update_global_data(scope, state, div, row);
    });


    // also get input[type="date"]
    let date_input = div.querySelector('input[type="date"]');
    date_input.addEventListener('change', () => {
        update_global_data(scope, state, div, row);
    });

    // also get input[type="checkbox"]
    let checkbox = div.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        // use the scope and row.betId to get the .settled_checkbox with data-id="betId"
        let settled_checkbox = scope.querySelector(`.settled_checkbox[data-id="${row.betId}"]`);
        if (!state.is_desktop) {
            settled_checkbox = scope.querySelector('input.item_complete_switch[data-id="' + row.betId + '"]');
        }
        settled_checkbox.checked = checkbox.checked;
        update_global_data(scope, state, div, row);
    });


    // also get button.button-for-profit
    let buttons = div.querySelectorAll('button.button-for-profit');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            update_global_data(scope, state, div, row);
        });
    });



    // THEN WHEN THEY CHANGE BOOKMAKER IT CALLS THE SAME FUNCTION THERE
    
    
}

function update_global_data(scope, state, div, row) {
    
    row = get_all_data_from_select(scope, state, div, row);

    helper.calculate_and_display_total_profit(scope, state);

    // NOW RAISE ROW TO WIX JUST LIKE WITH CHECKBOX BUT
    // - MAKE IT SO THAT IT ONLY UPDATES DB MAX 1000MS AND USES LATEST DATA
    // Save the latest row

    // Initialize the throttling properties if they don't exist
    if (typeof state.updateTimeoutId === 'undefined') {
        state.updateTimeoutId = null;
    }
    if (typeof state.latestRow === 'undefined') {
        state.latestRow = null;
    }


    state.latestRow = row;

    // If a timeout is already running, don't schedule another yet
    if (state.updateTimeoutId !== null) {
        return;
    }

    // Otherwise, schedule an update for 1000ms later
    state.updateTimeoutId = setTimeout(() => {
        update_db_with_row(scope, state.latestRow);

        // Clear timeout and latest row tracker
        state.updateTimeoutId = null;
        state.latestRow = null;
    }, MAX_UPDATE_INTERVAL_DATABASE);

}

function update_db_with_row(scope, row) {

    // raise event and send to wix 
    let message_type = 'Update-Row';
    let message = {
        row: row,
    }
    const raise_event = new CustomEvent(message_type, {
        detail: message,  
        bubbles: true,       // Allows the event to bubble up through the DOM
        composed: true        // Allows the event to pass through shadow DOM boundaries
    });
    scope.dispatchEvent(raise_event); 

}

function get_all_data_from_select(scope, state, div, row) {



    // start from bottom

    row.actualprofit = div.querySelector(`#actual_profit_input_${row.betId}`).value || '0';
    row.qualifying_loss = div.querySelector(`#qualifying_loss_input_${row.betId}`).value || '0';
    row.potential_profit = div.querySelector(`#potential_profit_input_${row.betId}`).value || '0';
    row.complete = div.querySelector(`#settled_bet_switch_${row.betId}`).checked || false;

    // get the event, date, bet outcome, description
    row.event = div.querySelector(`#event_input_${row.betId}`).value || '';
    row.date = convertInputDateToDisplayFormat(div.querySelector(`#bet-date-${row.betId}`).value) || '';
    row.bet_outcome = div.querySelector(`#bet_input_${row.betId}`).value || '';
    row.description = div.querySelector(`#bet-description-input_${row.betId}`).value || '';


    row.date_and_time = row.date.replace(/\/\d{4}/, '/' + row.date.split('/')[2].slice(-2)) + ' 12:00';


    // then get platforms
    let platform_items = div.querySelectorAll('.platform-item');
    let platforms = []

    let i = 1;
    platform_items.forEach(platform_item => {
        let platform_name = platform_item.querySelector('input.dropdown-option-platform-on-click').value;
        let platform_odds = platform_item.querySelector('input.text-input').value;
        let platform_link = platform_item.querySelector('a.div_around_logo').href;
        platforms.push({index: i, platform: platform_name, odds: platform_odds, link: platform_link});
        i++;
    });

    row.platforms = platforms;



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



    // ALSO SELECT THE APPROPRIATE TD'S AND CHANGE THE CLASS TO SELECTED_ROW_TD_ORIGINAL
    if (state.is_desktop) {


        let correct_row = scope.querySelector(`tr[data-id="${row.betId}"]`);
        correct_row.querySelector('.final_profit_data').textContent = row.actualprofit;
        correct_row.querySelector('.final_profit_data').className = `final_profit_data ${row.actualprofit.includes('-') ? 'negative_profit_data' : 'positive_profit_data'}`;
        correct_row.querySelectorAll('div.expected_profit_data div')[0].textContent = row.qualifying_loss;
        correct_row.querySelectorAll('div.expected_profit_data div')[0].className = (row.qualifying_loss.includes('-') ? 'negative_profit_data' : 'positive_profit_data');
        correct_row.querySelectorAll('div.expected_profit_data div')[1].textContent = row.potential_profit;
        correct_row.querySelectorAll('div.expected_profit_data div')[1].className = (row.potential_profit.includes('-') ? 'negative_profit_data' : 'positive_profit_data');

        correct_row.querySelector('.date_and_time_data').textContent = row.date;
        correct_row.querySelector('.description_data').innerHTML = `
            <div class="description-text">${row.description}</div>
            <button class="more-button" data-bet-id="${row.betId}">more...</button>
        `;

        helper.setupDescriptionTruncation(correct_row, row.betId, row.description, scope, state);

        if (row.platforms.length > 0) {
            correct_row.querySelector('img.bookmaker_logo_img').src = helper.get_bookmaker_image_profit_tracker_desktop(row.platforms[0].platform);
            // also select the anchor and set the href
            if (row.platforms[0].platform == 'Other') {
                correct_row.querySelector('a.div_around_logo').removeAttribute('href');
            } else {
                correct_row.querySelector('a.div_around_logo').href = helper.get_bookmaker_link_profit_tracker(row.platforms[0].platform);
            }
        } else {
            correct_row.querySelector('a.div_around_logo').removeAttribute('href')
        }

    } else {

        let mobileContainer = scope.querySelector(`div.mobile-card.outer-mobile-card[data-id="${row.betId}"] div.mobile-card`);

        mobileContainer.querySelector('div.mobile-row.mobile-row-date span').textContent = row.date;

        mobileContainer.querySelector('div.mobile-row.mobile-row-event span').textContent = row.event;
        mobileContainer.querySelector('div.mobile-row.mobile-row-bet-outcome span').textContent = row.bet_outcome;

        // also add or remove class hidden_row_above_columns
        if (row.event) {
            mobileContainer.querySelector('div.mobile-row.mobile-row-event').classList.remove('hidden_row_above_columns');
        } else {
            mobileContainer.querySelector('div.mobile-row.mobile-row-event').classList.add('hidden_row_above_columns');
        }

        if (row.bet_outcome) {
            mobileContainer.querySelector('div.mobile-row.mobile-row-bet-outcome').classList.remove('hidden_row_above_columns');
        } else {
            mobileContainer.querySelector('div.mobile-row.mobile-row-bet-outcome').classList.add('hidden_row_above_columns');
        }


        if (row.platforms.length > 0) {
            mobileContainer.querySelector('div.mobile-row.mobile-row-bookmaker img.logo-img').src = helper.get_bookmaker_image_profit_tracker_desktop(row.platforms[0].platform);
            // also select the anchor and set the href
            if (row.platforms[0].platform == 'Other') {
                mobileContainer.querySelector('div.mobile-row.mobile-row-bookmaker a').removeAttribute('href');
            } else {
                mobileContainer.querySelector('div.mobile-row.mobile-row-bookmaker a').href = helper.get_bookmaker_link_profit_tracker(row.platforms[0].platform);
            }
                
        } else {
            mobileContainer.querySelector('div.mobile-row.mobile-row-bookmaker a').removeAttribute('href');
        }



        mobileContainer.querySelector('div.mobile-row.mobile-row-description-container.mobile-row-description span.mobile-row-description-text').textContent = row.description;


        mobileContainer.querySelector('div.qualifying_loss_badge').textContent = row.qualifying_loss;
        mobileContainer.querySelector('div.qualifying_loss_badge').className = 'qualifying_loss_badge ' + (row.qualifying_loss.includes('-') ? 'loss-badge' : 'profit-badge');
        mobileContainer.querySelector('div.potential_profit_badge').textContent = row.potential_profit;
        mobileContainer.querySelector('div.potential_profit_badge').className = 'potential_profit_badge ' + (row.potential_profit.includes('-') ? 'loss-badge' : 'profit-badge');
        mobileContainer.querySelector('div.final_profit_badge').textContent = row.actualprofit;
        mobileContainer.querySelector('div.final_profit_badge').className = `final_profit_badge ${row.actualprofit.includes('-') ? 'loss-badge' : 'profit-badge'} ${!row.complete ? 'not-complete-badge' : ''}`;




    }




    return row;

}







function get_platform_data(platform_item, is_first) {

    if (!is_first) {
        platform_item = {
            'platform': platform_item,
            'odds': '',
            'link': '',
        }
    }

    let platform_name = platform_item.platform;
    if (platform_name == '') {
        platform_name = 'Other';
    }
    let platform_odds = platform_item.odds;
    let platform_link = platform_item.link;
    let platform_image = helper.get_bookmaker_image_profit_tracker_desktop(platform_name);



    let odds_input_label = platform_name + ' Odds';
    if (platform_name == 'Other') {
        odds_input_label = 'Odds';
    }

    if (platform_name != 'Other' && platform_link == '') {
        platform_link = helper.get_bookmaker_link_profit_tracker(platform_name);
    }

    return {platform_name, platform_odds, platform_link, platform_image, odds_input_label};


}


function inject_platform_section_html(scope, section, index, row, platform_item) {


    let platform_data = get_platform_data(platform_item, true);


    section.innerHTML += `

        <div class="platform-item" id="platform-item-${index}">
            

        </div>


    `;

    let inner_item = section.querySelector(`#platform-item-${index}`);

    // Create platform select container div
    const platformSelectDiv = document.createElement('div');
    platformSelectDiv.className = 'filter-item filter-item-profit-tracker filter-item-profit-tracker-platform-select';
    platformSelectDiv.dataset.index = index;
    platformSelectDiv.dataset.betId = row.betId;

    // Create label
    const label = document.createElement('label');
    label.className = 'filter-label';
    label.htmlFor = `platform-select-${index}-${row.betId}`;
    label.textContent = 'Bookmaker or Exchange';
    platformSelectDiv.appendChild(label);

    // Create custom select container
    const selectContainer = document.createElement('div');
    selectContainer.id = `filters-dropdown-select-container-${index}-${row.betId}`;
    selectContainer.className = 'custom-select-container select-filters-container dropdown-option-platform-on-click';
    selectContainer.tabIndex = 0;
    selectContainer.dataset.platformSelector = `filters-dropdown-select-container-${index}-${row.betId}`;
    selectContainer.dataset.buttonDivSelector = `platform-dropdown-options-${index}-${row.betId}`;

    // Create trigger div
    const triggerDiv = document.createElement('div');
    triggerDiv.className = 'custom-select-trigger';

    // Create input
    const input = document.createElement('input');
    input.id = `platform-select-${index}-${row.betId}`;
    input.type = 'text';
    input.value = platform_data.platform_name || 'Other';
    input.setAttribute('value', platform_data.platform_name || 'Other');
    input.readOnly = true;
    input.classList.add('dropdown-option-platform-on-click');
    input.dataset.platformSelector = `filters-dropdown-select-container-${index}-${row.betId}`;
    input.dataset.buttonDivSelector = `platform-dropdown-options-${index}-${row.betId}`;
    triggerDiv.appendChild(input);

    // Create dropdown options div
    const dropdownDiv = document.createElement('div');
    dropdownDiv.className = 'dropdown-options dropdown-options-platforms-select';
    dropdownDiv.id = `platform-dropdown-options-${index}-${row.betId}`;
    dropdownDiv.dataset.inputSelector = `platform-select-${index}-${row.betId}`;
    dropdownDiv.dataset.oddsInputSelector = `platform-odds-${index}_${row.betId}`;
    dropdownDiv.dataset.oddsLabelSelector = `platform-odds-label-${index}_${row.betId}`;
    dropdownDiv.dataset.linkSelector = `platform-link-${index}_${row.betId}`;

    // Assemble the elements
    selectContainer.appendChild(triggerDiv);
    selectContainer.appendChild(dropdownDiv);
    platformSelectDiv.appendChild(selectContainer);

    inner_item.appendChild(platformSelectDiv);





    inner_item.innerHTML += `

            <div class="filter-item filter-item-profit-tracker">
                <label class="filter-label" id="platform-odds-label-${index}_${row.betId}" for="platform-odds-${index}_${row.betId}">${platform_data.odds_input_label}</label>
                <input class="text-input" id="platform-odds-${index}_${row.betId}" placeholder="${platform_data.odds_input_label}" autocomplete="off" value="${platform_data.platform_odds}">
            </div>

            <div id="bookmaker_logo_${index}_platform_${row.betId}" class="bookmaker_logo_div bookmaker_logo_div_select_bet platform_logo_div_profit_tracker">
                <a class="div_around_logo" target="_blank" id="platform-link-${index}_${row.betId}" ${platform_data.platform_link ? `href="${platform_data.platform_link}"` : ''}>
                    <img class='bookmaker_logo_img bookmaker_logo_img_select_bet platform_logo_img_profit_tracker' src='${platform_data.platform_image}' alt="platform image">
                </a>
            </div>

            `;

}



function load_data_for_profit_tracker_select_first_section(scope, state, div, row, is_create) {

    // create this div  
    let section = document.createElement('div');
    section.className = 'select_div_item platform-section-outer';
    div.appendChild(section); 


    // row.platforms is a list, loop over this list keeping an index and up to a max of 3 run let section = div.querySelector(`#platform-item-${index}`); inject_platform_section_html(section, index, row, row.bookie);
    if (!row.platforms || row.platforms.length == 0) {
        for (let i = 0; i < 3; i++) {
            inject_platform_section_html(scope, section, i + 1, row, {platform: 'Other', odds: '', link: '', index: i + 1});
        }
    } else {
        for (let i = 0; i < 3; i++) {
            if (row.platforms[i]) {
                inject_platform_section_html(scope, section, i + 1, row, row.platforms[i]);
                // function called to set image and label etc 
                // also called when the value changes
            } 
        }
    }


    
    let all_platforms = helper.get_all_platforms_profit_tracker();

    // select all .dropdown-options in the div and get their id
    let dropdown_containers = div.querySelectorAll('div.dropdown-options.dropdown-options-platforms-select');
    dropdown_containers.forEach(dropdown_container => {
        append_platforms_to_platform_selectors(dropdown_container, all_platforms, div, state)
    });



    // adding event listener for the platforms selector divs to show the boxes
    add_event_listener_for_platform_divs(div);

    // add event listener for the dropdown options
    add_event_listener_for_dropdown_options(scope, state, div, row);

}





function add_in_description_and_profit_div(scope, state, div, row, is_create) {


    div.innerHTML += `
        <div class="select_div_item description-and-profit-section-outer">

            <div class="description-and-profit-section-inner description-and-profit-section-inner-left">


                <div class="description-and-profit-section-inner-top-item description-and-profit-section-inner-top-item-event">
                        <div class="filter-item filter-item-description">
                            <label class="filter-label">Event</label>
                            <input class="text-input" id="event_input_${row.betId}" placeholder="Event" autocomplete="off">
                        </div>
                </div>


                <div class="description-and-profit-section-inner-top-item">

                        
                        <div class="filter-item filter-item-date">
                            <label class="filter-label" for="bet-date-${row.betId}">Event Date</label>
                            <div class="custom-date-wrapper">
                                <input type="date" class="date-range-input" id="bet-date-${row.betId}" placeholder="Event Date">
                            </div>
                        </div>

                                    
                        <div class="filter-item filter-item-description">
                            <label class="filter-label">Bet Outcome</label>
                            <input class="text-input" id="bet_input_${row.betId}" placeholder="Bet Outcome" autocomplete="off">
                        </div>

                </div>



                <div class="filter-item filter-item-description">
                    <label class="filter-label">Description</label>
                    <textarea id="bet-description-input_${row.betId}" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
                </div>


            </div>


            <div class="description-and-profit-section-inner description-and-profit-section-inner-right">



                <div class="description-and-profit-section-inner-top-item">

                        
                        <div class="filter-item filter-item-description">
                            <label class="filter-label">Qualifying Loss</label>
                            <div class="text-input-container">
                                <input class="text-input currency_in_input" id="qualifying_loss_input_${row.betId}" placeholder="Qualifying Loss" autocomplete="off">
                            </div>
                        </div>

                        <div class="filter-item filter-item-description">
                            <label class="filter-label">Potential Profit</label>
                            <div class="text-input-container">
                                <input class="text-input currency_in_input" id="potential_profit_input_${row.betId}" placeholder="Potential Profit" autocomplete="off">
                            </div>
                        </div>

                </div>



                <div class="description-and-profit-section-inner-top-item div-for-actual-profit">

                    <div class="filter-item">
                        <label class="filter-label">Final Profit</label>
                        <div class="text-input-container">
                            <input class="text-input currency_in_input" id="actual_profit_input_${row.betId}" placeholder="Final Profit" autocomplete="off">
                        </div>
                    </div>

                    <div class="filter-item div-for-profit-buttons"> 
                        <button id="qualifying_loss_button_${row.betId}" class="button-for-profit"></button>
                        <button id="potential_profit_button_${row.betId}" class="button-for-profit"></button>
                    </div>

                </div>





                <div class="description-and-profit-section-inner-bottom-item div-for-settled-bet-checkbox">
                    <div class="free_bet_mode_control div-for-settled-bet-label">
                        <span class="free_bet_mode_label settled_bet_label">Bet Settled</span>
                        <label class="switch switch_select_settled_bet">
                            <input type="checkbox" class="settled_bet_switch" id="settled_bet_switch_${row.betId}">
                            <span class="slider slider_select_settled_bet"></span>
                        </label>
                    </div>
                </div> 









            </div>


        </div>

    `;



    load_data_for_profit_tracker_select_second_section(scope, state, div, row, is_create);

}


function load_data_for_profit_tracker_select_second_section(scope, state, div, row, is_create) {

    let qualifying_loss_input = div.querySelector(`#qualifying_loss_input_${row.betId}`);
    let potential_profit_input = div.querySelector(`#potential_profit_input_${row.betId}`);
    let final_profit_input = div.querySelector(`#actual_profit_input_${row.betId}`);

    let qualifying_loss_button = div.querySelector(`#qualifying_loss_button_${row.betId}`);
    let potential_profit_button = div.querySelector(`#potential_profit_button_${row.betId}`);

    if (!row.is_manual_log) { // MEANING IT'S NOT MANUAL

        // select the date input in here description-and-profit-section-inner-top-item-date
        let date_input = div.querySelector(`#bet-date-${row.betId}`);
        // Convert the date from DD/MM/YYYY to YYYY-MM-DD
        let date = convertDateToInputFormat(row.date);
        date_input.value = date;

        // also set event, description, bet outcome, qualifying loss, potential profit, final profit
        let event_input = div.querySelector(`#event_input_${row.betId}`);
        event_input.value = row.event ? row.event : '';
        let bet_input = div.querySelector(`#bet_input_${row.betId}`);
        bet_input.value = row.bet_outcome ? row.bet_outcome : '';
        qualifying_loss_input.value = row.qualifying_loss.replace('£', '') ? row.qualifying_loss.replace('£', '') : '';
        potential_profit_input.value = row.potential_profit.replace('£', '') ? row.potential_profit.replace('£', '') : '';
        final_profit_input.value = row.actualprofit.replace('£', '') ? row.actualprofit.replace('£', '') : '';
        let description_input = div.querySelector(`#bet-description-input_${row.betId}`);
        description_input.value = row.description ? row.description : '';


        // also set the switch checkbox
        let settled_bet_switch = div.querySelector(`#settled_bet_switch_${row.betId}`);
        settled_bet_switch.checked = row.complete;
        
        // also set the buttons
        qualifying_loss_button.textContent = row.qualifying_loss ? row.qualifying_loss : '';
        potential_profit_button.textContent = row.potential_profit ? row.potential_profit : '';

    } else {
        // set the date input to today
        let date_input = div.querySelector(`#bet-date-${row.betId}`);
        date_input.value = convertDateToInputFormat(new Date().toLocaleDateString('en-GB'));
        row.date = convertInputDateToDisplayFormat(date_input.value);

        row.is_manual_log = false;


        // also set date in global data
        update_global_data(scope, state, div, row);

        
    }

    // event listeners for the buttons
    qualifying_loss_button.addEventListener('click', () => {
        final_profit_input.value = qualifying_loss_input.value
    });
    potential_profit_button.addEventListener('click', () => {
        final_profit_input.value = potential_profit_input.value;
    });


    // add event listeners for the inputs
    qualifying_loss_input.addEventListener('input', () => {
        qualifying_loss_button.textContent = ('£' + qualifying_loss_input.value).replace('£-', '-£');
    });
    potential_profit_input.addEventListener('input', () => {
        potential_profit_button.textContent = ('£' + potential_profit_input.value).replace('£-', '-£');
    });



}











function closePlatformDropdowns(div) {
    let platform_divs = div.querySelectorAll('div.dropdown-options.dropdown-options-platforms-select');
    platform_divs.forEach(platform_div => {
        platform_div.style.display = 'none';
        platform_div.parentElement.classList.remove('border-radius-bottom-none')
    });
}

// this is for the div that opens the dropdowns
export function add_event_listener_for_platform_divs(div) {


    div.addEventListener('click', (event) => {

        if (event.target.classList.contains('dropdown-option-platform-on-click')) {

            event.stopPropagation();

            let platform_selector = event.target.dataset.platformSelector;
            let button_div_selector = event.target.dataset.buttonDivSelector;

            let platform_div = div.querySelector(`#${platform_selector}`)
            let button_div = div.querySelector(`#${button_div_selector}`) 



            if (button_div.style.display == 'block') {
                button_div.style.display = 'none'
                platform_div.classList.remove('border-radius-bottom-none')
            } else {
                closePlatformDropdowns(div);
                button_div.style.display = 'block';
                platform_div.classList.add('border-radius-bottom-none')
            }

        } else {
            closePlatformDropdowns(div);
        }

    });

}

// this is adding the event listener for the dropdown options
export function add_event_listener_for_dropdown_options(scope, state, div, row) {

    div.addEventListener('click', (event) => {

        if (event.target.classList.contains('platform-option-on-click')) {

            set_background_for_current_option_profit_tracker(event.target.dataset.value, event.target.parentElement)

            let platform_data = get_platform_data(event.target.dataset.value, false);

            let input = scope.querySelector(`#${event.target.dataset.inputSelector}`);
            input.value = platform_data.platform_name;

            let oddsInput = scope.querySelector(`#${event.target.dataset.oddsInputSelector}`);
            oddsInput.placeholder = platform_data.odds_input_label;

            let oddsInputLabel = scope.querySelector(`#${event.target.dataset.oddsLabelSelector}`);
            oddsInputLabel.textContent = platform_data.odds_input_label;

            let link = scope.querySelector(`#${event.target.dataset.linkSelector}`);
            link.querySelector('img').src = platform_data.platform_image;
            let platform_link = platform_data.platform_link;
            
            if (platform_link) {
                link.href = platform_link;
            } else {
                // remove the href
                link.removeAttribute('href');
            }

            update_global_data(scope, state, div, row);
            
        }

    });

}






export function set_background_for_current_option_profit_tracker(platform_name, div) {

    let option_name = '.dropdown-option-platform';
    
    remove_all_option_style(div, option_name);

    let option_divs = div.querySelectorAll(option_name);
    option_divs.forEach((option) => {
        if (option.dataset.value == platform_name) {
            option.classList.add('active');
        }
    });
}

export function remove_all_option_style(div, option_name) {
    let option_divs = div.querySelectorAll(option_name);
    option_divs.forEach((option) => {
        option.classList.remove('active');
    });
}





// this is adding each platforma to the dropdown
export function append_platforms_to_platform_selectors(dropdown_container, platforms, div, state) {

    let input_value = dropdown_container.parentElement.querySelector('input').value;

    if (dropdown_container.dataset.type == 'Each Way Bookmaker' || dropdown_container.dataset.type == 'Back Bet Bookmaker') {
        platforms = platforms.filter(platform => !Object.keys(exchangeImages).includes(platform));
    } 

    if (dropdown_container.dataset.type && (dropdown_container.dataset.type == 'Win Lay Exchange' || dropdown_container.dataset.type == 'Place Lay Exchange' || dropdown_container.dataset.type == 'Lay Bet Exchange' || dropdown_container.dataset.type.includes('Leg '))) {
        platforms = platforms.filter(platform => !Object.keys(bookmakerImages).includes(platform));
    }

    platforms.forEach(platform => {
        // Create the option container
        const optionDiv = document.createElement('div');
        optionDiv.className = 'dropdown-option-platform platform-option-on-click';
        if (platform == input_value) {
            optionDiv.classList.add('active');
        }
        optionDiv.dataset.value = platform; 
        optionDiv.textContent = platform;
        optionDiv.dataset.inputSelector = dropdown_container.dataset.inputSelector;
        optionDiv.dataset.oddsInputSelector = dropdown_container.dataset.oddsInputSelector;
        optionDiv.dataset.oddsLabelSelector = dropdown_container.dataset.oddsLabelSelector;
        optionDiv.dataset.linkSelector = dropdown_container.dataset.linkSelector;

        // Append the option container to the dropdown
        dropdown_container.appendChild(optionDiv);

    });

}




