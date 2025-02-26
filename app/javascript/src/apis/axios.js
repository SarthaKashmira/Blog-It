import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { evolve } from "ramda";

const setAuthHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = localStorage.getItem("authToken");
  const email = localStorage.getItem("authEmail");
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);

      return response.data;
    },
    error => Promise.reject(error)
  );
};

const requestInterceptors = () => {
  // since all ramda functions are curried by default so
  axios.interceptors.request.use(
    //above function is modified as below
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

export const initializeAxios = () => {
  axios.defaults.baseURL = "/";
  setAuthHeaders();
  setHttpHeaders();
  requestInterceptors();
  responseInterceptors();
};
