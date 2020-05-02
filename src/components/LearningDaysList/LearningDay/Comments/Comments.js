import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AddCommentIcon from '@material-ui/icons/AddComment';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useStyles } from './Comments.styles';

const Comments = ({ commentsLoading, addComment }) => {

    const [comment, setComment] = useState('');

    const classes = useStyles();

    const handleAddCommentClick = (e) => {
        addComment(comment);
    }

    return (
        <Grid container spacing={1} direction="column-reverse" alignItems="stretch" justify="space-between" className={classes.container}>
            <Grid item>
                <TextField multiline label="Comment" variant="outlined" rows={3} className={classes.commentField} value={comment}
                    onChange={e => setComment(e.target.value)} />
                <IconButton className={classes.commentButton} onClick={(e) => handleAddCommentClick(e)} disabled={!comment}>
                    <AddCommentIcon></AddCommentIcon>
                </IconButton>
            </Grid>
            <Grid item xs className={classes.commentsList}>
                {commentsLoading ? <LinearProgress /> : ''}
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
                <Paper className={classes.paper}>Comment</Paper>
            </Grid>
        </Grid>
    )
}

export default Comments;