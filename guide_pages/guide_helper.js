// Global oddsmatcher data storage



let desktop_tutorial_matcher_script_path = 'https://betterbetgroup.github.io/mobile_oddsmatch/desktop_oddsmatchers/tutorial/myOddsmatcher.js';
let mobile_tutorial_matcher_script_path = 'https://betterbetgroup.github.io/mobile_oddsmatch/oddsmatchers/tutorial/myOddsmatcher.js';



let globalOddsmatcherData = [];

let MAX_WIDTH_FOR_MOBILE = 700;

// Simple Blog-Style Guide Helper
export class GuidePageManager {
    constructor(shadowRoot, guideData = null) {
        this.shadowRoot = shadowRoot;
        this.guideData = guideData;
        this.currentStep = 1;
        this.loadedOddsmatchers = new Set();
    }

    populateContent() {
        this.populateHeader();
        // Add confirmation step first, then populate the step list
        this.addConfirmationStep();
        this.populateStepList();
        this.populateAllSteps().then(() => {
            // Initialize interactivity after all content is populated
            this.initializeInteractivity();
        });
    }

    populateHeader() {
        const logo = this.shadowRoot.querySelector('.bookmaker-logo');
        const bookmakerLink = this.shadowRoot.querySelector('.bookmaker-link');
        const bookmakerName = this.shadowRoot.querySelector('.bookmaker-name');
        const title = this.shadowRoot.querySelector('.main-title');
        const subtitle = this.shadowRoot.querySelector('.offer-subtitle');
        const badge = this.shadowRoot.querySelector('.profit-badge');

        if (logo && this.guideData && this.guideData.bookmaker_image) {
            logo.src = this.guideData.bookmaker_image;
            bookmakerLink.href = this.guideData.guide_page_offer_link;
        }
        
        if (bookmakerName && this.guideData.bookmaker) {
            bookmakerName.textContent = this.guideData.bookmaker;
        }
        
        if (title && this.guideData && this.guideData.title) {
            title.textContent = this.guideData.title;
        }
        
        if (subtitle && this.guideData && this.guideData.bookmaker && this.guideData.is_signup_guide) {
            subtitle.textContent = `Complete ${this.guideData.bookmaker} Sign-up Guide`;
        }
        
        if (badge && this.guideData && this.guideData.final_profit_text) {
            badge.textContent = this.guideData.final_profit_text;
        }
    }

    populateStepList() {
        const stepList = this.shadowRoot.querySelector('.step-list');
        if (!stepList || !this.guideData || !this.guideData. guide_data_manual.steps) return;

        const stepsHTML = this.guideData. guide_data_manual.steps.map((step, index) => {
            const isFirst = index === 0;
            return `
                <div class="guide-step-item ${isFirst ? 'active' : ''}" data-step="${step.id}">
                    ${step.id}. ${step.title}
                </div>
            `;
        }).join('');

        stepList.innerHTML = stepsHTML;
    }

