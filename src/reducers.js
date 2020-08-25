import {actionTypes} from './actions';

const initialState = {
    popularMovies: [],
    loading: true,
    loadingMore: false,
    error: false,
    page: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POPULAR_MOVIES_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.POPULAR_MOVIES_LOADED:
            return {
                ...state,
                popularMovies: action.payload,
                loading: false,
                page: state.page + 1
            }
        case actionTypes.POPULAR_MOVIES_ERROR: 
            return {
                ...state,
                error: true
            }
        case actionTypes.POPULAR_MOVIES_MORE_REQUESTED:
            return {
                ...state,
                loadingMore: true
            }
        case actionTypes.POPULAR_MOVIES_MORE_LOADED: 
            return {
                ...state,
                popularMovies: [...state.popularMovies, ...action.payload],
                loadingMore: false,
                page: state.page + 1
            }
        default:
            return state
    }
}

export default reducer;