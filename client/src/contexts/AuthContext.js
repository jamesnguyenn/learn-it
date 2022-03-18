import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";
import { apiURL, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //Authenticated users
  const loadUsers = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiURL}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            authLoading: false,
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (e) {
      localStorage.removeItem([LOCAL_STORAGE_TOKEN_NAME]);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          authLoading: false,
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => loadUsers(), []);

  //Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      loadUsers();
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };
  //Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      loadUsers();
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: {
        authLoading: false,
        isAuthenticated: false,
        user: null,
      },
    });
  };

  //Context data
  const authContextData = { loginUser, auth, registerUser, logoutUser };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
