import * as Helpers from './guide_helper.js';

(function () {

    let html_script = 'z.html';
    let styles_script = 'styles.css';

    class GuidePage extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({ mode: 'open' }); 
            this.isContentLoaded = false;
            this.attributeChangeQueue = [];
        }

        static get observedAttributes() {
            return ['data-odds', 'data-item-data']; 
        }

        connectedCallback() {
            this.style.visibility = 'hidden';

            Helpers.render(this.shadowRoot, this.state, html_script)  
            .then(() => {
                Helpers.addStyles(this.shadowRoot, this.state, styles_script)
                .then(() => {
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
                    Helpers.process_new_final_data(newValue, this.shadowRoot);
                }
                if (name === 'data-item-data') {
                    Helpers.process_item_data(newValue, this.shadowRoot);
                    this.style.visibility = 'visible'; 
                }
            } else {
                this.attributeChangeQueue.push({ name, oldValue, newValue });
            }
        }
    }

    customElements.define('guide-page', GuidePage);

})();
