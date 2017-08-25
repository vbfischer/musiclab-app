import {connect} from 'react-redux';
import React from 'react';
import agent from '../agent';
import {UPDATE_FIELD_AUTH, LOGIN, LOGIN_PAGE_UNLOADED} from "../constants/actionTypes"

import './Login.css';


const mapStateToProps = state => ({...state.auth});
const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'email', value}),
    onChangePassword: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
    onSubmit: (email, password) =>
        dispatch({type: LOGIN, payload: agent.Auth.login(email, password)}),
    onUnload: () =>
        dispatch({type: LOGIN_PAGE_UNLOADED})
});

class Login extends React.Component {
    constructor() {
        super();
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    }

    onClick = (e) => {
        e.preventDefault();

        this.props.onSubmit(this.props.email, this.props.password);
    };

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;

        return (
            <div className="mx-auto my-auto card-group row">
                <div className="card col-8">
                    <div className="card-block p-4">
                        <h1>Login</h1>
                        <p className="text-muted">Sign in to your account</p>
                        <div className="form-group">
                            <input type="email" placeholder="Username" name="username" id="username"
                                   value={email}
                                   onChange={this.changeEmail}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" name="password" id="password"
                                   value={password}
                                   onChange={this.changePassword}
                                   className="form-control"/>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <button type="button" className="px-2 btn btn-primary" onClick={this.onClick}>Login
                                </button>
                            </div>
                            <div className="col-4">
                                <button type="button" className="px-0 btn btn-link">Forgot password?</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);