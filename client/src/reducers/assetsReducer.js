import { GET_ASSETS, ASSETS_LOADING, CLEAR_ASSETS } from '../actions/types';
const INITIAL_STATE = {
  assets: [],
  loading: false,
};

export const assetsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ASSETS:
      return { ...state, assets: action.payload, loading: false };
    case ASSETS_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_ASSETS: {
      return { ...state, assets: [], loading: false };
    }
    default:
      return state;
  }
};
