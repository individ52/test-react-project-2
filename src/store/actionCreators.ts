import { AuthActionCreators } from "./reducers/auth/actionCreator";
import { EventActionCreators } from "./reducers/event/actionCreators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
};