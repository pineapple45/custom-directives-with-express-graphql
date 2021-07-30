import React from "../../pkg/react.js";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  IconButton,
  MenuItem,
  makeStyles,
  createStyles,
  Box
} from "../../pkg/@material-ui/core.js";
import {AccountCircle} from "../../pkg/@material-ui/icons.js";
import {useHistory} from "../../pkg/react-router-dom.js";
import {useAuth} from "../../context/AuthProvider.js";
import {Role} from "../../routes/AuthorizedRoute.js";
import Icon from "../../assets/icon.svg.proxy.js";
const useStyles = makeStyles((theme) => createStyles({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
const Navbar = () => {
  const {isLoggedIn, logout, authState} = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };
  return /* @__PURE__ */ React.createElement(AppBar, {
    position: "static",
    color: "transparent"
  }, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement("img", {
    src: Icon,
    width: "50px"
  }), /* @__PURE__ */ React.createElement(Typography, {
    variant: "h6",
    className: classes.title,
    onClick: () => history.push("/")
  }, "Photos"), isLoggedIn() !== false ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Box, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }, authState && /* @__PURE__ */ React.createElement("span", null, authState.username), /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": "account of current user",
    "aria-controls": "menu-appbar",
    "aria-haspopup": "true",
    onClick: handleMenu,
    color: "inherit"
  }, /* @__PURE__ */ React.createElement(AccountCircle, null))), /* @__PURE__ */ React.createElement(Menu, {
    id: "menu-appbar",
    anchorEl,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    keepMounted: true,
    transformOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    open,
    onClose: handleClose
  }, authState && authState.role === Role.ADMIN && /* @__PURE__ */ React.createElement(MenuItem, {
    onClick: () => history.push(`/admin`)
  }, "Admin Console"), authState && authState.role === Role.MODERATOR && /* @__PURE__ */ React.createElement(MenuItem, {
    onClick: () => history.push(`/moderator`)
  }, "Moderator Console"), /* @__PURE__ */ React.createElement(MenuItem, {
    onClick: handleLogout
  }, "Logout"))) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Button, {
    color: "inherit",
    variant: "outlined",
    style: {marginRight: "10px"},
    onClick: () => history.push("/register")
  }, "register"), /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "secondary",
    onClick: () => history.push("/login")
  }, "login"))));
};
export default Navbar;
