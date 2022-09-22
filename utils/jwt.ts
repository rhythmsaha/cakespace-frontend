import jwtDecode, { JwtPayload } from "jwt-decode";
import axios from "./axios";

const isValidToken = (accessToken: string) => {
    if (!accessToken) return false;

    const decoded: JwtPayload = jwtDecode(accessToken);
    if (!decoded.exp) return false;

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
};

const setSession = (accessToken?: string) => {
    if (accessToken && isValidToken(accessToken)) {
        localStorage.setItem("_authToken", accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem("_authToken");
        delete axios.defaults.headers.common.Authorization;
    }
};

export default setSession;
