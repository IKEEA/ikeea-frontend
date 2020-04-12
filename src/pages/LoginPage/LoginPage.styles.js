import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.background.default
      }
    },
    card: {
      marginTop: '15px',
      alignContent: 'center',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    alert: {
      margin: '10px'
    }
  }));