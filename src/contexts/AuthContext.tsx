import React, { createContext, useState, useEffect } from "react";

type Auth = { loading: boolean; data: string | null };

interface AuthContext {
  auth: Auth;
  setAuthData: (data: string | null) => void;
}

export const authContext = createContext<Partial<AuthContext>>({});

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [auth, setAuth] = useState<Auth>({
    loading: true,
    data: null,
  });

  const setAuthData = (data: string | null) => {
    setAuth({ ...auth, data: data });
    console.log(auth);
  };

  useEffect(() => {
    setAuth({
      loading: false,
      data: JSON.parse(window.localStorage.getItem("authData") || "{}"),
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("authData", JSON.stringify(auth.data));
  }, [auth.data]);

  return (
    <authContext.Provider value={{ auth, setAuthData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
