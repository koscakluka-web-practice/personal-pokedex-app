import ReactDOM from "react-dom";
import "@assets/theme/index.css";
import App from "./App";
import AuthProvider from "@contexts/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
