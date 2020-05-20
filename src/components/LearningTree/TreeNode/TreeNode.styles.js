import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    nodePaper: {
        maxWidth: 'none',
        padding: theme.spacing(1),
        whiteSpace: 'nowrap',
        float: 'left',
        clear: 'left'
    },
    chip: {
        marginRight: theme.spacing(1)
    }
}));