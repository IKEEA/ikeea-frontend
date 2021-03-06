import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    LearningDayModal: {
        height: '80%'
    },
    container: {
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
    dialogTitle: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(5)
    },
    input: {
        widt: '100%'
    },
    topicChip: {
        marginRight: '10px'
    }
}));