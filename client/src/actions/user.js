import {LOGIN_FULFILLED, LOGOUT} from '../constants/actionTypes';
import {push} from 'react-router-redux';

export function loginUserSuccess(token) {
    return {
        type: LOGIN_FULFILLED,
        payload: token
    }
}

export function logoutUser() {
    return {
        type: LOGOUT
    }
}


export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logoutUser());
        dispatch(push('/login'));
    }
}
