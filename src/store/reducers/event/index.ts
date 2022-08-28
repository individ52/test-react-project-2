import { IEvent } from "../../../models/IEvent";
import { EventActionEnum, EventActions, EventState } from "./type";



const initialState: EventState = {
    event: {} as IEvent,
    comments: [],
    likes: [],
    followers: [],
    isLoadingEvent: false,
    isLiked: false,
    error: "",
    success: ""
}

export default function EventReducer(state: EventState = initialState, action: EventActions): EventState {
    switch (action.type) {
        case EventActionEnum.SET_EVENT:
            return { ...state, event: action.payload }
        case EventActionEnum.SET_COMMENTS:
            return { ...state, comments: action.payload }
        case EventActionEnum.SET_LIKES:
            return { ...state, likes: action.payload }
        case EventActionEnum.SET_FOLLOWERS:
            return { ...state, followers: action.payload }
        case EventActionEnum.SET_IS_LOADING_EVENT:
            return { ...state, isLoadingEvent: action.payload }
        case EventActionEnum.SET_IS_LIKED:
            return { ...state, isLiked: action.payload }
        case EventActionEnum.SET_ERROR:
            return { ...state, error: action.payload }
        case EventActionEnum.SET_SUCCESS:
            return { ...state, success: action.payload }
        default:
            return state;
    }
}