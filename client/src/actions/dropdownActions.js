import { FILTER_SELECTED } from './types';

export const setFilterType = (type) => {
  return {
    type: FILTER_SELECTED,
    payload: type,
  };
};
