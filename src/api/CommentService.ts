import axios from "axios";
import { IComment } from "../models/IComment";

export class CommentService {
    static getComments() {
        return axios.get<IComment[]>("http://localhost:3000/comments");
    }
    static addComment(comment: IComment) {
        return axios.post<IComment>("http://localhost:3000/comments", comment);
    }
    static removeComment(commentId: number) {
        return axios.delete("http://localhost:3000/comments/" + commentId);
    }
}   