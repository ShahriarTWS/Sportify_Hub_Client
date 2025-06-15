import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/hooks";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    // console.log(user);
    const location = useLocation();
    // console.log(location.pathname);


    if (loading) {
        return <Loading></Loading>
    }

    if (user && user.email) {

        return children;
    }
    return <Navigate state={location.pathname} to={'/auth/login'}></Navigate>
};

export default PrivateRoute;