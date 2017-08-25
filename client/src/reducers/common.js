import {LOGOUT, LOGIN_FULFILLED, REGISTER_FULFILLED, APP_LOAD_FULFILLED} from '../constants/actionTypes';

const defaultState = {
    appName: 'MusicLab',
    token: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                ...state,
                token: null
            };
        case APP_LOAD_FULFILLED:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null
            };

        case LOGIN_FULFILLED:
        case REGISTER_FULFILLED:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.token,
                currentUser: action.error ? null : action.payload.user
            };
        default:
            return state;
    }
};