import React from 'react';
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <nav className="navbar-expand-md navbar navbar-light bg-light fixed-top">
                <button type="button" className="navbar-toggler navbar-toggler-right">
                    <span className="navbar-toggler-icon"/>
                </button>
                <a href="/" className="navbar-brand">{this.props.appName}</a>
                <div className="collapse navbar-collapse">
                    <ul className="mr-auto navbar-nav">
                        <li className="nav-item">
                            <a href="#" className="nav-link">Goals</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Library</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">History</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Charts</a>
                        </li>
                    </ul>
                </div>
                <ul className="ml-auto navbar-nav">
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={this.props.onLogout}>Logout</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header;
