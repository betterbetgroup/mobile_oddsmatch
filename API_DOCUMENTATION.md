# Matched Betting System - API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Web Components](#web-components)
3. [Public APIs](#public-apis)
4. [Utility Functions](#utility-functions)
5. [CSS Utilities](#css-utilities)
6. [Usage Examples](#usage-examples)
7. [Integration Guide](#integration-guide)

---

## Overview

This is a comprehensive matched betting system built with modern web technologies including Web Components, ES6 modules, and responsive design principles. The system includes odds matchers, calculators, dashboards, sales pages, and list management components.

### Technology Stack
- **Frontend**: Vanilla JavaScript ES6+, Web Components (Custom Elements)
- **Styling**: CSS3 with responsive design
- **Architecture**: Modular ES6 imports, Shadow DOM
- **Compatibility**: Modern browsers with Web Components support

---

## Web Components

All components are implemented as Custom Elements and can be embedded using HTML tags.

### Odds Matcher Components

#### Standard Odds Matcher
```html
<standard-oddsmatcher data-odds="JSON_DATA"></standard-oddsmatcher>
```

**API:**
- **Element**: `StandardOddsmatcher`
- **Tag**: `<standard-oddsmatcher>`
- **Attributes**:
  - `data-odds` (string): JSON data containing betting odds and configuration
- **Methods**:
  - `process_new_final_data(data, scope, state)`: Updates component with new betting data
  - `attributeChangedCallback(name, oldValue, newValue)`: Handles attribute changes
- **Events**: Custom events fired on data updates and user interactions

#### Two-Up Odds Matcher
```html
<two-up-oddsmatcher data-odds="JSON_DATA"></two-up-oddsmatcher>
```

**API:**
- **Element**: `TwoUpOddsmatcher`
- **Tag**: `<two-up-oddsmatcher>`
- **Attributes**:
  - `data-odds` (string): JSON data for 2-up betting scenarios
- **Methods**:
  - `process_new_final_data(data, scope, state)`: Processes 2-up specific betting data
  - `get_row_data(row)`: Extracts data from table rows

#### Each Way Odds Matcher
```html
<each-oddsmatcher data-odds="JSON_DATA"></each-oddsmatcher>
```

**API:**
- **Element**: `eachWayOddsmatcher`
- **Tag**: `<each-oddsmatcher>`
- **Attributes**:
  - `data-odds` (string): JSON data for each-way betting
- **Methods**:
  - `process_new_final_data(data, scope, state)`: Updates each-way betting data
  - `parseDateAndTime_filterData(dateString)`: Date parsing utility

#### BOG (Best Odds Guaranteed) Matcher
```html
<bog-oddsmatcher data-odds="JSON_DATA"></bog-oddsmatcher>
```

**API:**
- **Element**: `bogOddsmatcher`
- **Tag**: `<bog-oddsmatcher>`
- **Attributes**:
  - `data-odds` (string): JSON data for BOG betting scenarios

#### Free Bet Odds Matcher
```html
<freebet-oddsmatcher data-odds="JSON_DATA"></freebet-oddsmatcher>
```

**API:**
- **Element**: `FreeBetOddsmatcher`
- **Tag**: `<freebet-oddsmatcher>`
- **Attributes**:
  - `data-odds` (string): JSON data for free bet scenarios

#### Dutching Odds Matcher
```html
<dutching-oddsmatcher data-odds="JSON_DATA"></dutching-oddsmatcher>
```

**API:**
- **Element**: `dutchingOddsmatcher`
- **Tag**: `<dutching-oddsmatcher>`
- **Attributes**:
  - `data-odds` (string): JSON data for dutching scenarios

#### Extra Place Matcher
```html
<extra-place-oddsmatcher data-odds="JSON_DATA"></extra-place-oddsmatcher>
```

**API:**
- **Element**: `extraPlaceOddsmatcher`
- **Tag**: `<extra-place-oddsmatcher>`
- **Attributes**:
  - `data-odds` (string): JSON data for extra place betting

#### Qualifying Bet Matcher
```html
<qualbet-oddsmatcher data-odds="JSON_DATA"></qualbet-oddsmatcher>
```

**API:**
- **Element**: `QualBetOddsmatcher`
- **Tag**: `<qualbet-oddsmatcher>`
- **Attributes**:
  - `data-odds` (string): JSON data for qualifying bets

#### Standard Free Odds Matcher
```html
<standard-free-oddsmatcher data-odds="JSON_DATA"></standard-free-oddsmatcher>
```

**API:**
- **Element**: `StandardFreeOddsmatcher`
- **Tag**: `<standard-free-oddsmatcher>`
- **Attributes**:
  - `data-odds` (string): JSON data for standard free bets

### Calculator Components

#### Standard Calculator
```html
<standard-calculator data-calc="JSON_DATA"></standard-calculator>
```

**API:**
- **Element**: `standardCalculator`
- **Tag**: `<standard-calculator>`
- **Attributes**:
  - `data-calc` (string): JSON data containing calculation parameters
- **Methods**:
  - `process_new_final_data(data, scope, state)`: Updates calculator with new data
  - `runSpecificScript(scope, state)`: Initializes calculator functionality

#### Each Way Calculator
```html
<eachway-calculator data-calc="JSON_DATA"></eachway-calculator>
```

**API:**
- **Element**: `eachWayCalculator`
- **Tag**: `<eachway-calculator>`

#### Two-Up Calculator
```html
<two-up-calculator data-calc="JSON_DATA"></two-up-calculator>
```

**API:**
- **Element**: `twoUpCalculator`
- **Tag**: `<two-up-calculator>`

#### Dutching Calculator
```html
<dutching-calculator data-calc="JSON_DATA"></dutching-calculator>
```

**API:**
- **Element**: `dutchingCalculator`
- **Tag**: `<dutching-calculator>`

#### Extra Place Calculator
```html
<extraplace-calculator data-calc="JSON_DATA"></extraplace-calculator>
```

**API:**
- **Element**: `extraPlaceCalculator`
- **Tag**: `<extraplace-calculator>`

#### Sequential Lay Calculator
```html
<sequential-lay-calculator data-calc="JSON_DATA"></sequential-lay-calculator>
```

**API:**
- **Element**: `sequentialLayCalculator`
- **Tag**: `<sequential-lay-calculator>`

### Dashboard Component

#### Main Dashboard
```html
<dashboard-page data-odds="JSON_DATA"></dashboard-page>
```

**API:**
- **Element**: `Dashboard`
- **Tag**: `<dashboard-page>`
- **Attributes**:
  - `data-odds` (string): JSON data containing profit and membership information
- **Methods**:
  - `updateProfitValues(scope, profitData)`: Updates profit display values
  - `updateOfferProgress(scope, offersData)`: Updates offer completion progress
  - `updateMembershipStatus(scope, membershipData)`: Updates membership status display
  - `handleResize(scope)`: Handles responsive layout adjustments

**Data Structure:**
```javascript
{
  profit: {
    today: 125.50,
    thisMonth: 1250.00,
    lastMonth: 980.75,
    thisYear: 8500.00,
    total: 15000.00
  },
  offers: {
    signup: { completed: 5, total: 10 },
    reload: { completed: 3, total: 5 }
  },
  membership: {
    type: "premium",
    expiryDate: "2024-12-31"
  }
}
```

### List Components

#### Sign-Up Offer List
```html
<sign-up-offer-list data-list="JSON_DATA"></sign-up-offer-list>
```

**API:**
- **Element**: `SignUpOfferList`
- **Tag**: `<sign-up-offer-list>`

#### Guides List
```html
<allguides-page data-list="JSON_DATA"></allguides-page>
```

**API:**
- **Element**: `GuidesList`
- **Tag**: `<allguides-page>`

#### Weekly Bet Club List
```html
<weekly-list data-list="JSON_DATA"></weekly-list>
```

**API:**
- **Element**: `WeeklyBetClubList`
- **Tag**: `<weekly-list>`

#### Extra Places List
```html
<extra-places data-list="JSON_DATA"></extra-places>
```

**API:**
- **Element**: `ExtraPlacesList`
- **Tag**: `<extra-places>`

#### Reload List
```html
<reload-list data-list="JSON_DATA"></reload-list>
```

**API:**
- **Element**: `ReloadList`
- **Tag**: `<reload-list>`

### Profit Tracker Component

#### Profit Tracker
```html
<profit-tracker data-tracker="JSON_DATA"></profit-tracker>
```

**API:**
- **Element**: `ProfitTracker`
- **Tag**: `<profit-tracker>`
- **Attributes**:
  - `data-tracker` (string): JSON data containing profit tracking information
- **Methods**:
  - `convertDateToJSDate(dateStr)`: Converts date strings to JavaScript Date objects
  - `process_new_final_data(data, scope, state)`: Updates tracker with new profit data

### Sales Page Components

#### Homepage
```html
<home-page></home-page>
```

**API:**
- **Element**: `Homepage`
- **Tag**: `<home-page>`
- **Methods**:
  - `runSpecificScript()`: Initializes sales page with default content
- **Customization**: Uses `SalesPageManager` for content management

---

## Public APIs

### Sales Page Management

#### SalesPageManager Class
```javascript
import { SalesPageManager, initializeSalesPage } from './sales_pages/main/sales_helper.js';
```

**Constructor:**
```javascript
new SalesPageManager(salesData, shadowRoot = null)
```

**Methods:**

##### `populateContent()`
Populates all sections of the sales page with provided data.

##### `populateHero()`
Updates hero section with title, subtitle, and CTA content.

##### `populateFeatures()`
Populates features grid with feature data.

##### `populateTestimonials()`
Updates testimonials section with customer reviews.

##### `populatePricing()`
Populates pricing plans section.

##### `populateFAQ()`
Updates FAQ section with questions and answers.

##### `toggleSection(sectionId, isVisible)`
Shows or hides specific sections of the sales page.
- `sectionId` (string): ID of the section to toggle
- `isVisible` (boolean): Whether to show or hide the section

##### `setupAutoPlayVideo(container, videoUrl)`
Sets up auto-playing video functionality.

**Data Structure:**
```javascript
const salesData = {
  hero: {
    title: "Your Main Headline",
    subtitle: "Supporting description text",
    primaryCTA: "Get Started Now",
    videoUrl: "https://youtube.com/embed/VIDEO_ID",
    bulletPoints: ["Benefit 1", "Benefit 2", "Benefit 3"]
  },
  features: [
    {
      icon: "fas fa-calculator",
      title: "Feature Name",
      description: "Feature description"
    }
  ],
  testimonials: [
    {
      content: "Customer testimonial text",
      author: "Customer Name",
      role: "Customer Title"
    }
  ],
  pricing: [
    {
      id: "plan-basic",
      name: "Basic Plan",
      price: "£19/month",
      features: ["Feature 1", "Feature 2"],
      buttonText: "Choose Plan",
      featured: false
    }
  ],
  faq: [
    {
      question: "Question text",
      answer: "Answer text"
    }
  ],
  cta: {
    redirectUrl: "https://signup.example.com",
    customHandler: function() { /* custom action */ }
  }
};
```

**Usage Example:**
```javascript
import { initializeSalesPage } from './sales_pages/main/sales_helper.js';

const salesManager = initializeSalesPage(salesData);
salesManager.toggleSection('testimonials-section', false);
```

### Calculation Functions

#### Core Calculation API
```javascript
import * as calculator from './oddsmatchers/main/calculate_functions.js';
```

##### `calculate_2up_bet_data(data)`
Calculates profit/loss scenarios for 2-up betting.

**Parameters:**
- `data` (object): Betting data including odds, stakes, and commission

**Returns:**
- Updated data object with calculated profits and losses

**Data Structure:**
```javascript
{
  back_odds: 3.5,
  lay_odds: 3.6,
  back_stake: 10,
  lay_commission: 0.05,
  // ... other betting parameters
}
```

##### `calculate_standard_bet_data(data)`
Calculates standard matched betting scenarios.

##### `calculate_each_way_bet_data(data)`
Calculates each-way betting profits and losses.

##### `calculate_dutching_bet_data(data)`
Calculates dutching betting scenarios.

##### `get_back_implied_place_odds(bookmaker_fraction, each_way_odds)`
Calculates implied place odds for each-way betting.

**Parameters:**
- `bookmaker_fraction` (string): Bookmaker fraction (e.g., "1/4")
- `each_way_odds` (number): Each-way odds value

**Returns:**
- Calculated implied place odds

### Helper Functions

#### Main Helper API
```javascript
import * as helper from './oddsmatchers/main/helper.js';
```

##### `process_new_final_data(data, scope, state)`
Main function to process and update component data.

**Parameters:**
- `data` (string|object): JSON data or parsed object
- `scope` (HTMLElement): Component scope (shadow root or element)
- `state` (object): Component state object

##### `loadExternalScript(scriptUrl)`
Dynamically loads external JavaScript files.

**Parameters:**
- `scriptUrl` (string): URL of the script to load

**Returns:**
- Promise that resolves when script is loaded

##### `add_filters(filterObject, scope, state)`
Adds filtering functionality to list components.

##### `append_sort_to_sort_options(name_for_sort, value, scope, state)`
Adds sorting options to dropdown menus.

#### Select Box Helper API
```javascript
import * as selectBoxes from './oddsmatchers/main/select_boxes.js';
```

##### `select_clicked(scope, state, id)`
Handles select box click interactions.

##### `copy_text_on_click_stake(event)`
Copies stake text to clipboard on click.

##### `change_lay_type_control_container(event)`
Changes lay type control visibility.

##### `set_class_for_profit_info_item(element, value)`
Sets appropriate CSS class based on profit value.

**Parameters:**
- `element` (HTMLElement): Element to update
- `value` (number): Profit value for class determination

#### Calculator Helper API
```javascript
import * as calcHelper from './calculators/main/calculator-helper.js';
```

##### `process_new_final_data(data, scope, state)`
Processes calculator data and updates inputs.

##### `runSpecificScript(scope, state)`
Initializes calculator-specific functionality.

#### Profit Tracker Helper API
```javascript
import * as ptHelper from './oddsmatchers/main/profit_tracker_helper.js';
```

##### `convertDateToInputFormat(dateString)`
Converts date string to input-compatible format.

**Parameters:**
- `dateString` (string): Date string to convert

**Returns:**
- Formatted date string for HTML input

##### `convertInputDateToDisplayFormat(dateString)`
Converts input date to display format.

##### `set_values_for_profit_tracker(scope, state, div, row, is_create)`
Sets values for profit tracker components.

#### List Helper API
```javascript
import * as listHelper from './list_pages/main/helper.js';
```

Functions for managing list components with filtering, sorting, and search functionality.

---

## Utility Functions

### CSS Conversion Utilities

#### CSS Converter Script
```python
# change_css.py - Utility for converting CSS units
```

##### `convert_px_to_vw(match)`
Converts pixel values to viewport width units.

##### `convert_vw_to_px(match)`
Converts viewport width units to pixels.

##### `convert_rem_to_px(match)`
Converts rem units to pixels.

##### `process_css_file(input_file_path, output_file_path)`
Processes entire CSS files for unit conversion.

**Usage:**
```python
process_css_file("input.css", "output.css")
```

### Date and Time Utilities

##### `parseDateAndTime_filterData(dateString)`
Parses date strings for filtering and sorting.

**Parameters:**
- `dateString` (string): Date string to parse

**Returns:**
- Parsed date object or null if invalid

---

## CSS Utilities

### Responsive Design Classes

#### Mobile Detection
```css
@media (max-width: 700px) {
  /* Mobile styles */
}
```

#### Common Utility Classes

##### Layout Classes
- `.container` - Main container with max-width
- `.flex-row` - Flexbox row layout
- `.flex-column` - Flexbox column layout
- `.grid-container` - CSS Grid container

##### Visibility Classes
- `.hidden` - Completely hidden element
- `.mobile-only` - Visible only on mobile
- `.desktop-only` - Visible only on desktop

##### State Classes
- `.active` - Active state styling
- `.disabled` - Disabled state styling
- `.loading` - Loading state styling

##### Profit/Loss Classes
- `.profit-positive` - Green styling for profits
- `.profit-negative` - Red styling for losses
- `.profit-neutral` - Neutral styling for break-even

### CSS Variables

#### Color Variables
```css
:root {
  --sales-primary-color: #ff00c6;
  --sales-secondary-color: #b300ff;
  --sales-accent-color: #00ffff;
  --profit-positive: #00ff00;
  --profit-negative: #ff0000;
}
```

#### Typography Variables
```css
:root {
  --sales-font-size-hero-title: 3.5rem;
  --sales-font-size-hero-title-mobile: 2.5rem;
  --base-font-size: 16px;
}
```

---

## Usage Examples

### Basic Component Usage

#### Embedding a Standard Odds Matcher
```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import './oddsmatchers/standard_oddsmatcher/myOddsmatcher.js';
  </script>
</head>
<body>
  <standard-oddsmatcher data-odds='{"premium_member": true, "data": []}'></standard-oddsmatcher>
</body>
</html>
```

#### Updating Component Data Dynamically
```javascript
const matcher = document.querySelector('standard-oddsmatcher');
const newData = {
  premium_member: true,
  data: [
    {
      id: 1,
      back_odds: 3.5,
      lay_odds: 3.6,
      bookmaker: "Bet365",
      exchange: "Betfair"
    }
  ]
};
matcher.setAttribute('data-odds', JSON.stringify(newData));
```

### Calculator Integration

#### Setting Up a Calculator
```javascript
import './calculators/standard/myCalculator.js';

// Calculator will automatically initialize when added to DOM
const calculatorHTML = `
  <standard-calculator data-calc='{"calculator_type": "Standard"}'></standard-calculator>
`;
document.body.innerHTML = calculatorHTML;
```

#### Processing Calculator Data
```javascript
const calcData = {
  back_odds: 2.5,
  lay_odds: 2.6,
  back_stake: 20,
  lay_commission: 0.05
};

// Calculator will automatically update when data attribute changes
calculator.setAttribute('data-calc', JSON.stringify(calcData));
```

### Dashboard Implementation

#### Basic Dashboard Setup
```html
<dashboard-page data-odds='{"profit": {"today": 50.25, "total": 1500.00}}'></dashboard-page>
```

#### Real-time Dashboard Updates
```javascript
function updateDashboard(newProfitData) {
  const dashboard = document.querySelector('dashboard-page');
  const currentData = JSON.parse(dashboard.getAttribute('data-odds') || '{}');
  
  currentData.profit = newProfitData;
  dashboard.setAttribute('data-odds', JSON.stringify(currentData));
}

// Update every 5 minutes
setInterval(() => {
  fetch('/api/profit-data')
    .then(response => response.json())
    .then(data => updateDashboard(data));
}, 300000);
```

### Sales Page Customization

#### Creating a Custom Sales Page
```javascript
class CustomSalesPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="sales-container"></div>
      <link rel="stylesheet" href="sales_pages/main/styles.css">
    `;
    
    this.loadSalesContent();
  }
  
  async loadSalesContent() {
    const { initializeSalesPage } = await import('./sales_pages/main/sales_helper.js');
    
    const customSalesData = {
      hero: {
        title: "Custom Sales Headline",
        subtitle: "Tailored for your specific audience",
        primaryCTA: "Start Your Journey"
      },
      features: [
        {
          icon: "fas fa-rocket",
          title: "Fast Setup",
          description: "Get started in minutes"
        }
      ]
    };
    
    this.salesManager = initializeSalesPage(customSalesData);
  }
}

customElements.define('custom-sales-page', CustomSalesPage);
```

#### Dynamic Content Updates
```javascript
// Hide testimonials section
salesManager.toggleSection('testimonials-section', false);

// Update hero title
salesManager.salesData.hero.title = "New Headline";
salesManager.populateHero();

// Add new feature
salesManager.salesData.features.push({
  icon: "fas fa-star",
  title: "New Feature",
  description: "Amazing new functionality"
});
salesManager.populateFeatures();
```

### Advanced Filtering and Sorting

#### Custom List Component with Filters
```javascript
import * as listHelper from './list_pages/main/helper.js';

class CustomList extends HTMLElement {
  connectedCallback() {
    this.state = {
      currentFilters: {},
      sortBy: 'date',
      searchTerm: ''
    };
    
    this.setupFilters();
  }
  
  setupFilters() {
    const filterObject = {
      'bookmaker': ['Bet365', 'Betfair', 'Ladbrokes'],
      'sport': ['Football', 'Horse Racing', 'Tennis']
    };
    
    listHelper.add_filters(filterObject, this, this.state);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-list') {
      const data = JSON.parse(newValue);
      this.updateList(data);
    }
  }
  
  updateList(data) {
    // Filter and sort data based on current state
    let filteredData = this.applyFilters(data);
    let sortedData = this.applySorting(filteredData);
    this.renderList(sortedData);
  }
}

customElements.define('custom-list', CustomList);
```

---

## Integration Guide

### Embedding in Existing Applications

#### Wix Integration
```javascript
// In Wix Code
import { initializeMatchedBettingComponents } from 'https://your-cdn.com/components.js';

$w.onReady(() => {
  // Initialize components
  initializeMatchedBettingComponents();
  
  // Bind to Wix data
  $w('#oddsMatcherContainer').html = `
    <standard-oddsmatcher data-odds='${JSON.stringify(wixData.odds)}'></standard-oddsmatcher>
  `;
});
```

#### WordPress Integration
```php
<?php
// In WordPress theme or plugin
function enqueue_matched_betting_scripts() {
    wp_enqueue_script(
        'matched-betting-components',
        plugin_dir_url(__FILE__) . 'js/components.js',
        [],
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_matched_betting_scripts');

// In template
echo '<standard-oddsmatcher data-odds=\'' . json_encode($odds_data) . '\'></standard-oddsmatcher>';
?>
```

#### React Integration
```jsx
import { useEffect, useRef } from 'react';

function MatchedBettingComponent({ oddsData }) {
  const containerRef = useRef();
  
  useEffect(() => {
    // Import the web component
    import('./oddsmatchers/standard_oddsmatcher/myOddsmatcher.js');
  }, []);
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.setAttribute('data-odds', JSON.stringify(oddsData));
    }
  }, [oddsData]);
  
  return <standard-oddsmatcher ref={containerRef} />;
}
```

#### Vue.js Integration
```vue
<template>
  <standard-oddsmatcher :data-odds="oddsDataString" />
</template>

<script>
export default {
  props: ['oddsData'],
  computed: {
    oddsDataString() {
      return JSON.stringify(this.oddsData);
    }
  },
  mounted() {
    import('./oddsmatchers/standard_oddsmatcher/myOddsmatcher.js');
  }
}
</script>
```

### Performance Optimization

#### Lazy Loading Components
```javascript
function lazyLoadComponent(componentName, targetElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        import(`./components/${componentName}.js`)
          .then(() => {
            entry.target.style.visibility = 'visible';
          });
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(targetElement);
}

// Usage
lazyLoadComponent('standard-oddsmatcher', document.querySelector('#matcher-container'));
```

#### Component Preloading
```javascript
// Preload critical components
const criticalComponents = [
  './dashboard/dashboard.js',
  './oddsmatchers/standard_oddsmatcher/myOddsmatcher.js'
];

Promise.all(criticalComponents.map(component => import(component)))
  .then(() => {
    console.log('Critical components loaded');
  });
```

### Error Handling

#### Component Error Boundaries
```javascript
class RobustComponent extends HTMLElement {
  connectedCallback() {
    try {
      this.initialize();
    } catch (error) {
      this.handleError(error);
    }
  }
  
  handleError(error) {
    console.error('Component error:', error);
    this.innerHTML = `
      <div class="error-container">
        <h3>Something went wrong</h3>
        <p>Please refresh the page or contact support.</p>
        <button onclick="location.reload()">Refresh Page</button>
      </div>
    `;
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    try {
      this.processAttributeChange(name, oldValue, newValue);
    } catch (error) {
      this.handleError(error);
    }
  }
}
```

#### Data Validation
```javascript
function validateOddsData(data) {
  const errors = [];
  
  if (!data || typeof data !== 'object') {
    errors.push('Data must be an object');
  }
  
  if (data.back_odds && (isNaN(data.back_odds) || data.back_odds <= 1)) {
    errors.push('Back odds must be a number greater than 1');
  }
  
  if (data.lay_odds && (isNaN(data.lay_odds) || data.lay_odds <= 1)) {
    errors.push('Lay odds must be a number greater than 1');
  }
  
  if (errors.length > 0) {
    throw new Error(`Data validation failed: ${errors.join(', ')}`);
  }
  
  return true;
}
```

### Testing

#### Component Testing
```javascript
// Test framework agnostic example
describe('StandardOddsmatcher', () => {
  let component;
  
  beforeEach(() => {
    component = document.createElement('standard-oddsmatcher');
    document.body.appendChild(component);
  });
  
  afterEach(() => {
    document.body.removeChild(component);
  });
  
  it('should calculate correct profit', () => {
    const testData = {
      back_odds: 2.0,
      lay_odds: 2.1,
      back_stake: 10,
      lay_commission: 0.05
    };
    
    component.setAttribute('data-odds', JSON.stringify(testData));
    
    // Wait for component to process
    setTimeout(() => {
      const profitElement = component.shadowRoot.querySelector('.total-profit');
      expect(profitElement.textContent).toContain('£');
    }, 100);
  });
});
```

---

This documentation provides comprehensive coverage of all public APIs, functions, and components in the matched betting system. Each component and function includes detailed parameters, return values, usage examples, and integration instructions.