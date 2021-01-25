import { MSG_EXPORT } from "./common";

console.log('CONTENT SCRIPT STARTED');

function startArchiving() {
    const feedList = window['wrappedJSObject'].FEED_LIST;
    console.log(feedList);
}

browser.runtime.onMessage.addListener((message: any) => {
    if (message == MSG_EXPORT) {
        startArchiving();
    }
});