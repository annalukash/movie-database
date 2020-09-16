import { combineReducers } from 'redux'
import moviePageReducer from './reducers/moviePageReducers';
import tvPageReducer from './reducers/tvPageReducer';
import popularPersonReducer from './reducers/popularPersonReducer';
import movieDetailsReducer from './reducers/movieDetailsReducer';
import homePageReducer from './reducers/homePageReducer';
import collectionPageReducer from './reducers/collectionPageReducer';

export default combineReducers({
    moviePageReducer,
    tvPageReducer,
    popularPersonReducer,
    movieDetailsReducer,
    homePageReducer,
    collectionPageReducer
})