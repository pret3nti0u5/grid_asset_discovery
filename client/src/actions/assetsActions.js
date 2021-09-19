import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ASSETS, ASSETS_LOADING, CLEAR_MSGS, CLEAR_ASSETS } from './types';

export const getAssets =
  (filterType = 'all') =>
  async (dispatch) => {
    dispatch(setAssetsLoading());
    try {
      const filter = filterType.toLowerCase();
      const res = await axios.post(
        '/api/assets',
        { filter },
        { withCredentials: true }
      );
      dispatch({
        type: GET_ASSETS,
        payload: res.data,
      });
    } catch (e) {
      dispatch(returnErrors(e.response.data, e.response.status));
    }
  };

export const getAssetsBySubnet =
  (subnet = '192.168.1.0/24', dns_address = '192.168.1.1', scan_type) =>
  async (dispatch) => {
    dispatch(setAssetsLoading());
    try {
      const res = await axios.post(
        '/api/assets/subnet',
        { subnet, dns_address, scan_type },
        { withCredentials: true }
      );
      dispatch({
        type: GET_ASSETS,
        payload: res.data,
      });
    } catch (e) {
      dispatch(returnErrors(e.response.data, e.response.status));
    }
  };

export const fuzzySearchAssets = (term) => async (dispatch) => {
  dispatch(setAssetsLoading());
  try {
    const res = await axios.post(
      '/assets/_search?pretty',
      {
        query: {
          multi_match: {
            fields: [
              'hostname',
              'ip',
              'mac',
              'domain_address',
              'os',
              'workgroup',
              'lastSeen',
            ],
            query: term,
            fuzziness: 'AUTO',
          },
        },
      },
      { withCredentials: true }
    );
    dispatch({
      type: GET_ASSETS,
      payload: res.data.hits.hits,
    });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

export const searchAssets = (term, searchType) => async (dispatch) => {
  dispatch(setAssetsLoading());
  try {
    const res = await axios.post(
      '/assets/_search?pretty',
      {
        query: {
          match: {
            [searchType]: term,
          },
        },
      },
      { withCredentials: true }
    );
    dispatch({
      type: GET_ASSETS,
      payload: res.data.hits.hits,
    });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

export const clearAssets = () => {
  return {
    type: CLEAR_ASSETS,
  };
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
