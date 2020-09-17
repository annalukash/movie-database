import {actionTypes} from '../../actions/actionsCollectionPage';

const initialState = {
    collection: null,
    loading: true,
    error: false,
    genres: null,
    genresLoading: true,
    cast: [],
    crew: [],
    revenue: 0,
}

const collectionPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COLLECTION_REQUESTED: 
            return {
                ...state,
                loading: true
            }
        case actionTypes.COLLECTION_LOADED:
            return {
                ...state,
                loading: false,
                collection: action.payload
            }
        case actionTypes.COLLECTION_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            }
        case actionTypes.GENRES_REQUESTED:
            return {
                ...state,
                genresLoading: true
            }
        case actionTypes.GENRES_LOADED:
            return {
                ...state,
                genresLoading: false,
                genres: action.payload
            }
        case actionTypes.COLLECTION_MOVIE_DETAILS_LOADED:
            return {
                ...state,
                revenue: action.payload.reduce((sum, current) => sum + current, 0)
            }
        case actionTypes.COLLECTION_CAST_LOADED:
            return {
                ...state,
                cast: action.payload.cast,
                crew: action.payload.crew
            }
        default:
            return state
    }  
}

export default collectionPageReducer;