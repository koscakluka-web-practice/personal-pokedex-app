import * as React from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {}

const Header: React.FunctionComponent<{}> = (props: HeaderProps) => {
  return (
    <header>
      <NavLink to="/profile">Profile</NavLink>&nbsp;|&nbsp;
      <NavLink to="/pokemon">
        <span>Pokemon List</span>
      </NavLink>
      &nbsp;|&nbsp;<span onClick={() => {}}>Logout</span>
    </header>
  );
};

export default Header;
