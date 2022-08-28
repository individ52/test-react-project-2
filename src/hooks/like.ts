import { useState } from "react";
import { LikeService } from "../api/LikeService";
import { IEventLike } from "../models/IEventLike";
import { IUser } from "../models/IUser";
import { useFetchEventLikes } from "./event";

const useAddEventLike = (eventId: number, username: string) => async () => {
    try {
        if (username) {
            const eventLike: IEventLike = {
                eventId,
                username
            } as IEventLike;
            await LikeService.addEventLike(eventLike);
        }
    } catch (e) {
        console.log("error add like");
    }
}

const useRemoveEventLike = (eventId: number, username: string) => async () => {
    try {
        if (username) {
            const allLikes = await LikeService.getEventLikes();
            if (allLikes && allLikes.data) {
                const userLike = allLikes.data.find(like => like.eventId === eventId && like.username === username);
                console.log("allLikes", allLikes, "userLike", userLike);
                if (userLike) {
                    LikeService.removeEventLike(userLike.id);
                }
            }
        }
    } catch (e) {
        console.log("error add like");
    }
}

const useUpdateLike = (liked: boolean, removeLike: () => void, addLike: () => void, setEventLikes: () => void) => async () => {
    if (liked) await removeLike();
    else await addLike();
    await setEventLikes();
}
const useIsLiked = (likes: IEventLike[], user: IUser) => (): boolean => {
    const userLike = likes.find(userLike => userLike.username === user.username);
    if (userLike) return true;
    return false;
}


export const useEventLike = (eventId: number, user: IUser) => {
    const fetchEventLikes = useFetchEventLikes(eventId);
    const [likes, setLikes] = useState<IEventLike[]>([]);
    const setEventLikes = async () => {
        const dbLikes = await fetchEventLikes();
        // console.log("dbLikes", dbLikes);
        setLikes(dbLikes);
    }
    const [liked, setLiked] = useState(false);
    const addEventLike = useAddEventLike(eventId, user.username);
    const removeEventLike = useRemoveEventLike(eventId, user.username);
    const updateLike = useUpdateLike(liked, removeEventLike, addEventLike, setEventLikes);
    const isLiked = useIsLiked(likes, user);
    return {
        liked,
        likes,
        setLiked,
        setEventLikes,
        addEventLike,
        removeEventLike,
        updateLike,
        isLiked
    };
};