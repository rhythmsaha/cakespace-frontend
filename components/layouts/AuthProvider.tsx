import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
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
        user: User;
    };
}

const AuthProvider = ({ children }: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = window.localStorage.getItem("_authToken");

        if (!token) {
            dispatch(initialize({ isInitialized: true, isAuthenticated: false }));
            return;
        }

        axios
            .get("/auth/seller/me", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((res: ResponseType) => {
                const { user } = res.data;

                if (user) {
                    console.log(user);
                    setSession(user.authToken);
                    dispatch(login(user));
                }
            })
            .catch((err: AxiosError) => {
                setSession();
                dispatch(
                    initialize({
                        isInitialized: true,
                        isAuthenticated: false,
                    })
                );
            });
    }, [dispatch]);

    return <>{children}</>;
};
export default AuthProvider;
