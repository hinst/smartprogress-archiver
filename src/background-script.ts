import { MSG_EXPORT } from "./common";

async function receiveToolBarButtonClick() {
    const currentTab = await browser.tabs.getCurrent();
    browser.tabs.sendMessage(currentTab.id, MSG_EXPORT);
}

browser.browserAction.onClicked.addListener(receiveToolBarButtonClick);