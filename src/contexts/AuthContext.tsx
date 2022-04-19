import React, { createContext, useState, useEffect } from "react";
import LoginFormValues from "../components/login";

import Users, { User } from "../data/users";

import md5 from "md5";

type Auth = { loading: boolean; data: string | null };

interface AuthContext {
  auth: Auth;
  authenticateUser: (data: string | null) => {
    success: boolean;
    error: string | null;
  };
  logOutUser: () => void;
}

export const authContext = createContext<Partial<AuthContext>>({});

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [auth, setAuth] = useState<Auth>({
    loading: true,
    data: null,
  });

  const authenticateUser = (data: LoginFormValues) => {
    const user: User | null = Users.get(data.email);
    if (user) {
      if (user.password === md5(data.password)) {
        setAuth({ ...auth, data: data.email });
        return { success: true, error: null };
      } else {
        return { success: false, error: "Incorrect password" };
      }
    } else {
      Users.add(data);
      return {
        success: false,
        error: `User ${data.email} didn't exist. User Created!`,
      };
    }
  };

  const logOutUser = () => {
    setAuth({ ...auth, data: null });
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
    <authContext.Provider value={{ auth, authenticateUser, logOutUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
