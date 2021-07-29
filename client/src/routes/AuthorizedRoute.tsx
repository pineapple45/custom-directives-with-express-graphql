import React from 'react';
import { Route, Redirect, RouteProps, withRouter } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  AUTH_USER = 'AUTH_USER',
}

interface AuthorizedRoutesType extends RouteProps {
  component: any;
  role: Role;
}

const AuthorizedRoute: React.FC<AuthorizedRoutesType> = ({
  component: Component,
  role,
  ...rest
}) => {
  const { authState, isLoggedIn } = useAuth();

  let userDataFromStorage: any;
  if (!isLoggedIn()) {
    userDataFromStorage = JSON.parse(localStorage.getItem('userData')!);
  } else {
    // condition if user refreshes the page, then we get data straight from local storage since
    // authstate returens undefined or isLoggedIn() will be false as page renders before even the
    // check is made
    userDataFromStorage = authState;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userDataFromStorage) {
          // not logged in so redirect to login page with the return url
          console.log('route not authenticated');

          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        if (userDataFromStorage.role === role) {
          console.log('route is authorised');
          return <Component {...props} />;
        }

        console.log('route not authorised');
        return <Redirect to={{ pathname: '/' }} />;
      }}
    />
  );
};

export default AuthorizedRoute;
