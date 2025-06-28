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
    

    add_in_platform_section(state, div, row, data_object, is_create);
    // get back to this later and make it inject certain things to list using helpers. and the type
    // also change the label based on type



    // add in description and profit div
    add_in_description_and_profit_div(state, div, row, data_object, is_create);





}







function inject_platform_section_html(section, index, row, platform_name) {

    section.innerHTML += `

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
    `;

}

function add_in_platform_section(state, div, row, data_object, is_create) {

    let is_three = is_three_platforms_list.includes(row.oddsmatcher_type);
    if (row.oddsmatcher_type == 'Dutching' && row.outcomes == 3) {
        is_three = true;
    }
    // also check for a calculator list




    div.innerHTML += `
        <div class="select_div_item platform-section-outer">

            <div class="platform-item" id="platform-item-1">



            
            </div>


            <div class="platform-item" id="platform-item-2">


                

            </div>


            ${is_three ? `
            <div class="platform-item" id="platform-item-3">




            </div>
            ` : ''}


        </div>
    `;


    

    


    let index = 1;
    let section = div.querySelector(`#platform-item-${index}`);
    inject_platform_section_html(section, index, row, row.bookie);


    index = 2;
    section = div.querySelector(`#platform-item-${index}`);
    inject_platform_section_html(section, index, row, row.exchange);


    if (is_three) {
        index = 3;
        section = div.querySelector(`#platform-item-${index}`);
        inject_platform_section_html(section, index, row, row.bookie);
    }




    // use helpers to append options to the dropdowns - and listners which then call this without is_create



    let bookmaker_logo_img_src = helper.get_bookmaker_image(row.bookie);
    // select the img using the div id = bookmaker_logo_1_platform_${row.betId}
    let bookmaker_logo_img = div.querySelector(`#bookmaker_logo_1_platform_${row.betId}`).querySelector('img');
    bookmaker_logo_img.src = bookmaker_logo_img_src;

    // do the same for the other platforms

    let bookmaker_logo_img_src_2 = helper.get_bookmaker_image(row.exchange);
    console.log(row);
    console.log(bookmaker_logo_img_src_2);
    let bookmaker_logo_img_2 = div.querySelector(`#bookmaker_logo_2_platform_${row.betId}`).querySelector('img');
    bookmaker_logo_img_2.src = bookmaker_logo_img_src_2;


    // DO THREE LATER
    if (is_three) {

        let bookmaker_logo_img_src_3 = helper.get_bookmaker_image('William Hill');
        let bookmaker_logo_img_3 = div.querySelector(`#bookmaker_logo_3_platform_${row.betId}`).querySelector('img');
        bookmaker_logo_img_3.src = bookmaker_logo_img_src_3;
    }

    




}











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
                            <input class="text-input" id="qualifying_loss_input_${row.betId}" placeholder="Qualifying Loss" autocomplete="off">
                        </div>

                                    
                        <div class="filter-item filter-item-description">
                            <label class="filter-label">Potential Profit</label>
                            <input class="text-input" id="potential_profit_input_${row.betId}" placeholder="Potential Profit" autocomplete="off">
                        </div>

                </div>



                <div class="description-and-profit-section-inner-top-item div-for-actual-profit">

                    <div class="filter-item">
                        <label class="filter-label">Final Profit</label>
                        <input class="text-input" id="actual_profit_input_${row.betId}" placeholder="Final Profit" autocomplete="off">
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






    // select the date input in here description-and-profit-section-inner-top-item-date
    let date_input = div.querySelector(`#bet-date-${row.betId}`);
    // Convert the date from DD/MM/YYYY to YYYY-MM-DD
    let date = convertDateToInputFormat(row.date);
    date_input.value = date;




}

