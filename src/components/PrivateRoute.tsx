import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/useAuth";
import type {ReactNode} from "react";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({children}: Props) => {
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
