// State management
const state = {
    globalData: [],
    waiting_globalData: [],
    filteredData: [],
    currentPage: 1,
    rowsPerPage: 10,
    current_sort: 'qualifying loss',
    globalFilters: {},
    customFilters: {},
    is_premium_member: false,
    sort_options: [], 
    oddsmatcher_type: null
};



// make a dictionary that matches the keys to the appropriate html
const DesktopHeaderDictionary = {
    'date and time': `<th id="date_and_time_header" class="header_with_sorting" >Date &<br>Time
        <div >
            <img id='sort_by_img_dt' class="sort_by" data-sort="date and time" src="https://img.icons8.com/?size=100&id=69881&format=png&color=ffffff" alt="sort by date and time" >
        </div>
    </th>`,
    
    'fixture': `<th id="fixture_header">Fixture</th>`,

    'event': `<th id="fixture_header">Event</th>`,

    'race': `<th id="fixture_header">Race</th>`,
    
    'outcome': `<th id="outcome_header">Team</th>`,
    
    'horse': `<th id="outcome_header">Horse</th>`,
    
    'back odds': `<th id="back_odds_header" >Back Odds & Bookmaker</th>`,
    'lay odds': `<th id="lay_odds_header" >Lay Odds & Exchange</th>`,
    'place lay odds': `<th id="lay_odds_header" >Lay Odds & Exchange</th>`,

    'first bet': `<th id="back_odds_header" >First Bet</th>`,
    'second bet': `<th id="lay_odds_header" >Second Bet</th>`,
    'third bet': `<th id="place_lay_odds_header" >Third Bet</th>`,

    'each way back bet': `<th id="each_way_back_bet_header" >Each Way Odds & Bookmaker</th>`,
    'win lay bet': `<th id="lay_odds_header" >Win Lay Odds & Exchange</th>`,    
    'place lay bet': `<th id="place_lay_odds_header" >Place Lay Odds & Exchange</th>`,    

    'places': `<th id="extra_places_header"><span class="extra_places_header_span">Places</span></th>`,

    'rating': `<th class="header_with_sorting" ><span>Bet<br>Rating</span>
        <img id='sort_by_img_rating' class="sort_by" data-sort="rating" src="https://img.icons8.com/?size=100&id=69881&format=png&color=ffffff" alt="sort by rating" >
    </th>`,

    'expected profit 2up': `<th id="expected_profit_header" class="header_with_sorting" >Profit on £10 Stake<br>(No FTA / FTA)
        <div class="container_in_expected_profit_header">
            <div >
                <img id='sort_by_img_ql' class="sort_by" data-sort="qualifying loss" src="https://img.icons8.com/?size=100&id=69881&format=png&color=ffffff" alt="sort by qualifying loss" >
            </div>
            <div >
                <img id='sort_by_img_pp' class="sort_by" data-sort="potential profit" src="https://img.icons8.com/?size=100&id=69881&format=png&color=ffffff" alt="sort by potential profit" >
            </div>
        </div>
    </th>`,

    'qualifying loss': `<th id="expected_profit_header" class="header_with_sorting" >Qualifying<br>Loss
        <div >
            <img id='sort_by_img_ql' class="sort_by" data-sort="qualifying loss" src="https://img.icons8.com/?size=100&id=69881&format=png&color=ffffff" alt="sort by qualifying loss" >
        </div>
    </th>`,

    'profit': `<th id="expected_profit_header" class="header_with_sorting" >Bet<br>Profit
        <div >
            <img id='sort_by_img_ql' class="sort_by" data-sort="qualifying loss" src="https://img.icons8.com/?size=100&id=69881&format=png&color=ffffff" alt="sort by qualifying loss" >
        </div>
    </th>`,
};



export function loadExternalScript(scriptUrl) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

export function process_new_final_data(data, scope, state) {
    state.data_loaded_from_wix = true;
    data = JSON.parse(data);

    if (data.wix_filters) {
        add_filters(data.wix_filters, scope, state)
    }

    state.is_premium_member = data.premium_member;
    if (window.getComputedStyle(scope.querySelector('#filter-panel-container')).display == 'flex') {
        scope.querySelector('#covering_filters').style.display = state.is_premium_member ? 'none' : 'flex';
    }

    if (data.rows) {
        state.waiting_globalData = data.rows;
        if (data.is_first) {
            state.globalData = data.rows;
            filterData(scope, state);
        }
    }   
}





export function add_filters(filterObject, scope, state) {

    removeNonQualifyingBetOptions(scope);

    if (Object.keys(filterObject).length === 0) {
        return; 
    }

    for (const [filterName, filters] of Object.entries(filterObject)) {

        state.customFilters[filterName] = filters;

        append_filter_name_to_filter_options_in_dropdown(filterName, scope, state);
    }

}























export function append_sort_to_sort_options(name_for_sort, value, scope, state) {

    if (state.is_desktop) {
        return;
    }

    const container = scope.getElementById('sorting-dropdown-options');

    // Create the option container
    const optionDiv = document.createElement('div');
    optionDiv.className = 'dropdown-option-sorting';
    optionDiv.dataset.value = value; 
    optionDiv.textContent = name_for_sort;

    optionDiv.addEventListener('click', () => {

        sort_data_on_click(value, scope, state)

        set_background_for_current_option(name_for_sort, scope, '.dropdown-option-sorting')

        scope.querySelector('#sorting-select').value = name_for_sort;

    });

    // Append the option container to the dropdown
    container.appendChild(optionDiv);

    check_options_filter_border_bottom(scope, '.dropdown-option-sorting');

}










































