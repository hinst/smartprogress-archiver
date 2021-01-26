export class Post {
    id: string;
    msg: string;
    date: string;
    comments: Comment[];
}

export class Posts {
    blog: Post[];
}

export class Comment {
    msg: string;
    user: User;
}

export class User {
    id: string;
    username: string;
}