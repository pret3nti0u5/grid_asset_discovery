import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ASSETS, ASSETS_LOADING, CLEAR_MSGS } from './types';

export const getAssets = () => async (dispatch) => {
  dispatch(setAssetsLoading());
  try {
    const res = await axios.get('/api/assets', { withCredentials: true });
    dispatch({
      type: GET_ASSETS,
      payload: res.data,
    });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

export const setAssetsLoading = () => {
  return {
    type: ASSETS_LOADING,
  };
};

// For clearing any error messages loaded in state

export const clearPostMsgs = () => {
  return { type: CLEAR_MSGS };
};
