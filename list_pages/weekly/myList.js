import * as Helpers from '../main/helper.js';

//import * as Helpers from 'public/custom-elements/list-page-helper.js'

(function () {

    let weekly_bookmakers_allowed = ['BetUK', 'Skybet', 'Midnite']

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/weekly.js'
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/styles.css';


    html_script = '../main/z.html';
    styles_script = '../main/styles.css';
    
    let state = {
        is_available: true,
        user_suo_object: [],
        is_premium_member: false,
        globalData: {},
        filteredData: [],
        current_sort: 'none',
        data_loaded_from_wix: false,
        sort_options: [
            { text: 'No Sort', value: 'none' },
            { text: 'Sort by Profit', value: 'profit' },
            { text: 'Sort A-Z', value: 'a-z' },
            { text: 'Sort Z-A', value: 'z-a' },
        ], 
        above_columns_items: ['offers available', 'profit available', 'search', 'sort', 'hidden switch'],
        is_desktop: true,
    };
    
    class WeeklyBetClubList extends HTMLElement {
    
        constructor() {
            
            super();

            this.attachShadow({ mode: 'open' }); 

            this.isContentLoaded = false;
            this.attributeChangeQueue = [];
            this.state = state; 

            state.create_item_function = this.create_row;
            
        }

        static get observedAttributes() {
            return ['data-odds']; 
        }

        connectedCallback() {
            this.style.visibility = 'hidden';

            Helpers.render(this.shadowRoot, this.state, html_script, general_info_script, 'weekly')  
            .then(() => {
                Helpers.addStyles(this.shadowRoot, this.state, styles_script)
                .then(() => {
                    Helpers.add_loading_row(this.shadowRoot, this.state);
                    this.isContentLoaded = true;
                    this.processQueuedAttributeChanges();
                    Helpers.handleResize(this.shadowRoot);
                    window.addEventListener('resize', () => Helpers.handleResize(this.shadowRoot));
                });
            });
        }

        processQueuedAttributeChanges() {

            this.attributeChangeQueue.forEach(change => {
                this.attributeChangedCallback(change.name, change.oldValue, change.newValue);
            });
            this.attributeChangeQueue = [];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (this.isContentLoaded) {
                if (name === 'data-odds') {
                    Helpers.process_new_final_data(newValue, this.shadowRoot, this.state, this);
                }
            } else {
                this.attributeChangeQueue.push({ name, oldValue, newValue });
            }
        }





        
        create_row(scope, state, row) {

            const div = document.createElement('div');
            div.className = 'container_div_around_each_item';

            let offer_id = state.create_offer_id_using_bookmaker_and_description_function(row.bookmaker, row.offer_description);
                
            if (row.odds_details != 'N/A') {
                row.odds_details = parseFloat(row.odds_details).toFixed(2);
            }
    
            let show_premium_cover = true;
            if (state.is_premium_member) {
                show_premium_cover = false;
            }
            if (weekly_bookmakers_allowed.includes(row.bookmaker)) {
                show_premium_cover = false;
            }

            // this should be collected data
            let description = 'Sign up with Bet UK and get £30 in free bets. Place a £10+ bet on any sport at minimum odds of 1.80 (4/5). Once settled, you’ll receive 3 x £10 free bets, valid on horse racing, any Bet Builder and football. The free bets will be valid for 7 days, and the free bet stakes will not be returned with any winnings.'

            let title = row.bookmaker + ' - ' + row.offer_description;

            let profit_text = `${row.profit} Profit`
            if (row.profit == 'Varies') {
                profit_text = 'Profit Varies'
            }

            let odds_details = `${row.odds_details} Minimum Odds`

            let availability_text = 'Available';
    
            if (!state.is_available) {
                availability_text = state.get_availability_text_function(scope, state, offer_id);
                if (availability_text.includes('In 1 ')) {
                    availability_text = availability_text.replace('Hours', 'Hour').replace('Minutes', 'Minute').replace('Days', 'Day')
                }
            }

            let profit_odds_and_availability_text = `${odds_details} \u00A0\u00A0•\u00A0\u00A0 ${availability_text}`

            div.innerHTML = `




                ${show_premium_cover ?
                    
                `<div class="box3" style="display: flex;" >
    
                    <div class="outer_div_upgrade">
                        <a class="upgrade-button">Upgrade to Premium <svg fill="#ffffff" class="padlock-image-button" alt="Padlock" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path> </g> </g></svg></a>
                    </div>
                
                </div>` : ''}




                

                <div class="inner_div ${!show_premium_cover ? '' : 'blurred_tbody'}" >

                    <div class="item_title_div ${!state.is_desktop ? 'item_title_div_mobile' : ''}" >
                        ${title}
                    </div>


                    <div class="data_div description_text" >
                        ${description}
                    </div>


                    <div class="data_div lower_data_div" >
                        ${profit_odds_and_availability_text}
                    </div>

                    <div class="bottom_div_for_interaction_items ${!state.is_desktop ? 'bottom_div_for_interaction_items_mobile' : ''}">

                        <div class="div_around_bookmaker_exhange_images"> 
                            <a class="anchor_round_bookmaker" ${row.offer ? `href="${row.offer}"` : ''} target="_blank" >
                                <img class='bookmaker_img' src="${row.logo}" alt='${row.bookmaker} Weekly Bet Club Offer'>
                            </a>
                        </div>



                        ${!state.is_desktop ? `<div class="bottom_div_interaction_rows_mobile">` : ``}
                        
                        <div class="item_button">
                            <button class="offer_button ${!state.is_desktop ? 'offer_button_mobile' : ''}" href="${row.guide}" target="_blank">
                                Offer Guide
                            <img class='offer_guide_icon' src="https://img.icons8.com/?size=100&id=1767&format=png&color=ffffff" alt="Guide Icon">
                        </div>


                        <div class="div-outside-switch item-complete-switch">
                            <div class="switch_container" >
                                <label class="switch">
                                    <input type="checkbox" class="show_filters_switch item_complete_switch ${!state.is_desktop ? 'item_complete_switch_mobile' : ''}" data-id=${offer_id} id="item-complete-switch-${title}" ${!state.is_available ? 'checked' : ''}>
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>

                        ${!state.is_desktop ? `</div>` : ``}



                    </div>


                </div>


                <div class="profit_div">
                    ${profit_text}
                </div>


            `
            const tableBody = scope.querySelector('.item_container_div');
            tableBody.appendChild(div);

        }








    }


    customElements.define('weekly-list', WeeklyBetClubList);
    
    
})();
    