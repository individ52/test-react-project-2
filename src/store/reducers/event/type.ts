import { IComment } from "../../../models/IComment";
import { IEvent } from "../../../models/IEvent";
import { IEventLike } from "../../../models/IEventLike";
import { IFollower } from "../../../models/IFollower";

export interface EventState {
    event: IEvent,
    comments: IComment[],
    likes: IEventLike[],
    followers: IFollower[],
    success: string,
    isLoadingEvent: boolean,
    error: string,

}

export enum EventActionEnum {
    SET_EVENT = "SET_EVENT",
    SET_COMMENTS = "SET_COMMENTS",
    SET_LIKES = "SET_LIKES",
    SET_FOLLOWERS = "SET_FOLLOWERS",
    SET_SUCCESS = "SET_SUCCESS",
    SET_IS_LOADING_EVENT = "SET_IS_LOADING_EVENT",
    SET_ERROR = "SET_ERROR"
}


export interface SetEventAction {
    type: EventActionEnum.SET_EVENT,
    payload: IEvent
}

export interface SetCommentsAction {
    type: EventActionEnum.SET_COMMENTS,
    payload: IComment[]
}

export interface SetLikesAction {
    type: EventActionEnum.SET_LIKES,
    payload: IEventLike[]
}

export interface SetFollowersAction {
    type: EventActionEnum.SET_FOLLOWERS,
    payload: IFollower[]
}

export interface SetSuccessAction {
    type: EventActionEnum.SET_SUCCESS,
    payload: string
}

export interface SetErrorAction {
    type: EventActionEnum.SET_ERROR,
    payload: string
}

export interface SetIsLoadingEventAction {
    type: EventActionEnum.SET_IS_LOADING_EVENT,
    payload: boolean
}


export type EventActions = SetEventAction |
    SetCommentsAction |
    SetLikesAction |
    SetFollowersAction |
    SetSuccessAction |
    SetErrorAction |
    SetIsLoadingEventAction