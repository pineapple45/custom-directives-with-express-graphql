import _ from 'lodash';
import { Route, Redirect } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';

// interface AuthenticatedRoutesType {
//   component: any;
//   path: any;
// }

const AuthenticatedRoutes = ({ component: Component, ...rest }: any) => {
  const { data: authData } = useTypedSelector((state) => state.loginUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        !_.isEmpty(authData) ? (
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
