import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Route} from 'react-router-dom';

import './App.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';

import HeaderComponent from './header';
import HomeComponent from './Home';
import LoginComponent from './Login';
import {userIsAuthenticatedRedirect, userIsAuthenticated, userIsNotAuthenticatedRedirect} from '../auth';
import {withRouter} from "react-router-dom";

import {logoutAndRedirect} from '../actions/user';

const Header = withRouter(userIsAuthenticated(HeaderComponent));
const Home = withRouter(userIsAuthenticatedRedirect(HomeComponent));
const Login = withRouter(userIsNotAuthenticatedRedirect(LoginComponent));
// const Login = LoginComponent;

const mapStateToProps = state => ({
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => {
        dispatch(logoutAndRedirect());
    }
});

class App extends Component {
    render() {
        return (
            <div>
                <Header appName={this.props.appName} currentUser={this.props.currentUser}
                        onLogout={this.props.onLogout}/>
                <main className="app">
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                </main>
            </div>
        )
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
