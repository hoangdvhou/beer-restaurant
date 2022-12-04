import axios from "axios";
import {
  UNAUTHORIZED_STATUS,
  ACCESS_DENIED_STATUS,
  BAD_REQUEST,
  SEVER_ERROR,
} from "@/utils/constant";

const BASE_URL = "https://apigw.hoanhipcungworldcup.com";
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response.status === UNAUTHORIZED_STATUS ||
      error.response.status === ACCESS_DENIED_STATUS
    ) {
      return Promise.reject(error).finally(() => {
        window.location =
          window.location.protocol + "//" + window.location.host + "/";
      });
    }

    if (error.response.status === BAD_REQUEST) {
      return Promise.reject(error).finally(() => {
        console.log("bad request :>> ", error);
      });
    }

    if (error.response.status === SEVER_ERROR) {
      return Promise.reject(error).finally(() => {
        console.log("server error :>> ", error);
      });
    }
    return Promise.reject(error);
  }
);

export default request;
