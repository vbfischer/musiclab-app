import {
    LOGIN,
    LOGIN_FULFILLED,
    REGISTER,
    LOGIN_PAGE_UNLOADED,
    UPDATE_FIELD_AUTH
} from '../constants/actionTypes';
import { PENDING } from 'redux-promise-middleware'

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN_FULFILLED:
        case REGISTER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case LOGIN_PAGE_UNLOADED:
            return {};
        case PENDING:
            if(action.subtype === LOGIN || action.subtype === REGISTER) {
                return { ...state, inProgress: true };
            }
            break;
        case UPDATE_FIELD_AUTH:
            return { ...state, [action.key]: action.value };

        default:
            return state;
    }
}