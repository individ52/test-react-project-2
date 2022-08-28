import { IComment } from "../../../models/IComment";
import { IEvent } from "../../../models/IEvent";
import { IEventLike } from "../../../models/IEventLike";

export interface EventsState {
    dateEvents: IEvent[],
    date: string,
    isLoadingEvent: boolean,
    success: string,
    error: string,
}

export enum EventsActionEnum {
    SET_DATE_EVENT = "SET_DATE_EVENT",
    SET_DATE = "SET_DATE",
    SET_IS_LOADING_EVENT = "SET_IS_LOADING_EVENT",
    SET_ERROR = "SET_ERROR",
    SET_SUCCESS = "SET_SUCCESS"
}

export interface SetDateAction {
    type: EventsActionEnum.SET_DATE,
    payload: string
}

export interface SetDateEventsAction {
    type: EventsActionEnum.SET_DATE_EVENT,
    payload: IEvent[]
}

export interface SetSuccessAction {
    type: EventsActionEnum.SET_SUCCESS,
    payload: string
}

export interface SetErrorAction {
    type: EventsActionEnum.SET_ERROR,
    payload: string
}

export interface SetIsLoadingEventAction {
    type: EventsActionEnum.SET_IS_LOADING_EVENT,
    payload: boolean
}

export type EventActions =
    SetDateEventsAction |
    SetIsLoadingEventAction |
    SetSuccessAction |
    SetErrorAction |
    SetDateAction