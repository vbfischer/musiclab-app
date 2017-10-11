import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import compose from 'recompose/compose';
import Divider from 'material-ui/Divider';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import HeaderComponent from '../components/header';

import withRoot from '../components/withRoot';
import {withStyles} from 'material-ui/styles';
import {logoutAndRedirect} from '../actions/user';

const Header = HeaderComponent;
// const Header = userIsAuthenticated(HeaderComponent);

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

const drawerWidth = 240;

const styles = theme => ({
    root: {
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        backgroundColor: theme.palette.primary[800],
        color: theme.palette.primary[50]
    },
    appBar: {
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        order: 1,
    },
    drawerHeader: {
        [theme.breakpoints.up('sm')]: {
            height: 64,
        },
        display: 'flex',
        justifyContent: 'center',
        '& h2': {
            alignSelf: 'center'
        }
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    }
});

class App extends Component {
    render() {
        const classes = this.props.classes;

        return (
            <Grid container className={classes.root}>
                <Grid item className={classes.appFrame}>
                    <div className={classes.appBar}>
                        <Header appName={this.props.appName} currentUser={this.props.currentUser}
                                onLogout={this.props.onLogout}/>
                    </div>
                    <Drawer
                        type="permanent"
                        classes={{
                            paper: classes.drawerPaper
                        }}
                    >
                        <Grid item className={classes.drawerHeader}>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                {this.props.appName}
                            </Typography>
                        </Grid>
                        <Divider/>
                        <List>
                            <ListItem button component="a" href="#simple-list">
                                <ListItemText primary="Testing"/>
                            </ListItem>
                            <ListItem button component="a" href="#simple-list">
                                <ListItemText primary="Testing"/>
                            </ListItem>
                            <ListItem button component="a" href="#simple-list">
                                <ListItemText primary="Testing"/>
                            </ListItem>
                            <ListItem button component="a" href="#simple-list">
                                <ListItemText primary="Testing"/>
                            </ListItem>
                            <ListItem button component="a" href="#simple-list">
                                <ListItemText primary="Testing"/>
                            </ListItem>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <Typography type="body1" noWrap>
                            {'You think water moves fast? You should see ice.'}
                        </Typography>
                    </main>
                </Grid>
            </Grid>
        )
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
};

export default compose(withRoot, withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(App);
