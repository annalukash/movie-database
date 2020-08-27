import { combineReducers } from 'redux'
import moviePageReducer from './moviePageReducers';
import tvPageReducer from './tvPageReducer';
import popularPersonReducer from './popularPersonReducer';
import movieDetailsReducer from './movieDetailsReducer';

export default combineReducers({
    moviePageReducer,
    tvPageReducer,
    popularPersonReducer,
    movieDetailsReducer
})