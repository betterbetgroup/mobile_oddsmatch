

const MAX_WIDTH_FOR_MOBILE = 700;

let delay_for_filtering_data = 300;


let above_columns_items_dict = {
    'offers available': `<div class="div-outside-info">
                            <div class="title_text" >Offers Available</div>
                            <div class="info_text offers_value" >0</div>
                        </div>`,

    'profit available': `<div class="div-outside-info">
                            <div class="title_text" >Profit Available</div>
                            <div class="info_text profit_value" >£0</div>
                        </div>`,

    'guides read': `<div class="div-outside-info">
                        <div class="title_text" >Guides Read</div>
                        <div class="info_text guides_read_value" >0/0</div>
                    </div>`,

    'races left': `<div class="div-outside-info">
                    <div class="title_text" >Races Left</div>
                    <div class="info_text races_left_value" >0</div>
                </div>`,

    'search': `<div class="div-outside-filter-dropdown">
                    <input class="text-input"  id="search-bookmakers" placeholder="Search bookmakers..." autocomplete="off">
                </div>`,

    'search guides': `<div class="div-outside-filter-dropdown">
        <input class="text-input"  id="search-bookmakers" placeholder="Search guides..." autocomplete="off">
    </div>`,

    'search races': `<div class="div-outside-filter-dropdown">
        <input class="text-input"  id="search-bookmakers" placeholder="Search races..." autocomplete="off">
    </div>`,


    'sort': `<div class="div-outside-filter-dropdown">
                <div id="sorting-dropdown-select-container" class="custom-select-container select-filters-container" tabindex="0">
                    <div class="custom-select-trigger" >
                        <input id="sorting-select" type="text" value="Sort By" readonly>
                    </div>
                    <div class="dropdown-options" id="sorting-dropdown-options">
                    </div>
                </div>
            </div>`,

    'hidden switch': `<div class="div-outside-switch">
                        <div class="switch_container" data-tooltip="Show Complete Offers">
                            <label class="switch">
                                <input type="checkbox" class="show_filters_switch" id="show-hidden-offers-switch">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>`, 

    'hidden switch guides': `<div class="div-outside-switch">
                    <div class="switch_container" data-tooltip="Show Guides Read">
                        <label class="switch">
                            <input type="checkbox" class="show_filters_switch" id="show-hidden-offers-switch">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>`
}













// ! CODE INDEX
// First section is functions called at beggining of script - including functions within
// Second section is functions called when filtering and displaying items and offers left info etc
// Third is to do with above columns display and functionality
// Fourth section is event listeners made at the start
// Fifth section is functions communicating with wix
// Sixth section is some functions also in oddsmatcher helper
// Seventh section is for weekly only functions














// these are called from main js at the start
// kind of in order - some parts also require list specific changes
// !! THIS SHOULD BE NO BACKGROUND LOADING THING
export function add_loading_row(scope, state) {

    // this doesn't run as it waits for is_desktop first

    const loadingrow = document.createElement('div');
    loadingrow.setAttribute('id', 'loadingScreenRow'); 
    loadingrow.innerHTML = `

        <td colspan="100%" style="padding: 0;">
            <div class="loading">
                <div class="neon-pulse">
                    <div class="neon-bar"></div>
                    <div class="neon-bar"></div>
                    <div class="neon-bar"></div>
                    <div class="neon-bar"></div>
                </div>
                <h2 class="loading-text">Collecting Offer Data...</h2>
            </div>
        </td>

    `;

    const tableBody = scope.querySelector('#outer-container-div');
    tableBody.append(loadingrow);

}