export function append_filter_name_to_filter_options_in_dropdown(name_for_filter, scope, state) {

    if (name_for_filter == "") {
        return
    }
            
    const container = scope.getElementById('filters-dropdown-options');

    // Create the option container
    const optionDiv = document.createElement('div');
    optionDiv.className = 'dropdown-option-filter';
    optionDiv.dataset.value = name_for_filter; 
    optionDiv.textContent = name_for_filter;

    optionDiv.addEventListener('click', () => {

        if (name_for_filter) {

            const filter = state.customFilters[name_for_filter];

            set_background_for_current_option(name_for_filter, scope, '.dropdown-option-filter')

            set_input_values_using_filter(filter, scope, state);

            set_global_filters_as_filters_selected_in_dropdown(filter, state);
            
            scope.querySelector('#filters-select').value = name_for_filter;

            remove_all_option_style(scope, '.dropdown-option-filter');

            set_background_for_current_option(name_for_filter, scope, '.dropdown-option-filter')

            filterData(scope, state);
    
        } 

    });


    // Create the confirm delete button
    const confirmDelete = document.createElement('button');
    confirmDelete.className = 'confirm-delete-button';
    confirmDelete.textContent = `Confirm Deleting '${name_for_filter}'`;

    confirmDelete.addEventListener('click', (event) => {

        event.stopPropagation();

        optionDiv.remove();

        delete state.customFilters[name_for_filter]; // Delete the key-value pair

        check_if_dropdown_matches_global_filter_settings(scope, state);

        check_options_filter_border_bottom(scope, '.dropdown-option-filter');

        const raise_event = new CustomEvent('Delete-Filter', {
            detail: { filter_name: name_for_filter },  
            bubbles: true,       // Allows the event to bubble up through the DOM
            composed: true        // Allows the event to pass through shadow DOM boundaries
        });

        scope.dispatchEvent(raise_event); 

    });


    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'filter-delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (event) => {

        event.stopPropagation();

        confirmDelete.style.display = 'block';
        deleteButton.style.display = 'none';


        setTimeout(() => {

            confirmDelete.style.display = 'none';
            deleteButton.style.display = 'block';
            
        }, 6000);

    });

    // Append the delete button to the option container

    if (name_for_filter != 'No Filter') {
        optionDiv.appendChild(confirmDelete);
        optionDiv.appendChild(deleteButton);
    }

    // Append the option container to the dropdown
    container.appendChild(optionDiv);


    check_options_filter_border_bottom(scope, '.dropdown-option-filter');

}


export function set_input_values_using_filter(filters, scope, state) {

    function manageDropdownCheckboxes(dropdownId, selectedItems, selectAllText, scope) {
        const dropdown = scope.getElementById(dropdownId);
        const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:not(.select-all)');
        const selectAllCheckbox = dropdown.querySelector('.select-all');

        // Check all boxes if the list is empty
        if (selectedItems.length === 0) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            selectAllCheckbox.checked = false; // Ensure the select-all box is checked
        } else {
            let allChecked = true;

            checkboxes.forEach(checkbox => {
                if (selectedItems.includes(checkbox.parentNode.textContent.trim())) {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                    allChecked = false;
                }
            });

            // Manage the select-all checkbox based on individual checkbox states
            selectAllCheckbox.checked = allChecked;
        }
    }

    function setInputValue(id, value, scope) {
        const input = scope.getElementById(id);
        input.value = value === 'null' ? '' : value;
    }

    state.filter_info.forEach(filter => {
        const name = filter.name;
        const value = filters[name];

        if (filter.type === 'list') {
            manageDropdownCheckboxes(
                filter.filter_id,
                value,
                `Select All ${name.charAt(0).toUpperCase() + name.slice(1)}`,
                scope
            );
        } else if (filter.type === 'string') {
            scope.getElementById(filter.filter_id).value = value || '';
        } else if (filter.type === 'number') {
            setInputValue(filter.filter_id, value, scope);
        }
    });
}

export function set_global_filters_as_filters_selected_in_dropdown(filters, state) {

    if (!filters) {
        console.log("(No Selected Filter)s provided for updating.");
        return;
    }

    state.filter_info.forEach(filter => {
        const name = filter.name;
        const value = filters[name];

        if (filter.type === 'list') {
            state.globalFilters[name] = value || [];
        }
        else if (filter.type === 'string') {
            state.globalFilters[name] = value || '';
        }
        else if (filter.type === 'number') {
            state.globalFilters[name] = value !== "null" ? parseFloat(value) : null;
        }
    });
}


export function check_options_filter_border_bottom(scope, option_name) {

    const list_of_options = scope.querySelectorAll(option_name);

    // Add border bottom class to all options
    list_of_options.forEach(option => {
        option.classList.remove('border-bottom-filters-off');
    });

    // Remove border bottom class from last option
    if (list_of_options.length > 0) {
        list_of_options[list_of_options.length - 1].classList.add('border-bottom-filters-off');
    }
    
}

export function removeNonQualifyingBetOptions(scope) {

    const options = Array.from(scope.querySelectorAll('.dropdown-option-filter'));
    
    options.forEach(option => {
        if (option.dataset.value !== 'No Filter') {
            option.remove();
        }
    });

}









export function make_timer_run_and_add_event_listener(scope, state) {
    let timer = scope.getElementById('data_timer');
    let refreshButton = scope.getElementById('refresh_results');

    let seconds = 0;  
    let intervalId = null;

    function updateTimerDisplay() {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timer.textContent = 
            (minutes < 10 ? "0" + minutes : minutes) + ":" + 
            (secs < 10 ? "0" + secs : secs);

        if (seconds > 60) {
            timer.style.color = 'red';
        } else {
            timer.style.color = 'white';
        }
    }

    function startTimer() {
        intervalId = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }

    function resetTimer() {
        clearInterval(intervalId);  
        seconds = 0;  
        updateTimerDisplay();  
        startTimer();  
    }

    refreshButton.addEventListener('click', () => {
        state.globalData = state.waiting_globalData;
        filterData(scope, state);
        resetTimer();
    });

    startTimer();
}





