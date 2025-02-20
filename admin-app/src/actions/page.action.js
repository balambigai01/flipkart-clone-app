import { pageConstants } from '../actions/constants';
import axiosInstance from '../helper/axios';

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
    try {
      const res = await axiosInstance.post('/page/create', form);
      if (res.status === 201) {
        dispatch({
          type: pageConstants.CREATE_PAGE_SUCCESS,
          payload: { page: res.data.page }
        });
      } else {
        dispatch({
          type: pageConstants.CREATE_PAGE_FAILURE,
          payload: { error: res.data.error }
        });
      }
    } catch (error) {
      dispatch({
        type: pageConstants.CREATE_PAGE_FAILURE,
        payload: { error: error.message }
      });
    }
  };
};