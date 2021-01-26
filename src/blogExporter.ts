import * as smartProgress from './smart-progress';
import w3cssContent from '../third-party/w3.css';
// @ts-ignore
import archivePageContent from './template/archive-page.html';

export class BlogExporter {
    posts: smartProgress.Posts;
    generate(): string {
        let template = archivePageContent.replace('/*w3css*/', w3cssContent);
        return template;
    }
}