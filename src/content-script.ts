import { MSG_EXPORT } from "./common";
import JSZip from 'jszip';
import * as smart_progress from './smart-progress';

console.log('CONTENT SCRIPT STARTED');

function getWindow() {
    return window['wrappedJSObject'];
}

async function readPosts(goalId: string, startId: string) {
    let url = 'https://smartprogress.do/blog/getPosts';
    url += '?obj_id=' + goalId;
    url += '&sorting=old_top';
    url += '&start_id=' + startId;
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
        return null;
    const posts = await response.json();
    return posts;
}

async function startArchiving() {
    const goalId = Object.keys(getWindow().GOALS_DATA)[0];
    console.log('Goal id', goalId);
    let posts: smart_progress.Posts = await readPosts(goalId, '0');
    if (posts != null) {
        const zip = new JSZip();
        console.log('Reading posts...');
        for (const post of posts.blog) {
            const fileContent = '<html><body>' + post.msg + '</body></html>';
            const fileName = post.date.replace(':', '-').replace(':', '-') + '.html';
            zip.file(fileName, fileContent);
        }
        const zipBlob = await zip.generateAsync({type: 'blob'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(zipBlob);
        a.download = 'archive.zip';
        a.style.display = 'hidden';
        document.body.appendChild(a);
        a.click();
    }
}

browser.runtime.onMessage.addListener((message: any) => {
    if (message == MSG_EXPORT) {
        startArchiving();
    }
});