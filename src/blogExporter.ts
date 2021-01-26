import * as smartProgress from './smart-progress';
import w3cssContent from '../third-party/w3.css';
const archivePageContent: string = require('./template/archive-page.html');

export class BlogExporter {
    posts: smartProgress.Posts;
    generate(): string {
        let template = archivePageContent.replace('/*w3ccc*/', w3cssContent);
        return template;
    }
}