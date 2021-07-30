import {Route, Redirect} from "../../_snowpack/pkg/react-router-dom.js";
const AuthenticatedRoutes = ({
  component: Component,
  isLoggedIn,
  ...rest
}) => {
  return /* @__PURE__ */ React.createElement(Route, {
    ...rest,
    render: (props) => !isLoggedIn ? /* @__PURE__ */ React.createElement(Component, {
      ...props
    }) : /* @__PURE__ */ React.createElement(Redirect, {
      to: {pathname: "/login", state: {from: props.location}}
    })
  });
};
export default AuthenticatedRoutes;
