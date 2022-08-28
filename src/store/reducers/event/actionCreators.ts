import { IComment } from "../../../models/IComment";
import { IEvent } from "../../../models/IEvent";
import { IEventLike } from "../../../models/IEventLike";
import { IFollower } from "../../../models/IFollower";
import { EventActionEnum, SetCommentsAction, SetErrorAction, SetEventAction, SetFollowersAction, SetIsLoadingEventAction, SetLikesAction, SetSuccessAction } from "./type";

export const EventActionCreators = {
    setCurEvent: (payload: IEvent): SetEventAction => ({ type: EventActionEnum.SET_EVENT, payload }),
    setCurEventComments: (payload: IComment[]): SetCommentsAction => ({ type: EventActionEnum.SET_COMMENTS, payload }),
    setCurEventLikes: (payload: IEventLike[]): SetLikesAction => ({ type: EventActionEnum.SET_LIKES, payload }),
    setCurEventFollowers: (payload: IFollower[]): SetFollowersAction => ({ type: EventActionEnum.SET_FOLLOWERS, payload }),
    setIsLoadingEvent: (payload: boolean): SetIsLoadingEventAction => ({ type: EventActionEnum.SET_IS_LOADING_EVENT, payload }),
    setSuccessEvent: (payload: string): SetSuccessAction => ({ type: EventActionEnum.SET_SUCCESS, payload }),
    setErrorEvent: (payload: string): SetErrorAction => ({ type: EventActionEnum.SET_ERROR, payload })
}