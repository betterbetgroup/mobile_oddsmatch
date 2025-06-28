import * as helper from './helper.js';



let is_three_platforms_list = ['Manual', 'each_way', 'extra_place']








function convertDateToInputFormat(dateString) {
    if (!dateString) return '';
    
    // Convert from DD/MM/YYYY to YYYY-MM-DD
    const dateParts = dateString.split('/');
    if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    return '';
}

function convertInputDateToDisplayFormat(dateString) {
    if (!dateString) return '';
    
    // Convert from YYYY-MM-DD to DD/MM/YYYY
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
        const [year, month, day] = dateParts;
        return `${day}/${month}/${year}`;
    }
    
    return '';
}





export function set_values_for_profit_tracker(state, div, row, data_object, is_create) {
    

    load_data_for_profit_tracker_select_first_section(state, div, row, data_object, is_create);
    // get back to this later and make it inject certain things to list using helpers. and the type
    // also change the label based on type



    // add in description and profit div
    add_in_description_and_profit_div(state, div, row, data_object, is_create);




    // then add in event listeners
    // THESE NEED FUNTIONALITY OF 1000MS DELAY WHEN UPDATING DB



}







function inject_platform_section_html(section, index, row, platform_name) {



    section.innerHTML += `

        <div class="platform-item" id="platform-item-${index}">
    
            <div class="filter-item filter-item-profit-tracker">
                <label class="filter-label" for="platform-odds-${index}">Bookmaker or Exchange</label>
                <div id="platform-odds-${index}" class="custom-select-container" tabindex="0">
                    <div class="custom-select-trigger">
                        <input id="platform-odds-${index}" type="text" value="${platform_name}" readonly>
                    </div>
                    <div class="dropdown-options" id="platform-odds-${index}_options">
                        <label>
                            <input type="checkbox" class="select-all" checked>
                            <span></span>
                            Select Bookmaker or Exchange
                        </label>
                    </div>
                </div>
            </div>

            <div class="filter-item filter-item-profit-tracker">
                <label class="filter-label" for="platform-odds-${index}">${platform_name} Odds</label>
                <input class="text-input" id="platform-odds-${index}_${row.betId}" placeholder="${platform_name} Odds" autocomplete="off">
            </div>

            <div id="bookmaker_logo_${index}_platform_${row.betId}" class="bookmaker_logo_div bookmaker_logo_div_select_bet platform_logo_div_profit_tracker">
                <a class="div_around_logo" target="_blank">
                    <img class='bookmaker_logo_img bookmaker_logo_img_select_bet platform_logo_img_profit_tracker' alt="platform image">
                </a>
            </div>

        </div>


        `;

}



function load_data_for_profit_tracker_select_first_section(state, div, row, data_object, is_create) {

    // create this div  
    let section = document.createElement('div');
    section.className = 'select_div_item platform-section-outer';
    div.appendChild(section); 


    // row.platforms is a list, loop over this list keeping an index and up to a max of 3 run let section = div.querySelector(`#platform-item-${index}`); inject_platform_section_html(section, index, row, row.bookie);
    if (!row.platforms || row.platforms.length == 0) {
        for (let i = 0; i < 3; i++) {
            inject_platform_section_html(section, i + 1, row, 'Other');
        }
    } else {
        for (let i = 0; i < 3; i++) {
            if (row.platforms[i]) {
                inject_platform_section_html(section, i + 1, row, row.platforms[i]);
                // function called to set image and label etc 
                // also called when the value changes
            } 
        }
    }


    // ALSO NEED TO ADD IN THE BOOKAMKER IMAGES AND EXCHANGE IMAGES AS OPTIONS .FOREACH DROPDOWN
    // there should also be a dict lining up platforms and odds

    let platform_odds_list = [
        {
            'index': 1,
            'platform': 'Other',
            'odds': '',
            'link': '',
        },
        {
            'index': 2,
            'platform': 'Other',
            'odds': '',
            'link': '',
        },
        {
            'index': 3,
            'platform': 'Other',
            'odds': '',
            'link': '',
        }
    ]




    let all_platforms = helper.get_all_platforms_profit_tracker();

    // select all .dropdown-options in the div and get their id
    let dropdown_options = div.querySelectorAll('div.dropdown-options');
    console.log(dropdown_options.length);
    dropdown_options.forEach(option => {
        let option_id = '#' + option.id;
        helper.append_options_for_the_four_filter_dropdowns(option_id, all_platforms, div);
        // then need code from helper to add listeners to these

    });





}






// ALSO APPENDING CHECKBOXES BUT THIS ISN'T NECESSARY




