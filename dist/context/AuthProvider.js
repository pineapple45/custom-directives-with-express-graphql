import React, {useContext, useState, useEffect} from "../../_snowpack/pkg/react.js";
import {assignRoleMutation} from "../graphql/mutations.js";
import {useMutation} from "../../_snowpack/pkg/@apollo/client.js";
const initialAuthState = {
  userId: void 0,
  token: void 0,
  tokenExpiration: void 0,
  username: void 0,
  role: void 0
};
const AuthContext = React.createContext(initialAuthState);
const AuthProvider = ({children}) => {
  const [assignUserRole, {error: errorOnAssigningRole}] = useMutation(assignRoleMutation);
  const [authState, setAuthState] = useState(initialAuthState);
  const logout = () => {
    localStorage.clear();
    setAuthState(initialAuthState);
  };
  const isLoggedIn = () => {
    if (authState.userId !== void 0)
      return authState;
    return false;
  };
  const assignRole = ({
    role,
    assignedBy,
    assignedUser
  }) => {
    assignUserRole({variables: {role, assignedBy, assignedUser}});
  };
  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
    if (userDataFromStorage && authState.userId === void 0) {
      setAuthState({
        ...authState,
        ...userDataFromStorage
      });
    }
  }, [authState]);
  return /* @__PURE__ */ React.createElement(AuthContext.Provider, {
    value: {
      authState,
      setAuthState,
      logout,
      isLoggedIn,
      assignRole
    }
  }, children);
};
export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
