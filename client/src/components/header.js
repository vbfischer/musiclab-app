import React from 'react';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';

const styles = {
    root: {
        //width: '100%',
    },
    avatar: {
        margin: 10,
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    }
};

const Header = (props) => {
    const classes = props.classes;
    return (
        <AppBar color="default" elevation="1" position="static" className={classes.root}>
            <Toolbar>
                <IconButton aria-label="Menu">
                    <MenuIcon/>
                </IconButton>
                <Avatar className={classes.orangeAvatar}>N</Avatar>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(Header);