function add_no_data_row(scope, state) {

    let no_data_text = 'No Offers Here...'
    if (state.list_type == 'reload') {
        if (state.is_available) {
            no_data_text = 'No Reload Offers Left Today...'
        } else {
            no_data_text = 'No Reload Offers Complete...'
        }
    }

    if (state.list_type == 'guides') {
        no_data_text = 'No Guides Here...'
    }

    if (state.list_type == 'extra_places') {
        no_data_text = 'No Extra Places Races Left...'
    }

    let no_data_row;
    let no_data_content = `
        <div class="no-data-div">
            <h2>${no_data_text}</h2>
        </div>
    `;

    no_data_row = document.createElement('tr');
    no_data_row.setAttribute('id', 'noDataRow');
    const td = document.createElement('td');
    td.setAttribute('colspan', '100%');
    td.setAttribute('class', 'no-data-div-td');
    td.innerHTML = no_data_content;
    no_data_row.appendChild(td);
    

    const tableBody = scope.querySelector('#outer-container-div');
    tableBody.append(no_data_row);
}

export function process_new_final_data(data, scope, state, page) {
    state.data_loaded_from_wix = true;
    data = JSON.parse(data);

    state.is_premium_member = data.premium_member;
    state.is_desktop = window.innerWidth > MAX_WIDTH_FOR_MOBILE;

    if (state.list_type == 'reload') {
        state.globalData = data.offer_data;
    }

    if (state.list_type == 'extra_places' || state.list_type == 'weekly' || state.list_type == 'sign_up') {
        state.globalData = data.offer_data;
        if (state.list_type == 'weekly' || state.list_type == 'sign_up') {
            // make the first three offers is_first_three_offers true
            state.globalData.forEach((item, index) => {
                if (index < 3) {
                    item.is_first_three_offers = true;
                } else {
                    item.is_first_three_offers = false;
                }
            });
        }
    }

    runSpecificScript(scope, state);

    page.style.visibility = 'visible'; 

    if (data.user_suo_object) {
        state.user_suo_object = data.user_suo_object;
        if (state.user_suo_object.length == 0) {
            create_user_suo_object_new(scope, state);
            send_user_suo_object_to_wix(scope, state);
        } else {
            // update the is_available values so they become available if they were not available more than 7 days ago
            change_available_status_on_object(scope, state);
        }
        display_items(scope, state);
    }

}

function adjust_classes_based_on_is_desktop(scope, state) {

    if (window.innerWidth > MAX_WIDTH_FOR_MOBILE) {
        if (state.list_type == 'guides') {
            scope.querySelector('.above-columns').classList.add('guides-above-columns');
            scope.querySelector('.item_container_div').classList.add('item_container_div_guides');
        }
        if (state.list_type == 'extra_places') {
            scope.querySelector('.above-columns').classList.add('guides-above-columns');
            scope.querySelector('.above-columns').classList.add('extra-places-above-columns');            
            scope.querySelector('.item_container_div').classList.add('item_container_div_extra_places');
        }
        return;
    }
    
    // first change it to be single file 
    scope.querySelector('.item_container_div').classList.add('item_container_div_mobile');

    scope.querySelector('.above_columns_row').classList.add('above_columns_row_mobile_outer');

    scope.querySelector('.above-columns').classList.add('new-above-columns');

    scope.querySelector('#outer-container-div').classList.add('outer-container-div-mobile');

}

// ! requires list specific changes
export function render(scope, state, html_script, general_info_script) {
    return fetch(html_script)
        .then(response => response.text())
        .then(html => {
            scope.innerHTML = html;
            if (state.list_type != 'guides') {
                return;
            } else {
                return loadExternalScript(general_info_script);
            }
        })
        .then(() => {
            if (state.list_type == 'guides') {
                if (typeof all_guides !== 'undefined') {
                    state.globalData = all_guides;
                    // make it create a bookmaker and offer description column
                    state.globalData = state.globalData.map(item => ({
                        ...item,
                        bookmaker: 'Guide - '
                    }));
                } else {
                    console.error('all_guides_object is undefined');
                }
            }
        })
        .catch(error => {
            console.error('Error loading script or processing data:', error);
        });
}

