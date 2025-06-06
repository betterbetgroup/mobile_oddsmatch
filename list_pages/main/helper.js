let delay_for_filtering_data = 300;



export function process_new_final_data(data, scope, state) {
    state.data_loaded_from_wix = true;
    data = JSON.parse(data);

    state.is_premium_member = data.premium_member;

    if (data.user_suo_object) {
        state.user_suo_object = data.user_suo_object;
        if (state.user_suo_object.length == 0) {
            create_user_suo_object_new(scope, state);
            send_user_suo_object_to_wix(scope, state);
        } else {
            // update the is_available values so they become available if they were not available more than 7 days ago
            change_available_status_on_object(scope, state);
        }
        filterData(scope, state);
    }
}

function create_user_suo_object_new(scope, state) {
    
    state.globalData.forEach((bookmaker) => {

        const obj = {
            bookmaker_name: bookmaker.bookmaker,
            is_available: true,
            updated_time: new Date().toISOString()
        }

        state.user_suo_object.push(obj)
    });
}

function change_available_status_on_object(scope, state) {
    
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

function filterData(scope, state) {
    
    if (!state.data_loaded_from_wix) {
        return;
    }

    make_filtered_data_using_global_and_suo_object(scope, state);
    displayRows(scope, state);

}
  
function displayRows(scope, state) {
    
    scope.querySelector('.item_container_div').innerHTML = '';

    appendRows(scope, state);

    scope.querySelector('#loadingScreenRow').style.display = 'none';

    get_and_display_profit_left_and_offers_left(scope, state);

}

function appendRows(scope, state) {
               
    state.filteredData.forEach(row => {

        state.create_item_function(scope, state, row);

    });

    add_event_listener_for_switches(scope, state);

    change_availability_text_colour(scope, state);

}

function add_event_listener_for_switches(scope, state) {
    
    scope.querySelectorAll('.available_switch').forEach(checkbox => {

        checkbox.addEventListener('change', () => {

            let rowobj = getRowObjById(scope, state, checkbox.getAttribute('data-id').replace(/-/g, ' ')); 

            rowobj.is_available = !checkbox.checked;

            rowobj.updated_time = new Date().toISOString();

            send_user_suo_object_to_wix(scope, state);

            setTimeout(() => {
                filterData(scope, state);
            }, delay_for_filtering_data);

        });

    });

}

function getRowObjById(scope, state, bookmaker) {
    return state.user_suo_object.find(item => item.bookmaker_name === bookmaker);
}

function change_availability_text_colour(scope, state) {
            
    let promo_info_texts = scope.querySelectorAll('.promo_info');

    let promo_color = '#ff0000';

    if (state.is_available) {
        promo_color = '#ffffff';
    }

    promo_info_texts.forEach((t)=>{
        t.style.color = promo_color;
    });

}

function get_and_display_profit_left_and_offers_left(scope, state) {
    
    let offers_left = 0;
    let profit_left = 0;
    let total_offers = 0;
    let total_profit = 0;

    state.globalData.forEach(item => {

        const userEntry = state.user_suo_object.find(userItem => userItem.bookmaker_name === item.bookmaker);


        total_offers += 1;
        total_profit += parseFloat(item.profit.replace('£', ''));

        if (userEntry && userEntry.is_available) {

            offers_left += 1;
            profit_left += parseFloat(item.profit.replace('Varies', '0').replace('£', ''));
        }
    });

    display_profit_and_offers_left(scope, state, offers_left, profit_left, total_offers, total_profit);

}

function display_profit_and_offers_left(scope, state, offers_left, profit_left, total_offers, total_profit) {
    
    scope.querySelector('.profit_value').textContent = '£' + profit_left.toFixed(2);

    scope.querySelector('.offers_value').textContent = offers_left + '/' + total_offers;
}



function make_filtered_data_using_global_and_suo_object(scope, state) {
    
    state.filteredData = [];

    state.globalData.forEach((bookie) => {

        let foundMatch = false;  

        state.user_suo_object.forEach((userBookmaker) => {

            if (bookie.bookmaker === userBookmaker.bookmaker_name) {
                foundMatch = true;  

                if ((userBookmaker.is_available === true && state.is_available) ||
                    (userBookmaker.is_available === false && !state.is_available)) {
                    state.filteredData.push(bookie);
                }
            }
        });

        
        if (!foundMatch && state.is_available) {
            state.filteredData.push(bookie);
        }
        if (!foundMatch) {
            state.user_suo_object.push({
                bookmaker_name: bookie.bookmaker,
                is_available: true,
                updated_time: new Date().toISOString()
            })
            send_user_suo_object_to_wix(scope, state);
        }


    });

    filterBookmakers(scope, state);

    sort_filtered_data(scope, state);

}

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

function filterBookmakers(scope, state) {
    
    const searchText = scope.getElementById('search-bookmakers').value.trim().toLowerCase();

    if (searchText.length === 0) {
        state.filteredData = state.filteredData.slice(); 
    } else {
        state.filteredData = state.filteredData.filter(item => item.bookmaker.toLowerCase().includes(searchText));
    }

}

function sort_filtered_data(scope, state) {
    
    switch (state.current_sort) {
        case 'profit':
            state.filteredData.sort((a, b) => parseFloat(b.profit.replace('Varies', '0').replace('£', '')) - parseFloat(a.profit.replace('Varies', '0').replace('£', '')));
            break;
        case 'a-z':
            state.filteredData.sort((a, b) => a.bookmaker.localeCompare(b.bookmaker));
            break;
        case 'z-a':
            state.filteredData.sort((a, b) => b.bookmaker.localeCompare(a.bookmaker));
            break;
        case 'none':
        default:
            // No sort applied, data could be reset to initial state if needed
            break;
    }
}

export function render(scope, state, html_script, general_info_script, type_of_script) {
    return fetch(html_script)
        .then(response => response.text())
        .then(html => {
            scope.innerHTML = html;
            return loadExternalScript(general_info_script);
        })
        .then(() => {
            if (type_of_script == 'weekly') {
                if (typeof weekly_bet_club_list !== 'undefined') {
                    state.globalData = weekly_bet_club_list;
                } else {
                    console.error('weekly_bet_club_list is undefined');
                }
            }
        })
        .catch(error => {
            console.error('Error loading script or processing data:', error);
        });
}

function get_availability_text(scope, state,bookmaker) {

    const bookmakerData = state.user_suo_object.find(b => b.bookmaker_name === bookmaker);
    if (!bookmakerData) {
        return 'Now';
    }

    const updatedTime = new Date(bookmakerData.updated_time);
    const currentTime = new Date();

    // Calculate the end of the seven-day period from the updated time
    const sevenDaysLater = new Date((updatedTime.getTime() + 7 * 24 * 60 * 60 * 1000) - 3600000);

    // Calculate time difference between now and seven days after the updated time
    const timeDifference = sevenDaysLater - currentTime;

    if (timeDifference <= 0) {
        return 'Now';
    }

    // Convert time difference to a more understandable format
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
        return `In ${days} Days`;
    } else if (hours > 0) {
        return `In ${hours} Hours`;
    } else {
        return `In ${minutes} Minutes`;
    }
}



