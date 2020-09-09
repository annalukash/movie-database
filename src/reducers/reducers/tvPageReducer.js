import {actionTypes} from '../../actions';

const initialState = {
    popularTv: [],
    loading: true,
    loadingMore: false,
    popularPage: 0,
    error: false,
    airingTodayTv: [],
    airingTodayPage: 0,
    onTheAirTv: [],
    onTheAirPage: 0,
    topRatedTv: [],
    topRatedPage: 0
}

const tvPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POPULAR_TV_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.POPULAR_TV_LOADED:
            return {
                ...state,
                loading: false,
                popularTv: action.payload,
                popularPage: state.popularPage + 1
            }
        case actionTypes.POPULAR_TV_ERROR:
            return {
                ...state,
                error: true
            }
        case actionTypes.POPULAR_TV_MORE_REQUESTED:
            return {
                ...state,
                loadingMore: true
            }
        case actionTypes.POPULAR_TV_MORE_LOADED: 
            return {
                ...state,
                popularTv: [...state.popularTv, ...action.payload],
                loadingMore: false,
                popularPage: state.popularPage + 1
            }
        case actionTypes.AIRING_TODAY_TV_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AIRING_TODAY_TV_LOADED:
            return {
                ...state,
                loading: false,
                airingTodayTv: action.payload,
                airingTodayPage: state.airingTodayPage + 1
            }
        case actionTypes.AIRING_TODAY_TV_MORE_REQUESTED:
            return {
                ...state,
                loadingMore: true
            }
        case actionTypes.AIRING_TODAY_TV_MORE_LOADED: 
            return {
                ...state,
                airingTodayTv: [...state.airingTodayTv, ...action.payload],
                loadingMore: false,
                airingTodayPage: state.airingTodayPage + 1
            }
        case actionTypes.ON_THE_AIR_TV_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ON_THE_AIR_TV_LOADED:
            return {
                ...state,
                loading: false,
                onTheAirTv: action.payload,
                onTheAirPage: state.onTheAirPage + 1
            }
        case actionTypes.ON_THE_AIR_TV_MORE_REQUESTED:
            return {
                ...state,
                loadingMore: true
            }
        case actionTypes.ON_THE_AIR_TV_MORE_LOADED: 
            return {
                ...state,
                onTheAirTv: [...state.onTheAirTv, ...action.payload],
                loadingMore: false,
                onTheAirPage: state.onTheAirPage + 1
            }
        case actionTypes.TOP_RATED_TV_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.TOP_RATED_TV_LOADED:
            return {
                ...state,
                loading: false,
                topRatedTv: action.payload,
                topRatedPage: state.topRatedPage + 1
            }
        case actionTypes.TOP_RATED_TV_MORE_REQUESTED:
            return {
                ...state,
                loadingMore: true
            }
        case actionTypes.TOP_RATED_TV_MORE_LOADED: 
            return {
                ...state,
                topRatedTv: [...state.topRatedTv, ...action.payload],
                loadingMore: false,
                topRatedPage: state.topRatedPage + 1
            }
        default:
            return state
    }   
}

export default tvPageReducer;