import { Route, Redirect, RouteProps } from 'react-router-dom';

interface AuthenticatedRoutesType extends RouteProps {
  component: any;
  isLoggedIn: boolean;
  path: any;
}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesType> = ({
  component: Component,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoutes;
