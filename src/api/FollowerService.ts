import axios from "axios";
import { IFollower } from "../models/IFollower";

export class FollowerService {
    static getFollowers() {
        return axios.get<IFollower[]>("http://localhost:3000/event-follower");
    }
}