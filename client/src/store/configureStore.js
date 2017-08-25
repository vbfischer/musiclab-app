import {routerMiddleware, routerReducer} from 'react-router-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createHistory from 'history/createBrowserHistory'

import {localStorageMiddleware} from "../middleware";
import {auth, common} from '../reducers';

export default function configureStore() {
    const history = createHistory();
    const middleware = routerMiddleware(history);

    const enhancer = compose(
        applyMiddleware(middleware, promiseMiddleware(), localStorageMiddleware, thunk, createLogger())
    );

    const reducer = combineReducers({auth, common, router: routerReducer});
    const store = createStore(reducer, enhancer);

    return {
        store,
        history
    }
}