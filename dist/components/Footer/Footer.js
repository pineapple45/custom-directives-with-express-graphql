import React from "../../pkg/react.js";
import Typography from "../../pkg/@material-ui/core/Typography.js";
import {makeStyles} from "../../pkg/@material-ui/core/styles.js";
import Container from "../../pkg/@material-ui/core/Container.js";
import Link from "../../pkg/@material-ui/core/Link.js";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[800]
  }
}));
const Footer = () => {
  const classes = useStyles();
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.root
  }, /* @__PURE__ */ React.createElement("footer", {
    className: classes.footer
  }, /* @__PURE__ */ React.createElement(Container, {
    maxWidth: "sm"
  }, /* @__PURE__ */ React.createElement(Typography, {
    variant: "body2",
    color: "textSecondary",
    align: "center"
  }, "Copyright © ", /* @__PURE__ */ React.createElement(Link, {
    color: "inherit",
    href: "https://material-ui.com/"
  }, "Cutlery"), " ", new Date().getFullYear(), "."))));
};
export default Footer;
