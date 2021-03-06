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
        paddingRight: '16px',
        fontSize: '16px',
        marginBottom: '8px'
    },
    description: {
        width: '100%',
        marginBottom: '8px'
    },
    content: {
        display: 'block'
    },
    subtopic: {
        marginBottom: '8px',
        padding: '8px'
    },
    edit: {
        float: 'right',
        cursor: 'pointer'
    },
    accordion: {
        cursor: 'default !important'
    },
    activeAccordion: {
        cursor: 'default !important',
        backgroundColor: '#d1d8ff'
    },
    accordionItem: {
        cursor: 'pointer'
    }
}));