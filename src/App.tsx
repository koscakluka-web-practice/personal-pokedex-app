import React, { useState } from "react";

import AppRoutes from "@routes";

import AuthProvider from "@contexts/AuthContext";
import ThemeProvider, { ThemeContext } from "@contexts/ThemeContext";

import "@assets/theme/base.css";
import { RENDER_MESSAGE } from "@utilities/constants/messages";
import Logger from "@utilities/tools/Logger";

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [currentTheme, setCurrentTheme] = React.useState<string>();

  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(App.name);
  });

  return (
    <AuthProvider>
      <div id="app" className={currentTheme ? currentTheme : ""}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </div>
    </AuthProvider>
  );
};

export default App;
