import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AddCommentIcon from '@material-ui/icons/AddComment';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import { useStyles } from './Comments.styles';

const Comments = ({ commentsLoading, addComment, getComments, comments }) => {

    const [comment, setComment] = useState('');

    const classes = useStyles();

    useEffect(() => {
        getComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                {comments.sort((comment1, comment2) => new Date(comment1.date).getTime() > new Date(comment2.date).getTime() ? 1 : -1).map(comment => (
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="learning-day" className={classes.avatar}>
                                    {comment.userId}
                                </Avatar>
                            }
                            title={comment.userId}
                            subheader={new Date(comment.date).toDateString()}

                        />
                        <CardContent>
                            {comment.comment}
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Grid>
    )
}

export default Comments;