export function sort_data(sort_by, state) {
    if (sort_by == 'rating') {
        state.globalData = sort_rows_by_rating(state.globalData);
    } 
    else if (sort_by == 'Implied Odds') {
        state.globalData = sort_rows_by_ImpliedOdds(state.globalData);
    } else if (sort_by == 'potential profit') {
        state.globalData = sort_rows_by_potential_profit(state.globalData);
    } else if (sort_by == 'qualifying loss') {
        state.globalData = sort_rows_by_qualifying_loss(state.globalData);
    } else if (sort_by == 'date and time') {
        state.globalData = sort_rows_by_date_and_time(state.globalData);
    } else if (sort_by == 'ROI') {
        state.globalData = sort_rows_by_ROI(state.globalData);
    }
}

export function sort_rows_by_rating(rows) {

    return rows.sort((a, b) => {

        // Handle both string and numeric values
        const ratingA = typeof a.rating === 'string' 
            ? parseFloat(a.rating.replace('%', '')) 
            : parseFloat(a.rating) || 0;
        const ratingB = typeof b.rating === 'string' 
            ? parseFloat(b.rating.replace('%', '')) 
            : parseFloat(b.rating) || 0;
        return ratingB - ratingA;  // Sort in descending order
    });
}
  
export function sort_rows_by_ImpliedOdds(rows) {
    return rows.sort((a, b) => {

            const ratingA = parseFloat(a.implied_odds);
            const ratingB = parseFloat(b.implied_odds);
            return ratingB - ratingA;  // Sort in descending order

        });
}

export function sort_rows_by_qualifying_loss(rows) {
    return rows.sort((a, b) => {
        const ratingA = parseFloat(a.qualifying_loss.replace('£', '').replace('+', ''));
        const ratingB = parseFloat(b.qualifying_loss.replace('£', '').replace('+', ''));
        return ratingB - ratingA;  // Sort in descending order
    });
}

export function sort_rows_by_potential_profit(rows) {
    return rows.sort((a, b) => {
        const ratingA = parseFloat(a.potential_profit.replace('£', '').replace('+', ''));
        const ratingB = parseFloat(b.potential_profit.replace('£', '').replace('+', ''));
        return ratingB - ratingA;  // Sort in descending order
    });
}

export function sort_rows_by_ROI(rows) {
    return rows.sort((a, b) => {
        const ratingA = parseFloat(a.ROI.replace('%', ''));
        const ratingB = parseFloat(b.ROI.replace('%', ''));
        return ratingB - ratingA;  // Sort in descending order
    });
}

export function sort_rows_by_date_and_time(rows) {
    return rows.sort((a, b) => {
        const dateA = parseDateAndTime(a.date_and_time);
        const dateB = parseDateAndTime(b.date_and_time);
        return dateA - dateB;
    });
}

export function parseDateAndTime(dateString) {
    const [date, time] = dateString.split(' ');
    const [day, month, year] = date.split('/');
    const [hour, minute] = time.split(':');
    const fullYear = parseInt(year, 10) + 2000;
    return new Date(fullYear, parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10));
}

export function get_bookmaker_image(bookmaker) {
    if (bookmakerImages[bookmaker]) {
        return bookmakerImages[bookmaker];
    } else {
        return get_exchange_image(bookmaker)
    }
}

export function get_exchange_image(exchange) {
    if (exchangeImages[exchange]) {
        return exchangeImages[exchange];
    } else {
        console.log("No image found for exchange:", exchange);
        return null; // Or a default URL if you prefer
    }
}

export function get_sport_icon_url(sport) {
    if (sportIconUrlsStandard[sport]) {
        return sportIconUrlsStandard[sport];
    } else {
        console.log("No icon URL found for sport:", sport);
        return null; // Or a default URL if you prefer
    }
}










export function filterData(scope, state) {
    state.currentPage = 1;
    sort_data(state.current_sort, state);
    state.filteredData = state.filter_function(state.globalData, state.globalFilters);
        
    setupPagination(scope, state);

}

export function setupPagination(scope, state) {

    if (!state.is_premium_member) {
        state.filteredData = state.filteredData.slice(0, 3);
    }

    let rows_to_send = state.filteredData;
    let totalPages = Math.ceil(rows_to_send.length / state.rowsPerPage);

    displayRows(scope, rows_to_send, state, totalPages);

    scope.getElementById('prev-page').onclick = () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            displayRows(scope, rows_to_send, state, totalPages);
        }
    };

    scope.getElementById('next-page').onclick = () => {
        if (state.currentPage < totalPages) {
            state.currentPage++;
            displayRows(scope, rows_to_send, state, totalPages);
        }
    };
}

export function displayRows(scope, rows, state, totalPages) {

    const start = (state.currentPage - 1) * state.rowsPerPage;
    const end = start + state.rowsPerPage;
    const paginatedItems = rows.slice(start, end);

    let body_selector = '.mobile-container';
    if (state.is_desktop) {
        body_selector = 'table.table tbody';
    }

    scope.querySelector(body_selector).innerHTML = '';
    scope.querySelector('.not_premium_member_row')?.remove();

    if (state.filteredData.length == 0) {
        add_no_data_row(scope, state);
    }

    appendRows(paginatedItems, scope, state);

    add_lock_if_premium(scope, state);

    scope.getElementById('pagination-info').textContent = `Page ${state.currentPage} of ${totalPages}`;
    
    if (totalPages == 0) {
        scope.getElementById('pagination-info').textContent = `Page 0 of 0`;
    }


}

