


export function RunSpecificScript() {

    // Load the custom element module
    loadExternalScript('../desktop_oddsmatchers/bog_matcher/myOddsmatcher.js', true)
        .then(() => {
            console.log('Custom element loaded successfully');
            // The bog-oddsmatcher element in the HTML will now work
        })
        .catch(error => {
            console.error('Failed to load custom element:', error);
        });

}






















function loadExternalScript(scriptUrl, isModule = false) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.type = isModule ? 'module' : 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}