import { AppDispatch } from "../..";
import { EventService } from "../../../api/EventService";
import { LikeService } from "../../../api/LikeService";
import { IComment } from "../../../models/IComment";
import { IEvent } from "../../../models/IEvent";
import { IEventLike } from "../../../models/IEventLike";
import { formateDate } from "../../../utils/date";
import { EventActionEnum, SetDateAction, SetDateEventAction, SetErrorAction, SetEventAction, SetEventCommentsAction, SetEventLikesAction, SetIsLoadingCommentsAction, SetIsLoadingEventAction, SetSuccessAction } from "./type";

export const EventActionCreators = {

    setDateEvents: (payload: IEvent[]): SetDateEventAction => ({ type: EventActionEnum.SET_DATE_EVENT, payload }),
    setDate: (payload: string): SetDateAction => ({ type: EventActionEnum.SET_DATE, payload }),
    setEvent: (payload: IEvent): SetEventAction => ({ type: EventActionEnum.SET_EVENT, payload }),
    setEventComments: (payload: IComment[]): SetEventCommentsAction => ({ type: EventActionEnum.SET_EVENT_COMMENTS, payload }),
    setEventLikes: (payload: IEventLike[]): SetEventLikesAction => ({ type: EventActionEnum.SET_EVENT_LIKES, payload }),
    setSuccess: (payload: string): SetSuccessAction => ({ type: EventActionEnum.SET_SUCCESS, payload }),
    setError: (payload: string): SetErrorAction => ({ type: EventActionEnum.SET_ERROR, payload }),
    // setIsLoadingEvents: (payload: boolean): SetIsLoadingEventsAction => ({ type: EventActionEnum.SET_IS_LOADING_EVENTS, payload }),
    setIsLoadingEvent: (payload: boolean): SetIsLoadingEventAction => ({ type: EventActionEnum.SET_IS_LOADING_EVENT, payload }),
    setIsLoadingComments: (payload: boolean): SetIsLoadingCommentsAction => ({ type: EventActionEnum.SET_IS_LOADING_COMMENTS, payload }),
    fetchEvents: (date: Date) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventActionCreators.setIsLoadingEvent(true));
            const events = await EventService.getEvents();
            if (events) {
                const filteredEvents = events.data.filter(event => event.date === formateDate(date))
                dispatch(EventActionCreators.setDateEvents(filteredEvents));
            }
        } catch (e) {

        }
        dispatch(EventActionCreators.setIsLoadingEvent(false));
    },
    addEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventActionCreators.setIsLoadingEvent(true));
            const addedEvent = await EventService.postEvent(event);
            if (addedEvent) {
                dispatch(EventActionCreators.setSuccess("Event was added!"));
                dispatch(EventActionCreators.fetchEvents(new Date(addedEvent.data.date)));
            }
        } catch (e) {
            dispatch(EventActionCreators.setError("Not possible to add event, try again laiter!"));
        }
        setTimeout(() => {
            dispatch(EventActionCreators.setSuccess(""));
            dispatch(EventActionCreators.setError(""));
        }, 3000)
        dispatch(EventActionCreators.setIsLoadingEvent(false));
    }
}