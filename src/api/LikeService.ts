import axios from "axios";
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
}