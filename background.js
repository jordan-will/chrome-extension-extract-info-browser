
// Extension installation and update events
chrome.runtime.onInstalled.addListener((details) => {

    if (details.reason === "install") {
        console.log("Page Collector installed successfully.");
    }

    if (details.reason === "update") {
        console.log(
            `Page Collector updated from version ${details.previousVersion}.`
        );
    }

    if (details.reason === "chrome_update") {
        console.log("Chrome browser updated.");
    }
});

// Listen for messages from other extension components
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // Handle extension information requests
    if (message.action === "GET_EXTENSION_INFO") {

        sendResponse({
            name: "Page Collector",
            version: chrome.runtime.getManifest().version,
            status: "active"
        });
    }
});