export function appendRows(rows, scope, state) {
    rows.forEach(row => {
        state.create_row_function(row, scope, state);
    });

    if (state.is_desktop && state.oddsmatcher_type == 'dutching') {
        check_if_showing_third_bet_dutching(scope, state);
    }
}

export function add_no_data_row(scope, state) {
    let no_data_row;
    let no_data_content = `
        <div class="no-data-div">
            <h2>No Data Collected Yet... Please Wait or Adjust the Filters</h2>
        </div>
    `;

    if (state.is_desktop) {
        no_data_row = document.createElement('tr');
        no_data_row.setAttribute('id', 'noDataRow');
        const td = document.createElement('td');
        td.setAttribute('colspan', '100%');
        td.setAttribute('class', 'no-data-div-td');
        td.innerHTML = no_data_content;
        no_data_row.appendChild(td);
    } else {
        no_data_row = document.createElement('div');
        no_data_row.setAttribute('id', 'noDataRow');
        no_data_row.innerHTML = no_data_content;
    }

    let body_selector = '.mobile-container';
    if (state.is_desktop) {
        body_selector = 'table.table tbody';
    }

    const tableBody = scope.querySelector(body_selector);
    tableBody.append(no_data_row);
}

export function add_loading_row(scope, state) {
    let loadingrow;
    let loadingContent = `
        <div class="loading">
            <div class="neon-pulse">
                <div class="neon-bar"></div>
                <div class="neon-bar"></div>
                <div class="neon-bar"></div>
                <div class="neon-bar"></div>
            </div>
            <h2 class="loading-text">Collecting Bookmaker Data...</h2>
        </div>
    `;

    if (state.is_desktop) {
        loadingrow = document.createElement('tr');
        loadingrow.setAttribute('id', 'loadingScreenRow');
        const td = document.createElement('td');
        td.setAttribute('colspan', '100%');
        td.setAttribute('class', 'loading-row-td');
        td.innerHTML = loadingContent;
        loadingrow.appendChild(td);
    } else {
        loadingrow = document.createElement('div');
        loadingrow.setAttribute('id', 'loadingScreenRow');
        loadingrow.innerHTML = loadingContent;
    }

    let body_selector = '.mobile-container';
    if (state.is_desktop) {
        body_selector = 'table.table tbody';
    }

    const tableBody = scope.querySelector(body_selector);
    tableBody.append(loadingrow);
}


export function add_lock_if_premium(scope, state) {

    if (!state.is_premium_member && state.filteredData.length != 0) {
        
        if (!state.is_desktop) {
            const blurredRows = scope.querySelectorAll('.outer-mobile-card');
            blurredRows.forEach(row => {
                const box = document.createElement('div');
                box.setAttribute('class', 'box3');
                box.innerHTML = `
                    <div class="outer_div_upgrade">
                        <a class="upgrade-button">Upgrade to Premium <svg fill="#ffffff" class="padlock-image-button" alt="Padlock" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path> </g> </g></svg></a>
                    </div>
                `;
                
                row.style.position = 'relative';
                row.appendChild(box);
                box.style.display = 'flex';
            });

            // set the pagination to hidden
            scope.querySelector('#pagination-container').style.display = 'none';

        } else {
            
            let body = scope.querySelector('table.table tbody');
            body.classList.add('blurred_tbody');

            const box3 = scope.querySelector('.box3');
            if (box3) {
                box3.remove();
            }

            // then need to add upgrade to premium button to the table
            const row = scope.querySelector('table.table');
            const box = document.createElement('div');
            box.setAttribute('class', 'box3');
            box.innerHTML = `
                <div class="outer_div_upgrade">
                    <a class="upgrade-button">Upgrade to Premium <svg fill="#ffffff" class="padlock-image-button" alt="Padlock" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path> </g> </g></svg></a>
                </div>
            `;
            
            row.insertBefore(box, row.firstChild);
            box.style.display = 'flex';
            

        }

    } else if (state.is_desktop) {
        scope.querySelector('table.table tbody').classList.remove("blurred_tbody");
        const box3 = scope.querySelector('.box3');
        if (box3) {
            box3.remove();
        }
    }
}











function check_if_showing_third_bet_dutching(scope, state) {

    const placeLayOddsItems = scope.querySelectorAll('.place_lay_odds_data');

    let has_third_bet_display = 'none';
    
    for (const rowItem of placeLayOddsItems) {
        if (!rowItem.classList.contains('hide_data')) {
            has_third_bet_display = 'table-cell';
        }
    }

    const layOddsHeader = scope.querySelector('#place_lay_odds_header');
    const layOddsTds = scope.querySelectorAll('td.hide_data');


    if (layOddsHeader) {
        layOddsHeader.style.display = has_third_bet_display;
    }
    layOddsTds.forEach(td => {
        td.style.display = has_third_bet_display;
    });

}




export function getCheckedOptions(containerId, scope) {
    const container = scope.querySelector(containerId);
    const labels = container.querySelectorAll('label');
    const checkedOptions = [];

    labels.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox && !checkbox.classList.contains('select-all') && checkbox.checked) {
            checkedOptions.push(label.textContent.trim());
        }
    });

    return checkedOptions;
}













export function add_listener_for_whole_oddsmatcher(scope, state) {
    scope.addEventListener('click', (event) => {

        process_click_message_info_select_and_upgrade(scope, event, state);
        
    });

    add_event_listener_for_saved_filters(scope, '#filters-dropdown-select-container', '#filters-dropdown-options', state);
    if (!state.is_desktop) {
        add_event_listener_for_saved_filters(scope, '#sorting-dropdown-select-container', '#sorting-dropdown-options', state);
    }
}


