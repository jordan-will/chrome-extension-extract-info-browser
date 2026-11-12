
// DOM elements
const collectButton = document.getElementById("collect-btn");
const pageTitle = document.getElementById("page-title");
const pageUrl = document.getElementById("page-url");
const status = document.getElementById("status");

// Collect information from the active webpage
async function collectPage() {
    try {
        // Update interface
        collectButton.disabled = true;
        status.textContent = "Status: Collecting...";

        // Get the currently active tab
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        if (!tab || !tab.id) {
            throw new Error("No active tab found.");
        }

        // Inject content.js into the active tab
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });

        // Send collection request to content.js
        const response = await chrome.tabs.sendMessage(
            tab.id,
            { action: "COLLECT_PAGE" }
        );

        // Validate response
        if (!response || !response.success || !response.data) {
            throw new Error("Invalid response from content script.");
        }

        // Extract collected information
        const pageData = response.data;

        // Update popup interface
        pageTitle.textContent = pageData.title;
        pageUrl.textContent = pageData.url;

        status.textContent = "Status: Collection completed.";

    } catch (error) {
        console.error("Page collection failed:", error);

        status.textContent = "Status: Collection failed.";
        pageTitle.textContent = "Unable to collect page information.";
        pageUrl.textContent = "Please try another webpage.";

    } finally {
        // Restore button state
        collectButton.disabled = false;
    }
}

// Register click event
collectButton.addEventListener("click", collectPage);
