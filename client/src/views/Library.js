import React from 'react'
import {connect} from 'react-redux';
import {getExercises} from "../actions/exercises";

const mapStatesToProps = state => ({
    resources: state.exercises.resources
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch(getExercises());
    }
});

const LibNavBar = () => {
    return (
        <div className="navbar mb-4 mr-auto">
            <div>
                <button className="btn btn-outline-primary"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i> Create New Item</button>
            </div>
            <div className="">
                <button className="btn btn-outline-info mr-2"><i className="fa fa-list mr-2" aria-hidden="true"></i>View All Items</button>
                <button className="btn btn-outline-info mr-2"><i className="fa fa-star mr-2" aria-hidden="true"></i>View Starred Items</button>
            </div>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    )
};

const LibraryItem = () => {
    return (
        <div>ab</div>
    )
};


class Library extends React.Component {
    componentDidMount() {
        this.props.onLoad();
    };

    render() {
        return (
            <div className="container">
                <LibNavBar/>
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                            risus
                            varius
                            blandit.</p>
                        <small>Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small className="text-muted">3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                            risus
                            varius
                            blandit.</p>
                        <small className="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small className="text-muted">3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                            risus
                            varius
                            blandit.</p>
                        <small className="text-muted">Donec id elit non mi porta.</small>
                    </a>
                </div>
            </div>
        )
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(Library);