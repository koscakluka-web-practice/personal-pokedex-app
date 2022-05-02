import React from "react";

import AppRoutes from "@routes";

import AuthProvider from "@contexts/AuthContext";

import "@assets/theme/base.css";

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
