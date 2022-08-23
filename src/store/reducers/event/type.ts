import { IComment } from "../../../models/IComment";
import { IEvent } from "../../../models/IEvent";
import { IEventLike } from "../../../models/IEventLike";

export interface EventState {
    dateEvents: IEvent[],
    event: IEvent,
    date: string,
    isLoadingEvent: boolean,
    success: string,
    error: string,
    // isLoadingEvent: boolean,
    // isLoadingEvents: boolean,
    eventComments: IComment[],
    isLoadingComments: boolean,
    eventLikes: IEventLike[]
}

export enum EventActionEnum {
    SET_DATE_EVENT = "SET_DATE_EVENT",
    SET_DATE = "SET_DATE",
    SET_EVENT = "SET_EVENT",
    SET_IS_LOADING_EVENT = "SET_IS_LOADING_EVENT",
    SET_ERROR = "SET_ERROR",
    SET_SUCCESS = "SET_SUCCESS",
    // SET_IS_LOADING_EVENT = "SET_IS_LOADING_EVENT",
    // SET_IS_LOADING_EVENTS = "SET_IS_LOADING_EVENTS",
    SET_EVENT_COMMENTS = "SET_EVENT_COMMENTS",
    SET_IS_LOADING_COMMENTS = "SET_IS_LOADING_COMMENTS",
    SET_EVENT_LIKES = "SET_EVENT_LIKES",
}

export interface SetDateAction {
    type: EventActionEnum.SET_DATE,
    payload: string
}

export interface SetDateEventAction {
    type: EventActionEnum.SET_DATE_EVENT,
    payload: IEvent[]
}
export interface SetEventAction {
    type: EventActionEnum.SET_EVENT,
    payload: IEvent
}

export interface SetEventCommentsAction {
    type: EventActionEnum.SET_EVENT_COMMENTS,
    payload: IComment[]
}

export interface SetEventLikesAction {
    type: EventActionEnum.SET_EVENT_LIKES,
    payload: IEventLike[]
}

export interface SetIsLoadingCommentsAction {
    type: EventActionEnum.SET_IS_LOADING_COMMENTS,
    payload: boolean
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
// export interface SetIsLoadingEventsAction {
//     type: EventActionEnum.SET_IS_LOADING_EVENTS,
//     payload: boolean
// }

export type EventActions =
    SetDateEventAction |
    SetEventAction |
    SetEventCommentsAction |
    SetEventLikesAction |
    SetIsLoadingEventAction |
    SetSuccessAction |
    SetErrorAction |
    // SetIsLoadingEventsAction |
    SetDateAction |
    SetIsLoadingCommentsAction