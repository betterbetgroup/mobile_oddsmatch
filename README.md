# Matched Betting System

A comprehensive, modern web-based matched betting system built with Web Components, featuring odds matchers, calculators, dashboards, sales pages, and profit tracking tools.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![ES6](https://img.shields.io/badge/ES6-modules-yellow.svg)
![Web Components](https://img.shields.io/badge/Web%20Components-custom%20elements-purple.svg)

## 🎯 Overview

This system provides a complete suite of tools for matched betting operations:

- **Odds Matchers**: Compare odds across bookmakers and exchanges
- **Calculators**: Calculate optimal stakes and profits for various betting strategies
- **Dashboard**: Real-time profit tracking and offer management
- **Sales Pages**: Customizable landing pages for customer acquisition
- **List Management**: Organize and filter betting opportunities
- **Profit Tracking**: Detailed analytics and historical data

## 🚀 Quick Start

Get up and running in under 5 minutes:

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

**[📖 Read the Complete Quick Start Guide →](QUICK_START_GUIDE.md)**

## 📚 Documentation

### Core Documentation
- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference for all components
- **[Function Reference](FUNCTION_REFERENCE.md)** - Detailed function documentation
- **[Quick Start Guide](QUICK_START_GUIDE.md)** - Get started in minutes
- **[Sales Pages Guide](sales_pages/README.md)** - Existing sales pages documentation

### Key Features

#### 🎲 Odds Matching Components
- Standard Odds Matcher - Basic matched betting scenarios
- Two-Up Odds Matcher - 2-up betting opportunities
- Each Way Odds Matcher - Each-way betting calculations
- BOG Matcher - Best Odds Guaranteed scenarios
- Free Bet Matcher - Free bet optimization
- Dutching Matcher - Multi-selection betting
- Extra Place Matcher - Extra place promotions

#### 🧮 Calculator Components  
- Standard Calculator - Basic stake calculations
- Each Way Calculator - Each-way betting math
- Two-Up Calculator - 2-up betting calculations
- Dutching Calculator - Multi-selection stakes
- Extra Place Calculator - Extra place calculations
- Sequential Calculator - Sequential lay betting

#### 📊 Dashboard & Analytics
- Real-time profit tracking
- Offer progress monitoring
- Membership status display
- Historical data visualization
- Performance metrics

#### 🎨 Sales & Marketing Tools
- Customizable sales pages
- Landing page templates
- A/B testing capabilities
- Lead capture forms
- Conversion optimization

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript ES6+, Web Components
- **Styling**: CSS3 with responsive design (700px breakpoint)
- **Architecture**: Modular ES6 imports, Shadow DOM encapsulation
- **Compatibility**: Modern browsers with Web Components support

### Component Structure
```
matched-betting-system/
├── oddsmatchers/          # Odds matching components
│   ├── standard_oddsmatcher/
│   ├── two_up_oddsmatcher/
│   ├── each_way_oddsmatcher/
│   └── ...
├── calculators/           # Calculation components
│   ├── standard/
│   ├── each_way/
│   └── ...
├── dashboard/             # Dashboard component
├── sales_pages/           # Sales page system
├── list_pages/           # List management components
└── desktop_oddsmatchers/ # Desktop-specific versions
```

## 🔧 Installation & Setup

### Method 1: Direct Integration
```html
<script type="module">
    import './oddsmatchers/standard_oddsmatcher/myOddsmatcher.js';
    import './calculators/standard/myCalculator.js';
    import './dashboard/dashboard.js';
</script>
```

### Method 2: Framework Integration

#### React
```jsx
import { useEffect, useRef } from 'react';

function MatchedBettingComponent({ data }) {
    const ref = useRef();
    
    useEffect(() => {
        import('./oddsmatchers/standard_oddsmatcher/myOddsmatcher.js');
    }, []);
    
    useEffect(() => {
        if (ref.current) {
            ref.current.setAttribute('data-odds', JSON.stringify(data));
        }
    }, [data]);
    
    return <standard-oddsmatcher ref={ref} />;
}
```

#### Vue.js
```vue
<template>
    <standard-oddsmatcher :data-odds="dataString" />
</template>

<script>
export default {
    props: ['data'],
    computed: {
        dataString() { return JSON.stringify(this.data); }
    },
    mounted() {
        import('./oddsmatchers/standard_oddsmatcher/myOddsmatcher.js');
    }
}
</script>
```

## 📋 Component Reference

### Odds Matchers
| Component | Tag | Purpose |
|-----------|-----|---------|
| Standard Odds Matcher | `<standard-oddsmatcher>` | Basic matched betting |
| Two-Up Odds Matcher | `<two-up-oddsmatcher>` | 2-up betting scenarios |
| Each Way Odds Matcher | `<each-oddsmatcher>` | Each-way betting |
| BOG Matcher | `<bog-oddsmatcher>` | Best Odds Guaranteed |
| Free Bet Matcher | `<freebet-oddsmatcher>` | Free bet optimization |
| Dutching Matcher | `<dutching-oddsmatcher>` | Multi-selection betting |

### Calculators
| Component | Tag | Purpose |
|-----------|-----|---------|
| Standard Calculator | `<standard-calculator>` | Basic calculations |
| Each Way Calculator | `<eachway-calculator>` | Each-way math |
| Two-Up Calculator | `<two-up-calculator>` | 2-up calculations |
| Dutching Calculator | `<dutching-calculator>` | Multi-selection stakes |

### Other Components
| Component | Tag | Purpose |
|-----------|-----|---------|
| Dashboard | `<dashboard-page>` | Profit tracking & analytics |
| Profit Tracker | `<profit-tracker>` | Detailed profit analysis |
| Sales Page | `<home-page>` | Marketing landing pages |

## 💡 Usage Examples

### Basic Odds Matcher
```javascript
const oddsData = {
    premium_member: true,
    data: [
        {
            fixture: "Man City vs Liverpool",
            back_odds: 3.5,
            lay_odds: 3.6,
            bookmaker: "Bet365",
            exchange: "Betfair"
        }
    ]
};

document.querySelector('standard-oddsmatcher')
    .setAttribute('data-odds', JSON.stringify(oddsData));
```

### Real-time Dashboard Updates
```javascript
function updateDashboard(profitData) {
    const dashboard = document.querySelector('dashboard-page');
    const data = {
        profit: {
            today: profitData.today,
            thisMonth: profitData.thisMonth,
            total: profitData.total
        }
    };
    dashboard.setAttribute('data-odds', JSON.stringify(data));
}

// Update every 5 minutes
setInterval(() => {
    fetch('/api/profit-data')
        .then(response => response.json())
        .then(updateDashboard);
}, 300000);
```

### Custom Sales Page
```javascript
import { initializeSalesPage } from './sales_pages/main/sales_helper.js';

const salesData = {
    hero: {
        title: "Start Earning Guaranteed Profits",
        subtitle: "Join thousands of successful matched bettors",
        primaryCTA: "Get Started Free"
    },
    features: [
        {
            icon: "fas fa-calculator",
            title: "Advanced Calculators",
            description: "Optimize your betting strategy"
        }
    ]
};

const salesManager = initializeSalesPage(salesData);
```

## 🎨 Customization

### CSS Variables
```css
:root {
    --sales-primary-color: #ff00c6;
    --sales-secondary-color: #b300ff;
    --profit-positive: #00ff00;
    --profit-negative: #ff0000;
}
```

### Responsive Design
```css
/* Desktop (>700px) */
.component { font-size: 16px; }

/* Mobile (≤700px) */
@media (max-width: 700px) {
    .component { font-size: 14px; }
}
```

## 🔗 API Integration

### Data Formats

#### Odds Data
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

#### Dashboard Data
```javascript
{
    profit: {
        today: number,
        thisMonth: number,
        total: number
    },
    offers: {
        signup: { completed: number, total: number }
    }
}
```

### WebSocket Integration
```javascript
const ws = new WebSocket('wss://api.example.com/odds');
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    updateComponents(data);
};
```

## 🛠️ Development

### Project Structure
```
├── oddsmatchers/          # Odds matching components
├── calculators/           # Calculator components  
├── dashboard/             # Dashboard system
├── sales_pages/           # Sales page framework
├── list_pages/           # List management
├── guide_pages/          # Guide system
└── desktop_oddsmatchers/ # Desktop variants
```

### Common Patterns

#### Component Initialization
```javascript
class MyComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback() {
        this.render();
        this.addEventListeners();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.handleDataUpdate(newValue);
    }
}
```

#### Data Processing
```javascript
process_new_final_data(data, scope, state) {
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    this.updateComponent(parsedData);
}
```

### Testing
```javascript
// Component testing example
describe('StandardOddsmatcher', () => {
    let component;
    
    beforeEach(() => {
        component = document.createElement('standard-oddsmatcher');
        document.body.appendChild(component);
    });
    
    it('should calculate correct profits', () => {
        const testData = { /* test data */ };
        component.setAttribute('data-odds', JSON.stringify(testData));
        // assertions...
    });
});
```

## 🚀 Performance

### Optimization Features
- **Lazy Loading**: Components load only when needed
- **Shadow DOM**: Encapsulated styling and markup
- **Efficient Updates**: Minimal DOM manipulation
- **Responsive Design**: Mobile-optimized layouts
- **Debounced Updates**: Handles rapid data changes

### Best Practices
```javascript
// Debounced updates for real-time data
const debouncedUpdate = debounce((data) => {
    updateComponent(data);
}, 300);

// Lazy loading
const observer = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            await import('./component.js');
        }
    }
});
```

## 🌐 Browser Support

- **Chrome**: 54+
- **Firefox**: 63+
- **Safari**: 10.1+
- **Edge**: 79+

Requirements:
- ES6 Modules support
- Web Components (Custom Elements v1)
- Shadow DOM v1
- CSS Grid and Flexbox

## 📦 Utilities

### CSS Unit Conversion
```python
# change_css.py - Convert between px, vw, rem
process_css_file("input.css", "output.css")
```

### Date/Time Helpers
```javascript
convertDateToInputFormat('25/12/2023')    // "2023-12-25"
convertInputDateToDisplayFormat('2023-12-25') // "25/12/2023"
```

### Calculation Functions
```javascript
import { calculate_2up_bet_data } from './oddsmatchers/main/calculate_functions.js';

const result = calculate_2up_bet_data({
    back_odds: 3.5,
    lay_odds: 3.6,
    back_stake: 10,
    lay_commission: 0.05
});
```

## 🔧 Troubleshooting

### Common Issues

**Component not loading:**
- Check browser console for errors
- Verify script type is "module"  
- Ensure correct file paths

**Data not updating:**
- Validate JSON structure
- Check attribute names match component expectations
- Ensure data is properly stringified

**Styling issues:**
- Check CSS variable names
- Inspect Shadow DOM in dev tools
- Verify CSS loads after component

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

- **Documentation**: Check the comprehensive guides in this repository
- **Examples**: See the Quick Start Guide for working examples
- **Issues**: Report bugs and feature requests via GitHub issues

## 🗺️ Roadmap

### Upcoming Features
- Enhanced mobile experience
- Additional calculator types
- Advanced analytics dashboard
- API documentation generator
- Testing framework integration
- Performance monitoring tools

### Version History
- **1.0.0** - Initial release with core components
- **1.1.0** - Enhanced sales page system
- **1.2.0** - Mobile optimization improvements
- **2.0.0** - Full API documentation and examples

---

**[Get Started Now →](QUICK_START_GUIDE.md)** | **[View API Docs →](API_DOCUMENTATION.md)** | **[Function Reference →](FUNCTION_REFERENCE.md)**