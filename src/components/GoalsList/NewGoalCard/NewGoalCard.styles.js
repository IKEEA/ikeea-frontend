import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '90%',
        marginBottom: '15px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    avatar: {
        backgroundColor: red[500],
    },
    formControl: {
        minWidth: '100%'
    },
    addButton: {
        float: 'right'
    }
}));