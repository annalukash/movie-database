import {actionTypes} from '../../actions';

const initialState = {
    collection: null,
    loading: true,
    error: false,
    genres: {},
    genresLoading: true,
    cast: [],
    crew: [],
    castLoading: true,
    revenue: 0,
    revenueLoading: true
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
        case actionTypes.COLLECTION_MOVIE_DETAILS_REQUESTED: 
            return {
                ...state,
                revenueLoading: true
            }
        case actionTypes.COLLECTION_MOVIE_DETAILS_LOADED:
            return {
                ...state,
                revenueLoading: false,
                revenue: action.payload.reduce((sum, current) => sum + current, 0)
            }
        case actionTypes.COLLECTION_CAST_REQUESTED:
            return {
                ...state,
                castLoading: true
            }
        case actionTypes.COLLECTION_CAST_LOADED:
            return {
                ...state,
                castLoading: false,
                cast: action.payload.cast,
                crew: action.payload.crew
            }
        default:
            return state
    }
    
}

export default collectionPageReducer;