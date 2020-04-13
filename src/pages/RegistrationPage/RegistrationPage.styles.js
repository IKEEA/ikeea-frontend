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
    textField: {
      marginBottom: '10px'
    },
    avatar: {
      margin: 'auto',
      marginBottom: '20px',
      backgroundColor: theme.palette.primary.main
    },
    button: {
      margin: 'auto'
    }
}))