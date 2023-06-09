// import { successMessage } from '../utils';
import * as type from "./constants";
import { Navigate } from "react-router-dom";

import axios from "axios";
import { errorMessage, successMessage, warningMessage } from "../utils";


const instance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
  validateStatus: (status) => status === 200,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


const makeAPIRequest =
  (fn, ...args) =>
  (dispatch) => {
    const promise = fn(...args);
    promise.then((response) => response);

    promise.catch((error) => {
      if (error.response.status === 403 ) {
        dispatch({ type: "LOGIN_FAILED", status: 400 });
        <Navigate to="/login" />
      } else if (navigator.onLine) {
        console.log(error);
      } else {
        warningMessage("You are Offline!");
      }
      if (error && error.response.status === 404) {
        dispatch({ type: "REQUEST_ERROR", status: 400 });
        errorMessage(error.response.data.message);
      }
      if (error.response.status === 400) {
        dispatch({ type: "REQUEST_ERROR", status: 400 });
        errorMessage(error.response.data.message);
      }
      if (error.response.status === 401) {
        dispatch({ type: "REQUEST_ERROR", status: 401 });
        errorMessage(error.response.data.message);
      }
      if (error.response.status === 500) {
        dispatch({ type: "REQUEST_ERROR", status: 500 });
        errorMessage("Internal Server Error");
      }
    });
    return promise;
  };

const newGetFromAPI = (url, params = {}, headers) => {
  console.log("localStorage.getItem('token')",localStorage.getItem('token'))
  return instance.get(url, { params });
};

const newPostToAPI = (url, data = {}) => {
  return instance.post(url, data);
};

const getAllProductsAPI = (params) =>
  newGetFromAPI("http://localhost:8008/products", params);
const getOTPAPI = (params) =>
  newGetFromAPI("http://localhost:8008/users/generate-otp", params);
const getAllOrdersAPI = (params) =>
  newGetFromAPI("http://localhost:8008/users/my-orders", params);
const verifyOTPAPI = (data) =>
  newPostToAPI("http://localhost:8008/users/verify-otp", data);
const profileAPI = (params, headers) =>
  newGetFromAPI("http://localhost:8008/users/profile", params, headers);
  const logInAPI = (data) =>
  newPostToAPI("http://localhost:8008/auth/login", data);

  const registerAPI = (data) =>
  newPostToAPI("http://localhost:8008/auth/register", data);

export function getProducts(params) {
  return (dispatch) => {
    dispatch({ type: type.GET_PRODUCTS });
    dispatch(makeAPIRequest(getAllProductsAPI, params)).then((response) => {
      dispatch({ type: type.STORE_PRODUCTS, data: response.data.data });
    });
  };
}

export function getOrders(params) {
  return (dispatch) => {
    dispatch({ type: type.GET_ORDERS });
    dispatch(makeAPIRequest(getAllOrdersAPI, params)).then((response) => {
      dispatch({ type: type.STORE_ORDERS, data: response.data.data });
    });
  };
}

export function getOTP(params) {
  return (dispatch) => {
    dispatch(makeAPIRequest(getOTPAPI, params)).then((response) => {
      successMessage("otp send successfully");
    });
  };
}

export function verifyOtp(data,callback) {
  return (dispatch) => {
    dispatch({ type: type.VERIFY_OTP });
    dispatch(makeAPIRequest(verifyOTPAPI, data)).then((response) => {
      dispatch({ type: type.VERIFY_OTP_SUCCESS });
      dispatch(getProducts());
      successMessage("order place successfully");
      if(callback) {
        callback();
      }
    });
  };
}

export function getProfile() {
  return (dispatch) => {
    dispatch({ type: "GET_AUTH" });
    dispatch(
      makeAPIRequest(profileAPI)
    ).then((response) => {
      dispatch({ type: "STORE_AUTH", data: response.data.data });
    });
  };
}


export function login(payload, callback) {
  return (dispatch) => {
    dispatch({ type: "GET_LOGIN" });
    dispatch(
      makeAPIRequest(logInAPI, payload)
    ).then((response) => {
      dispatch({ type: "GET_LOGIN_SUCCESS" });
      localStorage.setItem('token', response.data.token);
      dispatch(getProfile())
      if(callback) {
        callback();
      }
    });
  };
}

export function register(payload, callback) {
  return (dispatch) => {
    dispatch({ type: "GET_REGISTER" });
    dispatch(
      makeAPIRequest(registerAPI, payload)
    ).then((response) => {
      dispatch({ type: "GET_REGISTER_SUCCESS" });
    });
  };
}