export function process_click_message_info_select_and_upgrade(scope, event, state) {

    let rowobj = getRowObjById(event.target.getAttribute('data-id'), state); 

    let message_type;


    if (event.target.className === 'upgrade-button' || event.target.closest('.upgrade-button')) {
        message_type = 'Upgrade';
    }

    if (event.target.closest('.mobile-card') && !event.target.classList.contains('logo-img') && state.is_premium_member) {
        if (event.target.classList.contains('outer-mobile-card')) {
            console.log('already have row id');
        } else {
            const outerCard = event.target.closest('.outer-mobile-card');
            if (outerCard) {
                rowobj = getRowObjById(outerCard.getAttribute('data-id'), state);
            }
        }        
        message_type = 'Select-Event';
    }

    if (event.target.className === 'get-alerts-button' || event.target.className === 'get_alerts_img') {
        message_type = 'Get-Alerts';
    }

    if (event.target.className === 'select_button') {
        rowobj = getRowObjById(event.target.getAttribute('data-id'), state);
        message_type = 'Select-Event';
    }

    let message = {
        row: rowobj
    };
        
    const raise_event = new CustomEvent(message_type, {
        detail: message,  
        bubbles: true,       // Allows the event to bubble up through the DOM
        composed: true        // Allows the event to pass through shadow DOM boundaries
    });
    scope.dispatchEvent(raise_event); 
}

export function getRowObjById(rowId, state) {
    return state.globalData.find(item => item._id === rowId);
}

export function add_event_listener_for_saved_filters(scope, button_select, button_options, state) {
    let container = scope.querySelector(button_select)

    container.addEventListener('click', (event) => {
        event.stopPropagation();

        if (scope.querySelector(button_options).style.display == 'block') {
            scope.querySelector(button_options).style.display = 'none'
            container.classList.remove('border-radius-bottom-none')
        } else {
            closeAllDropdowns(scope, state);
            scope.querySelector(button_options).style.display = 'block';
            container.classList.add('border-radius-bottom-none')
        }
    });
}


export function closeAllDropdowns(scope, state) {
    const dropdowns = scope.querySelectorAll('.dropdown-options');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });

    let dropdown_corners = scope.querySelectorAll('.custom-select-container:not(.select-filters-container)');

    dropdown_corners.forEach((dropdown) => {
        dropdown.classList.remove('border-radius-bottom-none')
    });

    scope.querySelector('#filters-dropdown-options').style.display = 'none';
    scope.querySelector('#filters-dropdown-select-container').classList.remove('border-radius-bottom-none')

    if (!state.is_desktop) {
        scope.querySelector('#sorting-dropdown-options').style.display = 'none';
        scope.querySelector('#sorting-dropdown-select-container').classList.remove('border-radius-bottom-none')
    }
}



export function add_event_listener_for_show_filters_switch(scope, state) {

    let filter_switch = scope.querySelector('.show_filters_switch');
    let filters_container = scope.querySelector('#filter-panel-container');
    let covering_filters = scope.querySelector('#covering_filters');

    filter_switch.addEventListener('change', () => {

        if (!filter_switch.checked) {
            filters_container.style.display = 'none';
            covering_filters.style.display = 'none';

        } else {
            filters_container.style.display = 'flex';
            if (state.is_premium_member) {
                covering_filters.style.display = 'none';
            } else {
                covering_filters.style.display = 'flex';
            }
        }
                
    });
}








export function go_to_input_and_update_global_for_the_input(filterId, scope, globalFilters, state) {

    const filterInfo = state.filter_info.find(filter => filter.input_id === filterId);
    
    if (!filterInfo) {
        return globalFilters;
    }

    const filterName = filterInfo.name;

    switch (filterInfo.type) {
        case 'list':
            globalFilters[filterName] = getCheckedOptions(`#${filterInfo.filter_id}`, scope);
            break;

        case 'string':
            globalFilters[filterName] = scope.getElementById(filterInfo.filter_id).value;
            break;

        case 'number':
            const value = scope.getElementById(filterInfo.filter_id).value;
            globalFilters[filterName] = parseFloat(value) || null;
            break;
    }

    return globalFilters;
}

export function check_if_dropdown_matches_global_filter_settings(scope, state) {

    let keys = Object.keys(state.customFilters)

    let filtersDropdown = scope.querySelector('#filters-select');

    remove_all_option_style(scope, '.dropdown-option-filter');

    let found_match = false;

    keys.forEach((key) => {

        let adjusted_global_filters = {};
        
        state.filter_info.forEach(filter => {
            const name = filter.name;
            const value = state.globalFilters[name];
            
            if (filter.type === 'list') {
                adjusted_global_filters[name] = value ? value.slice() : [];
            } else if (filter.type === 'string') {
                adjusted_global_filters[name] = value || "";
            } else if (filter.type === 'number') {
                adjusted_global_filters[name] = value || "null";
            }
        });

        if (deepEqual(state.customFilters[key], adjusted_global_filters)) {

            filtersDropdown.value = key;

            set_background_for_current_option(key, scope, '.dropdown-option-filter')

            found_match = true;

        }
    });


    if (!found_match) {

        filtersDropdown.value = 'Select Filter';

    }
}

export function remove_all_option_style(scope, option_name) {
    let option_divs = scope.querySelectorAll(option_name);
    option_divs.forEach((option) => {
        option.classList.remove('active');
    });
}

export function deepEqual(obj1, obj2) {

    if (obj1 === obj2) {
        return true;
    }
    if (obj1 == null || typeof obj1 != "object" || obj2 == null || typeof obj2 != "object") {
        return false;
    }

    let keysA = Object.keys(obj1), keysB = Object.keys(obj2);
    if (keysA.length != keysB.length) {
        
        return false;
    }

    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}





