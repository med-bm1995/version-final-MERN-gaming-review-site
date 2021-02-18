import axios from "axios";
import {
  USER_LOADING,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  GET_AUTH_USER,
  AUTH_ERRORS,
  BLOKE_USER,
  FETCH_ALL_USERS,
} from "../constants/ActionsTypes";
import { fetch_all_post } from "./postActions";

// bloke user delete post user
export const bloke_user = (idadmin, iduser) => async (dispatch) => {
  console.log(idadmin);
  console.log(iduser);
  try {
    const res = await axios.put(`/api/auth/bloke/${idadmin}/${iduser}`);

    dispatch({
      type: BLOKE_USER,
      payload: res.data,
    });
    dispatch(fetch_all_users());
  } catch (error) {
    console.log("error ma5dmtech", error);
  }
};
//fetch all user
export const fetch_all_users = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/getalluser");
    // console.log(res.data);
    dispatch({
      type: FETCH_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//Set the user loading
const userLoading = () => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
};

// Register USer
export const registerUser = (formData) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const res = await axios.post("/api/auth/register", formData);
    dispatch({
      type: REGISTER_USER,
      payload: res.data, // { msg: 'User registred with success', user, token }
    });
  } catch (error) {
    console.dir(error);

    const { errors, msg } = error.response.data;

    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    console.log(errors);
    if (msg) {
      alert(msg);
    }

    dispatch({
      type: AUTH_ERRORS,
    });
  }
};

// Login User
export const loginUser = (formData) => async (dispatch) => {
  dispatch(userLoading());

  try {
    const res = await axios.post("/api/auth/login", formData);
    dispatch({
      type: LOGIN_USER,
      payload: res.data, // { msg: 'Logged in with success', user, token }
    });
    dispatch(fetch_all_post());
  } catch (error) {
    console.dir(error);

    const { errors, msg } = error.response.data;

    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    console.log(errors);
    if (msg) {
      alert(msg);
    }

    dispatch({
      type: AUTH_ERRORS,
    });
  }
};

// Get auth user
export const getAuthUser = () => async (dispatch) => {
  dispatch(userLoading());

  try {
    //headers
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get("/api/auth/user", config);
    dispatch({
      type: GET_AUTH_USER,
      payload: res.data, // {user: req.user}
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERRORS,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
