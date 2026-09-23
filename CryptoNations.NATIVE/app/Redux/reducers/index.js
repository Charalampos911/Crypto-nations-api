// reducers/index.js
import { combineReducers } from 'redux';

import ApiReducer from '../features/ApiReducer';
// Import other slices if you have them

const rootReducer = combineReducers({

  Api: ApiReducer,
  // Add other reducers here
});

export default rootReducer;