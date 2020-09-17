import {actionTypes} from '../../actions/actionsMovieDetailsPage';

const initialState = {
    movieDetails: [],
    loading: true,
    error: false,
    casts: null,
    loadingCast: true,
    keywords: null,
    loadingKeywords: true,
    modalWindow: false,
    video: null,
    socialLink: {},
    collection: {},
    recommendations: [],
    loadingRating: true,
    rating: []
}

const movieDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MOVIE_DETAILS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.MOVIE_DETAILS_LOADED:
            return {
                ...state,
                loading: false,
                movieDetails: action.payload
            }
        case actionTypes.CAST_REQUESTED: 
            return {
                ...state,
                loadingCast: true
            }
        case actionTypes.CAST_LOADED:
            return {
                ...state,
                casts: action.payload,
                loadingCast: false
            }
        case actionTypes.KEYWORDS_REQUESTED:
            return {
                ...state,
                loadingKeywords: true
            }
        case actionTypes.KEYWORDS_LOADED:
            return {
                ...state,
                loadingKeywords: false,
                keywords: action.payload
            }
        case actionTypes.MODAL_WINDOW_TOGGLE:
            return {
                ...state,
                modalWindow: !state.modalWindow
            }
        case actionTypes.VIDEO_LOADED:
            return {
                ...state,
                video: action.payload
            }
        case actionTypes.SOCIAL_LINK_LOADED:
            return {
                ...state,
                socialLink: action.payload
            }
        case actionTypes.MOVIE_DETAILS_COLLECTION_LOADED:
            return {
                ...state,
                collection: action.payload
            }
        case actionTypes.RECOMMENDATIONS_LOADED:
            return {
                ...state,
                recommendations: action.payload
            }
        case actionTypes.RATING_REQUESTED:
            return {
                ...state,
                loadingRating: true
            }
        case actionTypes.RATING_LOADED:
            return {
                ...state,
                rating: action.payload,
                loadingRating: false
            }
        default:
            return state
    }
}

export default movieDetailsReducer;