// Simple Blog-Style Guide Helper
export class GuidePageManager {
    constructor(shadowRoot, guideData = null) {
        this.shadowRoot = shadowRoot;
        this.guideData = guideData || {
            bookmaker: { name: "Coral", logo: "", offerTitle: "£20 in Free Bets" },
            offer: { profit: "£15.75" },
            steps: []
        };
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

        if (logo && this.guideData.bookmaker.logo) {
            logo.src = this.guideData.bookmaker.logo;
        }
        
        if (bookmakerName && this.guideData.bookmaker.name) {
            bookmakerName.textContent = this.guideData.bookmaker.name;
        }
        
        if (title && this.guideData.bookmaker.offerTitle) {
            title.textContent = this.guideData.bookmaker.offerTitle;
        }
        
        if (subtitle && this.guideData.bookmaker.name) {
            subtitle.textContent = `Complete ${this.guideData.bookmaker.name} Sign-up Guide`;
        }
        
        if (badge && this.guideData.offer.profit) {
            badge.textContent = this.guideData.offer.profit;
        }
    }

    populateStepList() {
        const stepList = this.shadowRoot.querySelector('.step-list');
        if (!stepList || !this.guideData.steps) return;

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
        
        if (!this.guideData.steps || this.guideData.steps.length === 0) {
            console.error('No steps data available:', this.guideData);
            return;
        }

        console.log('Populating steps:', this.guideData.steps);

        let stepsHTML = '';

        for (const step of this.guideData.steps) {
            console.log('Processing step:', step);
            
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
                
                console.log('Loading oddsmatcher:', omType, 'with tag:', oddsmatcherTag);
                
                // Load oddsmatcher if not already loaded
                if (!this.loadedOddsmatchers.has(omType)) {
                    try {
                        await this.loadOddsmatcher(omType);
                        this.loadedOddsmatchers.add(omType);
                        console.log('Successfully loaded oddsmatcher:', omType);
                    } catch (error) {
                        console.warn('Failed to load oddsmatcher:', omType, error);
                    }
                }

                oddsmatcherHTML = `
                    <div class="oddsmatcher-section">
                        <div class="oddsmatcher-header">
                            <h3>Find ${omType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Opportunities</h3>
                            <p>Use the oddsmatcher below to find suitable selections for this step.</p>
                        </div>
                    </div>
                    <div class="oddsmatcher-container">
                        <${oddsmatcherTag} class="added_oddsmatcher" data-odds='${JSON.stringify(step.content.oddsmatcher.filters)}'></${oddsmatcherTag}>
                    </div>
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

        console.log('Generated steps HTML:', stepsHTML);
        allStepsContent.innerHTML = stepsHTML;
        console.log('Steps populated successfully');
    }

    async loadOddsmatcher(type) {
        console.log('Loading oddsmatcher script for type:', type);
        const scriptPath = `../desktop_oddsmatchers/${type}/myOddsmatcher.js`;
        console.log('Script path:', scriptPath);
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.type = 'module';
            script.onload = () => {
                console.log('Successfully loaded script:', scriptPath);
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
            console.log(`Updating progress bar: step ${currentStep}/${totalSteps} = ${percentage}%`);
            
            // Update the width of the ::before element (progress fill)
            progressElement.style.setProperty('--progress-width', `${percentage}%`);
            
            // Double check the CSS variable is set
            console.log('CSS variable set to:', progressElement.style.getPropertyValue('--progress-width'));
        } else {
            console.error('Progress element not found');
        }
    }

    initializeScrollDetection() {
        console.log('Attempting to initialize scroll detection...');
        
        const stepSections = this.shadowRoot.querySelectorAll('.step-section');
        const stepItems = this.shadowRoot.querySelectorAll('.guide-step-item');
        const mainContent = this.shadowRoot.querySelector('.main-content');

        console.log('Found elements:', {
            stepSections: stepSections.length,
            stepItems: stepItems.length,
            mainContent: !!mainContent
        });

        if (stepSections.length === 0 || stepItems.length === 0 || !mainContent) {
            console.error('No step sections, step items, or main content found for scroll detection');
            console.log('Available elements in shadow root:', this.shadowRoot.innerHTML);
            
            // Retry after a longer delay
            setTimeout(() => {
                console.log('Retrying scroll detection initialization...');
                this.initializeScrollDetection();
            }, 500);
            return;
        }

        console.log('Successfully initializing scroll detection for', stepSections.length, 'sections');

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
                console.log('Step changed from', this.currentStep, 'to', newActiveStep);

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
                console.log('About to update progress bar...');
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

export function process_new_final_data(newData, shadowRoot, state) {
    console.log('Processing new guide data:', newData);
    try {
        const parsedData = typeof newData === 'string' ? JSON.parse(newData) : newData;
        console.log('Parsed data:', parsedData);
        
        // Update the guide with new data
        if (shadowRoot.guideManager) {
            console.log('Updating existing guide manager');
            shadowRoot.guideManager.guideData = parsedData;
            shadowRoot.guideManager.populateContent();
        } else {
            console.log('Creating new guide manager');
            const manager = new GuidePageManager(shadowRoot, parsedData);
            manager.populateContent();
            shadowRoot.guideManager = manager;
        }
    } catch (error) {
        console.error('Failed to process guide data:', error);
    }
}

export function handleResize(shadowRoot) {
    // Handle responsive behavior if needed
    window.addEventListener('resize', () => {
        // Add any resize-specific logic here
    });
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