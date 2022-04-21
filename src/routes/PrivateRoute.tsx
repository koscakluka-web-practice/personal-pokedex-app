import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { authContext } from "@contexts/AuthContext";

import { LOGIN_PAGE_PATH } from "@utilities/constants/paths";

interface PrivateRouteProps {}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  children,
}) => {
  const { auth } = useContext(authContext);

  if (auth?.loading) {
    return <p>Loading...</p>;
  }

  if (auth?.data) {
    return children;
  } else {
    return <Navigate to={LOGIN_PAGE_PATH} />;
  }
};

export default PrivateRoute;
