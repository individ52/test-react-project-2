import { LikeService } from "../api/LikeService";
import { IEventLike } from "../models/IEventLike";

export const useAddEventLike = (eventId: number, username: string) => () => {
    try {
        if (username) {
            const eventLike: IEventLike = {
                eventId,
                username
            } as IEventLike;
            LikeService.addEventLike(eventLike);
        }
    } catch (e) {
        console.log("error add like");
    }
}

export const useRemoveEventLike = (eventId: number, username: string) => async () => {
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