import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

import AppRoutes from "@routes";

import AuthProvider from "@contexts/AuthContext";
import ThemeProvider, { ThemeContext } from "@contexts/ThemeContext";

import "@assets/theme/base.css";
import Logger from "@utilities/tools/Logger";

const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </ThemeProvider>
      </div>
    </AuthProvider>
  );
};

export default App;
