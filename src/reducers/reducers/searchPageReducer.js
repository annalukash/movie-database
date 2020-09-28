import {actionTypes} from '../../actions/actionsSearchPage';

const initialState = {
    tvLoading: true,
    tvError: false,
    tvResults: [],
    tvPage: 1,  
    tvTotalPages: 0,
    tvTotalResults: 0,
    personResults: [],
    personPage: 1,
    personTotalPages: 0,
    personTotalResults: 0,
    personLoading: true,
    personError: false,
    movieLoading: true,
    movieError: false,
    movieResults: [],
    moviePage: 1,  
    movieTotalPages: 0,
    movieTotalResults: 0,
    companyLoading: true,
    companyError: false,
    companyResults: [],
    companyPage: 1,
    companyTotalPages: 0,
    companyTotalResults: 0,
    keywordLoading: true,
    keywordError: false,
    keywordResults: [],
    keywordPage: 1,
    keywordTotalPages: 0,
    keywordTotalResults: 0,
    collectionLoading: true,
    collectionError: false,
    collectionResults: [],
    collectionPage: 1,
    collectionTotalPages: 0,
    collectionTotalResults: 0,
}

const searchPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TV_SEARCH_REQUESTED:
            return {
                ...state,
                tvLoading: true
            }
        case actionTypes.TV_SEARCH_LOADED: 
            return {
                ...state,
                tvLoading: false,
                tvResults: action.payload.results,
                tvTotalPages: action.payload.totalPages,
                tvPage: action.payload.page,
                tvTotalResults: action.payload.totalResults
            }
        case actionTypes.TV_SEARCH_ERROR:
            return {
                ...state,
                tvError: true
            }
        case actionTypes.PERSON_SEARCH_REQUESTED:
            return {
                ...state,
                personLoading: true
            }
        case actionTypes.PERSON_SEARCH_LOADED:
            return {
                ...state,
                personLoading: false,
                personResults: action.payload.results,
                personTotalPages: action.payload.totalPages,
                personPage: action.payload.page,
                personTotalResults: action.payload.totalResults
            }
        case actionTypes.PERSON_SEARCH_ERROR:
            return {
                ...state,
                personError: true
            }
        case actionTypes.MOVIE_SEARCH_REQUESTED:
            return {
                ...state,
                movieLoading: true
            }
        case actionTypes.MOVIE_SEARCH_LOADED:
            return {
                ...state,
                movieLoading: false,
                movieResults: action.payload.results,
                movieTotalPages: action.payload.totalPages,
                moviePage: action.payload.page,
                movieTotalResults: action.payload.totalResults
            }
        case actionTypes.MOVIE_SEARCH_ERROR:
            return {
                ...state,
                movieError: true
            }
        case actionTypes.COMPANY_SEARCH_REQUESTED:
            return {
                ...state,
                companyLoading: true
            }
        case actionTypes.COMPANY_SEARCH_LOADED:
            return {
                ...state,
                companyLoading: false,
                companyResults: action.payload.results,
                companyPage: action.payload.page,
                companyTotalPages: action.payload.totalPages,
                companyTotalResults: action.payload.totalResults
            }
        case actionTypes.COMPANY_SEARCH_ERROR:
            return {
                ...state,
                companyError: true
            }
        case actionTypes.KEYWORD_SEARCH_REQUESTED:
            return {
                ...state,
                keywordLoading: true
            }
        case actionTypes.KEYWORD_SEARCH_LOADED:
            return {
                ...state,
                keywordLoading: false,
                keywordResults: action.payload.results,
                keywordPage: action.payload.page,
                keywordTotalPages: action.payload.totalPages,
                keywordTotalResults: action.payload.totalResults
            }
        case actionTypes.KEYWORD_SEARCH_ERROR:
            return {
                ...state,
                keywordError: false
            }
        default:
            return state
    }
}

export default searchPageReducer;