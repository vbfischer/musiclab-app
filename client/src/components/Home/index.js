import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

class Home extends React.Component {
    render() {
        return (
            <div>Home Page</div>
        )
    }
}

export default connect()(Home);