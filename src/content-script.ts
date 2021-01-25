import { MSG_EXPORT } from "./common";

console.log('CONTENT SCRIPT STARTED');

function getWindow() {
    return window['wrappedJSObject'];
}

async function startArchiving() {
    const goalObjectId = Object.keys(getWindow().GOALS_DATA)[0];
    console.log('Goal object id', goalObjectId);
    let url = 'https://smartprogress.do/blog/getPosts';
    url += '?obj_id=' + goalObjectId;
    url += '&sorting=old_top';
    url += '&start_id=0';
    url += '&end_id=0';
    url += '&step_id=0'
    url += '&only_author=0';
    url += '&change_sorting=0';
    url += '&obj_type=0';
    console.log(document.cookie);
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            Cookie: document.cookie,
            Host: 'smartprogress.do'
        }
    });
    if (!response.ok)
        throw new Error('Could not load posts');
    const posts = await response.json();
}

browser.runtime.onMessage.addListener((message: any) => {
    if (message == MSG_EXPORT) {
        startArchiving();
    }
});