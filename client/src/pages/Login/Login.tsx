import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@material-ui/core';
import Message from '../../components/Message';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { loginUserQuery } from '../../graphql/queries';
import { useLazyQuery } from '@apollo/client';

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

  const [
    loginUser,
    { loading: loginUserInProgress, error: errorOnLogin, data: loginData },
  ] = useLazyQuery(loginUserQuery);

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

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value,
    });
  };

  const loginFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser({ variables: inputState });

    setInputState({
      usernameOrEmail: '',
      password: '',
    });
  };

  useEffect(() => {
    if (isLoggedIn()) history.push('/');
  }, []);

  useEffect(() => {
    if (loginData !== undefined) {
      setAuthState({
        ...authState,
        ...loginData.login,
      });

      localStorage.setItem('userData', JSON.stringify(loginData.login));
    }
  }, [loginData]);

  let errorMessage: string | undefined;

  if (!errorOnLogin?.networkError) {
    errorMessage = errorOnLogin?.message;
    console.log(errorOnLogin);
    // setMessage({
    //   toShow: true,
    //   variant: 'error',
    //   messageText: errorOnListingPosts?.message!,
    // });
  }

  useEffect(() => {
    if (isLoggedIn()) history.push('/');
  }, [isLoggedIn]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {errorMessage && <span>{errorMessage}</span>}
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
            autoComplete="text"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
            <Grid item xs>
              <Link to="/forgot-password">Forgot password?</Link>
            </Grid>
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
