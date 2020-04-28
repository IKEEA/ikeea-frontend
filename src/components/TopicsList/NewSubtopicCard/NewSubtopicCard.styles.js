import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    fullWidth: {
        width: '100%',
    },
    subtopic: {
        marginBottom: '8px',
        padding: '8px'
    },
    edit: {
        float: 'right',
        cursor: 'pointer'
    }
}));