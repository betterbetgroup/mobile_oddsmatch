import * as Helpers from '../main/helper.js';

//import * as Helpers from 'public/custom-elements/list-page-helper.js'

(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/weekly.js'
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/weekly/styles.css';


    html_script = '../main/z.html';
    styles_script = 'styles.css';
    
    let state = {
        is_available: true,
        user_suo_object: [],
        is_premium_member: false,
        globalData: {},
        filteredData: [],
        current_sort: 'none',
        data_loaded_from_wix: false
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
                    this.style.visibility = 'visible'; 
                    Helpers.runSpecificScript(this.shadowRoot, this.state); 
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
                    Helpers.process_new_final_data(newValue, this.shadowRoot, this.state);
                }
            } else {
                this.attributeChangeQueue.push({ name, oldValue, newValue });
            }
        }




    
        create_row(scope, state,row) {
    
            let bookmaker_image = row.logo;
    
            const tr = document.createElement('div');
    
            tr.className = 'container_div_around_each_item';
    
            tr.setAttribute('data-id', row.bookmaker);
    
            if (row.odds_details != 'N/A') {
                row.odds_details = parseFloat(row.odds_details).toFixed(2);
            }
    
            let show_premium_cover = true;
    
            if (state.is_premium_member) {
                show_premium_cover = false;
            }
    
            if (row.bookmaker == 'Skybet' || row.bookmaker == 'BetUK' || row.bookmaker == 'Midnite') {
                show_premium_cover = false;
            }
    
            let profit = row.profit;
    
            if (profit != 'Varies') {
                profit = `£${parseFloat(profit.replace('£', '')).toFixed(2)}`
            }
    
            let availability_text = 'Now';
    
            if (!state.is_available) {
                availability_text = state.get_availability_text_function(scope, state, row.bookmaker);
                if (availability_text.includes('In 1 ')) {
                    availability_text = availability_text.replace('Hours', 'Hour').replace('Minutes', 'Minute').replace('Days', 'Day')
                }
            }
    
            tr.innerHTML = ` 
    
                ${show_premium_cover ? `<div class="premium_div_box" >
    
                    <svg class="padlock_svg" fill="#ffffff" height="180px" width="160px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path> </g> </g></svg>
    
                    <a class="upgrade-button">Upgrade to Premium <img src="https://img.icons8.com/?size=100&id=60654&format=png&color=ffffff" class="padlock-image-button" alt="Padlock" > </a>
    
                </div>` : ''}
    
    
    
    
                <div class="table_data_row" >
    
                        <div class="div_around_bookmaker_exhange_images" > 
    
                                <a class="anchor_round_bookmaker" ${row.offer ? `href="${row.offer}"` : ''} target="_blank" >
                                    <img class='bookmaker_img' src="${bookmaker_image}" alt='${row.bookmaker} Weekly Bet Club Offer' >
                                </a>
    
                        </div>
    
    
    
    
    
                        <div class="mobile_title_div">
                            Offer Descripion
                        </div>
    
                        <div class="description_content_div">
    
                            ${row.offer_description}
    
                        </div>
    
    
    
                        <div class="div_around_bookmaker_and_exchange_title mobile_title_div " style="padding-left: 0;">
    
                            <span class="offer_info_header promo_code_header">
    
                                Availability
    
                            </span>
    
                            <span class="offer_info_header">
    
                                Profit
    
                            </span>
    
    
                            <span class="offer_info_header min_odds_header">
    
                                Minimum Odds
    
                            </span>
    
    
    
                        </div>
    
    
    
                        <div class="div_for_offer_info" >
    
                            <span class="offer_info_data promo_info">
    
                                ${availability_text}
    
                            </span>
    
                            <span class="offer_info_data profit_data_span">
    
                                ${profit}
    
                            </span>
    
    
                            <span class="offer_info_data odds_info_data_odds">
    
                                ${row.odds_details}
    
                            </span>    
    
                        </div>
    
    
                        <div class="div_for_offer_and_guide" >
    
                            <a class="item_button offer_button" href="${row.offer}" target="_blank" >
                                Go To Offer
                            </a>
    
    
                            <a class="item_button guide_button" ${row.guide ? `href="${row.guide}"` : ''}>
                                Read Guide
                            </a>
    
    
    
                        </div>
    
                        
    
                        <div class="div_for_available" >
    
                            <span class="span_next_to_switch"> Complete </span>
    
                            <div class="switch_container">
                        
                                    <label class="switch">
                                        <input type="checkbox" class="available_switch" data-id=${row.bookmaker.replace(/ /g, '-')} ${!state.is_available ? 'checked' : ''}>
                                        <span class="slider"></span>
                                    </label>
                            </div>
    
    
                        </div>
    
    
    
    
                    </div>
    
    
            `
    
            
    
            const tableBody = scope.querySelector('.item_container_div');
    
            tableBody.appendChild(tr);
            
        }





        
    


    }
    
    customElements.define('weekly-list', WeeklyBetClubList);
    
    
})();
    