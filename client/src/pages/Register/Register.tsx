import React, { useState, useEffect } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { Link, useHistory } from 'react-router-dom';
import Message from '../../components/Message';
import { useMutation } from '@apollo/client';
import { createUserMutation } from '../../graphql/mutations';
import { useAuth } from '../../context/AuthProvider';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const { isLoggedIn } = useAuth();
  const [
    createUser,
    { error: errorOnCreateUser, loading: registerUserInProgress },
  ] = useMutation(createUserMutation);

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
    username: '',
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value,
    });
  };

  const registerFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser({ variables: inputState });
    setInputState({
      username: '',
      email: '',
      password: '',
    });

    history.push('/login');
  };

  let errorMessage: string | undefined;

  if (!errorOnCreateUser?.networkError) {
    errorMessage = errorOnCreateUser?.message;
    console.log(errorOnCreateUser);
    // setMessage({
    //   toShow: true,
    //   variant: 'error',
    //   messageText: errorOnListingPosts?.message!,
    // });
  }

  useEffect(() => {
    if (isLoggedIn()) history.push('/');
  }, [isLoggedIn, history]);

  return (
    <Container component="main" maxWidth="xs">
      {errorMessage && <span>{errorMessage}</span>}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={registerFormHandler}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {registerUserInProgress && <CircularProgress />}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
        <br />
      </div>
      <Message message={message} setMessage={setMessage} />
    </Container>
  );
};

export default Register;
