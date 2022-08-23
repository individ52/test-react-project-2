import axios from "axios";
import { IComment } from "../models/IComment";

export class CommentService {
    static getComments() {
        return axios.get<IComment[]>("http://localhost:3000/comment-like");
    }
}