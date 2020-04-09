import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import logoIcon from '../assets/logo.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    iconAvatar: {
        marginTop: '20px',
        marginBottom: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '120px',
        height: '120px'
    }
}));

function Logo() {
    const classes = useStyles();
    return (
        <div>
            <Avatar src={logoIcon} variant="square" className={classes.iconAvatar} />
            <Typography variant="h4" align="center" color="primary">
                Learning Days Tracker
            </Typography>
        </div>
    );
}

export default Logo;