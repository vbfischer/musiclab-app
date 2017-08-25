import React from 'react';
import ReactDOM from 'react-dom';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import {findSavedAuth} from "./auth";
import App from './components/App';
import {loginUserSuccess} from './actions/user';
import './index.css';

const {store, history} = configureStore();

const authSession = findSavedAuth();

if (authSession) {
    store.dispatch(loginUserSuccess(authSession));
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);
