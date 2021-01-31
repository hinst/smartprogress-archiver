import { MSG_EXPORT } from "./common";
import * as smart_progress from './smart-progress';
import { BlogExporter } from "./blogExporter";
import { downloadTextFile, getWindow } from "./contentCommon";
import sleep from "sleep-promise";

console.log('CONTENT SCRIPT STARTED');

browser.runtime.onMessage.addListener((message: any) => {
    if (message == MSG_EXPORT) {
        tryRun(() => startArchiving());
    }
});

async function startArchiving() {
    const goalsData = getWindow().GOALS_DATA;
    if (goalsData == null) {
        console.error('Need to be on page: goal\'s blog');
    }
    const goalId = Object.keys(goalsData)[0];
    const posts: smart_progress.Post[] =
        await smart_progress.readGoalPosts(goalId,
            async count => {
                console.log('Got posts: ' + count);
                await sleep(500);
            },
            async count => {
                console.log('Got comments: ' + count);
                await sleep(500);
            }
        );
    const exporter = new BlogExporter(posts);
    const fileText = exporter.generate();
    downloadTextFile(fileText, 'text/html');
}

async function tryRun(f: () => Promise<void>) {
    try {
        await f();
    } catch (e) {
        console.error(e);
    }
}

