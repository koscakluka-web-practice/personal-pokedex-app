import * as React from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

interface HeaderProps {}

const Header: React.FunctionComponent<{}> = (props: HeaderProps) => {
  const { auth, setAuthData } = React.useContext(authContext);

  const onLogoutClick = (e: any) => {
    if (setAuthData !== undefined) {
      setAuthData(null);
    }
  };

  return (
    <header>
      <NavLink to="/profile">Profile</NavLink>&nbsp;|&nbsp;
      <NavLink to="/pokemon">
        <span>Pokemon List</span>
      </NavLink>
      {auth.data ? <span onClick={onLogoutClick}>Logout</span> : ""}
    </header>
  );
};

export default Header;
