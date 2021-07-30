import React, {useState, useEffect} from "../../../_snowpack/pkg/react.js";
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  CircularProgress
} from "../../../_snowpack/pkg/@material-ui/core.js";
import Message from "../../components/Message/index.js";
import LockOutlinedIcon from "../../../_snowpack/pkg/@material-ui/icons/LockOutlined.js";
import {Link, useHistory} from "../../../_snowpack/pkg/react-router-dom.js";
import {useAuth} from "../../context/AuthProvider.js";
import {loginUserQuery} from "../../graphql/queries.js";
import {useLazyQuery} from "../../../_snowpack/pkg/@apollo/client.js";
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
const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const {authState, setAuthState, isLoggedIn} = useAuth();
  const [
    loginUser,
    {loading: loginUserInProgress, error: errorOnLogin, data: loginData}
  ] = useLazyQuery(loginUserQuery);
  const [message, setMessage] = useState({
    toShow: false,
    variant: "success",
    messageText: ""
  });
  const [inputState, setInputState] = useState({
    usernameOrEmail: "",
    password: ""
  });
  const inputChangeHandler = (event) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value
    });
  };
  const loginFormHandler = (event) => {
    event.preventDefault();
    loginUser({variables: inputState});
    setInputState({
      usernameOrEmail: "",
      password: ""
    });
  };
  useEffect(() => {
    if (isLoggedIn())
      history.push("/");
  }, []);
  useEffect(() => {
    if (loginData !== void 0) {
      setAuthState({
        ...authState,
        ...loginData.login
      });
      localStorage.setItem("userData", JSON.stringify(loginData.login));
    }
  }, [loginData]);
  let errorMessage;
  if (!errorOnLogin?.networkError) {
    errorMessage = errorOnLogin?.message;
    console.log(errorOnLogin);
  }
  useEffect(() => {
    if (isLoggedIn())
      history.push("/");
  }, [isLoggedIn]);
  return /* @__PURE__ */ React.createElement(Container, {
    component: "main",
    maxWidth: "xs"
  }, /* @__PURE__ */ React.createElement(CssBaseline, null), errorMessage && /* @__PURE__ */ React.createElement("span", null, errorMessage), /* @__PURE__ */ React.createElement("div", {
    className: classes.paper
  }, /* @__PURE__ */ React.createElement(Avatar, {
    className: classes.avatar
  }, /* @__PURE__ */ React.createElement(LockOutlinedIcon, null)), /* @__PURE__ */ React.createElement(Typography, {
    component: "h1",
    variant: "h5"
  }, "Sign in"), /* @__PURE__ */ React.createElement("form", {
    className: classes.form,
    noValidate: true,
    onSubmit: loginFormHandler
  }, /* @__PURE__ */ React.createElement(TextField, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    id: "email",
    label: "Enter Username or Email",
    name: "usernameOrEmail",
    autoComplete: "text",
    autoFocus: true,
    onChange: inputChangeHandler
  }), /* @__PURE__ */ React.createElement(TextField, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    autoComplete: "current-password",
    onChange: inputChangeHandler
  }), /* @__PURE__ */ React.createElement(FormControlLabel, {
    control: /* @__PURE__ */ React.createElement(Checkbox, {
      value: "remember",
      color: "primary"
    }),
    label: "Remember me"
  }), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit
  }, "Sign In"), loginUserInProgress && /* @__PURE__ */ React.createElement(CircularProgress, null), /* @__PURE__ */ React.createElement(Grid, {
    container: true
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: true
  }, /* @__PURE__ */ React.createElement(Link, {
    to: "/forgot-password"
  }, "Forgot password?")), /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Link, {
    to: "/register"
  }, "Don't have an account? Sign Up")))), /* @__PURE__ */ React.createElement("br", null)), /* @__PURE__ */ React.createElement(Message, {
    message,
    setMessage
  }));
};
export default Login;