export function set_background_for_current_option(name, scope, option_name) {
    remove_all_option_style(scope, option_name);

    let option_divs = scope.querySelectorAll(option_name);
    option_divs.forEach((option) => {
        if (option.dataset.value == name) {
            option.classList.add('active');
        }
    });
}








export function updateGlobalFilters(filterId, scope, state) {
    state.globalFilters = go_to_input_and_update_global_for_the_input(filterId, scope, state.globalFilters, state);
    check_if_dropdown_matches_global_filter_settings(scope, state);
    filterData(scope, state);
}


export function function_that_takes_global_filters_and_appends_it_to_current_with_name(name_for_filter, state) {

    let is_delete_option = false;

    if (!name_for_filter) {
        return {
            filters_to_send: null,
            is_delete: false
        };
    }

    // Check if the filter name already exists and log the action
    if (state.customFilters.hasOwnProperty(name_for_filter)) {
        console.log("Duplicate filter name provided; updating existing filter.");
        is_delete_option = true;
    } else {
        console.log("Adding new filter:", name_for_filter);
    }

    state.customFilters[name_for_filter] = {};
    
    state.filter_info.forEach(filter => {
        const name = filter.name;
        const value = state.globalFilters[name];
        
        if (filter.type === 'list') {
            state.customFilters[name_for_filter][name] = value ? value.slice() : [];
        } else if (filter.type === 'string') {
            state.customFilters[name_for_filter][name] = value || "";
        } else if (filter.type === 'number') {
            state.customFilters[name_for_filter][name] = value || "null";
        }
    });

    return {

        filters_to_send: state.customFilters[name_for_filter],
        is_delete: is_delete_option

    }

}














export function append_options_for_the_four_filter_dropdowns(containerId, optionsList, scope) {

    const container = scope.querySelector(containerId);
    optionsList.forEach(option => {

        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = true;
        let span = document.createElement('span'); // Create span for custom checkbox
        label.appendChild(input);
        label.appendChild(span); // Append span to label
        label.appendChild(document.createTextNode(option));
        container.appendChild(label);
    });

}

export function removeOptionFromDropdown(name_for_filter, scope) {
            
    const filtersDropdown = scope.getElementById('filters-dropdown-select-container');

    console.log('removing specific option')
    
    let optionToRemove = filtersDropdown.querySelector(`div[data-value="${name_for_filter}"]`);
    
    if (optionToRemove) {
        // Remove the found option from the dropdown
        optionToRemove.remove();
        console.log(`Option with value '${name_for_filter}' removed.`);
    } else {
        // Log if the option was not found
        console.log(`Option with value '${name_for_filter}' not found.`);
    }
}








export function open_text_box_and_confirm(scope, state) {

    if (!state.is_desktop) {
        scope.querySelector('.above_columns_row.init_hidden_row_above_columns').classList.remove('hidden_row_above_columns')
    } else {

        let all_items = scope.querySelectorAll('.above_columns_item')
        all_items.forEach(item => {
            item.classList.add('hidden_row_above_columns')
        })

        let hidden_items = scope.querySelectorAll('.above_columns_item.init_hidden_row_above_columns')
        hidden_items.forEach(item => {
            item.classList.remove('hidden_row_above_columns')
        })

        scope.querySelector('.above_columns_row').style.justifyContent = 'center';

    }
}


export function close_boxes(scope, state) {

    let filter_name_label = scope.querySelector('#type-filter-name');
    filter_name_label.textContent = 'Filter Name';

    scope.querySelector('#get-filter-name').value = '';

    if (!state.is_desktop) {
        scope.querySelector('.above_columns_row.init_hidden_row_above_columns').classList.add('hidden_row_above_columns')
    } else {

        let all_items = scope.querySelectorAll('.above_columns_item')
        all_items.forEach(item => {
            item.classList.remove('hidden_row_above_columns')
        })

        let hidden_items = scope.querySelectorAll('.above_columns_item.init_hidden_row_above_columns')
        hidden_items.forEach(item => {
            item.classList.add('hidden_row_above_columns')
        })

        scope.querySelector('.above_columns_row').style.justifyContent = 'space-evenly';

    }
}

export function get_name_and_close_boxes(scope, state) {

    let filter_name_label = scope.querySelector('#type-filter-name');

    let filter_name = scope.querySelector('#get-filter-name').value;

    if (filter_name == '') {


        if (!filter_name_label.textContent.includes('Enter a Valid Name')) {

            let newSpan = document.createElement('span');
            let nSpan = document.createElement('span');
            nSpan.textContent = ' ------ ';
            newSpan.textContent = 'Enter a Valid Name';
            newSpan.style.color = '#ff0000'; // Red color for the appended text
            filter_name_label.appendChild(nSpan);
            filter_name_label.appendChild(newSpan);

            setTimeout(() => {

                filter_name_label.textContent = 'Filter Name';
                
            }, 6000);
        
        }


        return '';


    }

    close_boxes(scope, state);

    return filter_name;

}

export function make_filter_selection_value_as_saved(filter_name, scope) {

    let filtersDropdown = scope.querySelector('#filters-select');
    filtersDropdown.value = filter_name;

}

