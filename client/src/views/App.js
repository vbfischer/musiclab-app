import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import withWidth from 'material-ui/utils/withWidth';

import {Route} from 'react-router-dom';
import {keys, defaultBreakpoints} from 'material-ui/styles/breakpoints'
import './App.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';

import compose from 'recompose/compose';

import HeaderComponent from '../components/header';
import HomeComponent from '../components/Home/index';
import LibraryComponent from '../views/Library';
import LoginComponent from '../components/Login';
import NavbarComponent from '../containers/navbar';

import {userIsAuthenticatedRedirect, userIsAuthenticated, userIsNotAuthenticatedRedirect} from '../auth';
import {withRouter} from "react-router-dom";
import {logoutAndRedirect} from '../actions/user';

const Header = userIsAuthenticated(HeaderComponent);
const Home = userIsAuthenticatedRedirect(HomeComponent);
const Login = userIsNotAuthenticatedRedirect(LoginComponent);
const Library = userIsAuthenticatedRedirect(LibraryComponent);
const Navbar = userIsAuthenticated(NavbarComponent);

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
                <NavbarComponent/>
                <main className="app p-4">
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/library" component={Library}/>
                </main>
            </div>
        )
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
