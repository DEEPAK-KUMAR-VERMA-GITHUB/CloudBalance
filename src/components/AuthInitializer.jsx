import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../redux/actions";
import Loader from "./Loader";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { checking } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (checking) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthInitializer;