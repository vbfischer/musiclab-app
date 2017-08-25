import {
    REGISTER_FULFILLED,
    LOGIN_FULFILLED,
    LOGOUT
} from './constants/actionTypes';
import agent from './agent';

const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER_FULFILLED || action.type === LOGIN_FULFILLED) {
        if (!action.error) {
            window.localStorage.setItem('jwt', action.payload.token);
            agent.setToken(action.payload.token);
        }
    } else if (action.type === LOGOUT) {
        window.localStorage.setItem('jwt', '');
        agent.setToken(null);
    }

    next(action);
};

export {localStorageMiddleware};