export function process_new_final_data(data, scope, state) {
    state.data_loaded_from_wix = true;
    data = JSON.parse(data);

    state.is_premium_member = data.premium_member;


    if (data.is_calc) {
        console.log('show the calculator things and return - should include platforms, date etc')
        return
    }

    if (data.local_calc_data) {
        console.log('fill inputs with local data - should include platform, date etc')
    }

}













export function runSpecificScript(scope, state) {

    window.addEventListener('resize', () => { handleResize(scope); });

    // setting up html for desktop and mobile should be the same function just small 
    // changes to the classes so can adjust flex direction




    // FIRST CREATE THE HTML FOR THE CALCULATOR
    add_html_for_calculator(scope, state);


    
    // THEN ADD EVENT LISTENERS



}

function add_html_for_calculator(scope, state) {

    // get the calculator container div
    let calculator_container_div = scope.querySelector('.calculator-container-div');

    // all of them should have a refresh button div
    add_refresh_button_div(scope, state, calculator_container_div);


    if (state.calculator_type == 'standard') {
        add_input_section_for_standard_calculator(scope, state, calculator_container_div);
    }


    // then add 2 divs one goes on left for info and profit one on right for logging
    calculator_container_div.innerHTML += `<div class="bottom_div_calculator_container"></div>`
    add_div_for_logging(scope, state, calculator_container_div);
    add_div_for_info_and_profit(scope, state, calculator_container_div);

}





function add_refresh_button_div(scope, state, calculator_container_div) {

    const refresh_button_div = document.createElement('div');
    refresh_button_div.className = 'refresh-button-div';
    
    refresh_button_div.innerHTML = `
        <button class="save-filter-button refresh-button">
            <span>Refresh</span>
            <img src="https://img.icons8.com/?size=100&amp;id=59872&amp;format=png&amp;color=ffffff" alt="Refresh Oddsmatcher Data" class="refresh_results_img">
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
    add_back_stake_input(back_input_div_select);
    add_back_odds_input(back_input_div_select);

    // select the lay-input-div
    let lay_input_div_select = input_section_div.querySelector('.lay-input-div');
    add_lay_odds_input(lay_input_div_select);
    add_lay_commission_input(lay_input_div_select);

    // select the control-input-div
    let control_input_div_select = input_section_div.querySelector('.control-input-div');
    add_control_input_standard(control_input_div_select);
    
    
}


function add_back_stake_input(back_input_div_select) {
    back_input_div_select.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Back Stake</div>
            <input type="text" class="text-input" placeholder="Enter stake">
        </div>
    `;
}

function add_back_odds_input(back_input_div_select) {
    back_input_div_select.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Back Odds</div>
            <input type="text" class="text-input" placeholder="Enter odds">
        </div>
    `;
}

function add_lay_odds_input(lay_input_div_select) {
    lay_input_div_select.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Lay Odds</div>
            <input type="text" class="text-input" placeholder="Enter odds">
        </div>
    `;
}

function add_lay_commission_input(lay_input_div_select) {
    lay_input_div_select.innerHTML += `
        <div class="filter-item">
            <div class="filter-label">Lay Commission</div>
            <input type="text" class="text-input" placeholder="Enter commission">
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

function add_lay_bet_info_div(top_div) {
    top_div.innerHTML += `
        <div class="select_bet_text_div lay_bet_info_div"> 
            <span class="select_bet_text_div_text" id="select_bet_text_div_text_iOarZiIyJHVdbIJe6gt1wY8GqVhyeCvleF9k_Lay">Place a <span id="lay-stake-span" class="copy-on-click "></span>
            <img src="https://img.icons8.com/?size=100&amp;id=59773&amp;format=png&amp;color=ffffff" class="copy-icon" alt="(Copy)">
            Lay Bet at
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

</div>




                    <div class="log-bet-button-div">
                            <button id="log-bet-button_iOarZiIyJHVdbIJe6gt1wY8GqVhyeCvleF9k" class="log-bet-button">Log Bet</button>
                        </div>



        </div>
    `;
}






function add_div_for_logging(scope, state, calculator_container_div) {

    const logging_div = document.createElement('div');
    logging_div.className = 'logging-div';
    calculator_container_div.querySelector('.bottom_div_calculator_container').appendChild(logging_div);

    let upper_logging_div = document.createElement('div');
    upper_logging_div.className = 'upper-logging-div';
    logging_div.appendChild(upper_logging_div);

    add_platform_div_for_logging(upper_logging_div, 'Back');
    add_platform_div_for_logging(upper_logging_div, 'Lay');



    // then add description box to the bottom

    logging_div.innerHTML += `

                
        <div class="filter-item filter-item-description">
            <label class="filter-label">Description</label>
            <textarea id="bet-description-input" class="bet-description-input bet-description-input-profit-tracker" placeholder="Add bet description..."></textarea>
        </div>


`;


}




function add_platform_div_for_logging(logging_div, type) {

    logging_div.innerHTML += `
<div class="filter-item filter-item-profit-tracker filter-item-profit-tracker-platform-select" data-index="1" data-bet-id="">
    <label class="filter-label" for="platform-select-1-">${type} Bookmaker or Exchange</label>
    <div id="filters-dropdown-select-container-1-" class="custom-select-container select-filters-container dropdown-option-platform-on-click" tabindex="0" data-platform-selector="filters-dropdown-select-container-1-" data-button-div-selector="platform-dropdown-options-1-">
        <div class="custom-select-trigger">
            <input id="platform-select-1-" type="text" value="Bet365" readonly class="dropdown-option-platform-on-click" data-platform-selector="filters-dropdown-select-container-1-" data-button-div-selector="platform-dropdown-options-1-">
        </div>
        <div class="dropdown-options dropdown-options-platforms-select" id="platform-dropdown-options-1-" data-input-selector="platform-select-1-" data-odds-input-selector="platform-odds-1_" data-odds-label-selector="platform-odds-label-1_" data-link-selector="platform-link-1_">
        </div>
    </div>
</div>

    `;

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


export function render(scope, state, html_script) {
    return fetch(html_script)
        .then(response => response.text())
        .then(html => {
            scope.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading script:', error);
        });
}