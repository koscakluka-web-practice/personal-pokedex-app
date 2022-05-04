import React from "react";

import Logger from "@utilities/tools/Logger";

import { ThemeContext } from "@contexts/ThemeContext";

import "./Footer.css";

interface FooterProps {}

const Footer: React.FunctionComponent<{}> = () => {
  const { toggleTheme } = React.useContext(ThemeContext);

  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(Footer.name);
  });

  return (
    <footer>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </footer>
  );
};

export default Footer;
