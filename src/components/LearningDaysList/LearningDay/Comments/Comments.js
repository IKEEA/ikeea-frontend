import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { UserContext } from '../../../../context/UserContext';
import TextField from '@material-ui/core/TextField';
import AddCommentIcon from '@material-ui/icons/AddComment';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './Comments.styles';

const Comments = ({ commentsLoading, addComment, getComments, deleteComment, comments }) => {

    const [user] = useContext(UserContext);
    const [comment, setComment] = useState('');

    const classes = useStyles();

    useEffect(() => {
        getComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddCommentClick = (e) => {
        addComment(comment);
        setComment('');
    }

    const handleDeleteCommentClick = (e, commentId) => {
        deleteComment(commentId);
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
                    <Card key={comment.id} className={classes.card}>
                        <CardHeader
                            avatar={
                                <Tooltip title={`${comment.firstName} ${comment.lastName}`} arrow>
                                    <Avatar className={classes.avatar}>
                                        {`${comment.firstName} ${comment.lastName}`.split(" ").map((n, i, a) => i === 0 || i + 1 === a.length ? n[0] : null).join("")}
                                    </Avatar>
                                </Tooltip>
                            }
                            action={user.id === comment.userId ?
                                <IconButton aria-label="settings" onClick={(e) => handleDeleteCommentClick(e, comment.id)}>
                                    <DeleteIcon />
                                </IconButton> : ''
                            }
                            title={`${comment.firstName} ${comment.lastName}`}
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