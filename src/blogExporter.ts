import * as smartProgress from './smart-progress';
import w3cssContent from '../third-party/w3.css';

// @ts-ignore
import _archivePageTemplate from './template/archive-page.html';
const archivePageTemplate: string = _archivePageTemplate;
// @ts-ignore
import _postPanelTemplate from './template/post-panel.html';
const postPanelTemplate: string = _postPanelTemplate;
// @ts-ignore
import _commentTemplate from './template/comment-template.html';
const commentTemplate: string = _commentTemplate;

export class BlogExporter {
    posts: smartProgress.Post[];

    constructor(posts: smartProgress.Post[]) {
        this.posts = posts;
    }

    generate(): string {
        const content = this.posts
            .map(post => this.generatePost(post)).join('\n');
        let outputText = archivePageTemplate
            .replace('/*w3css*/', w3cssContent)
            .replace('/*content*/', content);
        return outputText;
    }

    private generatePost(post: smartProgress.Post) {
        const commentsContent = post.comments
            ? post.comments.map(comment => this.generateComment(comment)).join('\n')
            : '';
        return postPanelTemplate
            .replace('$date', post.date)
            .replace('$type', post.type)
            .replace('$text', post.msg)
            .replace('$username', post.username || '')
            .replace('$countOfComments', post.comments ? '' + post.comments.length : '?')
            .replace('$comments', commentsContent);
    }

    private generateComment(comment: smartProgress.Comment) {
        return commentTemplate
            .replace('$userName', comment.user ? comment.user.username : '')
            .replace('$message', comment.msg);
    }
}