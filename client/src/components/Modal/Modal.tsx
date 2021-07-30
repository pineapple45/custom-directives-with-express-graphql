import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal as MuiModal } from '@material-ui/core';

interface ModalType {
  handleClose: () => void;
  open: boolean;
  children: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: '50%',
      minWidth: '400px',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      borderRadius: '5px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const Modal: React.FC<ModalType> = ({ handleClose, open, children }) => {
  const classes = useStyles();

  return (
    <div>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className={classes.paper}>{children}</div>
      </MuiModal>
    </div>
  );
};

export default Modal;
