// Global oddsmatcher data storage
let globalOddsmatcherData = {};

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
        const bookmakerName = this.shadowRoot.querySelector('.bookmaker-name');
        const title = this.shadowRoot.querySelector('.main-title');
        const subtitle = this.shadowRoot.querySelector('.offer-subtitle');
        const badge = this.shadowRoot.querySelector('.profit-badge');

        if (logo && this.guideData && this.guideData.bookmaker_image) {
            logo.src = this.guideData.bookmaker_image;
        }
        
        if (bookmakerName && this.guideData.bookmaker) {
            bookmakerName.textContent = this.guideData.bookmaker;
        }
        
        if (title && this.guideData && this.guideData.title) {
            title.textContent = this.guideData.title;
        }
        
        if (subtitle && this.guideData && this.guideData.bookmaker) {
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
                                <div class="step-item-checkbox">
                                    <label class="checkbox-container">
                                        <input type="checkbox" class="step-checkbox">
                                        <span class="checkbox-checkmark"></span>
                                        <span class="checkbox-text">${item.content}</span>
                                    </label>
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

                oddsmatcherHTML = `
                    <div class="oddsmatcher-wrapper">
                        <div class="oddsmatcher-intro">
                            <div class="tool-icon">⚡</div>
                            <div class="tool-content">
                                <h4>${step.content.oddsmatcher.oddsmatcher_title}</h4>
                                <p>Simply click the plus icon next to the event of your choosing and follow the instructions</p>
                            </div>
                        </div>
                    </div>

                    <${oddsmatcherTag} class="added_oddsmatcher" data-odds='${JSON.stringify(oddsmatcherData)}'></${oddsmatcherTag}>

                    `;
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

        let scriptPath = `../desktop_oddsmatchers/${type}/myOddsmatcher.js`;
        if (window.innerWidth < MAX_WIDTH_FOR_MOBILE) {
            scriptPath = `../oddsmatchers/${type}/myOddsmatcher.js`;
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

            // Initialize scroll detection for step highlighting
            this.initializeScrollDetection();
        }, 100);
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
        if (!this.guideData || !this.guideData. guide_data_manual.steps) return;

        // Check if confirmation step already exists (by checking if title contains "Confirm Completion")
        const hasConfirmationStep = this.guideData. guide_data_manual.steps.some(step => step.title === "Confirm Completion");
        if (hasConfirmationStep) return;

        // Get the next step number
        const nextStepNumber = this.guideData. guide_data_manual.steps.length + 1;

        const confirmationStep = {
            id: nextStepNumber,
            title: "Confirm Offer",
            content: {
                items: [
                    {
                        type: "text",
                        content: "Great work! You're almost done with this offer."
                    },
                    {
                        type: "checkbox",
                        content: "I confirm that I have completed all the steps for this offer and received my free bets/bonus"
                    },
                    {
                        type: "info",
                        content: "Make sure you've received and used all your free bets before moving on to maximize your profit"
                    },
                    {
                        type: "text",
                        content: "What would you like to do next?"
                    },
                    {
                        type: "button",
                        content: "Move to Next Offer",
                        url: "/next-offer",
                        style: "primary"
                    },
                    {
                        type: "button",
                        content: "View Profit Tracker",
                        url: "/profit-tracker", 
                        style: "secondary"
                    }
                ]
            }
        };

        // Add as the last step
        this.guideData. guide_data_manual.steps.push(confirmationStep);
    }
}

export function handleResize(scope, is_tutorial) {


    if (window.innerWidth < MAX_WIDTH_FOR_MOBILE) {
        return;
    }

    let width = window.innerWidth;

    if (is_tutorial) {
        width = width * 0.72;
    }

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
            shadowRoot.guideManager.setGlobalOddsmatcherData(globalOddsmatcherData);
        }


    } catch (error) {
        console.error('Failed to process guide data:', error);
    }
}


export function process_item_data(newData, shadowRoot) {
    try {
        const parsedData = typeof newData === 'string' ? JSON.parse(newData) : newData;
        
        // Update the guide with new data
        if (shadowRoot.guideManager && parsedData) {
            shadowRoot.guideManager.guideData = parsedData;
            shadowRoot.guideManager.populateContent();
        } 

    } catch (error) {
        console.error('Failed to process guide data:', error);
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