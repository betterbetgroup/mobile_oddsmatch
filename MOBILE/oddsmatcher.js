// make it all in one file and as compact as possible
// since it's mobile it should all be same width
// different layout inside though based on the type - but overlap functions as much as possible


class BaseOddsmatcher extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      // Basic structure, override in child classes
      this.shadowRoot.innerHTML = `<div>Base Oddsmatcher</div>`;
    }
  
    // Shared logic (e.g. fetch, basic filtering)
    fetchData() { /* ... */ }
    filterData(data) { return data; }
  }
  customElements.define('base-oddsmatcher', BaseOddsmatcher);
  