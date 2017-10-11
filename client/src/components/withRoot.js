/**
 * Helper HOC that contains a lot of the "ugly" configuration separated out into a
 * separate file.
 *
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {withStyles, MuiThemeProvider} from 'material-ui/styles';

import createContext from '../styles/createContext';
import configureStore from '../store/configureStore';
import {findSavedAuth} from "../auth";
import {loginUserSuccess} from '../actions/user';

const styles = theme => ({
    '@global': {
        html: {
            background: theme.palette.background.default,
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        },
        body: {
            margin: 0,
        },
    }
});

const {store, history} = configureStore();

const authSession = findSavedAuth();

if (authSession) {
    store.dispatch(loginUserSuccess(authSession));
}

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

const context = createContext();

function withRoot(BaseComponent) {
    class Root extends Component {
        render() {
            return (
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
                            <AppWrapper>
                                <BaseComponent/>
                            </AppWrapper>
                        </MuiThemeProvider>
                    </ConnectedRouter>
                </Provider>
            )
        }
    }

    return Root;
}

export default withRoot;