export function confirm_filter_click(scope, state) {

    let filter_name = get_name_and_close_boxes(scope, state);

    // FUNCTION THAT TAKES GLOBAL FILTERS AND ADDS IT TO CUSTOM FILTERS BEFORE IT GOES INTO THE OPTIONS FOR THE DROPDOWN
    const obj = function_that_takes_global_filters_and_appends_it_to_current_with_name(filter_name, state);

    if (filter_name == '') {return;}

    // REMOVE FROM DROP DOWN IF THERE IS ALREADY SOMETHING WITH THAT NAME
    if (obj.is_delete) { removeOptionFromDropdown(filter_name, scope); }

    // APPEND FILTER TO OPTIONS USING JUST THE NAME AS IT GETS THE VALUE IN THE FUNCTION

    append_filter_name_to_filter_options_in_dropdown(filter_name, scope, state);

    // MAKE THE FILTER THE SELECTED FILTER AFTER IT'S CREATED

    make_filter_selection_value_as_saved(filter_name, scope);

    remove_all_option_style(scope, '.dropdown-option-filter');

    set_background_for_current_option(filter_name, scope, '.dropdown-option-filter')

    const raise_event = new CustomEvent('Save-Filter', {
        detail: { filter_name: filter_name, filters: obj.filters_to_send },  
        bubbles: true,       // Allows the event to bubble up through the DOM
        composed: true        // Allows the event to pass through shadow DOM boundaries
    });
    scope.dispatchEvent(raise_event); 
}



export function append_options_for_dropdowns(scope, state) {

    for (const filter of state.filter_info) {
        if (filter.type === 'list') {
            // Dynamically access the global variable using the list_values_source property
            const listValuesSource = filter.list_values_source;
            let listValues = [];
            
            if (listValuesSource) {
                // Access the global variable by name
                if (window[listValuesSource]) {
                    const sourceValue = window[listValuesSource];
                    
                    // Check if the source is an array or an object
                    if (Array.isArray(sourceValue)) {
                        // If it's an array, use it directly
                        listValues = sourceValue;
                    } else if (typeof sourceValue === 'object') {
                        // If it's an object, get its keys
                        listValues = Object.keys(sourceValue);
                    } else {
                        console.warn(`Global variable ${listValuesSource} is neither an array nor an object`);
                    }
                } else {
                    console.warn(`Global variable ${listValuesSource} not found`);
                }
            }
            
            append_options_for_the_four_filter_dropdowns(
                `#${filter.filter_id}`,
                listValues,
                scope
            );
        }
    }
    create_event_listeners_for_select_containers(scope, state);
}

export function create_event_listeners_for_select_containers(scope, state) {

    const selectContainers = scope.querySelectorAll('.custom-select-container:not(.select-filters-container)');

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

    scope.addEventListener('click', (event) => {
        if (!event.target.closest('.custom-select-container:not(.select-filters-container)')) {
            closeAllDropdowns(scope, state);
        }
    });


    const textInputs = scope.querySelectorAll('.text-input');
    textInputs.forEach(input => {
        input.addEventListener('input', () => updateGlobalFilters(input.id, scope, state));
    });


    state.filter_info.forEach(filter => {
        if (filter.type === 'string') {
            scope.getElementById(filter.input_id).addEventListener('change', () => 
                updateGlobalFilters(filter.input_id, scope, state)
            );
        }
    });


}









export function sort_data_on_click(sortValue, scope, state) {
    
    state.current_sort = sortValue;
    
    filterData(scope, state);

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
            return loadExternalScript(general_info_script);
        })
        .then(() => {
            // Now we are sure the script is loaded, we can safely call this function
            state.set_bookmakers_and_exchanges_function(scope, state); 
        })
        .catch(error => {
            // Catch any errors that occur during the fetch or script loading
            console.error('Error loading script or processing data:', error);
        });
}


function make_sort_button_highlighted_desktop(scope, state) {

    let sort_icons = scope.querySelectorAll('.sort_by');

    sort_icons.forEach(icon => {
        if (icon.getAttribute('data-sort') === state.current_sort) {
            icon.classList.add('sort_by_highlighted');
        } else {
            icon.classList.remove('sort_by_highlighted');
        }
    })

}


function add_event_listener_for_sorting_desktop(scope, state) {

    scope.querySelector('.table-header').addEventListener('click', (event) => {
        if (event.target.className === 'sort_by') {
            sort_data_on_click(event.target.getAttribute('data-sort'), scope, state)
            make_sort_button_highlighted_desktop(scope, state);
        }
    })

    make_sort_button_highlighted_desktop(scope, state);

}


function add_desktop_table_header(scope, state) {
    // loop through the desktop_header_columns array and add the html to the table header
    const tr = document.createElement('tr');
    state.desktop_header_columns.forEach(column => {
        tr.innerHTML += DesktopHeaderDictionary[column];
    });
    scope.querySelector('thead.table-header').appendChild(tr);
}


export function runSpecificScript(scope, state) {

    // set the inner html of the header using the js
    if (state.is_desktop) {
        add_desktop_table_header(scope, state);
        add_event_listener_for_sorting_desktop(scope, state);
    }


    // Generate the filter panel dynamically
    generateFilterPanel(scope, state);


    scope.querySelector('.save-filter-button').addEventListener('click', () => { open_text_box_and_confirm(scope, state); });
    scope.querySelector('.cancel-making-filter').addEventListener('click', () => { close_boxes(scope, state); });
    scope.querySelector('.confirm-filter-name').addEventListener('click', () => { confirm_filter_click(scope, state); });
    
    let filter_name_first = 'No Filter';
    append_filter_name_to_filter_options_in_dropdown(filter_name_first, scope, state);


    // add in sorting options using js
    state.sort_options.forEach(option => {
        append_sort_to_sort_options(option.text, option.value, scope, state);
    });
    

    add_listener_for_whole_oddsmatcher(scope, state);
    add_event_listener_for_show_filters_switch(scope, state);
    make_timer_run_and_add_event_listener(scope, state);


    append_options_for_dropdowns(scope, state)


    // if is tutorial is true, make it select all .above_columns_row and add the class .hidden_row_above_columns EXCEPT FOR THE LAST ROW
    // so tutorial only shows refresh and timer
    if (state.is_tutorial) {
        const rows = scope.querySelectorAll('.above_columns_row');
        rows.forEach((row, index) => {
            if (index < rows.length - 1) {
                row.classList.add('hidden_row_above_columns');
            }
        });
    }
    
}












