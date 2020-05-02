import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        height: '100%'
    },
    commentField: {
        width: '100%'
    },
    commentFieldGrid: {
        height: '100px'
    },
    commentButton: {
        position: 'absolute',
        bottom: theme.spacing(9),
        right: theme.spacing(3)
    },
    commentsList: {
        overflowY: 'scroll',
        maxHeight: '100%'
    },
    avatar: {
        backgroundColor: red[500],
    },
    card: {
        marginBottom: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        width: '90%',
        margin: theme.spacing(1)
    }
}));