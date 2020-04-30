import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        width: '100%',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    header: {
        display: 'flex',
        marginBottom: '16px'
    },
    title: {
        paddingRight: '16px'
    },
    description: {
        width: '100%',
        marginBottom: '8px'
    },
    content: {
        display: 'block'
    }
}));