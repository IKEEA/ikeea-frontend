import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    select: {
      width: '100%'
    },
    chip: {
      margin: '0px 4px 4px 0px'
    },
    loadingContainer: {
      width: '600px',
      height: '296px'
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto'
    }
}));