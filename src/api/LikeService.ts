import axios from "axios";
import { ICommentLike } from "../models/ICommentLike";
import { IEvent } from "../models/IEvent";
import { IEventLike } from "../models/IEventLike";

export class LikeService {
    static getEventLikes() {
        return axios.get<IEventLike[]>("http://localhost:3000/event-like");
    }
    static addEventLike(eventLike: IEventLike) {
        return axios.post<IEventLike>("http://localhost:3000/event-like", eventLike);
    }
    static removeEventLike(likeId: number) {
        return axios.delete(`http://localhost:3000/event-like/${likeId}`);
    }
    static addCommentLike(comment: ICommentLike) {
        return axios.post<ICommentLike>("http://localhost:3000/comment-like", comment);
    }
    static getCommentLikes() {
        return axios.get<ICommentLike[]>("http://localhost:3000/comment-like");
    }
    static removeCommentLike(commentId: number) {
        return axios.delete<ICommentLike[]>("http://localhost:3000/comment-like/" + commentId);
    }
}