import React, { useEffect } from "react";
import { authContext } from "@contexts/AuthContext";
import Users from "@utilities/models/users";

const LIGHT_THEME = "light-theme";
const DARK_THEME = "dark-theme";

interface ThemeProviderProps {}

interface ThemeContext {
  theme: string;
  applyTheme: (newTheme: string) => void;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<Partial<ThemeContext>>({});

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState<string>(LIGHT_THEME);

  const { auth } = React.useContext(authContext);

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme);

    const user = Users.get(auth.data);
    if (user) {
      user.theme = newTheme;
      Users.update(user);
    }

    document.getElementById("app").className = newTheme;
  };

  const toggleTheme = () => {
    applyTheme(theme == LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  };

  useEffect(() => {
    const user = Users.get(auth.data);
    if (user?.theme) {
      applyTheme(user.theme);
    } else {
      applyTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? DARK_THEME
          : LIGHT_THEME
      );
    }
  }, [auth]);

  return (
    <ThemeContext.Provider value={{ theme, applyTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
