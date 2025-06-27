import * as Helpers from '../main/helper.js';


    let general_info_script = 'not used'
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/styles.css';

    html_script = '../main/z.html';
    styles_script = '../main/styles.css';
    

    
    class ExtraPlacesList extends HTMLElement {
    
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
                list_type: 'extra_places',
                data_loaded_from_wix: false,
                sort_options: [
                    { text: 'Sort By Time', value: 'none' },
                    { text: 'Sort By Most Bookmakers', value: 'most bookmakers' },
                ], 
                above_columns_items: ['races left', 'search races', 'sort'],
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
            div.className = `container_div_around_each_item container_div_around_each_item_extra_places ${!state.is_desktop ? 'container_div_around_each_item_extra_places_mobile' : ''}`;
                


            div.innerHTML = `

                    
                <div class="inner_div inner_div_extra_places" >

                    <div class="item_title_div item_title_div_guides item_title_div_extra_places ${!state.is_desktop ? 'item_title_div_mobile item_title_div_guides_mobile item_title_div_extra_places_mobile' : ''}" data-race-time="${row.race_time}" >
                        ${row.race_time} ${row.race_title}
                    </div>

                    ${row.places_and_bookmakers.map(place => `
                        <div class="place_title_div ${!state.is_desktop ? 'place_title_div_mobile' : ''}">
                            ${place.place_title}
                        </div>
                        <div class="bookmakers_container ${!state.is_desktop ? 'bookmakers_container_mobile' : ''}">
                            ${place.bookmaker_list.map(bookmaker => `
                                <div class="bookmaker_div">
                                    ${bookmaker}
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}


                </div>


            `
            const tableBody = scope.querySelector('.item_container_div');
            tableBody.appendChild(div);

        }








    }


    customElements.define('extra-places', ExtraPlacesList);
    
    
    