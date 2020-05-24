import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%', height: '88vh'
    },
    formGroup: {
        position: 'absolute',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1)
    }
}));