function add_event_listener_for_upgrade_button(scope, state) {
    
    scope.querySelector('#outer-container-div').addEventListener('click', (event) => {
        if (event.target.className === 'upgrade-button' || event.target.className === 'padlock-image-button') {
            process_upgrade_click(scope, state);
            return;
        }
    });
    
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


export function runSpecificScript(scope, state) {

    state.get_availability_text_function = get_availability_text;
    
    add_event_listeners(scope, state);

}

function add_event_listeners(scope, state) {

    add_event_listener_for_sorting_dropdown(scope, state);

    add_event_listener_for_search_text(scope, state);

    add_event_listener_for_toggle_button(scope, state);

    add_event_listener_for_upgrade_button(scope, state);

}

function add_event_listener_for_toggle_button(scope, state) {
    
    scope.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click',() => {
            scope.querySelectorAll('.toggle-button').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            if (button.id == 'available') {
                state.is_available = true;
            } else {
                state.is_available = false;
            }

            filterData(scope, state);
        });
    });

}

function add_event_listener_for_sorting_dropdown(scope, state) {
    
    const dropdown = scope.querySelector('#sort_items');

    dropdown.addEventListener('change', () => {
        state.current_sort = dropdown.value; 
        filterData(scope, state);
    });

}

function add_event_listener_for_search_text(scope, state) {
    
    const search_input = scope.querySelector('#search-bookmakers');

    search_input.addEventListener('input', () => {
        filterData(scope, state);
    });

}

export function add_loading_row(scope, state) {

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
                <h2 class="loading-text">Collecting Bookmaker Data...</h2>
            </div>
        </td>

    `;

    const tableBody = scope.querySelector('#outer-container-div');
    tableBody.append(loadingrow);

}





// exact functions from oddsmatcher

export function handleResize(scope) {

    let width = window.innerWidth;
    const contentDiv = scope.getElementById('outer-container-div');
    contentDiv.style.width = `${width}px`; 

}  

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