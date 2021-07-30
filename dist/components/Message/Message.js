import React from "../../../_snowpack/pkg/react.js";
import Snackbar from "../../../_snowpack/pkg/@material-ui/core/Snackbar.js";
import MuiAlert from "../../../_snowpack/pkg/@material-ui/lab/Alert.js";
import {makeStyles} from "../../../_snowpack/pkg/@material-ui/core/styles.js";
const Alert = (props) => {
  return /* @__PURE__ */ React.createElement(MuiAlert, {
    elevation: 6,
    variant: "filled",
    ...props
  });
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));
const Message = ({message, setMessage}) => {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage({
      ...message,
      toShow: false
    });
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.root
  }, /* @__PURE__ */ React.createElement(Snackbar, {
    open: message.toShow,
    autoHideDuration: 6e3,
    onClose: handleClose,
    anchorOrigin: {vertical: "top", horizontal: "right"}
  }, /* @__PURE__ */ React.createElement(Alert, {
    onClose: handleClose,
    severity: message.variant
  }, message.messageText)));
};
export default Message;