export function runSpecificScript(scope, state) {

    // use scope and on window resize run the function handleResize
    window.addEventListener('resize', () => { handleResize(scope); });

    // this is only used for weekly
    state.get_availability_text_function = get_availability_text;

    // this is only used for offer list pages
    state.create_offer_id_function = create_offer_id;

    adjust_classes_based_on_is_desktop(scope, state);

    // SHOULD CHANGE THE HTML BASED ON IS_DESKTOP
    add_in_above_columns_items(scope, state);

    // add in sorting options using js
    state.sort_options.forEach(option => {
        append_sort_to_sort_options(option.text, option.value, scope, state);
    });
    
    add_event_listeners(scope, state);

}

// creating the sup object using the glabal data to know all of the bookmakers
// involved creating the suo object
// ! involves list specific changes
function create_user_suo_object_new(scope, state) {
    
    state.globalData.forEach((row) => {

        const obj = {
            bookmaker_name: row.bookmaker,
            is_available: true,
            updated_time: new Date().toISOString(),
            offer_id: create_offer_id(row, state),
        }
        state.user_suo_object.push(obj)
    });
}

function create_offer_id(row, state) {


    // ADD IN FUNCTIONALITY SO IT DEPENDS ON STATE TYPE

    if (state.list_type == 'guides') {
        return (row.title).replace(/\s+/g, '-');
    } else if (state.list_type == 'extra_places') {
        return ('extra_places_id');
    } else if (state.list_type == 'weekly') {
        return (row.adjusted_title).toLowerCase().replace(/[^a-z0-9]/g, '_');
    } else if (state.list_type == 'sign_up') {
        return (row.bookmaker).replace(/\s+/g, '-');
    } else if (state.list_type == 'reload') {
        return (row.bookmaker + '_' + row.reworded_title + '_' + new Date().toISOString().split('T')[0]).toLowerCase().replace(/[^a-z0-9]/g, '_');
    }


}






















// ON FILTERING AND DISPLAYING ITEMS - in order - will obviously require list specific changes
// ! lots of list specific changes
function make_filtered_data_using_global_and_suo_object(scope, state) {

    state.filteredData = [];

    state.globalData.forEach((bookie) => {

        let foundMatch = false;  

        for (const userBookmaker of state.user_suo_object) {
            if (create_offer_id(bookie, state) === userBookmaker.offer_id) {
                foundMatch = true;
                
                if ((userBookmaker.is_available === true && state.is_available) ||
                    (userBookmaker.is_available === false && !state.is_available)) {
                        if (state.list_type == 'reload') {
                            const now = new Date();
                            const expiryDate = parseCustomDateReloads(bookie.expiry);
                            if (expiryDate > now) {
                                state.filteredData.push(bookie);
                            }
                        } 
                        else if (state.list_type == 'extra_places') {
                            // Check if race time has passed
                            const now = new Date();
                            const [hours, minutes] = bookie.race_time.split(':');
                            const raceTime = new Date();
                            raceTime.setHours(parseInt(hours), parseInt(minutes), 0);
                            if (raceTime > now) {
                                state.filteredData.push(bookie);
                            }
                        }
                        else {
                            state.filteredData.push(bookie);
                        }
                }
                
                break; // Exit the loop once we find a match
            }
        }

        if (!foundMatch && state.is_available) {
            state.filteredData.push(bookie);
        }
        if (!foundMatch) {

            state.user_suo_object.push({
                bookmaker_name: bookie.bookmaker,
                is_available: true,
                updated_time: new Date().toISOString(),
                offer_id: create_offer_id(bookie, state)
            })
            send_user_suo_object_to_wix(scope, state);
        }


    });

    filter_bookmakers_using_search(scope, state);
    sort_filtered_data(scope, state);

}

function display_items(scope, state) {

    if (!state.data_loaded_from_wix) {
        return;
    }

    make_filtered_data_using_global_and_suo_object(scope, state);
    
    scope.querySelector('.item_container_div').innerHTML = '';

    scope.querySelectorAll('#noDataRow').forEach(noDataRow => {
        noDataRow.style.display = 'none';
    });

    if (state.filteredData.length == 0) {
        add_no_data_row(scope, state);
    } 

    state.filteredData.forEach(row => {
        state.create_item_function(scope, state, row);
    });
    add_event_listener_for_switches(scope, state);

    if (state.list_type == 'guides') {
        get_and_display_guides_read(scope, state);
    } else if (state.list_type == 'extra_places') {
        get_and_display_races_left(scope, state);
    } else {
        get_and_display_profit_left_and_offers_left(scope, state);
    }

}

