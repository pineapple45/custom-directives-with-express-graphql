import { useEffect } from 'react';
import _ from 'lodash';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Role } from '../redux/constants';

interface AuthorizedRoutesType extends RouteProps {
  component: any;
  role: Role;
}

const AuthorizedRoutes = ({
  component: Component,
  role,
  ...rest
}: AuthorizedRoutesType) => {
  const { data: authData } = useTypedSelector((state) => state.loginUser);

  const {
    data: currentUser,
    error: errorOnGettingUserById,
    loading: gettingUserById,
  } = useTypedSelector((state) => state.getUserById);

  const { getUserById } = useActions();

  // useEffect(() => {
  //   // !_.isEmpty(authData) && getUserById(authData.userId);
  //   // console.log(currentUser);
  //   // getUserById(authData.userId);
  // }, [getUserById]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (_.isEmpty(authData)) {
          // not logged in so redirect to login page with the return url
          console.log('route not authenticated');

          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        // getUserById(authData.userId);
        // check if route is restricted by role
        if (currentUser.role == role) {
          // role is authorised so redirect to desired page
          console.log(currentUser);
          console.log(gettingUserById);
          console.log(currentUser.role);
          console.log(role);
          console.log('route is authorised');
          return <Component {...props} />;
        }

        console.log('route not authorised');
        return <Redirect to={{ pathname: '/' }} />;
      }}
    />
  );
};

export default AuthorizedRoutes;
