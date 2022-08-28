import { AppDispatch } from "../..";
import { LikeService } from "../../../api/LikeService";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { IComment } from "../../../models/IComment";
import { IEvent } from "../../../models/IEvent";
import { IEventLike } from "../../../models/IEventLike";
import { IFollower } from "../../../models/IFollower";
import { EventActionEnum, SetCommentsAction, SetErrorAction, SetEventAction, SetFollowersAction, SetIsLikedAction, SetIsLoadingEventAction, SetLikesAction, SetSuccessAction } from "./type";

export const EventActionCreators = {
    setCurEvent: (payload: IEvent): SetEventAction => ({ type: EventActionEnum.SET_EVENT, payload }),
    setCurEventComments: (payload: IComment[]): SetCommentsAction => ({ type: EventActionEnum.SET_COMMENTS, payload }),
    setCurEventLikes: (payload: IEventLike[]): SetLikesAction => ({ type: EventActionEnum.SET_LIKES, payload }),
    setCurEventFollowers: (payload: IFollower[]): SetFollowersAction => ({ type: EventActionEnum.SET_FOLLOWERS, payload }),
    setIsLoadingEvent: (payload: boolean): SetIsLoadingEventAction => ({ type: EventActionEnum.SET_IS_LOADING_EVENT, payload }),
    setIsLiked: (payload: boolean): SetIsLikedAction => ({ type: EventActionEnum.SET_IS_LIKED, payload }),
    setSuccessEvent: (payload: string): SetSuccessAction => ({ type: EventActionEnum.SET_SUCCESS, payload }),
    setErrorEvent: (payload: string): SetErrorAction => ({ type: EventActionEnum.SET_ERROR, payload }),
    fetchEventLikes: (eventId: number, username: string) => async (dispatch: AppDispatch) => {
        try {
            const likes = await LikeService.getEventLikes();
            if (likes) {
                const filteredLikes = likes.data.filter(like => like.eventId === eventId);
                dispatch(EventActionCreators.setCurEventLikes(filteredLikes));
                const userLike = filteredLikes.find(userLike => userLike.username === username);

                if (userLike) dispatch(EventActionCreators.setIsLiked(true));
                else dispatch(EventActionCreators.setIsLiked(false));
            }
        } catch (e) {
            console.log("error with fetching likes")
        }
    },
    addEventLikes: (eventId: number, username: string) => async (dispatch: AppDispatch) => {
        try {
            if (username) {
                const eventLike: IEventLike = {
                    eventId,
                    username
                } as IEventLike;
                await LikeService.addEventLike(eventLike);
                dispatch(EventActionCreators.fetchEventLikes(eventId, username));
            }
        } catch (e) {
            console.log("error add like");
        }
    },
    removeEventLikes: (eventId: number, username: string) => async (dispatch: AppDispatch) => {
        try {
            if (username) {
                const allLikes = await LikeService.getEventLikes();
                if (allLikes && allLikes.data) {
                    const userLike = allLikes.data.find(like => like.eventId === eventId && like.username === username);
                    console.log("allLikes", allLikes, "userLike", userLike);
                    if (userLike) {
                        await LikeService.removeEventLike(userLike.id);
                        dispatch(EventActionCreators.fetchEventLikes(eventId, username));
                    }
                }
            }
        } catch (e) {
            console.log("error remove like");
        }
    },
    updateEventLikes: (liked: boolean, eventId: number, username: string) => async (dispatch: AppDispatch) => {
        if (liked) dispatch(EventActionCreators.removeEventLikes(eventId, username));
        else dispatch(EventActionCreators.addEventLikes(eventId, username));
        dispatch(EventActionCreators.fetchEventLikes(eventId, username));
    }
}