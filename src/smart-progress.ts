import sleep from "sleep-promise";

const smartProgressUrl = 'https://smartprogress.do';

export class Post {
    /** Can be: 'post' */
    type: string;
    id: string;
    msg: string;
    date: string;
    comments: Comment[];
    count_comments: string;
    username: string;
}

export class Posts {
    blog: Post[];
}

export class Comment {
    msg: string;
    user: User;
}

export class GetCommentsResponse {
    /** Should be "success" */
    status: string;
    comments: Comment[];
}

export class User {
    id: string;
    username: string;
}

type ProgressEventReceiver = (count: number) => Promise<void>;

async function readPosts(goalId: string, startId: string) {
    let url = smartProgressUrl + '/blog/getPosts';
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
    if (!response.ok) {
        const text = await response.text();
        throw new Error('Could not load blog posts: ' + response.statusText + '\n' + text);
    }
    const posts = await response.json();
    return posts;
}

export async function readGoalPosts(goalId: string,
        onPostProgress: ProgressEventReceiver,
        onCommentProgress: ProgressEventReceiver): Promise<Post[]> {
    const allPosts: Post[] = [];
    let startId = '0';
    while (true) {
        let posts: Posts = await readPosts(goalId, startId);
        if (posts != null && posts.blog && posts.blog.length) {
            allPosts.push(...posts.blog);
            startId = posts.blog[posts.blog.length - 1].id;
            if (onPostProgress)
                await onPostProgress(allPosts.length);
        } else
            break;
    }
    for (const post of allPosts) {
        if (post.comments && post.comments.length < parseInt(post.count_comments)) {
            post.comments = (await readComments(post.id)).comments;
            if (onCommentProgress)
                await onCommentProgress(post.comments.length);
        }
    }
    return allPosts;
}

export async function readComments(postId: string): Promise<GetCommentsResponse> {
    let url = smartProgressUrl + '/blog/getComments?post_id=' + postId;
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            Cookie: document.cookie,
            Host: 'smartprogress.do'
        }
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error('Could not read comments: ' + response.statusText + '\n' + text);
    }
    return await response.json();
}