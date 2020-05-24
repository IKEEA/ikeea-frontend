import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%', height: '88vh'
    },
    formGroup: {
        position: 'absolute',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1)
    },
    legend: {
        position: 'absolute',
        width: '450px',
        padding: theme.spacing(1),
        height: '400px',
        right: theme.spacing(4),
        top: theme.spacing(16)
    },
    chip: {
        marginRight: theme.spacing(1)
    }
}));