import React from 'react';
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
  Theme,
  Box,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { Role } from '../../routes/AuthorizedRoute';
import Icon from '../../assets/icon.svg';

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
  }),
);

const Navbar = () => {
  const { isLoggedIn, logout, authState } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <img src={Icon} width="50px" />
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => history.push('/')}
        >
          Photos
        </Typography>
        {isLoggedIn() !== false ? (
          <div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {authState && <span>{authState.username}</span>}

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
              {authState && authState.role === Role.ADMIN && (
                <MenuItem onClick={() => history.push(`/admin`)}>
                  Admin Console
                </MenuItem>
              )}
              {authState && authState.role === Role.MODERATOR && (
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
