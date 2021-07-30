import React from "../../../_snowpack/pkg/react.js";
import Avatar from "../../../_snowpack/pkg/@material-ui/core/Avatar.js";
import Button from "../../../_snowpack/pkg/@material-ui/core/Button.js";
import CssBaseline from "../../../_snowpack/pkg/@material-ui/core/CssBaseline.js";
import TextField from "../../../_snowpack/pkg/@material-ui/core/TextField.js";
import Link from "../../../_snowpack/pkg/@material-ui/core/Link.js";
import Grid from "../../../_snowpack/pkg/@material-ui/core/Grid.js";
import LockOutlinedIcon from "../../../_snowpack/pkg/@material-ui/icons/LockOutlined.js";
import Typography from "../../../_snowpack/pkg/@material-ui/core/Typography.js";
import {makeStyles} from "../../../_snowpack/pkg/@material-ui/core/styles.js";
import Container from "../../../_snowpack/pkg/@material-ui/core/Container.js";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const ForgotPassword = () => {
  const classes = useStyles();
  return /* @__PURE__ */ React.createElement(Container, {
    component: "main",
    maxWidth: "xs"
  }, /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement("div", {
    className: classes.paper
  }, /* @__PURE__ */ React.createElement(Avatar, {
    className: classes.avatar
  }, /* @__PURE__ */ React.createElement(LockOutlinedIcon, null)), /* @__PURE__ */ React.createElement(Typography, {
    component: "h1",
    variant: "h5"
  }, "Forgot Password"), /* @__PURE__ */ React.createElement("form", {
    className: classes.form,
    noValidate: true
  }, /* @__PURE__ */ React.createElement(TextField, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    id: "email",
    label: "Email Address",
    name: "email",
    autoComplete: "email",
    autoFocus: true
  }), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit
  }, "Sign In"), /* @__PURE__ */ React.createElement(Grid, {
    container: true
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Link, {
    href: "#",
    variant: "body2"
  }, "Don't have an account? Sign Up"))))));
};
export default ForgotPassword;
