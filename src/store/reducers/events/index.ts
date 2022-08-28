import { IEvent } from "../../../models/IEvent";
import { EventsActionEnum, EventActions, EventsState } from "./type";


const initialState: EventsState = {
    dateEvents: [],
    date: "",
    isLoadingEvent: false,
    error: "",
    success: ""
    // isLoadingEvents: false

}

export default function EventsReducer(state: EventsState = initialState, action: EventActions): EventsState {
    switch (action.type) {
        case EventsActionEnum.SET_DATE_EVENT:
            return { ...state, dateEvents: action.payload }
        case EventsActionEnum.SET_DATE:
            return { ...state, date: action.payload }
        case EventsActionEnum.SET_IS_LOADING_EVENT:
            return { ...state, isLoadingEvent: action.payload }
        case EventsActionEnum.SET_SUCCESS:
            return { ...state, success: action.payload }
        case EventsActionEnum.SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state;
    }
}