    async populateAllSteps() {
        const allStepsContent = this.shadowRoot.querySelector('.all-steps-content');
        if (!allStepsContent) {
            console.error('Could not find .all-steps-content element');
            return;
        }
        
        if (!this.guideData || !this.guideData. guide_data_manual.steps || this.guideData. guide_data_manual.steps.length === 0) {
            return;
        }

        let stepsHTML = '';

        for (const step of this.guideData. guide_data_manual.steps) {            
            // Format step content - support both old text format and new items format
            let formattedContent = '';
            
            if (step.content?.items && Array.isArray(step.content.items)) {
                // New list-based format
                formattedContent = step.content.items.map(item => {
                    switch (item.type) {
                        case 'text':
                            return `<div class="step-item-text">${item.content}</div>`;
                        
                        case 'button':
                            const buttonClass = item.style === 'secondary' ? 'step-button-secondary' : 'step-button-primary';
                            return `
                                <div class="step-item-button">
                                    <a href="${item.url}" target="_blank" class="${buttonClass}">
                                        <i class="fas fa-external-link-alt"></i>
                                        ${item.content}
                                    </a>
                                </div>
                            `;
                        

                        case 'info':
                            return `
                                <div class="step-item-info">
                                    <i class="fas fa-info-circle"></i>
                                    <span>${item.content}</span>
                                </div>
                            `;
                        
                        case 'warning':
                            return `
                                <div class="step-item-warning">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <span>${item.content}</span>
                                </div>
                            `;
                        
                        case 'tip':
                            return `
                                <div class="step-item-tip">
                                    <div class="tip-header">
                                        <i class="fas fa-lightbulb"></i>
                                        <span>Pro Tip</span>
                                    </div>
                                    <p>${item.content}</p>
                                </div>
                            `;
                        
                        case 'checkbox':
                            return `
                                <div class="step-item-checkbox-container">
                                <div class="switch_container">
                                    <label class="switch">
                                            <input type="checkbox" id="offer-complete-checkbox" class="show_filters_switch offer_complete_checkbox">
                                        <span class="slider"></span>
                                    </label>
                                        <span class="step-item-checkbox-text"><span class="availability-text">Available</span></span>
                                    </div>
                                </div>
                            `;

                        case 'div for buttons':
                            return `
                                <div class="step-item-buttons">
                                    ${item.content.map(button => {
                                        return `
                                            <div class="step-item-button">
                                                <a href="${button.url}" class="${button.style === 'secondary' ? 'step-button-secondary' : 'step-button-primary'}">
                                                    <i class="fas fa-angle-right"></i>
                                                    ${button.content}
                                                </a>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            `;


                        default:
                            return `<div class="step-item-text">${item.content}</div>`;
                    }
                }).join('');
            } else if (step.content?.text) {
                // Fallback to old text format for backward compatibility
                formattedContent = step.content.text
                    .split('\\n')
                    .map(line => {
                        if (line.trim().match(/^\d+\)/)) {
                            return `<div class="step-instruction">${line}</div>`;
                        }
                        return `<p>${line}</p>`;
                    }).join('');
            }

            // Tips are now handled as items in the content array

            // Oddsmatcher section
            let oddsmatcherHTML = '';
            if (step.content?.oddsmatcher) {
                const omType = step.content.oddsmatcher.type;
                const oddsmatcherTag = 'tutorial-oddsmatcher';
                        
                
                // Load oddsmatcher if not already loaded
                if (!this.loadedOddsmatchers.has(omType)) {
                    try {
                        await this.loadOddsmatcher(omType);
                        this.loadedOddsmatchers.add(omType);
                    } catch (error) {
                        console.warn('Failed to load oddsmatcher:', omType, error);
                    }
                }

                // Prepare data with wix_filters
                const oddsmatcherData = {
                    wix_filters: step.content.oddsmatcher.filters,
                    tutorial_info: step.content.oddsmatcher.tutorial_info,
                    is_first_send: true,
                    premium_member: true,
                    rows: globalOddsmatcherData
                };

                // Create oddsmatcher element using DOM instead of HTML string to avoid JSON escaping issues
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = `
                    <div class="oddsmatcher-wrapper">
                        <div class="oddsmatcher-intro">
                            <div class="tool-icon">⚡</div>
                            <div class="tool-content">
                                <h4>${step.content.oddsmatcher.oddsmatcher_title}</h4>
                                <p>Simply click the plus icon next to the event of your choosing and follow the instructions</p>
                            </div>
                        </div>
                    </div>
                    <${oddsmatcherTag} class="added_oddsmatcher"></${oddsmatcherTag}>
                `;
                
                // Set the data-odds attribute safely using setAttribute to avoid JSON escaping issues
                const oddsmatcherElement = tempDiv.querySelector(oddsmatcherTag);
                oddsmatcherElement.setAttribute('data-odds', JSON.stringify(oddsmatcherData));
                
                oddsmatcherHTML = tempDiv.innerHTML;
            }

            // Build complete step sectionf
            stepsHTML += `
                <div class="step-section" id="step-${step.id}" data-step="${step.id}">
                    <h2 class="step-title">Step ${step.id}: ${step.title}</h2>
                    <div class="step-content">${formattedContent}</div>
                    ${oddsmatcherHTML}
                </div>
            `;
        }

        allStepsContent.innerHTML = stepsHTML;
    }

    async loadOddsmatcher(type) {

        let scriptPath = desktop_tutorial_matcher_script_path;
        if (window.innerWidth < MAX_WIDTH_FOR_MOBILE) {
            scriptPath = mobile_tutorial_matcher_script_path;
        } 
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.type = 'module';
            script.onload = () => {
                resolve();
            };
            script.onerror = (error) => {
                console.error('Failed to load script:', scriptPath, error);
                reject(error);
            };
            document.head.appendChild(script);
        });
    }

    initializeInteractivity() {
        // Wait a bit for DOM to be fully ready
        setTimeout(() => {
            // Step item click listeners
            const stepItems = this.shadowRoot.querySelectorAll('.guide-step-item');
            stepItems.forEach(item => {
                item.addEventListener('click', () => {
                    const stepId = parseInt(item.dataset.step);
                    this.scrollToStep(stepId);
                });
            });

            // Add event forwarding for oddsmatcher events
            this.setupOddsmatcherEventForwarding();

            // Initialize scroll detection for step highlighting
            this.initializeScrollDetection();
        }, 100);
    }

    setupOddsmatcherEventForwarding() {

        return;
        // DO NOT NEED THIS AS EVENTS ALREADY GO ALL THE WAY UP


        // Find all oddsmatcher elements
        const oddsmatcherElements = this.shadowRoot.querySelectorAll('.added_oddsmatcher');
        
        // List of events that oddsmatchers dispatch that should be forwarded
        const eventsToForward = [
            'logbet',
            'Upgrade', 
            'Get-Alerts',
            'submit-email'

        ];
        
        oddsmatcherElements.forEach(oddsmatcher => {
            // Check if we've already set up event forwarding for this element
            if (oddsmatcher.hasAttribute('data-events-forwarded')) {
                return; // Skip if already set up
            }
            
            // Mark this element as having event forwarding set up
            oddsmatcher.setAttribute('data-events-forwarded', 'true');

            console.log('adding event listener for', oddsmatcher);
            
            eventsToForward.forEach(eventType => {

                oddsmatcher.addEventListener(eventType, (event) => {

                    console.log('event', event);
                    
                    // Create a new event with the same details and forward it
                    const forwardedEvent = new CustomEvent(eventType, {
                        detail: event.detail,
                        bubbles: true,
                        composed: true
                    });
                    
                    // Dispatch it from the shadowRoot to bubble up to parent
                    this.shadowRoot.dispatchEvent(forwardedEvent);
                });
            });
        });
    }

    scrollToStep(stepId) {
        const stepSection = this.shadowRoot.querySelector(`#step-${stepId}`);
        if (stepSection) {
            stepSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    updateProgressBar(currentStep, totalSteps) {
        const progressElement = this.shadowRoot.querySelector('.step-progress h3');
        if (progressElement) {
            const percentage = (currentStep / totalSteps) * 100;
            
            // Update the width of the ::before element (progress fill)
            progressElement.style.setProperty('--progress-width', `${percentage}%`);
            
            // Double check the CSS variable is set
        } else {
            console.error('Progress element not found');
        }
    }

    initializeScrollDetection() {
        
        const stepSections = this.shadowRoot.querySelectorAll('.step-section');
        const stepItems = this.shadowRoot.querySelectorAll('.guide-step-item');
        const mainContent = this.shadowRoot.querySelector('.main-content');


        if (stepSections.length === 0 || stepItems.length === 0 || !mainContent) {
            
            // Retry after a longer delay
            setTimeout(() => {
                this.initializeScrollDetection();
            }, 500);
            return;
        }

        const updateActiveStep = () => {
            let newActiveStep = this.currentStep || 1; // Keep current step as default
            
            // Find the section that's most visible in the viewport
            let maxVisibility = 0;
            
            stepSections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                
                // Check if the step has reached the top of the viewport (with small offset)
                // This means the previous step is completely off screen
                const topOffset = 100; // pixels from top of viewport
                const hasReachedTop = rect.top <= topOffset;
                const isVisible = rect.bottom > 0; // Make sure section is still visible
                
                // Only switch to this step if it has reached the top and is visible
                if (hasReachedTop && isVisible) {
                    newActiveStep = parseInt(section.dataset.step);
                }
            });

            // Only update if the step actually changed
            if (newActiveStep !== this.currentStep) {

                // Update sidebar highlighting with animation
                stepItems.forEach(item => {
                    const itemStepId = parseInt(item.dataset.step);
                    if (itemStepId === newActiveStep) {
                        if (!item.classList.contains('active')) {
                            // Add a brief pulse animation when step becomes active
                            item.style.animation = 'stepActivate 0.3s ease-out';
                            setTimeout(() => {
                                item.style.animation = '';
                            }, 300);
                        }
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });

                this.currentStep = newActiveStep;
                
                // Update progress bar
                this.updateProgressBar(newActiveStep, stepSections.length);
            }
        };

        // Listen for normal page scroll events
        window.addEventListener('scroll', updateActiveStep);

        // Set initial active step and progress bar
        updateActiveStep();
        this.updateProgressBar(this.currentStep || 1, stepSections.length);
        
        // Store cleanup function
        this.scrollCleanup = () => {
            window.removeEventListener('scroll', updateActiveStep);
        };
    }

    updateAllOddsmatchers() {
        
        if (!globalOddsmatcherData || globalOddsmatcherData.length === 0) {
            return;
        }

        // Find all oddsmatcher elements by class
        const oddsmatcherElements = this.shadowRoot.querySelectorAll('.added_oddsmatcher');
        
        oddsmatcherElements.forEach(oddsmatcherElement => {
            // Prepare data with rows
            const oddsmatcherData = {
                rows: globalOddsmatcherData,
                is_first_send: false,
            };
            
            oddsmatcherElement.setAttribute('data-odds', JSON.stringify(oddsmatcherData));
        });
    }

    // Function to set global oddsmatcher data and update all oddsmatchers
    setGlobalOddsmatcherData(rows) {
        this.updateAllOddsmatchers();
    }

    // Add confirmation step to every guide
    addConfirmationStep() {
        if (!this.guideData || !this.guideData.guide_data_manual?.steps) return;

        // Check if confirmation step already exists (by checking if title contains "Confirm Completion")
        const hasConfirmationStep = this.guideData.guide_data_manual.steps.some(step => step.title === "Confirm Completion");
        if (hasConfirmationStep) return;

        // Get the next step number
        const nextStepNumber = this.guideData.guide_data_manual.steps.length + 1;


        let button_text = "Sign-up Offer List";
        let button_url = "https://www.betterbetgroup.com/sign-up-offer-list";

        if (!this.guideData.is_signup_guide) {
            button_text = "Weekly Offer List";
            button_url = "https://www.betterbetgroup.com/weekly-bet-club-offer-list";
        }

        const confirmationStep = {
            id: nextStepNumber,
            title: "Confirm Offer",
            content: {
                items: [
                    {
                        type: "text",
                        content: "You should have now completed this offer. Click the checkbox below to confirm you have completed all of the steps."
                    },
                    {
                        type: "checkbox",
                        content: "Complete"
                    },
                    {
                        type: "text",
                        content: "What would you like to do next?"
                    },
                    {
                        type: "div for buttons",
                        content: [            
                        {
                            type: "button",
                            content: button_text,
                            url: button_url,
                            style: "primary"
                        },
                        {
                            type: "button",
                            content: "Profit Tracker",
                            url: "https://www.betterbetgroup.com/betting-profit-tracker", 
                            style: "secondary"
                        }
                    ]
                    }

                ]
            }
        };

        // Add as the last step
        this.guideData.guide_data_manual.steps.push(confirmationStep);
    }
}

export function handleResize(scope) {



    let width = window.innerWidth;


    const contentDiv = scope.getElementById('outer-container-div');
    contentDiv.style.width = `${width}px`; 

}  

// Helper functions
export async function render(shadowRoot, state, htmlUrl) {
    try {
        const response = await fetch(htmlUrl);
        const html = await response.text();
        shadowRoot.innerHTML = html;
    } catch (error) {
        console.error('Failed to load HTML:', error);
        shadowRoot.innerHTML = getInlineHTML();
    }
}

export async function addStyles(shadowRoot, state, cssUrl) {
    try {
        const response = await fetch(cssUrl);
        const css = await response.text();
        const style = document.createElement('style');
        style.textContent = css;
        shadowRoot.appendChild(style);
    } catch (error) {
        console.error('Failed to load CSS:', error);
    }
}

export function runSpecificScript(shadowRoot, state) {
    // Initialize with default data first
    const manager = new GuidePageManager(shadowRoot);
    manager.populateContent();
    
    // Store manager for external access
    shadowRoot.guideManager = manager;
}

export function process_new_final_data(newData, shadowRoot) {
    try {
        const parsedData = typeof newData === 'string' ? JSON.parse(newData) : newData;
        
        // Extract and store global oddsmatcher data from .rows
        
        // Update the guide with new data
        if (shadowRoot.guideManager && parsedData.is_first_send) {
            shadowRoot.guideManager.guideData = parsedData.item_data;
            shadowRoot.guideManager.populateContent();
        } 

        if (parsedData && parsedData.rows) {
            globalOddsmatcherData = parsedData.rows;
            console.log('globalOddsmatcherData', globalOddsmatcherData);
            shadowRoot.guideManager.setGlobalOddsmatcherData(globalOddsmatcherData);
        }


    } catch (error) {
        console.error('Failed to process guide data:', error);
    }
}

// Helper function to get day of week as number (0 = Sunday, 1 = Monday, etc.)
function getDayOfWeekNumber(dayName) {
    const days = {
        'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
        'Thursday': 4, 'Friday': 5, 'Saturday': 6
    };
    return days[dayName];
}

// Helper function to get the next end day of the cycle after the updated time
function getNextCycleEndDate(updatedTime, startDay, endDay) {
    const startDayNum = getDayOfWeekNumber(startDay);
    const endDayNum = getDayOfWeekNumber(endDay);
    const updatedDay = updatedTime.getDay();
    
    let nextEndDate = new Date(updatedTime);
    
    if (startDayNum <= endDayNum) {
        // Same week cycle (e.g., Monday to Sunday)
        if (updatedDay <= endDayNum) {
            // Same week
            nextEndDate.setDate(updatedTime.getDate() + (endDayNum - updatedDay));
        } else {
            // Next week
            nextEndDate.setDate(updatedTime.getDate() + (7 - updatedDay + endDayNum));
        }
    } else {
        // Cross-week cycle (e.g., Wednesday to Tuesday)
        if (updatedDay >= startDayNum) {
            // This cycle ends next week
            nextEndDate.setDate(updatedTime.getDate() + (7 - updatedDay + endDayNum));
        } else if (updatedDay <= endDayNum) {
            // This cycle ends this week
            nextEndDate.setDate(updatedTime.getDate() + (endDayNum - updatedDay));
        } else {
            // Between cycles, next cycle ends next week
            nextEndDate.setDate(updatedTime.getDate() + (7 - updatedDay + endDayNum));
        }
    }
    
    return nextEndDate;
}



// Get availability text for weekly offers
function get_availability_text_for_guide(guideData, userSuoItem) {
    if (!userSuoItem || userSuoItem.is_available) {
        return 'Available';
    }

    // For signup guides, just return unavailable
    if (guideData.is_signup_guide) {
        return 'Complete';
    }

    // For weekly guides, calculate based on weekly_days
    if (!guideData.weekly_days || guideData.weekly_days.length !== 2) {
        return 'Complete';
    }

    const updatedTime = new Date(userSuoItem.updated_time);
    const currentTime = new Date();
    const [startDay, endDay] = guideData.weekly_days;

    // Calculate when this offer becomes available again (day after cycle ends)
    const nextCycleEndDate = getNextCycleEndDate(updatedTime, startDay, endDay);
    const availableDate = new Date(nextCycleEndDate);
    availableDate.setDate(availableDate.getDate() + 1); // Available the day after cycle ends
    
    // Calculate time difference between now and when it becomes available
    const timeDifference = availableDate - currentTime;

    if (timeDifference <= 0) {
        return 'Available';
    }

    // Convert time difference to a more understandable format
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    console.log('this is the days', days)

    if (days > 0) {
        return `Available In ${days} Days`;
    } else if (hours > 0) {
        return `Available In ${hours} Hours`;
    } else {
        return `Available In ${minutes} Minutes`;
    }
}

// Update availability status based on weekly cycle logic
function update_availability_status(guideData, userSuoItem) {
    if (!userSuoItem || userSuoItem.is_available) {
        return; // Already available, no need to update
    }

    // For signup guides, availability doesn't change automatically
    if (guideData.is_signup_guide) {
        return;
    }

    // For weekly guides, check if it should become available again
    if (!guideData.weekly_days || guideData.weekly_days.length !== 2) {
        return;
    }

    const updatedTime = new Date(userSuoItem.updated_time);
    const currentTime = new Date();
    const [startDay, endDay] = guideData.weekly_days;

    // Calculate when this offer becomes available again (day after cycle ends)
    const nextCycleEndDate = getNextCycleEndDate(updatedTime, startDay, endDay);
    const availableDate = new Date(nextCycleEndDate);
    availableDate.setDate(availableDate.getDate() + 1); // Available the day after cycle ends

    // Check if current time has passed the available date
    if (currentTime >= availableDate) {
        userSuoItem.is_available = true;
    }
}

function create_offer_id(row, is_signup_guide) {

    if (!is_signup_guide) {
        return (row.adjusted_title).toLowerCase().replace(/[^a-z0-9]/g, '_');
    } else {
        return (row.bookmaker).replace(/\s+/g, '-');
    }

}



export function process_user_suo_object(userSuoObjectData, shadowRoot) {

    console.log('1')

    if (!shadowRoot.guideManager || !shadowRoot.guideManager.guideData) {
        return;
    }

    console.log('2')


    // Parse the data if it's a string
    const userSuoObject = typeof userSuoObjectData === 'string' ? JSON.parse(userSuoObjectData) : userSuoObjectData;

    console.log('3')

    const guideData = shadowRoot.guideManager.guideData;
    console.log('4')

    
    // Find the matching user suo object item
    let userSuoItem = userSuoObject.find(item => item.offer_id === create_offer_id(guideData, guideData.is_signup_guide));

    console.log('5')
    
    // Update availability status for weekly offers
    if (userSuoItem && !guideData.is_signup_guide) {
        update_availability_status(guideData, userSuoItem);
    }

    console.log('6')

    console.log('7')

    // Wait for checkbox to load with 5 second timeout
    waitForElement(shadowRoot, '#offer-complete-checkbox', 5000).then(checkbox => {
        console.log('✅ Checkbox found, setting up event handlers');
        
        // Also get availability text element
        const availabilityText = shadowRoot.querySelector('.availability-text');

        // Set checkbox state based on availability
        if (userSuoItem) {
            checkbox.checked = !userSuoItem.is_available;
            
            // Update availability text if element exists
            if (availabilityText) {
                if (!userSuoItem.is_available) {
                    const availText = get_availability_text_for_guide(guideData, userSuoItem);
                    availabilityText.textContent = availText;
                } else {
                    availabilityText.textContent = 'Available';
                }
            }
        } else {
            // No user suo object found, assume available
            checkbox.checked = false;
            if (availabilityText) {
                availabilityText.textContent = 'Available';
            }
        }

        // Remove existing event listeners to avoid duplicates
        const newCheckbox = checkbox.cloneNode(true);
        checkbox.parentNode.replaceChild(newCheckbox, checkbox);
        
        // Add event listener for checkbox changes
        newCheckbox.addEventListener('change', function(e) {
            const isChecked = e.target.checked;
            const currentTime = new Date().toISOString();
            
            // Find or create user suo object item
            let targetUserSuoItem = userSuoObject.find(item => item.offer_id === create_offer_id(guideData, guideData.is_signup_guide));
            
            if (!targetUserSuoItem) {
                // Create new suo object item if it doesn't exist
                targetUserSuoItem = {
                    bookmaker_name: guideData.bookmaker,
                    is_available: true,
                    updated_time: new Date().toISOString(), // Default timestamp, will be updated when completed
                    offer_id: create_offer_id(guideData, guideData.is_signup_guide)
                };
                userSuoObject.push(targetUserSuoItem);
            }
            
            // Update the item
            const wasAvailable = targetUserSuoItem.is_available;
            targetUserSuoItem.is_available = !isChecked;
            
            // Only update the timestamp when going from available to unavailable (marking as complete)
            if (isChecked) {
                targetUserSuoItem.updated_time = currentTime;
            }
            
            // Update availability text
            if (availabilityText) {
                const availText = get_availability_text_for_guide(guideData, targetUserSuoItem);
                availabilityText.textContent = availText;
            }
            
            // Dispatch event to notify parent (similar to list pages)
            let message = {
                suo_array: userSuoObject
            };

            const raise_event = new CustomEvent('suo_array', {
                detail: message,  
                bubbles: true,       
                composed: true        
            });
            shadowRoot.dispatchEvent(raise_event); 


        });
    }).catch(error => {
        console.warn('⚠️ Checkbox not found within 5 seconds:', error);
        console.log('Continuing without checkbox functionality');
    });
}




export function process_item_data(newData, shadowRoot) {
    try {
        const parsedData = typeof newData === 'string' ? JSON.parse(newData) : newData;
        
        // Set up the guide manager with the new data
        if (!shadowRoot.guideManager) {
            shadowRoot.guideManager = new GuidePageManager(shadowRoot, parsedData);
        } else {
            shadowRoot.guideManager.guideData = parsedData;
        } 

        // Populate the content
        shadowRoot.guideManager.populateContent();

    } catch (error) {
        console.error('Failed to process item data:', error);
    }
}


function getInlineHTML() {
    return `
        <div class="blog-container">
            <header class="blog-header">
                <img class="bookmaker-logo" src="" alt="Bookmaker Logo" />
                <h1 class="main-title"></h1>
                <div class="profit-badge"></div>
            </header>
            
            <div class="blog-content">
                <aside class="step-sidebar">
                    <div class="step-progress">
                        <h3>Steps</h3>
                        <div class="step-list"></div>
                    </div>
                </aside>
                
                <main class="main-content">
                    <div class="all-steps-content">
                        <!-- Steps will be populated here -->
                    </div>
                </main>
            </div>
        </div>
    `;
}

// Helper function to wait for an element to appear with timeout
function waitForElement(container, selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const element = container.querySelector(selector);
        
        // If element already exists, resolve immediately
        if (element) {
            resolve(element);
            return;
        }
        
        // Set up polling to check for element
        const startTime = Date.now();
        const checkInterval = 100; // Check every 100ms
        
        const intervalId = setInterval(() => {
            const element = container.querySelector(selector);
            
            if (element) {
                clearInterval(intervalId);
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                clearInterval(intervalId);
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }
        }, checkInterval);
    });
}