import {createStore} from 'redux';
import combineReducers from './reducers/combineReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(combineReducers, composeWithDevTools());

export default store;