import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.background.default
      }
    },
    table: {
      marginTop: '16px'
    },
    header: {
      display: 'flex'
    },
    title: {
      paddingRight: '16px'
    }
  }));