import React from 'react';
import { useStyles } from './Logo.styles';

//components
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

//icons
import logoIcon from '../../assets/logo.svg';

const Logo = () => {
    const classes = useStyles();
    return (
        <div>
            <Avatar src={logoIcon} variant="square" className={classes.iconAvatar} />
            <Typography variant="h4" align="center" color="primary" className={classes.appName}>
                Learning Days Tracker
            </Typography>
        </div>
    );
}

export default Logo;