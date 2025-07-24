# Quick Start Guide

Get up and running with the Matched Betting System components in minutes.

## Prerequisites

- Modern browser with ES6 modules support
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of Web Components (helpful but not required)

## Installation

### Option 1: Direct Import (Recommended)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matched Betting Demo</title>
</head>
<body>
    <!-- Import the component you need -->
    <script type="module">
        import './oddsmatchers/standard_oddsmatcher/myOddsmatcher.js';
    </script>
    
    <!-- Use the component -->
    <standard-oddsmatcher data-odds='{"premium_member": true, "data": []}'></standard-oddsmatcher>
</body>
</html>
```

### Option 2: Multiple Components
```html
<script type="module">
    // Import multiple components
    import './oddsmatchers/standard_oddsmatcher/myOddsmatcher.js';
    import './calculators/standard/myCalculator.js';
    import './dashboard/dashboard.js';
</script>

<standard-oddsmatcher data-odds='{"premium_member": true, "data": []}'></standard-oddsmatcher>
<standard-calculator data-calc='{"calculator_type": "Standard"}'></standard-calculator>
<dashboard-page data-odds='{"profit": {"today": 50.25}}'></dashboard-page>
```

## 5-Minute Examples

### 1. Basic Odds Matcher

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module">
        import './oddsmatchers/standard_oddsmatcher/myOddsmatcher.js';
    </script>
</head>
<body>
    <h1>My Betting Site</h1>
    
    <standard-oddsmatcher id="matcher" data-odds='{"premium_member": true, "data": []}'></standard-oddsmatcher>
    
    <script>
        // Update with real data
        const sampleData = {
            premium_member: true,
            data: [
                {
                    id: 1,
                    fixture: "Man City vs Liverpool",
                    back_odds: 3.5,
                    lay_odds: 3.6,
                    bookmaker: "Bet365",
                    exchange: "Betfair",
                    rating: "95%"
                }
            ]
        };
        
        document.getElementById('matcher').setAttribute('data-odds', JSON.stringify(sampleData));
    </script>
</body>
</html>
```

### 2. Interactive Calculator

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module">
        import './calculators/standard/myCalculator.js';
    </script>
</head>
<body>
    <h1>Betting Calculator</h1>
    
    <standard-calculator id="calc" data-calc='{"calculator_type": "Standard"}'></standard-calculator>
    
    <script>
        // Pre-fill with example data
        setTimeout(() => {
            const calcData = {
                calculator_type: "Standard",
                local_calc_data: {
                    back_odds: 2.5,
                    lay_odds: 2.6,
                    back_stake: 20
                }
            };
            
            document.getElementById('calc').setAttribute('data-calc', JSON.stringify(calcData));
        }, 1000); // Wait for component to load
    </script>
</body>
</html>
```

### 3. Dashboard with Live Data

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module">
        import './dashboard/dashboard.js';
    </script>
</head>
<body>
    <h1>My Dashboard</h1>
    
    <dashboard-page id="dashboard"></dashboard-page>
    
    <script>
        function updateDashboard() {
            const dashboardData = {
                profit: {
                    today: Math.random() * 100,
                    thisMonth: Math.random() * 1000,
                    total: Math.random() * 10000
                },
                offers: {
                    signup: { completed: 5, total: 10 }
                }
            };
            
            document.getElementById('dashboard').setAttribute('data-odds', JSON.stringify(dashboardData));
        }
        
        updateDashboard();
        setInterval(updateDashboard, 10000); // Update every 10 seconds
    </script>
</body>
</html>
```

### 4. Sales Page Setup

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module">
        import './sales_pages/homepage/homepage.js';
    </script>
</head>
<body>
    <!-- Sales page with default content -->
    <home-page></home-page>
    
    <!-- Or customize with your own content -->
    <div id="custom-sales"></div>
    
    <script type="module">
        import { initializeSalesPage } from './sales_pages/main/sales_helper.js';
        
        const customSalesData = {
            hero: {
                title: "Start Making Guaranteed Profits Today",
                subtitle: "Join thousands of successful matched bettors",
                primaryCTA: "Get Started Free"
            },
            features: [
                {
                    icon: "fas fa-calculator",
                    title: "Advanced Calculators",
                    description: "Calculate optimal stakes automatically"
                },
                {
                    icon: "fas fa-chart-line",
                    title: "Profit Tracking",
                    description: "Track your earnings in real-time"
                }
            ]
        };
        
        document.getElementById('custom-sales').innerHTML = `
            <div id="sales-container"></div>
            <link rel="stylesheet" href="sales_pages/main/styles.css">
        `;
        
        const salesManager = initializeSalesPage(customSalesData);
    </script>
</body>
</html>
```

## Common Data Structures

### Odds Data Format
```javascript
{
    premium_member: boolean,
    data: [
        {
            id: number,
            fixture: string,
            back_odds: number,
            lay_odds: number,
            bookmaker: string,
            exchange: string,
            rating: string,
            sport: string,
            date_and_time: string
        }
    ]
}
```

### Calculator Data Format
```javascript
{
    calculator_type: "Standard" | "2up" | "Each Way" | "Dutching",
    local_calc_data: {
        back_odds: number,
        lay_odds: number,
        back_stake: number,
        lay_commission: number
    }
}
```

### Dashboard Data Format
```javascript
{
    profit: {
        today: number,
        thisMonth: number,
        lastMonth: number,
        thisYear: number,
        total: number
    },
    offers: {
        signup: { completed: number, total: number },
        reload: { completed: number, total: number }
    },
    membership: {
        type: string,
        expiryDate: string
    }
}
```

## Responsive Design

All components are responsive by default. The breakpoint is 700px:

```css
/* Desktop styles apply above 700px */
/* Mobile styles apply at 700px and below */

