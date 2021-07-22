import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { assetsReducer } from './assetsReducer';
import { dropdownReducer } from './dropdownReducer';

export default combineReducers({
  assets: assetsReducer,
  errors: errorReducer,
  auth: authReducer,
  dropdown: dropdownReducer,
});