function parseCustomDateReloads(dateString) {
    const [dayName, day, month, time] = dateString.split(" ");
    const year = new Date().getFullYear();
    const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
    
    // Construct a full date string and return the Date object
    return new Date(`${year}-${String(monthIndex + 1).padStart(2, "0")}-${day}T${time}:00`);
}

function add_event_listener_for_switches(scope, state) {
    
    scope.querySelectorAll('.item_complete_switch').forEach(checkbox => {

        checkbox.addEventListener('change', () => {

            let rowobj = getRowObjById(scope, state, checkbox.getAttribute('data-id')); 

            rowobj.is_available = !checkbox.checked;

            rowobj.updated_time = new Date().toISOString();

            send_user_suo_object_to_wix(scope, state);

            setTimeout(() => {
                display_items(scope, state);
            }, delay_for_filtering_data);

        });

    });

}

function getRowObjById(scope, state, offer_id) {
    console.log(offer_id)
    console.log(state.user_suo_object)
    return state.user_suo_object.find(item => item.offer_id === offer_id);
}

function get_and_display_profit_left_and_offers_left(scope, state) {
    
    let offers_left = 0;
    let profit_left = 0;
    let total_offers = 0;
    let total_profit = 0;

    state.globalData.forEach(item => {

        const userEntry = state.user_suo_object.find(userItem => userItem.offer_id === create_offer_id(item, state));

        if (state.list_type == 'reload') {
            if (parseCustomDateReloads(item.expiry) <= new Date()) {
                return;
            }
        } 

        total_offers += 1;
        if (item.profit_amount == 'N/A') {
            item.profit_amount = '0';
        }
        if (item.profit_amount) {
            if (state.list_type == 'reload') {
                total_profit += parseFloat(item.profit_amount.replace('£', '').replace('N/A', '0'));
            } else {
                total_profit += parseFloat(item.profit_amount.replace('£', '').replace('Varies', '0'));
            }
        }

        if (userEntry && userEntry.is_available) {
            offers_left += 1;
            if (item.profit_amount) {
                if (state.list_type == 'reload') {
                    profit_left += parseFloat(item.profit_amount.replace('£', '').replace('N/A', '0'));
                } else {
                    profit_left += parseFloat(item.profit_amount.replace('£', '').replace('Varies', '0'));
                }
            }
        }
    });

    display_profit_and_offers_left(scope, state, offers_left, profit_left, total_offers, total_profit);

}

function display_profit_and_offers_left(scope, state, offers_left, profit_left, total_offers, total_profit) {
    
    scope.querySelector('.profit_value').textContent = '£' + profit_left.toFixed(2);

    scope.querySelector('.offers_value').textContent = offers_left + '/' + total_offers;

    scope.querySelectorAll('.info_text').forEach(text => {
        text.style.visibility = 'visible';
    });

}

function get_and_display_guides_read(scope, state) {

    let guides_read = 0;
    let total_guides = 0;

    state.globalData.forEach(item => {

        const userEntry = state.user_suo_object.find(userItem => userItem.offer_id === create_offer_id(item, state));

        total_guides += 1;

        if (userEntry && !userEntry.is_available) {
            guides_read += 1;
        }

    });

    display_guides_read(scope, state, guides_read, total_guides);

}

function display_guides_read(scope, state, guides_read, total_guides) {

    let guides_read_text = scope.querySelector('.guides_read_value');

    guides_read_text.textContent = guides_read + '/' + total_guides;

    scope.querySelectorAll('.info_text').forEach(text => {
        text.style.visibility = 'visible';
    });

}

