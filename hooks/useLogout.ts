import { logout } from "../store/slices/auth/slice";
import setSession from "../utils/jwt";
import useAppDispatch from "./useAppDispatch";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    setSession();
  };

  return { logoutHandler };
};

export default useLogout;
