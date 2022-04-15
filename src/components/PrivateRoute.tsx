import { useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

interface PrivateRouteProps extends RouteProps {}

const LOGIN_PAGE_URL: string = "/";

const PrivateRoute = (props: PrivateRouteProps) => {
  let { children } = props;
  const { auth } = useContext(authContext);
  console.log(auth);

  if (auth.loading) {
    return <p>Loading...</p>;
  }

  return auth.data ? children : <Navigate to={LOGIN_PAGE_URL} />;
};

export default PrivateRoute;
