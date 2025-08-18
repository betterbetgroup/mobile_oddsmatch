import * as Helpers from '../main/helper.js'



(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/calculators.js'
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/styles.css';


    
    class CalculatorsList extends HTMLElement {
    
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
                list_type: 'calculators',
                data_loaded_from_wix: false,
                sort_options: [
                    { text: 'Sort By Difficulty', value: 'none' },
                    { text: 'Sort A-Z', value: 'a-z' },
                    { text: 'Sort Z-A', value: 'z-a' },
                ], 
                above_columns_items: ['search guides'],
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
                




            div.innerHTML = `

                    
                <div class="inner_div inner_div_guides" >

                    <div class="div_around_bookmaker_exhange_images"> 
                        <a class="anchor_round_bookmaker" ${row.guide ? `href="${row.guide}"` : ''} target="_blank" >
                            <img class='guide_image_main' src="${row.main_image}" alt='${row.title}'>
                        </a>
                    </div>

                    <div class="item_title_div item_title_div_guides ${!state.is_desktop ? 'item_title_div_mobile item_title_div_guides_mobile' : ''}" >
                        ${row.title}
                    </div>


                    <div class="bottom_div_for_interaction_items ${!state.is_desktop ? 'bottom_div_for_interaction_items_mobile bottom_div_for_interaction_items_mobile_guides' : ''}"
                    
                    
                        <div class="item_button">
                            <a class="offer_button ${!state.is_desktop ? 'offer_button_mobile offer_button_mobile_guides' : ''}" href="${row.guide}" target="_blank">
                                Read Guide
                                <i class="fa-solid fa-book offer_guide_icon"></i>
                            </a>
                        </div>


                        <div class="div-outside-switch item-complete-switch item-complete-switch-guides">
                            <div class="switch_container" >
                                <label class="switch">
                                    <input type="checkbox" class="show_filters_switch item_complete_switch ${!state.is_desktop ? 'item_complete_switch_mobile' : ''}" data-id=${offer_id} id="item-complete-switch-${row.title}" ${!state.is_available ? 'checked' : ''}>
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>


                    </div>


                </div>


            `
            const tableBody = scope.querySelector('.item_container_div');
            tableBody.appendChild(div);

        }








    }


    customElements.define('calculators-page', CalculatorsList);
    
    
})();
    