import React from "../../../_snowpack/pkg/react.js";
import {makeStyles, createStyles} from "../../../_snowpack/pkg/@material-ui/core/styles.js";
import {Modal as MuiModal} from "../../../_snowpack/pkg/@material-ui/core.js";
const useStyles = makeStyles((theme) => createStyles({
  paper: {
    position: "absolute",
    width: "50%",
    minWidth: "400px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));
const Modal = ({handleClose, open, children}) => {
  const classes = useStyles();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(MuiModal, {
    open,
    onClose: handleClose,
    "aria-labelledby": "simple-modal-title",
    "aria-describedby": "simple-modal-description",
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.paper
  }, children)));
};
export default Modal;
