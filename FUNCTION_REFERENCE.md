# Function Reference Guide

This document provides detailed reference information for all utility functions and helper methods in the matched betting system.

## Table of Contents

1. [Calculation Functions](#calculation-functions)
2. [Helper Functions](#helper-functions)
3. [Select Box Functions](#select-box-functions)
4. [Profit Tracker Functions](#profit-tracker-functions)
5. [List Management Functions](#list-management-functions)
6. [Calculator Helper Functions](#calculator-helper-functions)
7. [Date and Time Utilities](#date-and-time-utilities)
8. [CSS and Styling Functions](#css-and-styling-functions)

---

## Calculation Functions

### File: `oddsmatchers/main/calculate_functions.js`

#### `calculate_2up_bet_data(data)`

Calculates profit and loss scenarios for 2-up matched betting.

**Parameters:**
- `data` (object): Betting data object

**Required Data Properties:**
```javascript
{
  back_odds: number,          // Back odds (e.g., 3.5)
  lay_odds: number,           // Lay odds (e.g., 3.6)
  back_stake: number,         // Back stake amount
  lay_commission: number,     // Lay commission (e.g., 0.05 for 5%)
  is_payout: boolean,         // Whether this is a payout calculation
  new_back_odds: number,      // (Optional) New back odds for payout
  new_back_commission: number // (Optional) New back commission for payout
}
```

**Returns:**
- Updated data object with calculated values

**Calculated Properties Added:**
```javascript
{
  rating: string,                    // Bet rating as percentage
  bookmaker_profit_if_back_win: number,
  lay_stake: number,
  exchange_profit_if_back_win: number,
  total_profit_if_back_win: number,
  bookmaker_profit_if_lay_win: number,
  exchange_profit_if_lay_win: number,
  total_profit_if_lay_win: number,
  twoupbookmaker: number,
  twoupexchange: number,
  twouptotal: number,
  qualifying_loss: number,
  potential_profit: number,
  incomplete_data: boolean
}
```

**Example:**
```javascript
import { calculate_2up_bet_data } from './oddsmatchers/main/calculate_functions.js';

const betData = {
  back_odds: 3.5,
  lay_odds: 3.6,
  back_stake: 10,
  lay_commission: 0.05,
  is_payout: false
};

const result = calculate_2up_bet_data(betData);
console.log(`Rating: ${result.rating}`);
console.log(`Qualifying Loss: £${result.qualifying_loss}`);
console.log(`Potential Profit: £${result.potential_profit}`);
```

#### `get_back_implied_place_odds(bookmaker_fraction, each_way_odds)`

Calculates implied place odds for each-way betting.

**Parameters:**
- `bookmaker_fraction` (string): Bookmaker fraction (e.g., "1/4", "1/5")
- `each_way_odds` (number): Each-way odds value

**Returns:**
- `number`: Calculated implied place odds

**Example:**
```javascript
const impliedOdds = get_back_implied_place_odds("1/4", 5.0);
console.log(`Implied place odds: ${impliedOdds}`);
```

#### `process_and_round_numbers(data)`

Internal utility function that rounds all numeric values in a data object to 2 decimal places.

**Parameters:**
- `data` (object): Data object containing numeric values

**Returns:**
- `object`: Data object with rounded values

---

## Helper Functions

### File: `oddsmatchers/main/helper.js`

#### `process_new_final_data(data, scope, state)`

Main processing function for updating components with new data.

**Parameters:**
- `data` (string|object): JSON string or parsed data object
- `scope` (HTMLElement): Component scope (usually shadow root)
- `state` (object): Component state object

**Example:**
```javascript
import { process_new_final_data } from './oddsmatchers/main/helper.js';

const newData = {
  premium_member: true,
  data: [...] // betting data array
};

process_new_final_data(JSON.stringify(newData), this.shadowRoot, this.state);
```

#### `loadExternalScript(scriptUrl)`

Dynamically loads external JavaScript files.

**Parameters:**
- `scriptUrl` (string): URL of the script to load

**Returns:**
- `Promise<void>`: Resolves when script is loaded

**Example:**
```javascript
import { loadExternalScript } from './oddsmatchers/main/helper.js';

await loadExternalScript('https://cdn.example.com/library.js');
// Script is now loaded and available
```

#### `add_filters(filterObject, scope, state)`

Adds filtering functionality to list components.

**Parameters:**
- `filterObject` (object): Object defining available filters
- `scope` (HTMLElement): Component scope
- `state` (object): Component state

**Filter Object Structure:**
```javascript
{
  'bookmaker': ['Bet365', 'Betfair', 'Ladbrokes'],
  'sport': ['Football', 'Horse Racing', 'Tennis'],
  'status': ['Available', 'Completed']
}
```

**Example:**
```javascript
const filters = {
  bookmaker: ['Bet365', 'Betfair', 'William Hill'],
  sport: ['Football', 'Tennis', 'Horse Racing']
};

add_filters(filters, this.shadowRoot, this.state);
```

#### `append_sort_to_sort_options(name_for_sort, value, scope, state)`

Adds sorting options to dropdown menus.

**Parameters:**
- `name_for_sort` (string): Display name for the sort option
- `value` (string): Value used for sorting
- `scope` (HTMLElement): Component scope
- `state` (object): Component state

**Example:**
```javascript
append_sort_to_sort_options('Best Rating', 'rating', this.shadowRoot, this.state);
append_sort_to_sort_options('Highest Profit', 'profit', this.shadowRoot, this.state);
```

#### `append_filter_name_to_filter_options_in_dropdown(name_for_filter, scope, state)`

Adds filter names to filter dropdown options.

**Parameters:**
- `name_for_filter` (string): Name of the filter to add
- `scope` (HTMLElement): Component scope
- `state` (object): Component state

---

## Select Box Functions

### File: `oddsmatchers/main/select_boxes.js`

#### `select_clicked(scope, state, id)`

Handles select box click interactions and toggles dropdown visibility.

**Parameters:**
- `scope` (HTMLElement): Component scope
- `state` (object): Component state
- `id` (string): ID of the clicked select box

**Example:**
```javascript
import { select_clicked } from './oddsmatchers/main/select_boxes.js';

// Usually called from event listener
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('select_button')) {
    const id = event.target.dataset.id;
    select_clicked(this.shadowRoot, this.state, id);
  }
});
```

#### `copy_text_on_click_stake(event)`

Copies stake text to clipboard when stake element is clicked.

**Parameters:**
- `event` (Event): Click event object

**Example:**
```javascript
import { copy_text_on_click_stake } from './oddsmatchers/main/select_boxes.js';

// Attach to stake elements
stakeElement.addEventListener('click', copy_text_on_click_stake);
```

#### `change_lay_type_control_container(event)`

Changes the visibility of lay type control containers.

**Parameters:**
- `event` (Event): Click event object

#### `set_class_for_profit_info_item(element, value)`

Sets appropriate CSS class based on profit value (positive, negative, or neutral).

**Parameters:**
- `element` (HTMLElement): Element to update
- `value` (number): Profit value

**CSS Classes Applied:**
- `profit-positive`: For positive values
- `profit-negative`: For negative values
- `profit-neutral`: For zero values

**Example:**
```javascript
import { set_class_for_profit_info_item } from './oddsmatchers/main/select_boxes.js';

const profitElement = document.querySelector('.profit-display');
const profitValue = 25.50;

set_class_for_profit_info_item(profitElement, profitValue);
// Element will have 'profit-positive' class
```

---

## Profit Tracker Functions

### File: `oddsmatchers/main/profit_tracker_helper.js`

#### `convertDateToInputFormat(dateString)`

Converts date string to HTML input-compatible format.

**Parameters:**
- `dateString` (string): Date string in various formats

**Returns:**
- `string`: Date in YYYY-MM-DD format

**Example:**
```javascript
import { convertDateToInputFormat } from './oddsmatchers/main/profit_tracker_helper.js';

const inputDate = convertDateToInputFormat('25/12/2023');
console.log(inputDate); // "2023-12-25"
```

#### `convertInputDateToDisplayFormat(dateString)`

Converts HTML input date to user-friendly display format.

**Parameters:**
- `dateString` (string): Date string in YYYY-MM-DD format

**Returns:**
- `string`: Date in DD/MM/YYYY format

**Example:**
```javascript
const displayDate = convertInputDateToDisplayFormat('2023-12-25');
console.log(displayDate); // "25/12/2023"
```

#### `set_values_for_profit_tracker(scope, state, div, row, is_create)`

Sets values for profit tracker components.

**Parameters:**
- `scope` (HTMLElement): Component scope
- `state` (object): Component state
- `div` (HTMLElement): Container div element
- `row` (object): Row data object
- `is_create` (boolean): Whether creating new element or updating existing

#### `add_event_listener_for_platform_divs(div)`

Adds event listeners for platform selection dropdowns.

**Parameters:**
- `div` (HTMLElement): Container div for platform elements

#### `set_background_for_current_option_profit_tracker(platform_name, div)`

Sets background styling for currently selected platform option.

**Parameters:**
- `platform_name` (string): Name of the selected platform
- `div` (HTMLElement): Container div element

---

## List Management Functions

### File: `list_pages/main/helper.js`

#### Constants and Configuration

```javascript
const MAX_WIDTH_FOR_MOBILE = 700;
const delay_for_filtering_data = 300;
```

#### `above_columns_items_dict`

Dictionary containing HTML templates for above-column items.

**Available Items:**
- `'offers available'`: Shows number of available offers
- `'profit available'`: Shows total profit available
- `'guides read'`: Shows guides read progress
- `'races left'`: Shows remaining races
- `'search'`: Search input for bookmakers
- `'search guides'`: Search input for guides
- `'search races'`: Search input for races
- `'sort'`: Sorting dropdown
- `'hidden switch'`: Switch to show/hide completed offers
- `'hidden switch guides'`: Switch to show/hide read guides

**Example:**
```javascript
// Access template for offers counter
const offersTemplate = above_columns_items_dict['offers available'];
```

---

## Calculator Helper Functions

### File: `calculators/main/calculator-helper.js`

#### `process_new_final_data(data, scope, state)`

Processes calculator data and updates component state.

**Parameters:**
- `data` (string): JSON string containing calculator data
- `scope` (HTMLElement): Component scope
- `state` (object): Component state

**Data Structure:**
```javascript
{
  premium_member: boolean,
  is_calc: boolean,
  is_calc_data: object,     // Calculator data from tracker
  local_calc_data: object   // Local calculator data
}
```

#### `runSpecificScript(scope, state)`

Initializes calculator-specific functionality including HTML generation and event listeners.

**Parameters:**
- `scope` (HTMLElement): Component scope
- `state` (object): Component state

**State Properties Used:**
```javascript
{
  calculator_type: string,  // 'Standard', '2up', 'Each Way', etc.
  data_object: object,      // Current calculation data
  loaded_from_tracker: boolean
}
```

#### `add_values_for_calculator(scope, state, is_from_data)`

Populates calculator inputs with saved values.

**Parameters:**
- `scope` (HTMLElement): Component scope
- `state` (object): Component state
- `is_from_data` (boolean): Whether values are from loaded data

#### `set_all_values_to_default(scope, state)`

Resets all calculator inputs to default values.

**Parameters:**
- `scope` (HTMLElement): Component scope
- `state` (object): Component state

---

## Date and Time Utilities

### Various Files

#### `parseDateAndTime_filterData(dateString)`

Parses date strings for filtering and sorting operations.

**Parameters:**
- `dateString` (string): Date string in various formats

**Returns:**
- `Date|null`: Parsed Date object or null if invalid

**Supported Formats:**
- "DD/MM/YYYY HH:mm"
- "YYYY-MM-DD"
- "MM/DD/YYYY"
- ISO date strings

**Example:**
```javascript
const date1 = parseDateAndTime_filterData('25/12/2023 14:30');
const date2 = parseDateAndTime_filterData('2023-12-25');
```

#### `convertDateToJSDate(dateStr)`

Converts various date string formats to JavaScript Date objects.

**Parameters:**
- `dateStr` (string): Date string to convert

**Returns:**
- `Date`: JavaScript Date object

#### `get_date_from_date_and_time(date_and_time)`

Extracts date portion from datetime string.

**Parameters:**
- `date_and_time` (string): Datetime string

**Returns:**
- `string`: Date portion only

---

## CSS and Styling Functions

### File: `change_css.py`

#### `convert_px_to_vw(match)`

Converts pixel values to viewport width units.

**Parameters:**
- `match` (re.Match): Regex match object containing pixel value

**Returns:**
- `string`: Converted vw value

**Configuration:**
```python
base_width = 400  # The viewport width at which the design looks good
```

#### `convert_vw_to_px(match)`

Converts viewport width units to pixels.

**Parameters:**
- `match` (re.Match): Regex match object containing vw value

**Returns:**
- `string`: Converted pixel value

#### `convert_rem_to_px(match)`

Converts rem units to pixels.

**Parameters:**
- `match` (re.Match): Regex match object containing rem value

**Returns:**
- `string`: Converted pixel value

**Configuration:**
```python
base_px = 16  # Standard browser base font size
```

#### `process_css_file(input_file_path, output_file_path)`

Processes entire CSS files for unit conversion.

**Parameters:**
- `input_file_path` (string): Path to input CSS file
- `output_file_path` (string): Path to output CSS file

**Example Usage:**
```python
# Convert all px to vw in a CSS file
process_css_file("sales_pages/main/styles.css", "new_styles.css")
```

---

## Error Handling Functions

### Validation Functions

#### `validateOddsData(data)`

Validates betting odds data structure.

**Parameters:**
- `data` (object): Data object to validate

**Returns:**
- `boolean`: True if valid

**Throws:**
- `Error`: If validation fails

**Validation Rules:**
- Back odds must be > 1
- Lay odds must be > 1
- Stakes must be positive numbers
- Commission must be between 0 and 1

**Example:**
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

---

## Utility Constants

### Mobile Detection
```javascript
const MAX_WIDTH_FOR_MOBILE = 700; // Pixels
```

### Data Update Intervals
```javascript
const MAX_UPDATE_INTERVAL_LOCAL_DATA = 1000; // Milliseconds
```

### Character Limits
```javascript
const estimated_max_chars_per_line_profit_tracker_truncation = 90;
```

---

## Common Usage Patterns

### Component Initialization
```javascript
// Standard pattern for component initialization
connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.state = {
        data_loaded_from_wix: false,
        is_premium_member: false,
        // ... other state properties
    };
    
    this.loadHTMLAndCSS()
        .then(() => this.initializeComponent())
        .catch(error => this.handleError(error));
}
```

### Data Processing Pattern
```javascript
// Standard pattern for processing new data
attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-odds' && newValue) {
        try {
            const data = JSON.parse(newValue);
            this.process_new_final_data(data, this.shadowRoot, this.state);
        } catch (error) {
            console.error('Error processing data:', error);
            this.showErrorState();
        }
    }
}
```

### Event Listener Pattern
```javascript
// Standard pattern for adding event listeners
addEventListeners() {
    this.shadowRoot.addEventListener('click', (event) => {
        if (event.target.classList.contains('select_button')) {
            this.handleSelectClick(event);
        }
    });
    
    this.shadowRoot.addEventListener('input', (event) => {
        if (event.target.classList.contains('calculation-input')) {
            this.handleInputChange(event);
        }
    });
}
```

This function reference provides detailed documentation for all utility functions and helper methods in the matched betting system, including parameters, return values, examples, and common usage patterns.