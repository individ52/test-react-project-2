export interface IComment {
    id: number;
    parentCommentId: number;
    authorId: number;
    eventId: number;
    body: string;
}