@media (max-width: 700px) {
    /* Mobile-specific styling */
}
```

## Styling Customization

### Method 1: CSS Variables
```css
:root {
    --sales-primary-color: #your-color;
    --sales-secondary-color: #your-color;
    --profit-positive: #your-green;
    --profit-negative: #your-red;
}
```

### Method 2: Override Styles
```css
standard-oddsmatcher::part(table) {
    background-color: #your-color;
}

/* Or target shadow DOM styles */
standard-oddsmatcher {
    --table-background: #your-color;
}
```

## Real-Time Updates

### Updating Component Data
```javascript
// Get component reference
const matcher = document.querySelector('standard-oddsmatcher');

// Update data
function updateOdds(newData) {
    matcher.setAttribute('data-odds', JSON.stringify(newData));
}

// Listen for real-time updates (example with WebSocket)
const ws = new WebSocket('wss://your-api.com/odds');
ws.onmessage = (event) => {
    const newOddsData = JSON.parse(event.data);
    updateOdds(newOddsData);
};
```

### Batch Updates
```javascript
// Update multiple components at once
const components = {
    matcher: document.querySelector('standard-oddsmatcher'),
    dashboard: document.querySelector('dashboard-page'),
    calculator: document.querySelector('standard-calculator')
};

function updateAll(data) {
    if (data.odds) {
        components.matcher.setAttribute('data-odds', JSON.stringify(data.odds));
    }
    if (data.profit) {
        components.dashboard.setAttribute('data-odds', JSON.stringify(data.profit));
    }
    if (data.calculator) {
        components.calculator.setAttribute('data-calc', JSON.stringify(data.calculator));
    }
}
```

## Error Handling

### Basic Error Handling
```javascript
function safeUpdateComponent(component, data) {
    try {
        component.setAttribute('data-odds', JSON.stringify(data));
    } catch (error) {
        console.error('Failed to update component:', error);
        // Show user-friendly error
        component.innerHTML = '<div class="error">Failed to load data. Please refresh.</div>';
    }
}
```

### Validation
```javascript
function validateOddsData(data) {
    if (!data || !data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid odds data structure');
    }
    
    data.data.forEach(item => {
        if (!item.back_odds || !item.lay_odds) {
            throw new Error('Missing required odds data');
        }
    });
    
    return true;
}

// Use before updating
try {
    validateOddsData(newData);
    updateOdds(newData);
} catch (error) {
    console.error('Data validation failed:', error);
}
```

## Integration with Popular Frameworks

### React
```jsx
import { useEffect, useRef } from 'react';

function OddsMatcherComponent({ oddsData }) {
    const ref = useRef();
    
    useEffect(() => {
        import('./oddsmatchers/standard_oddsmatcher/myOddsmatcher.js');
    }, []);
    
    useEffect(() => {
        if (ref.current && oddsData) {
            ref.current.setAttribute('data-odds', JSON.stringify(oddsData));
        }
    }, [oddsData]);
    
    return <standard-oddsmatcher ref={ref} />;
}
```

### Vue.js
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

### Angular
```typescript
import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-odds-matcher',
    template: '<standard-oddsmatcher #matcher></standard-oddsmatcher>'
})
export class OddsMatcherComponent implements OnChanges {
    @Input() oddsData: any;
    @ViewChild('matcher') matcher: ElementRef;
    
    ngOnInit() {
        import('./oddsmatchers/standard_oddsmatcher/myOddsmatcher.js');
    }
    
    ngOnChanges() {
        if (this.matcher && this.oddsData) {
            this.matcher.nativeElement.setAttribute('data-odds', JSON.stringify(this.oddsData));
        }
    }
}
```

## Performance Tips

### Lazy Loading
```javascript
// Only load components when needed
function loadOddsMatcherWhenVisible() {
    const observer = new IntersectionObserver(async (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                await import('./oddsmatchers/standard_oddsmatcher/myOddsmatcher.js');
                observer.unobserve(entry.target);
            }
        }
    });
    
    observer.observe(document.querySelector('#odds-container'));
}
```

### Debounced Updates
```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedUpdate = debounce((data) => {
    updateOdds(data);
}, 500);

// Use debounced update for rapid data changes
ws.onmessage = (event) => {
    debouncedUpdate(JSON.parse(event.data));
};
```

## Troubleshooting

### Component Not Loading
1. Check browser console for errors
2. Ensure script type is "module"
3. Verify file paths are correct
4. Check for CORS issues if loading from different domain

### Data Not Updating
1. Verify JSON structure matches expected format
2. Check that attribute name matches component expectations
3. Ensure data is properly stringified

### Styling Issues
1. Check CSS variable names
2. Ensure styles are loaded after component
3. Use browser dev tools to inspect shadow DOM

## Next Steps

1. Read the [full API documentation](API_DOCUMENTATION.md)
2. Check the [function reference](FUNCTION_REFERENCE.md) for detailed method documentation
3. Explore the existing sales pages README for advanced customization
4. Join our community for support and updates

## Need Help?

- Check the console for error messages
- Review the examples in this guide
- Refer to the comprehensive API documentation
- Look at existing implementations in the codebase