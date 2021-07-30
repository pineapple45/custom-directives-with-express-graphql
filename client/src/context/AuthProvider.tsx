import React, { useContext, useState, ReactNode, useEffect } from 'react';

const initialAuthState = {
  userId: undefined,
  token: undefined,
  tokenExpiration: undefined,
  username: undefined,
  role: undefined,
};

type InitialStateProps = typeof initialAuthState;

const AuthContext: any =
  React.createContext<InitialStateProps>(initialAuthState);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);

  const logout = () => {
    localStorage.clear();
    setAuthState(initialAuthState);
  };

  const isLoggedIn = () => {
    if (authState.userId !== undefined) return authState;
    return false;
  };

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem('userData')!);
    if (userDataFromStorage && authState.userId === undefined) {
      setAuthState({
        ...authState,
        ...userDataFromStorage,
      });
    }
  }, [authState]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext<typeof AuthContext>(AuthContext);
