import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  IconButton,
  MenuItem,
  Divider,
  makeStyles,
  createStyles,
  Theme,
  Box,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Role } from '../../redux/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const { logoutUser, getUserById } = useActions();
  const { data: loggedInUserData } = useTypedSelector(
    (state) => state.loginUser
  );
  const { data: userById } = useTypedSelector((state) => state.getUserById);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    setAnchorEl(null);
  };

  useEffect(() => {
    loggedInUserData &&
      loggedInUserData.userId &&
      getUserById(loggedInUserData.userId);
  }, [loggedInUserData]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => history.push('/')}
        >
          Photos
        </Typography>
        {loggedInUserData && loggedInUserData.userId ? (
          <div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <span>{userById.username}</span>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              {userById.role === Role.ADMIN && (
                <MenuItem onClick={() => history.push(`/admin`)}>
                  Admin Console
                </MenuItem>
              )}
              {userById.role === Role.MODERATOR && (
                <MenuItem onClick={() => history.push(`/moderator`)}>
                  Moderator Console
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button
              color="inherit"
              variant="outlined"
              style={{ marginRight: '10px' }}
              onClick={() => history.push('/register')}
            >
              register
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push('/login')}
            >
              login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
