import React, { createContext, useState, useEffect } from "react";
import LoginFormValues from "../components/login";

import md5 from "md5";

type Auth = { loading: boolean; data: string | null };
type Users = Map<string, { password: string; favouritePokemon: number | null }>;

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
    const usersJson = window.localStorage.getItem("users");
    let users: Users;
    if (usersJson) {
      users = new Map(Object.entries(JSON.parse(usersJson)));
    } else {
      users = new Map();
    }

    if (users.has(data.email)) {
      if (users.get(data.email)?.password === md5(data.password)) {
        setAuth({ ...auth, data: data.email });
        return { success: true, error: null };
      } else {
        return { success: false, error: "Incorrect password" };
      }
    } else {
      users.set(data.email, {
        password: md5(data.password),
        favouritePokemon: null,
      });
      window.localStorage.setItem(
        "users",
        JSON.stringify(Object.fromEntries(users))
      );
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
