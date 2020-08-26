import { combineReducers } from 'redux'
import moviePageReducer from './moviePageReducers';
import tvPageReducer from './tvPageReducer';

export default combineReducers({
    moviePageReducer,
    tvPageReducer
})