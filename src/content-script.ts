import { MSG_EXPORT } from "./common";
import * as smart_progress from './smart-progress';
import sleep from "sleep-promise";
import { BlogExporter } from "./blogExporter";

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
        if (false) {
            console.log('Reading posts...');
            while (posts != null && posts.blog && posts.blog.length > 0) {
                for (const post of posts.blog) {
                    const fileContent = '<html><body>' + post.msg + '</body></html>';
                    const fileName = post.date.replace(':', '-').replace(':', '-') + '.html';
                }
                break;
                await sleep(1000);
                posts = await readPosts(goalId, posts.blog[posts.blog.length - 1].id)
            }
        }
        const exporter = new BlogExporter();
        const fileText = exporter.generate();

        const blob = new Blob([fileText], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'archive.html';
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