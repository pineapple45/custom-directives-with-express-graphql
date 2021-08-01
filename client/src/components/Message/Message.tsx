import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface SnackbarType {
  message: {
    messageText: string | null;
    variant: 'success' | 'error' | 'warning';
    toShow: boolean;
  };
  setMessage: (message: {
    messageText: string | null;
    variant: 'success' | 'error' | 'warning';
    toShow: boolean;
  }) => void;
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Message: React.FC<SnackbarType> = ({ message, setMessage }) => {
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage({
      ...message,
      toShow: false,
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={message.toShow}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={message.variant}>
          {message.messageText}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Message;
