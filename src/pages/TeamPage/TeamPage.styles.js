import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.background.default
      }
    },
    header: {
      display: 'flex'
    },
    title: {
      paddingRight: '16px'
    },
    limitButton: {
      position: 'absolute',
      right: '24px'
    }
}));