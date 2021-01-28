import { MSG_EXPORT } from "./common";

async function receiveToolBarButtonClick() {
    const activeTabs = await browser.tabs.query(
        {active: true, windowId: browser.windows.WINDOW_ID_CURRENT}
    );
    if (activeTabs.length) {
        const activeTab = activeTabs[0];
        browser.tabs.sendMessage(activeTab.id, MSG_EXPORT);
    }
}

browser.browserAction.onClicked.addListener(receiveToolBarButtonClick);