import {actionTypes} from '../actions';

const initialState = {
    popularMovies: [],
    loading: true,
    loadingMore: false,
    error: false,
    popularPage: 0, 
    playingNowMovies: [],
    playingNowPage: 0,
    upcomingMovies: [],
    upcomingPage: 0,
    topRatedMovies: [],
    topRatedPage: 0
}

const moviePageReducer = (state = initialState, action) => {
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
                popularPage: state.popularPage + 1
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
                popularPage: state.popularPage + 1
            }
        case actionTypes.PLAYING_NOW_MOVIES_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PLAYING_NOW_MOVIES_LOADED:
            return {
                ...state,
                playingNowMovies: action.payload,
                loading: false,
                playingNowPage: state.playingNowPage + 1
            }
        case actionTypes.PLAYING_NOW_MOVIES_MORE_REQUESTED:
            return {
                ...state,
                loadingMore: true
            }
        case actionTypes.PLAYING_NOW_MOVIES_MORE_LOADED:
            return {
                ...state,
                playingNowMovies: [...state.playingNowMovies, ...action.payload],
                loadingMore: false,
                playingNowPage: state.playingNowPage + 1
            }
        case actionTypes.UPCOMING_MOVIES_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.UPCOMING_MOVIES_LOADED:
            return {
                ...state,
                upcomingMovies: action.payload,
                loading: false,
                upcomingPage: state.upcomingPage + 1
            }
        case actionTypes.UPCOMING_MOVIES_MORE_REQUESTED: 
            return {
                ...state,
                loadingMore: true
            }
        case actionTypes.UPCOMING_MOVIES_MORE_LOADED: 
            return {
                ...state,
                upcomingMovies: [...state.upcomingMovies, ...action.payload],
                loadingMore: false,
                upcomingPage: state.upcomingPage + 1
            }
        case actionTypes.TOP_RATED_MOVIES_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.TOP_RATED_MOVIES_LOADED:
            return {
                ...state,
                topRatedMovies: action.payload,
                loading: false,
                topRatedPage: state.topRatedPage + 1
            }
        case actionTypes.TOP_RATED_MOVIES_MORE_REQUESTED: 
            return {
                ...state,
                loadingMore: true
            }
        case actionTypes.TOP_RATED_MOVIES_MORE_LOADED: 
            return {
                ...state,
                topRatedMovies: [...state.topRatedMovies, ...action.payload],
                loadingMore: false,
                topRatedPage: state.topRatedPage + 1
            }
        default:
            return state
    }
}

export default moviePageReducer;