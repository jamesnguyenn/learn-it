export const apiURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5200/api/"
    : "https://lit-bayou-04176.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "token";

export const POST_LOADED_SUCCESS = "POST_LOADED_SUCCESS";
export const POST_LOADED_FAILED = "POST_LOADED_FAILED";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";
