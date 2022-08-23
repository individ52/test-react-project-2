import { IEvent } from "../../../models/IEvent";
import { EventActionEnum, EventActions, EventState } from "./type";


const initialState: EventState = {
    dateEvents: [],
    date: "",
    event: {} as IEvent,
    eventComments: [],
    eventLikes: [],
    isLoadingComments: false,
    isLoadingEvent: false,
    error: "",
    success: ""
    // isLoadingEvents: false

}

export default function EventReducer(state: EventState = initialState, action: EventActions): EventState {
    switch (action.type) {
        case EventActionEnum.SET_DATE_EVENT:
            return { ...state, dateEvents: action.payload }
        case EventActionEnum.SET_DATE:
            return { ...state, date: action.payload }
        case EventActionEnum.SET_EVENT:
            return { ...state, event: action.payload }
        case EventActionEnum.SET_EVENT_COMMENTS:
            return { ...state, eventComments: action.payload }
        case EventActionEnum.SET_EVENT_LIKES:
            return { ...state, eventLikes: action.payload }
        case EventActionEnum.SET_IS_LOADING_COMMENTS:
            return { ...state, isLoadingComments: action.payload }
        case EventActionEnum.SET_IS_LOADING_EVENT:
            return { ...state, isLoadingEvent: action.payload }
        case EventActionEnum.SET_SUCCESS:
            return { ...state, success: action.payload }
        case EventActionEnum.SET_ERROR:
            return { ...state, error: action.payload }
        // case EventActionEnum.SET_IS_LOADING_EVENTS:
        //     return { ...state, isLoadingEvents: action.payload }
        default:
            return state;
    }
}