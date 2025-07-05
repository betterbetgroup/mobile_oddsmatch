import * as Helpers from '../main/calculator-helper.js';



(function () {

    let general_info_script = 'https://betterbetgroup.github.io/betterbet_html/general_info.js';
    let html_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/calculators/main/z.html';
    let styles_script = 'https://betterbetgroup.github.io/mobile_oddsmatch/calculators/main/styles.css';


    html_script = '../main/z.html';
    styles_script = '../main/styles.css';



    class eachWayCalculator extends HTMLElement {

        constructor() {
            
            super();

            this.attachShadow({ mode: 'open' }); 

            this.isContentLoaded = false;
            this.attributeChangeQueue = [];

            // Create state object
            this.state = {
                is_premium_member: false,
                is_desktop: false,
                is_calc: false,
                loaded_from_tracker: false,
                local_calc_data: {},
                data_object: {},
                calculator_type: 'Each Way',
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
                    this.style.visibility = 'visible'; 
                    Helpers.runSpecificScript(this.shadowRoot, this.state); 
                    this.isContentLoaded = true;
                    this.processQueuedAttributeChanges();
                    Helpers.handleResize(this.shadowRoot);
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



    }

    customElements.define('eachway-calculator', eachWayCalculator);



})();
