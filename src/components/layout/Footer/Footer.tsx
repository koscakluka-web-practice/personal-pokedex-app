import React from "react";

import { ThemeContext } from "@contexts/ThemeContext";

import "./Footer.css";

interface FooterProps {}

const Footer: React.FunctionComponent<{}> = () => {
  const { toggleTheme } = React.useContext(ThemeContext);

  return <footer onClick={toggleTheme}>No copyright</footer>;
};

export default Footer;
