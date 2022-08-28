import { AppDispatch } from "../..";
import { EventService } from "../../../api/EventService";
import { IEvent } from "../../../models/IEvent";
import { formateDate } from "../../../utils/date";
import { EventsActionEnum, SetDateAction, SetDateEventsAction, SetErrorAction, SetIsLoadingEventAction, SetSuccessAction } from "./type";

export const EventsActionCreators = {
    setDateEvents: (payload: IEvent[]): SetDateEventsAction => ({ type: EventsActionEnum.SET_DATE_EVENT, payload }),
    setDate: (payload: string): SetDateAction => ({ type: EventsActionEnum.SET_DATE, payload }),
    setSuccess: (payload: string): SetSuccessAction => ({ type: EventsActionEnum.SET_SUCCESS, payload }),
    setError: (payload: string): SetErrorAction => ({ type: EventsActionEnum.SET_ERROR, payload }),
    // setIsLoadingEvents: (payload: boolean): SetIsLoadingEventsAction => ({ type: EventActionEnum.SET_IS_LOADING_EVENTS, payload }),
    setIsLoadingEvent: (payload: boolean): SetIsLoadingEventAction => ({ type: EventsActionEnum.SET_IS_LOADING_EVENT, payload }),
    fetchEvents: (date: Date) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventsActionCreators.setIsLoadingEvent(true));
            const events = await EventService.getEvents();
            if (events) {
                const filteredEvents = events.data.filter(event => event.date === formateDate(date))
                dispatch(EventsActionCreators.setDateEvents(filteredEvents));
            }
        } catch (e) {

        }
        dispatch(EventsActionCreators.setIsLoadingEvent(false));
    },
    addEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventsActionCreators.setIsLoadingEvent(true));
            const addedEvent = await EventService.postEvent(event);
            if (addedEvent) {
                dispatch(EventsActionCreators.setSuccess("Event was added!"));
                dispatch(EventsActionCreators.fetchEvents(new Date(addedEvent.data.date)));
            }
        } catch (e) {
            dispatch(EventsActionCreators.setError("Not possible to add event, try again laiter!"));
        }
        setTimeout(() => {
            dispatch(EventsActionCreators.setSuccess(""));
            dispatch(EventsActionCreators.setError(""));
        }, 3000)
        dispatch(EventsActionCreators.setIsLoadingEvent(false));
    }
}