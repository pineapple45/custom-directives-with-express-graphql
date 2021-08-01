import React, { useState, useEffect } from 'react';
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import Message from '../../components/Message';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import useLoginUser from '../../hooks/mutations/useLoginUser';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { authState, setAuthState, isLoggedIn } = useAuth();

  const { loginUserQueryHandler } = useLoginUser();

  const [message, setMessage] = useState<{
    toShow: boolean;
    variant: 'success' | 'error' | 'warning';
    messageText: string | null;
  }>({
    toShow: false,
    variant: 'success',
    messageText: '',
  });

  const [inputState, setInputState] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [loginUserInProgress, setLoginUserInProgress] = useState(false);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value,
    });
  };

  const loginFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginUserInProgress(true);
    const response = await loginUserQueryHandler({ ...inputState });

    setMessage({
      messageText: response.error ? response.data.message : 'login succesful',
      toShow: true,
      variant: response.error ? 'error' : 'success',
    });

    setLoginUserInProgress(false);
    if (response.error) {
      return;
    }

    setAuthState({
      ...authState,
      ...response.data.login,
    });

    localStorage.setItem('userData', JSON.stringify(response.data.login));

    setInputState({
      usernameOrEmail: '',
      password: '',
    });
  };

  useEffect(() => {
    if (isLoggedIn()) history.push('/');
  }, [history, isLoggedIn]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={loginFormHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter Username or Email"
            name="usernameOrEmail"
            autoComplete="off"
            autoFocus
            onChange={inputChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={inputChangeHandler}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {loginUserInProgress && <CircularProgress />}

          <Grid container>
            {/* <Grid item xs>
              <Link to="/forgot-password">Forgot password?</Link>
            </Grid> */}
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
        <br />
      </div>
      <Message message={message} setMessage={setMessage} />
    </Container>
  );
};

export default Login;
