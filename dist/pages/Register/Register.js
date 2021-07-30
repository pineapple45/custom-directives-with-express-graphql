import React, {useState, useEffect} from "../../pkg/react.js";
import LockOutlinedIcon from "../../pkg/@material-ui/icons/LockOutlined.js";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  CircularProgress,
  makeStyles
} from "../../pkg/@material-ui/core.js";
import {Link, useHistory} from "../../pkg/react-router-dom.js";
import Message from "../../components/Message/index.js";
import {useMutation} from "../../pkg/@apollo/client.js";
import {createUserMutation} from "../../graphql/mutations.js";
import {useAuth} from "../../context/AuthProvider.js";
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const {isLoggedIn} = useAuth();
  const [
    createUser,
    {error: errorOnCreateUser, loading: registerUserInProgress}
  ] = useMutation(createUserMutation);
  const [message, setMessage] = useState({
    toShow: false,
    variant: "success",
    messageText: ""
  });
  const [inputState, setInputState] = useState({
    username: "",
    email: "",
    password: ""
  });
  const inputChangeHandler = (event) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value
    });
  };
  const registerFormHandler = (event) => {
    event.preventDefault();
    createUser({variables: inputState});
    setInputState({
      username: "",
      email: "",
      password: ""
    });
    history.push("/login");
  };
  let errorMessage;
  if (!errorOnCreateUser?.networkError) {
    errorMessage = errorOnCreateUser?.message;
    console.log(errorOnCreateUser);
  }
  useEffect(() => {
    if (isLoggedIn())
      history.push("/");
  }, [isLoggedIn]);
  return /* @__PURE__ */ React.createElement(Container, {
    component: "main",
    maxWidth: "xs"
  }, errorMessage && /* @__PURE__ */ React.createElement("span", null, errorMessage), /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement("div", {
    className: classes.paper
  }, /* @__PURE__ */ React.createElement(Avatar, {
    className: classes.avatar
  }, /* @__PURE__ */ React.createElement(LockOutlinedIcon, null)), /* @__PURE__ */ React.createElement(Typography, {
    component: "h1",
    variant: "h5"
  }, "Sign up"), /* @__PURE__ */ React.createElement("form", {
    className: classes.form,
    noValidate: true,
    onSubmit: registerFormHandler
  }, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 2
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 12
  }, /* @__PURE__ */ React.createElement(TextField, {
    variant: "outlined",
    required: true,
    fullWidth: true,
    name: "username",
    label: "Username",
    type: "text",
    id: "username",
    onChange: inputChangeHandler
  })), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 12
  }, /* @__PURE__ */ React.createElement(TextField, {
    variant: "outlined",
    required: true,
    fullWidth: true,
    id: "email",
    label: "Email Address",
    name: "email",
    type: "email",
    autoComplete: "email",
    onChange: inputChangeHandler
  })), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 12
  }, /* @__PURE__ */ React.createElement(TextField, {
    variant: "outlined",
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    autoComplete: "current-password",
    onChange: inputChangeHandler
  }))), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit
  }, "Sign Up"), registerUserInProgress && /* @__PURE__ */ React.createElement(CircularProgress, null), /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    justifyContent: "flex-end"
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Link, {
    to: "/login"
  }, "Already have an account? Sign in")))), /* @__PURE__ */ React.createElement("br", null)), /* @__PURE__ */ React.createElement(Message, {
    message,
    setMessage
  }));
};
export default Register;
