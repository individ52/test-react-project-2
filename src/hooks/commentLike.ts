import { useEffect, useState } from "react";
import { LikeService } from "../api/LikeService";
import { IComment } from "../models/IComment";
import { ICommentLike } from "../models/ICommentLike";
import { IUser } from "../models/IUser";

export const useCommentLike = (comment: IComment, user: IUser) => {
    const [liked, setLiked] = useState(false);
    const [commentLikes, setCommentLikes] = useState<ICommentLike[]>([]);

    const fetchCommentLikes = async () => {
        const dbLikes = await LikeService.getCommentLikes();
        if (dbLikes && dbLikes.data) {
            const commentLikes = dbLikes.data.filter(commentLike => commentLike.commentId === comment.id);
            const userLike = commentLikes.find(commentLike => commentLike.username === user.username);
            if (userLike) setLiked(true);
            else setLiked(false);
            setCommentLikes(commentLikes);
            return commentLikes;
        }
        return [];
    }
    const setAllComments = async () => {
        await fetchCommentLikes();
    }
    const addCommentLike = async () => {
        const commentLike: ICommentLike = {
            commentId: comment.id,
            username: user.username
        } as ICommentLike;
        await LikeService.addCommentLike(commentLike);
        setAllComments();
    }
    const removeCommentLike = async () => {
        const likes = await fetchCommentLikes();
        const likeToDelete = likes.find(like => like.commentId == comment.id && like.username === user.username);
        if (likeToDelete) {
            await LikeService.removeCommentLike(likeToDelete.id);
            setAllComments();
        }
    }
    const updateCommentLike = async () => {
        if (liked) removeCommentLike();
        else addCommentLike();
        setLiked(!liked);
    }
    fetchCommentLikes();
    return {
        liked,
        commentLikes,
        updateCommentLike
    }
};