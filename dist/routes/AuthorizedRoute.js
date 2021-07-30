import React from "../pkg/react.js";
import {Route, Redirect} from "../pkg/react-router-dom.js";
import {useAuth} from "../context/AuthProvider.js";
export var Role;
(function(Role2) {
  Role2["ADMIN"] = "ADMIN";
  Role2["MODERATOR"] = "MODERATOR";
  Role2["AUTH_USER"] = "AUTH_USER";
})(Role || (Role = {}));
const AuthorizedRoute = ({
  component: Component,
  role,
  ...rest
}) => {
  const {authState, isLoggedIn} = useAuth();
  let userDataFromStorage;
  if (!isLoggedIn()) {
    userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
  } else {
    userDataFromStorage = authState;
  }
  return /* @__PURE__ */ React.createElement(Route, {
    ...rest,
    render: (props) => {
      if (!userDataFromStorage) {
        console.log("route not authenticated");
        return /* @__PURE__ */ React.createElement(Redirect, {
          to: {pathname: "/login", state: {from: props.location}}
        });
      }
      if (userDataFromStorage.role === role) {
        console.log("route is authorised");
        return /* @__PURE__ */ React.createElement(Component, {
          ...props
        });
      }
      console.log("route not authorised");
      return /* @__PURE__ */ React.createElement(Redirect, {
        to: {pathname: "/"}
      });
    }
  });
};
export default AuthorizedRoute;