function add_in_description_and_profit_div(state, div, row, data_object, is_create) {


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
                    <textarea id="bet-description-input_${row._id}" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
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
                        <button id="qualifying_loss_button_${row.betId}" class="button-for-profit">£22.54</button>
                        <button id="potential_profit_button_${row.betId}" class="button-for-profit">-£23.22</button>
                    </div>

                </div>





                <div class="description-and-profit-section-inner-bottom-item div-for-settled-bet-checkbox">
                    <div class="free_bet_mode_control div-for-settled-bet-label">
                        <span class="free_bet_mode_label settled_bet_label">Bet Settled</span>
                        <label class="switch switch_select_settled_bet">
                            <input type="checkbox" class="settled_bet_switch" id="settled_bet_switch_${row._id}">
                            <span class="slider slider_select_settled_bet"></span>
                        </label>
                    </div>
                </div> 









            </div>


        </div>

    `;



    load_data_for_profit_tracker_select_second_section(state, div, row, data_object, is_create);

}


function load_data_for_profit_tracker_select_second_section(state, div, row, data_object, is_create) {

    // select the date input in here description-and-profit-section-inner-top-item-date
    // should always have a date
    let date_input = div.querySelector(`#bet-date-${row.betId}`);
    // Convert the date from DD/MM/YYYY to YYYY-MM-DD
    let date = convertDateToInputFormat(row.date);
    date_input.value = date;

    // also set event, description, bet outcome, qualifying loss, potential profit, final profit
    let event_input = div.querySelector(`#event_input_${row.betId}`);
    event_input.value = row.fixture ? row.fixture : '';
    let bet_input = div.querySelector(`#bet_input_${row.betId}`);
    bet_input.value = row.outcome ? row.outcome : '';
    let qualifying_loss_input = div.querySelector(`#qualifying_loss_input_${row.betId}`);
    qualifying_loss_input.value = row.qualifying_loss.replace('£', '') ? row.qualifying_loss.replace('£', '') : '';
    let potential_profit_input = div.querySelector(`#potential_profit_input_${row.betId}`);
    potential_profit_input.value = row.potential_profit.replace('£', '') ? row.potential_profit.replace('£', '') : '';
    let final_profit_input = div.querySelector(`#actual_profit_input_${row.betId}`);
    final_profit_input.value = row.actualprofit.replace('£', '') ? row.actualprofit.replace('£', '') : '';
    let description_input = div.querySelector(`#bet-description-input_${row._id}`);
    description_input.value = row.description ? row.description : '';


    // also set the switch checkbox
    let settled_bet_switch = div.querySelector(`#settled_bet_switch_${row._id}`);
    settled_bet_switch.checked = row.complete;
    
    // also set the buttons
    let qualifying_loss_button = div.querySelector(`#qualifying_loss_button_${row.betId}`);
    qualifying_loss_button.textContent = row.qualifying_loss ? row.qualifying_loss : '';
    let potential_profit_button = div.querySelector(`#potential_profit_button_${row.betId}`);
    potential_profit_button.textContent = row.potential_profit ? row.potential_profit : '';


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







// THEN NEED CLOSE ALL DROPDOWN SHIT AS WELL

function adding_event_listeners_for_dropdown_checkboxes() {

const selectContainers = scope.querySelector('#filter-panel-container').querySelectorAll('.custom-select-container:not(.select-filters-container)');

selectContainers.forEach(container => {
    const selectAll = container.querySelector('.select-all');

    const checkboxes = container.querySelectorAll('input[type="checkbox"]:not(.select-all)');

    // EVENT LISTENERS FOR THE DROPDOWNS, FOR CLICKING AND VALUE CHANGES. IT JUST CALLS THE UPDATEGLOBALFILTERS FOR EACH, AND TOGGLES DISPLAY OF DROPDOWNS
    selectAll.addEventListener('change', (event) => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
        });
        updateGlobalFilters(container.id, scope, state);
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            selectAll.checked = Array.from(checkboxes).every(c => c.checked);
            updateGlobalFilters(container.id, scope, state);
        });
    });

    container.addEventListener('click', (event) => {

        event.stopPropagation(); // Stop the click from closing the dropdown immediately

        if (container.querySelector('.dropdown-options').style.display == 'block') {
            container.querySelector('.dropdown-options').style.display = 'none';
            container.classList.remove('border-radius-bottom-none')

        } else {
            closeAllDropdowns(scope, state); // Close all other dropdowns
        container.querySelector('.dropdown-options').style.display = 'block'; // Show current dropdown
        container.classList.add('border-radius-bottom-none')
        
        }
    });


});


}