function get_and_display_races_left(scope, state) {

    let races_left = 0;

    state.globalData.forEach(item => {

        const now = new Date();
        const [hours, minutes] = item.race_time.split(':');
        const raceTime = new Date();
        raceTime.setHours(parseInt(hours), parseInt(minutes), 0);
        if (raceTime > now) {
            races_left += 1;
        }

    });

    display_races_left(scope, state, races_left);

}

function display_races_left(scope, state, races_left) {

    let races_left_text = scope.querySelector('.races_left_value');
    races_left_text.textContent = races_left;

    scope.querySelectorAll('.info_text').forEach(text => {
        text.style.visibility = 'visible';
    });

}
















// TO DO WITH ABOVE COLUMNS FUNCTIONALITY AND APPEARANCE
// this is kind of in order - closealldropdowns may require list specific changes or changes so that based on state. above columns items
// the rest of these kinds of functions are at the bottom where it matched the oddsmatcher functions
function add_in_above_columns_items(scope, state) {

    if (window.innerWidth > MAX_WIDTH_FOR_MOBILE) {
        state.above_columns_items.forEach(item => {
            const item_html = above_columns_items_dict[item];
            const new_div = document.createElement('div');
            new_div.className = 'above_columns_item';
            new_div.innerHTML = item_html;
            scope.querySelector('.above_columns_row').appendChild(new_div);
        
        });
    } else {

        if (state.list_type == 'guides' || state.list_type == 'extra_places') {
            // For guides, put first 2 items in separate rows
            for (let i = 0; i < 2; i++) {
                const row = document.createElement('div');
                row.className = 'above_columns_row_mobile';

                const itemHtml = above_columns_items_dict[state.above_columns_items[i]];
                const div = document.createElement('div');
                div.className = 'above_columns_item';
                div.innerHTML = itemHtml;
                row.appendChild(div);

                scope.querySelector('.above_columns_row').appendChild(row);
            }
        } else {
            // First row with 2 items side by side
            const firstRow = document.createElement('div');
            firstRow.className = 'above_columns_row_mobile side_by_side_divs_in_row';

            // First item
            const item1_html = above_columns_items_dict[state.above_columns_items[0]];
            const div1 = document.createElement('div');
            div1.className = 'above_columns_item';
            div1.innerHTML = item1_html;
            firstRow.appendChild(div1);

            // Second item
            const item2_html = above_columns_items_dict[state.above_columns_items[1]];
            const div2 = document.createElement('div');
            div2.className = 'above_columns_item';
            div2.innerHTML = item2_html;
            firstRow.appendChild(div2);

            scope.querySelector('.above_columns_row').appendChild(firstRow);
        }

        // Remaining items each in their own row
        for (let i = 2; i < state.above_columns_items.length; i++) {
            const row = document.createElement('div');
            row.className = 'above_columns_row_mobile';

            const itemHtml = above_columns_items_dict[state.above_columns_items[i]];
            const div = document.createElement('div');
            div.className = 'above_columns_item';
            div.innerHTML = itemHtml;
            row.appendChild(div);

            scope.querySelector('.above_columns_row').appendChild(row);
        }
    }
    
}

function append_sort_to_sort_options(name_for_sort, value, scope, state) {

    const container = scope.getElementById('sorting-dropdown-options');

    // Create the option container
    const optionDiv = document.createElement('div');
    optionDiv.className = 'dropdown-option-sorting';
    optionDiv.dataset.value = value; 
    optionDiv.textContent = name_for_sort;


    optionDiv.addEventListener('click', () => {

        state.current_sort = optionDiv.dataset.value; 

        display_items(scope, state);

        set_background_for_current_option(value, scope, '.dropdown-option-sorting')

        scope.querySelector('#sorting-select').value = name_for_sort;

    });

    // Append the option container to the dropdown
    container.appendChild(optionDiv);
    check_options_filter_border_bottom(scope, '.dropdown-option-sorting');

    if (state.current_sort == value) {
        scope.querySelector('#sorting-select').value = name_for_sort;
        set_background_for_current_option(value, scope, '.dropdown-option-sorting')
    }

}

