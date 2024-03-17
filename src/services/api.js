import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import { logout } from "../store/slices/authSlice";

const baseURL = "http://192.168.3.24:8000" || process.env.BACKEND_BASE_URL;

let storeInstance; // Store the store instance for access in the interceptor

export const setStoreInstance = (store) => {
  storeInstance = store;
};

console.log(storeInstance);

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export default api;

let access_token = localStorage.getItem("access_token");
let refresh_token = localStorage.getItem("refresh_token");

const protectedApi = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

// eslint-disable-next-line consistent-return
protectedApi.interceptors.request.use(async (req) => {
  try {
    access_token = localStorage.getItem("access_token");
    req.headers.Authorization = `Bearer ${access_token}`;
    if (!access_token) {
      storeInstance.dispatch(logout());
      return;
    }
    const user = jwtDecode(access_token);
    // console.log(new Date(user.exp * 1000));
    const isAccessTokenExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
    console.log("Access token expired: ", isAccessTokenExpired);
    try {
      // eslint-disable-next-line
      if (!isAccessTokenExpired) return req;

      refresh_token = localStorage.getItem("refresh_token");
      const decodedRefreshToken = jwtDecode(refresh_token);
      const isRefreshTokenExpired =
        dayjs.unix(decodedRefreshToken?.exp).diff(dayjs()) < 1;
      console.log("Refresh token expired: ", isRefreshTokenExpired);

      if (isRefreshTokenExpired) {
        storeInstance.dispatch(logout());
      return;
      }

      const response = await api.post(`/auth/v1/refresh-token/`, {
        refresh_token: refresh_token?.toString(),
      });

      if (response?.status === 200) {
        access_token = response?.data?.access_token;
        localStorage.setItem("access_token", access_token);
        req.headers.Authorization = `Bearer ${access_token}`; // eslint-disable-next-line
        return req;
      }
    } catch (err) {
      storeInstance.dispatch(logout());
      return;
    }
  } catch (err) {
    console.log("protectedApi: ", err);
  }
});

export { protectedApi };