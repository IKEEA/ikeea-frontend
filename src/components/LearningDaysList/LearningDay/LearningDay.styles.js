import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    LearningDayModal: {
        height: '100%'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    title: {
        width: '100%',
        fontSize: '24px'
    },
    input: {
        widt: '100%'
    },
    topicChip: {
        marginRight: '10px'
    }
}));