document.addEventListener('DOMContentLoaded', () => {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const actionBtn = document.getElementById('open-manager');

    // List of match patterns simplified to hostnames for quick validation
    const supportedDomains = [
        "://penguinmod.com",
        "mirror.turbowarp.xyz",
        "turbowarp.org",
        "dinosaurmod.github.io",
        "snail-ide.js.org",
        "librekitten.org",
        "alpha.unsandboxed.org",
        "ampmod.codeberg.page",
        "espressoblocks.com"
    ];

    // Check if the current tab is one of your supported Scratch mods
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || tabs.length === 0) return;
        
        const currentTab = tabs[0];
        const url = new URL(currentTab.url);
        
        // Match exact domain or subdomains if applicable
        const isSupported = supportedDomains.some(domain => 
            url.hostname === domain || url.hostname.endsWith('.' + domain)
        );

        if (isSupported) {
            statusDot.classList.add('active');
            statusText.innerText = 'Active on this site';
            actionBtn.innerText = 'Open Addon Manager';
            actionBtn.disabled = false;
        } else {
            statusDot.classList.remove('active');
            statusText.innerText = 'Unsupported Site';
            actionBtn.innerText = 'Visit PenguinMod';
            actionBtn.style.backgroundColor = '#2d2d34'; // Fade button on unsupported site
        }

        // Handle button clicks based on application state
        actionBtn.addEventListener('click', () => {
            if (isSupported) {
                // Send a message directly to code/manager.user.js running on this tab
                chrome.tabs.sendMessage(currentTab.id, { action: "OPEN_SCRIPTKITTEN_UI" }, (response) => {
                    // Optional fallback if content script hasn't fully fully loaded yet
                    if (chrome.runtime.lastError) {
                        console.warn("Content script not responding. Attempting injection fallback.");
                    }
                });
            } else {
                // Redirect user to a supported mod site if they click while inactive
                chrome.tabs.create({ url: 'https://://penguinmod.com/' });
            }
        });
    });
});
