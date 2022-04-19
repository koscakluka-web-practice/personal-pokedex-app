import * as React from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

interface HeaderProps {}

const Header: React.FunctionComponent<{}> = (props: HeaderProps) => {
  const { auth, authenticateUser, logOutUser } = React.useContext(authContext);

  return (
    <header>
      <NavLink to="/profile">Profile</NavLink>&nbsp;|&nbsp;
      <NavLink to="/pokemon">
        <span>Pokemon List</span>
      </NavLink>
      {auth.data ? <span onClick={logOutUser}>Logout</span> : ""}
    </header>
  );
};

export default Header;
