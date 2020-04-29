import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    fullWidth: {
        width: '100%',
    },
    heading: {
        width: '100%',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    content: {
        display: 'block'
    },
    edit: {
        float: 'right',
        cursor: 'pointer'
    }
}));