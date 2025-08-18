import * as Helpers from '../main/helper.js'



(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js'
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/guides/styles.css';


    styles_script = '../guides/styles.css'


    
    class OddsmatchersList extends HTMLElement {
    
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
                list_type: 'oddsmatchers',
                data_loaded_from_wix: false,
                sort_options: [
                    { text: 'Sort By Difficulty', value: 'none' },
                    { text: 'Sort A-Z', value: 'a-z' },
                    { text: 'Sort Z-A', value: 'z-a' },
                ], 
                above_columns_items: ['search oddsmatchers'],
                is_desktop: true,
            };

            this.state.create_item_function = this.create_row;
            
            // Oddsmatcher icon dictionary
            this.state.oddsmatcherIcons = {
                'Standard Oddsmatcher': 'fa-bullseye',
                'Qualifying Bet': 'fa-check-circle',
                'Free Bet': 'fa-gift',
                'Standard Free': 'fa-star',
                'Each Way Oddsmatcher': 'fa-route',
                'Extra Place Matcher': 'fa-plus-circle',
                'Dutching Matcher': 'fa-balance-scale',
                'BOG Matcher': 'fa-shield-alt',
                '2UP Oddsmatcher': 'fa-coins',
                'Tutorial': 'fa-graduation-cap',
                'Profit Tracker': 'fa-chart-line'
            };
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
                    Helpers.handleResize(this.shadowRoot);
                    // Add oddsmatchers-page class to the shadow root for CSS targeting
                    Helpers.process_new_final_data(JSON.stringify({}), this.shadowRoot, this.state, this);
                    ;
                });
            });
        }





        

        create_row(scope, state, row) {


            function getOddsmatcherIcon(name) {
                return state.oddsmatcherIcons[name] || 'fa-bullseye';
            }
    


            const div = document.createElement('div');
            div.className = 'container_div_around_each_item';


            div.innerHTML = `
                <div class="guide_card">
                    <div class="guide_icon_header">
                        <div class="guide_icon_container">
                            <i class="fas ${getOddsmatcherIcon(row.name)} guide_main_icon"></i>
                        </div>
                    </div>
                    
                    <div class="guide_content">
                        <h3 class="guide_title">${row.name}</h3>
                        <div class="guide_description">${row.description}</div>
                    </div>
                    
                    <div class="guide_actions">
                        <a href="${row.link}" class="guide_button_primary">
                            <i class="fa-solid fa-gear"></i>
                            Open Tool
                        </a>
                    </div>
                </div>
            `;
            
            const tableBody = scope.querySelector('.item_container_div');
            tableBody.appendChild(div);
        }








    }


    customElements.define('oddsmatchers-page', OddsmatchersList);
    
    
})();
    