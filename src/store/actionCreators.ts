import { AuthActionCreators } from "./reducers/auth/actionCreator";
import { EventActionCreators } from "./reducers/event/actionCreators";
import { EventsActionCreators } from "./reducers/events/actionCreators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventsActionCreators,
    ...EventActionCreators
};