export function generateFilterPanel(scope, state) {

    const filterPanel = scope.getElementById('filter-panel-container');
    
    // Add the covering filters div with padlock
    const coveringFilters = document.createElement('div');
    coveringFilters.className = 'box2';
    coveringFilters.id = 'covering_filters';
    coveringFilters.innerHTML = `
        <svg fill="#ffffff" id="filters_padlock" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g id="XMLID_509_">
                    <path id="XMLID_510_"
                        d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z">
                    </path>
                </g>
            </g>
        </svg>
    `;
    filterPanel.appendChild(coveringFilters);

    // Group filters into pairs
    for (let i = 0; i < state.filter_info.length; i += 2) {
        const filterRow = document.createElement('div');
        filterRow.className = 'filter-row';
        
        // Process first filter in pair
        const filter1 = state.filter_info[i];
        const filterItem1 = createFilterItem(filter1, state);
        filterRow.appendChild(filterItem1);

        // Process second filter in pair if it exists
        if (i + 1 < state.filter_info.length) {
            const filter2 = state.filter_info[i + 1];
            const filterItem2 = createFilterItem(filter2, state);
            filterRow.appendChild(filterItem2);
        }

        filterPanel.appendChild(filterRow);
    }
}

function formatFilterText(text, state) {
    let formattedText = text;
    
    // Handle special cases based on oddsmatcher type
    if (state.oddsmatcher_type === 'each_way' || state.oddsmatcher_type === 'extra_place') {
        if (text.toLowerCase().includes('back')) {
            formattedText = text.replace(/back/i, ' E/W ');
            return formattedText.charAt(0).toUpperCase() + formattedText.slice(1); // Return early to avoid the space-adding regex
        }
    }
    
    // Handle ROI case
    if (formattedText.toLowerCase().includes('roi')) {
        return formattedText.charAt(0).toUpperCase() + formattedText.slice(1).replace('ROI', ' ROI');
    }
    
    return formattedText.charAt(0).toUpperCase() + formattedText.slice(1).replace(/([A-Z])/g, ' $1');
}

function createFilterItem(filter, state) {
    const filterItem = document.createElement('div');
    filterItem.className = 'filter-item';

    const label = document.createElement('label');
    label.className = 'filter-label';
    label.htmlFor = filter.input_id;
    label.textContent = formatFilterText(filter.name, state);
    filterItem.appendChild(label);

    if (filter.type === 'list') {
        // Create dropdown container
        const dropdownContainer = document.createElement('div');
        dropdownContainer.id = filter.input_id;
        dropdownContainer.className = 'custom-select-container';
        dropdownContainer.tabIndex = '0';

        // Create trigger
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        const input = document.createElement('input');
        input.id = filter.input_id;
        input.type = 'text';
        input.value = formatFilterText(filter.name, state);
        input.readOnly = true;
        trigger.appendChild(input);
        dropdownContainer.appendChild(trigger);

        // Create options container
        const options = document.createElement('div');
        options.className = 'dropdown-options';
        options.id = filter.filter_id;

        // Add select all option
        const selectAllLabel = document.createElement('label');
        const selectAllCheckbox = document.createElement('input');
        selectAllCheckbox.type = 'checkbox';
        selectAllCheckbox.className = 'select-all';
        selectAllCheckbox.checked = true;
        const selectAllSpan = document.createElement('span');
        selectAllLabel.appendChild(selectAllCheckbox);
        selectAllLabel.appendChild(selectAllSpan);
        selectAllLabel.appendChild(document.createTextNode(`Select All ${formatFilterText(filter.name, state)}`));
        options.appendChild(selectAllLabel);

        dropdownContainer.appendChild(options);
        filterItem.appendChild(dropdownContainer);
    } else if (filter.type === 'string') {
        // Create select for date range
        const select = document.createElement('select');
        select.id = filter.input_id;
        select.className = 'custom-input-container';
        
        const options = [
            { value: '', text: 'All' },
            { value: '1h', text: 'Next Hour' },
            { value: '12h', text: 'Next 12 Hours' },
            { value: '24h', text: 'Next 24 Hours' },
            { value: 'today', text: 'Today' },
            { value: 'tomorrow', text: 'Tomorrow' },
            { value: 'today-tomorrow', text: 'Today and Tomorrow' },
            { value: '3days', text: 'Next 3 Days' }
        ];

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
        });

        filterItem.appendChild(select);
    } else if (filter.type === 'number') {
        // Create input for number values
        const input = document.createElement('input');
        input.className = 'text-input';
        if (filter.name.toLowerCase().includes('liquidity') || filter.name.toLowerCase().includes('loss') || filter.name.toLowerCase().includes('profit') || filter.name.toLowerCase().includes('roi')) {
            input.className += ' currency_in_input';
            // Create container div only for currency inputs
            const inputContainer = document.createElement('div');
            inputContainer.className = 'text-input-container';
            inputContainer.appendChild(input);
            if (filter.name.toLowerCase().includes('roi')) {
                inputContainer.className += ' text-input-container-roi';
            }
            filterItem.appendChild(inputContainer);
        } else {
            filterItem.appendChild(input);
        }
        input.id = filter.input_id;
        input.placeholder = formatFilterText(filter.name, state);
        input.autocomplete = 'off';
    }

    return filterItem;
}