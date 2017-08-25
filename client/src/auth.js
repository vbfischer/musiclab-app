import {connectedReduxRedirect} from 'redux-auth-wrapper/history4/redirect';
import {routerActions} from 'react-router-redux';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import jwtDecode from 'jwt-decode';

export const userIsAuthenticated = connectedAuthWrapper({
    authenticatedSelector: state => state.common.token !== null,
    wrapperDisplayName: 'VisibleOnlyForAuthenticated'
});

export const userIsAuthenticatedRedirect = connectedReduxRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => state.common.token !== null,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectAction: routerActions.replace
});

export const userIsNotAuthenticatedRedirect = connectedReduxRedirect({
    redirectPath: (state, ownProps) => state.common.redirectTo || '/',
    allowRedirectBack: false,
    authenticatedSelector: state => !state.common.token,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectAction: routerActions.replace
});

export function findSavedAuth() {
    const token = localStorage.getItem('jwt');
    if (token) {
        const decoded = jwtDecode(token);

        const exp = decoded.exp;
        const currentDte = Date.now() / 1000;

        const stillValid = exp > currentDte;

        let session = Object.assign({token},{user: decoded});

        return stillValid ? session : false;
    }

    return false;
}