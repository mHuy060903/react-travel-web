import { useContext, useEffect } from "react";
import useUser from "../features/auth/useUser";

import { UserContext } from "../context/useContext";
import ReactLoading from "react-loading";
const ProtectedRoute = ({ children }) => {
  const { login } = useContext(UserContext);
  const { data, isLoading } = useUser();

  useEffect(() => {
    if (data !== undefined) {
      login(data);
    }
  }, [data, login]);

  if (isLoading && data !== undefined) {
    return (
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-white flex items-start justify-center">
        <ReactLoading type="spokes" color="blue" height={100} width={100} />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
