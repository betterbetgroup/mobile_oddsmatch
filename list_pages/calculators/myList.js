import * as Helpers from '../main/helper.js'



(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js'
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/list_pages/guides/styles.css';


    styles_script = '../guides/styles.css'


    
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
                above_columns_items: ['search calculators'],
                is_desktop: true,
            };

            this.state.create_item_function = this.create_row;
            
            // Calculator icon dictionary
            this.state.calculatorIcons = {
                'Standard Calculator': 'fa-calculator',
                'Bonus Calculator': 'fa-gift',
                'Dutch Calculator': 'fa-balance-scale',
                'Each Way Calculator': 'fa-route',
                'Extra Place Calculator': 'fa-plus',
                'Race Refund Calculator': 'fa-undo',
                'Refund If Calculator': 'fa-shield-alt',
                'Sequential Calculator': 'fa-list-ol',
                'Two Up Calculator': 'fa-coins',
                'DD/HH Calculator': 'fa-chess',
                'Odds Converter': 'fa-exchange-alt'
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
                    // Add calculators-page class to the shadow root for CSS targeting
                    Helpers.process_new_final_data(JSON.stringify({}), this.shadowRoot, this.state, this);
                    ;
                });
            });
        }






        


        create_row(scope, state, row) {


            function getCalculatorIcon(name) {
                return state.calculatorIcons[name] || 'fa-calculator';
            }



            const div = document.createElement('div');
            div.className = 'container_div_around_each_item';


            div.innerHTML = `
                <div class="guide_card">
                    <div class="guide_icon_header">
                        <div class="guide_icon_container">
                            <i class="fas ${getCalculatorIcon(row.name)} guide_main_icon"></i>
                        </div>
                    </div>
                    
                    <div class="guide_content">
                        <h3 class="guide_title">${row.name}</h3>
                        <div class="guide_description">${row.description}</div>
                    </div>
                    
                    <div class="guide_actions">
                        <a href="${row.link}" class="guide_button_primary">
                            <i class="fas fa-calculator"></i>
                            Use Calculator
                        </a>
                    </div>
                </div>
            `;
            
            const tableBody = scope.querySelector('.item_container_div');
            tableBody.appendChild(div);
        }








    }


    customElements.define('calculators-page', CalculatorsList);
    
    
})();
    