import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    table: {
      marginTop: '16px'
    },
    clickable: {
      cursor: 'pointer',
      '&:hover': {
        color: '#0426D6'
      }
    }
}));