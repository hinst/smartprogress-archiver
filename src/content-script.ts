import { MSG_EXPORT } from "./common";

console.log('CONTENT SCRIPT STARTED');

browser.runtime.onMessage.addListener((message: any) => {
    if (message == MSG_EXPORT) {
        console.log('e');
    }
});