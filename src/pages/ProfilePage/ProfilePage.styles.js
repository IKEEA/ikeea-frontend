import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
  }));