import { authConstants, cartConstants } from "./constants";
import axiosInstance from "../helper/axios";
export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });

      const res = await axiosInstance.post('/signup', user);

      if (res.status === 201) {
        dispatch({ type: authConstants.SIGNUP_SUCCESS });
        const { token, user } = res.data;

        // Check if user is valid before storing
        if (user) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token, user },
          });
        } else {
          throw new Error("User data is undefined");
        }
      } else {
        const { error } = res.data;
        dispatch({ type: authConstants.SIGNUP_FAILURE, payload: { error } });
      }
    } catch (error) {
      console.error("Signup failed:", error);
      dispatch({ type: authConstants.SIGNUP_FAILURE, payload: { error: error.message } });
    }
  };
};

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axiosInstance.post(`/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    dispatch({ type: cartConstants.RESET_CART });
    //const res = await axios.post(`/admin/signout`);
    // if(res.status === 200){

    // }else{
    //     dispatch({
    //         type: authConstants.LOGOUT_FAILURE,
    //         payload: { error: res.data.error }
    //     });
    // }
  };
};