function sort_filtered_data(scope, state) {

    if (state.list_type == 'guides') {

        switch (state.current_sort) {
            case 'a-z':
                state.filteredData.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'z-a':
                state.filteredData.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'none':
            default:
                // No sort applied, data could be reset to initial state if needed
                break;
        }

    } else {

        switch (state.current_sort) {
            case 'profit':
                if (state.list_type == 'reload') {
                    state.filteredData.sort((a, b) => {

                        if (a.profit_amount == 'N/A') {
                            a.profit_amount = '0';
                        }
                        if (b.profit_amount == 'N/A') {
                            b.profit_amount = '0';
                        }
                        const aProfit = a.profit_amount ? parseFloat(a.profit_amount.replace('£', '').replace('N/A', '0')) : 0;
                        const bProfit = b.profit_amount ? parseFloat(b.profit_amount.replace('£', '').replace('N/A', '0')) : 0;

                        return bProfit - aProfit;
                    });
                } else {
                    state.filteredData.sort((a, b) => {
                        if (a.profit_amount == 'N/A') {
                            a.profit_amount = '0';
                        }
                        if (b.profit_amount == 'N/A') {
                            b.profit_amount = '0';
                        }
                        const aProfit = a.profit_amount ? parseFloat(a.profit_amount.replace('£', '').replace('N/A', '0')) : 0;
                        const bProfit = b.profit_amount ? parseFloat(b.profit_amount.replace('£', '').replace('N/A', '0')) : 0;

                        return bProfit - aProfit;
                    });
                }
                break;
            case 'a-z':
                state.filteredData.sort((a, b) => a.bookmaker.localeCompare(b.bookmaker));
                break;
            case 'z-a':
                state.filteredData.sort((a, b) => b.bookmaker.localeCompare(a.bookmaker));
                break;
            case 'most bookmakers':
                state.filteredData.sort((a, b) => {
                    const countBookmakers = (item) => {
                        return item.places_and_bookmakers.reduce((total, place) => {
                            return total + place.bookmaker_list.length;
                        }, 0);
                    };
                    return countBookmakers(b) - countBookmakers(a);
                });
                break;
            case 'none':
            default:
                // No sort applied, data could be reset to initial state if needed
                break;
        }

    }

}

function filter_bookmakers_using_search(scope, state) {

    const searchText = scope.getElementById('search-bookmakers').value.trim().toLowerCase();

    if (state.list_type == 'guides') {
        if (searchText.length === 0) {
            state.filteredData = state.filteredData.slice(); 
        } else {
            state.filteredData = state.filteredData.filter(item => item.title.toLowerCase().includes(searchText));
        }
    } else if (state.list_type == 'extra_places') {
        if (searchText.length === 0) {
            state.filteredData = state.filteredData.slice(); 
        } else {
            state.filteredData = state.filteredData.filter(item => item.race_title.toLowerCase().includes(searchText));
        }
    } else {

        if (searchText.length === 0) {
            state.filteredData = state.filteredData.slice(); 
        } else {
            state.filteredData = state.filteredData.filter(item => item.bookmaker.toLowerCase().includes(searchText));
        }
    }

}

function closeAllDropdowns(scope, state) {

    const dropdowns = scope.querySelectorAll('.dropdown-options');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });

    let dropdown_corners = scope.querySelectorAll('.custom-select-container:not(.select-filters-container)');

    dropdown_corners.forEach((dropdown) => {
        dropdown.classList.remove('border-radius-bottom-none')
    });

    scope.querySelector('#sorting-dropdown-options').style.display = 'none';
    scope.querySelector('#sorting-dropdown-select-container').classList.remove('border-radius-bottom-none')

}



















// event listener functions for start of script

function add_event_listeners(scope, state) {

    if (state.list_type != 'extra_places') {
        add_event_listener_for_toggle_button(scope, state);
    }

    add_event_listener_for_search_text(scope, state);

    add_event_listener_for_upgrade_button(scope, state);

    add_event_listener_for_closing_dropdowns(scope, state);

    add_event_listener_for_sorting(scope, '#sorting-dropdown-select-container', '#sorting-dropdown-options', state);

}

