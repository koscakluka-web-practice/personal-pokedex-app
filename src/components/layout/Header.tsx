import React from "react";
import { NavLink } from "react-router-dom";

import { authContext } from "../../contexts/AuthContext";

import {
  LOGIN_PAGE_PATH,
  POKEMON_LIST_PAGE_PATH,
  USER_PROFILE_PAGE_PATH,
} from "@utilities/constants/paths";

interface HeaderProps {}

const Header: React.FunctionComponent<{}> = (props: HeaderProps) => {
  const { auth, logOutUser } = React.useContext(authContext);

  return (
    <header>
      {auth?.data ? (
        <React.Fragment>
          <NavLink to={USER_PROFILE_PAGE_PATH}>Profile</NavLink>&nbsp;|&nbsp;
        </React.Fragment>
      ) : (
        ""
      )}
      <NavLink to={POKEMON_LIST_PAGE_PATH}>
        <span>Pokemon List</span>
      </NavLink>
      &nbsp;|&nbsp;
      {auth?.data ? (
        <span onClick={logOutUser}>Logout</span>
      ) : (
        <NavLink to={LOGIN_PAGE_PATH}>Login</NavLink>
      )}
    </header>
  );
};

export default Header;
