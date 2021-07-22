import { FILTER_SELECTED } from '../actions/types';

const INITIAL_STATE = {
  filter: 'All',
};

export const dropdownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_SELECTED:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};
