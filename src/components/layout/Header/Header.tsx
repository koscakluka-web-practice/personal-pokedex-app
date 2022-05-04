import React from "react";
import { NavLink } from "react-router-dom";

import Logger from "@utilities/tools/Logger";

import { authContext } from "@contexts/AuthContext";

import {
  LOGIN_PAGE_PATH,
  POKEMON_LIST_PAGE_PATH,
  USER_PROFILE_PAGE_PATH,
} from "@utilities/constants/paths";

import "./Header.css";
import logo from "@assets/images/pokemon-logo.png";

interface HeaderProps {}

const Header: React.FunctionComponent<{}> = (props: HeaderProps) => {
  const { auth, logOutUser } = React.useContext(authContext);

  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(Header.name);
  });

  return (
    <header>
      <div className="logo">
        <img src={logo} />
      </div>

      <nav className="main-nav">
        <ul>
          {auth?.data ? (
            <li>
              <NavLink to={USER_PROFILE_PAGE_PATH}>Profile</NavLink>
            </li>
          ) : (
            ""
          )}

          <li>
            <NavLink to={POKEMON_LIST_PAGE_PATH}>Pokemon List</NavLink>
          </li>

          {auth?.data ? (
            <li>
              <a href="#" onClick={logOutUser}>
                Logout
              </a>
            </li>
          ) : (
            <li>
              <NavLink to={LOGIN_PAGE_PATH}>Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
