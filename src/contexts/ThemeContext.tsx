import React, { useEffect } from "react";

const LIGHT_THEME = "light-theme";
const DARK_THEME = "dark-theme";

interface ThemeProviderProps {}

interface ThemeContext {
  theme: string;
  applyTheme: (newTheme: string) => void;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<Partial<ThemeContext>>({});

// wrapper to make theme and changeTheme available
// down the tree
const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState<string>(LIGHT_THEME);

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);

    document.getElementById("app").className = newTheme;
  };

  const toggleTheme = () => {
    applyTheme(theme == LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
    console.log(theme);
  };

  useEffect(() => {
    const stored_theme = window.localStorage.getItem("theme");
    if (stored_theme) {
      applyTheme(stored_theme);
    } else {
      applyTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? DARK_THEME
          : LIGHT_THEME
      );
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, applyTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
