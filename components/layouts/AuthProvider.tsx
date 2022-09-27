import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../hooks";
import { initialize, login } from "../../store/slices/auth/slice";
import { User } from "../../types/userTypes";
import { axios } from "../../utils";
import setSession from "../../utils/jwt";

interface Props {
  children: React.ReactNode;
}

interface ResponseType extends AxiosResponse {
  data: {
    message: string;
    authToken: string;
    user: User;
  };
}

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("_authToken");

    if (!token) {
      dispatch(initialize());
      return;
    }

    axios
      .get("/auth/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res: ResponseType) => {
        const { user, authToken } = res.data;

        if (user) {
          setSession(authToken);
          dispatch(login({ user, authToken }));
        }
      })
      .catch((err: AxiosError) => {
        setSession();
        dispatch(initialize());
      });
  }, [dispatch]);

  return <>{children}</>;
};
export default AuthProvider;
