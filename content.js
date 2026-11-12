
// Prevent duplicate message listeners
if (!globalThis.pageCollectorInitialized) {
    globalThis.pageCollectorInitialized = true;

    // Listen for messages from other extension components
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

        // Validate the requested action
        if (message.action !== "COLLECT_PAGE") {
            return;
        }

        // Extract information from the current webpage
        const pageData = {
            title: document.title,
            url: window.location.href
        };

        // Send collected information back
        sendResponse({
            success: true,
            data: pageData
        });
    });
}