function add_event_listener_for_toggle_button(scope, state) {
    
    // this should be for the switch that changes from hidden to available
    scope.querySelector('#show-hidden-offers-switch').addEventListener('change', () => {
        state.is_available = !state.is_available;
        display_items(scope, state);
    });

}

function add_event_listener_for_search_text(scope, state) {
    
    const search_input = scope.querySelector('#search-bookmakers');

    search_input.addEventListener('input', () => {
        display_items(scope, state);
    });

}

function add_event_listener_for_sorting(scope, button_select, button_options, state) {
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

function add_event_listener_for_upgrade_button(scope, state) {
    
    scope.querySelector('#outer-container-div').addEventListener('click', (event) => {
        if (event.target.closest('.upgrade-button') || event.target.closest('.padlock-image-button')) {
            process_upgrade_click(scope, state);
            return;
        }
    });
}

function add_event_listener_for_closing_dropdowns(scope, state) {

    scope.addEventListener('click', (event) => {
        if (!event.target.closest('.custom-select-container:not(.select-filters-container)')) {
            closeAllDropdowns(scope, state);
        }
    });

}












// SENDING TO WIX FUNCTIONS

function send_user_suo_object_to_wix(scope, state) {
    
    let message = {
        suo_array: state.user_suo_object
    };
    const raise_event = new CustomEvent('suo_array', {
        detail: message,  
        bubbles: true,       
        composed: true        
    });
    scope.dispatchEvent(raise_event); 
}

function process_upgrade_click(scope, state) {
    let message = {
        Upgrade: true
    };

    const raise_event = new CustomEvent('Upgrade', {
        detail: message,  
        bubbles: true,       
        composed: true        
    });

    scope.dispatchEvent(raise_event); 
}
























// exact functions from oddsmatcher

export function handleResize(scope) {

    if (window.innerWidth < MAX_WIDTH_FOR_MOBILE) {
        return;
    }

    let width = window.innerWidth;
    const contentDiv = scope.getElementById('outer-container-div');
    contentDiv.style.width = `${width}px`; 

}  

function loadExternalScript(scriptUrl) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
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

function set_background_for_current_option(name, scope, option_name) {

    remove_all_option_style(scope, option_name);

    let option_divs = scope.querySelectorAll(option_name);
    option_divs.forEach((option) => {
        if (option.dataset.value == name) {
            option.classList.add('active');
        }
    });
}

function check_options_filter_border_bottom(scope, option_name) {

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

function remove_all_option_style(scope, option_name) {
    let option_divs = scope.querySelectorAll(option_name);
    option_divs.forEach((option) => {
        option.classList.remove('active');
    });
}






// ! WEEKLY ONLY FUNCTION
// This is a weekly only function - getting the days until it's available based on weekly
function get_availability_text(scope, state, offer_id) {

    const bookmakerData = state.user_suo_object.find(b => b.offer_id === offer_id);
    if (!bookmakerData) {
        return 'Available Now';
    }

    const updatedTime = new Date(bookmakerData.updated_time);
    const currentTime = new Date();

    // Calculate the end of the seven-day period from the updated time
    const sevenDaysLater = new Date((updatedTime.getTime() + 7 * 24 * 60 * 60 * 1000) - 3600000);

    // Calculate time difference between now and seven days after the updated time
    const timeDifference = sevenDaysLater - currentTime;

    if (timeDifference <= 0) {
        return 'Available Now';
    }

    // Convert time difference to a more understandable format
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
        return `Available In ${days} Days`;
    } else if (hours > 0) {
        return `Available In ${hours} Hours`;
    } else {
        return `Available In ${minutes} Minutes`;
    }
}

function change_available_status_on_object(scope, state) {

    if (state.list_type != 'weekly') {
        return;
    }
    
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    state.user_suo_object.forEach(obj => {

        if (!obj.is_available) {
            if (new Date(obj.updated_time) < sevenDaysAgo) {
                obj.is_available = true;
            }
        };
    });

}

