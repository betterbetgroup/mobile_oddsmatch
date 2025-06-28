import * as Helpers from 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/helper.js';


(function () {

    let general_info_script = 'not used'
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/styles.css';

    html_script = '../main/z.html';
    styles_script = '../main/styles.css';

    
    class ReloadList extends HTMLElement {
    
        constructor() {
            
            super();

            this.attachShadow({ mode: 'open' }); 

            this.isContentLoaded = false;
            this.attributeChangeQueue = [];
    
            this.state = {
                is_available: true,
                user_suo_object: [],
                is_premium_member: false,
                globalData: {},
                filteredData: [],
                current_sort: 'none',
                list_type: 'reload',
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


            this.state.create_item_function = this.create_row;
            
        }

        static get observedAttributes() {
            return ['data-odds']; 
        }

        connectedCallback() {
            this.style.visibility = 'hidden';

            Helpers.render(this.shadowRoot, this.state, html_script, general_info_script)  
            .then(() => {
                Helpers.addStyles(this.shadowRoot, this.state, styles_script)
                .then(() => {
                    this.isContentLoaded = true;
                    this.processQueuedAttributeChanges();
                    Helpers.handleResize(this.shadowRoot);
                    ;
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

            let offer_id = state.create_offer_id_function(row, state);
                

    
            let show_premium_cover = false;
            // this is where premium cover processing is for the others





            if (!state.is_desktop) {
                row.final_profit_text = row.final_profit_text.replace('Guaranteed', '').replace('Potential Profit', 'Profit Varies').trim();
            }

        

            row.expiry_and_repeats_text = row.expiry_and_repeats_text.replace(' | ', '\u00A0\u00A0•\u00A0\u00A0').trim();

            

            // ! THIS IS THE ONLY REAL DIFFERENCE BETWEEN WEEKLY AND SIGN UP
            // ! INSTEAD OF AVAILABILITY INFO, IT HAS PROMO CODE INFO
            // THIS IS WHERE PROCESSING FOR AVAILABILITY OR PROMO OR MIN ODDS PROCESSING IS FOR OTHERS





            div.innerHTML = `

                    
                <div class="inner_div ${!show_premium_cover ? '' : 'blurred_tbody'}" >

                    <div class="item_title_div ${!state.is_desktop ? 'item_title_div_mobile' : ''}" >
                        ${row.reworded_title}
                    </div>


                    <div class="data_div description_text" >
                        ${row.reworded_description}
                    </div>


                    <div class="data_div lower_data_div" >
                        ${row.expiry_and_repeats_text}
                    </div>

                    <div class="bottom_div_for_interaction_items ${!state.is_desktop ? 'bottom_div_for_interaction_items_mobile' : ''}">

                        <div class="div_around_bookmaker_exhange_images"> 
                            <a class="anchor_round_bookmaker" ${row.guide_page_offer_link ? `href="${row.guide_page_offer_link}"` : ''} target="_blank" >
                                <img class='bookmaker_img' src="${row.bookmaker_image}" alt='${row.bookmaker} Reload Offer'>
                            </a>
                        </div>



                        ${!state.is_desktop ? `<div class="bottom_div_interaction_rows_mobile">` : ``}
                        
                        <div class="item_button">
                            <a class="offer_button ${!state.is_desktop ? 'offer_button_mobile' : ''}" href="${row.guide_page_link}" target="_blank">
                                Offer Guide
                                <img class='offer_guide_icon' src="https://img.icons8.com/?size=100&id=1767&format=png&color=ffffff" alt="Guide Icon">
                            </a>
                        </div>


                        <div class="div-outside-switch item-complete-switch">
                            <div class="switch_container" >
                                <label class="switch">
                                    <input type="checkbox" class="show_filters_switch item_complete_switch ${!state.is_desktop ? 'item_complete_switch_mobile' : ''}" data-id=${offer_id} id="item-complete-switch-${row.reworded_title}" ${!state.is_available ? 'checked' : ''}>
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>

                        ${!state.is_desktop ? `</div>` : ``}


                    </div>


                </div>


                <div class="profit_div">
                    ${row.final_profit_text}
                </div>


            `
            const tableBody = scope.querySelector('.item_container_div');
            tableBody.appendChild(div);

        }








    }


    customElements.define('reload-list', ReloadList);
    
    
})();
    