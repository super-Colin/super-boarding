import counterReducer from './counter';
import loggedReducer from './isLogged';

import {combineReducers} from 'redux';


const allReducers = combineReducers({
  // counterReducer, // ES6 sugar
  counter: counterReducer,
  // loggedReducer
  logged: loggedReducer
})

export default allReducers
