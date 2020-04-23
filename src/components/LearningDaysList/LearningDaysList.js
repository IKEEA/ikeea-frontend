import React, { useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import Menu from '../../components/Menu/Menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const LearningDaysList = () => {
    const [user] = useContext(UserContext);
    return (
        <Menu>
            <Grid container spacing={3} direction="row">
                <Grid item xs={6}>
                    <Typography variant="h5">
                        Learning Days
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary">Add New Learning Day</Button>
                </Grid>
            </Grid>
        </Menu>
    );
}

export default LearningDaysList;
