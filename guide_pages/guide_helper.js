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

        if (logo && this.guideData &&this.guideData.bookmaker.logo) {
            logo.src = this.guideData.bookmaker.logo;
        }
        
        if (bookmakerName && this.guideData.bookmaker.name) {
            bookmakerName.textContent = this.guideData.bookmaker.name;
        }
        
        if (title && this.guideData && this.guideData.bookmaker.offerTitle) {
            title.textContent = this.guideData.bookmaker.offerTitle;
        }
        
        if (subtitle && this.guideData && this.guideData.bookmaker.name) {
            subtitle.textContent = `Complete ${this.guideData.bookmaker.name} Sign-up Guide`;
        }
        
        if (badge && this.guideData && this.guideData.offer.profit) {
            badge.textContent = this.guideData.offer.profit;
        }
    }

    populateStepList() {
        const stepList = this.shadowRoot.querySelector('.step-list');
        if (!stepList || !this.guideData || !this.guideData.steps) return;

        const stepsHTML = this.guideData.steps.map(step => `
            <div class="guide-step-item ${step.id === 1 ? 'active' : ''}" data-step="${step.id}">
                ${step.id}. ${step.title}
            </div>
        `).join('');

        stepList.innerHTML = stepsHTML;
    }

    async populateAllSteps() {
        const allStepsContent = this.shadowRoot.querySelector('.all-steps-content');
        if (!allStepsContent) {
            console.error('Could not find .all-steps-content element');
            return;
        }
        
        if (!this.guideData || !this.guideData.steps || this.guideData.steps.length === 0) {
            return;
        }

        let stepsHTML = '';

        for (const step of this.guideData.steps) {            
            // Format step text
            const formattedText = step.content?.text
                ? step.content.text
                    .split('\\n')
                    .map(line => {
                        if (line.trim().match(/^\d+\)/)) {
                            return `<div class="step-instruction">${line}</div>`;
                        }
                        return `<p>${line}</p>`;
                    }).join('')
                : '';

            // Tips section
            const tipsHTML = step.content?.tips ? `
                <div class="step-tips">
                    <div class="tips-header">
                        <i class="fas fa-lightbulb"></i>
                        <span>Pro Tip</span>
                    </div>
                    <p>${step.content.tips}</p>
                </div>
            ` : '';

            // Oddsmatcher section
            let oddsmatcherHTML = '';
            if (step.content?.oddsmatcher) {
                const omType = step.content.oddsmatcher.type;
                const oddsmatcherTag = omType === 'qualifying_bet' ? 'qualbet-oddsmatcher' : 
                                     omType === 'free_bet' ? 'freebet-oddsmatcher' : 
                                     `${omType.replace('_', '-')}-oddsmatcher`;
                
                
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
                    is_first: true,
                    premium_member: true
                };

                oddsmatcherHTML = `
                    <div class="oddsmatcher-wrapper">
                        <div class="oddsmatcher-intro">
                            <div class="tool-icon">⚡</div>
                            <div class="tool-content">
                                <h4>${omType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Oddsmatcher</h4>
                                <p>Use our odds matching tool to find the best selections for this step</p>
                            </div>
                        </div>
                    </div>

                    <${oddsmatcherTag} class="added_oddsmatcher" data-odds='${JSON.stringify(oddsmatcherData)}'></${oddsmatcherTag}>

                    `;
            }

            // Build complete step section
            stepsHTML += `
                <div class="step-section" id="step-${step.id}" data-step="${step.id}">
                    <h2 class="step-title">Step ${step.id}: ${step.title}</h2>
                    <div class="step-text">${formattedText}</div>
                    ${tipsHTML}
                    ${oddsmatcherHTML}
                </div>
            `;
        }

        allStepsContent.innerHTML = stepsHTML;
    }

    async loadOddsmatcher(type) {
        const scriptPath = `../desktop_oddsmatchers/${type}/myOddsmatcher.js`;
        
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
                block: 'center'
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
                const windowHeight = window.innerHeight;
                
                // Calculate how much of the section is visible
                const visibleTop = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
                const visibilityRatio = visibleTop / Math.min(rect.height, windowHeight);
                
                // If this section is more visible than others, make it active
                if (visibilityRatio > maxVisibility && visibilityRatio > 0.3) {
                    maxVisibility = visibilityRatio;
                    newActiveStep = index + 1;
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
                is_first: false,
            };
            
            oddsmatcherElement.setAttribute('data-odds', JSON.stringify(oddsmatcherData));
        });
    }

    // Function to set global oddsmatcher data and update all oddsmatchers
    setGlobalOddsmatcherData(rows) {
        this.updateAllOddsmatchers();
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
        if (shadowRoot.guideManager && parsedData.is_first) {
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