import { useDispatch } from "react-redux";
import { CommentService } from "../api/CommentService";
import { FollowerService } from "../api/FollowerService";
import { LikeService } from "../api/LikeService";
import { IComment } from "../models/IComment";
import { IEventLike } from "../models/IEventLike";
import { IFollower } from "../models/IFollower";
import { AppDispatch } from "../store";

export const useFetchEventComments = (eventId: number) => async (): Promise<IComment[]> => {
    try {
        const comments = await CommentService.getComments();
        if (comments) {
            const filteredComments = comments.data.filter(comment => comment.eventId === eventId);
            return filteredComments;
        }
    } catch (e) { }
    return [];
}

export const useFetchEventFollowers = (eventId: number) => async (): Promise<IFollower[]> => {
    try {
        const followers = await FollowerService.getFollowers();
        if (followers) {
            const filteredFollowers = followers.data.filter(follower => follower.eventId === eventId);
            return filteredFollowers;
        }
    } catch (e) { }
    return [];
}