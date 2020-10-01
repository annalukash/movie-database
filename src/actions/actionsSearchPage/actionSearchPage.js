import * as actionTypes from "./actionTypesSearchPage";

const tvSearchRequested = () => {
    return {
        type: actionTypes.TV_SEARCH_REQUESTED,
    };
};

const tvSearchLoaded = (payload) => {
    return {
        type: actionTypes.TV_SEARCH_LOADED,
        payload,
    };
};

const tvSearchError = () => {
    return {
        type: actionTypes.TV_SEARCH_ERROR,
    };
};

const personSearchRequested = () => {
    return {
        type: actionTypes.PERSON_SEARCH_REQUESTED,
    };
};

const personSearchLoaded = (payload) => {
    return {
        type: actionTypes.PERSON_SEARCH_LOADED,
        payload,
    };
};

const personSearchError = () => {
    return {
        type: actionTypes.PERSON_SEARCH_ERROR,
    };
};

const movieSearchRequested = () => {
    return {
        type: actionTypes.MOVIE_SEARCH_REQUESTED,
    };
};

const movieSearchLoaded = (payload) => {
    return {
        type: actionTypes.MOVIE_SEARCH_LOADED,
        payload,
    };
};

const movieSearchError = () => {
    return {
        type: actionTypes.MOVIE_SEARCH_ERROR,
    };
};

const companySearchRequested = () => {
    return {
        type: actionTypes.COMPANY_SEARCH_REQUESTED,
    };
};

const companySearchLoaded = (payload) => {
    return {
        type: actionTypes.COMPANY_SEARCH_LOADED,
        payload,
    };
};

const companySearchError = () => {
    return {
        type: actionTypes.COMPANY_SEARCH_ERROR,
    };
};

const keywordSearchRequested = () => {
    return {
        type: actionTypes.KEYWORD_SEARCH_REQUESTED,
    };
};

const keywordSearchLoaded = (payload) => {
    return {
        type: actionTypes.KEYWORD_SEARCH_LOADED,
        payload,
    };
};

const keywordSearchError = () => {
    return {
        type: actionTypes.KEYWORD_SEARCH_ERROR,
    };
};

const collectionSearchRequested = () => {
    return {
        type: actionTypes.COLLECTION_SEARCH_REQUESTED,
    };
};

const collectionSearchLoaded = (payload) => {
    return {
        type: actionTypes.COLLECTION_SEARCH_LOADED,
        payload,
    };
};

const collectionSearchError = () => {
    return {
        type: actionTypes.COLLECTION_SEARCH_ERROR,
    };
};

const isSearch = (payload) => {
    return {
        type: actionTypes.IS_SEARCH,
        payload
    }
}

export {
    tvSearchError,
    tvSearchRequested,
    tvSearchLoaded,
    personSearchRequested,
    personSearchLoaded,
    personSearchError,
    movieSearchRequested,
    movieSearchLoaded,
    movieSearchError,
    companySearchRequested,
    companySearchLoaded,
    companySearchError,
    keywordSearchRequested,
    keywordSearchLoaded,
    keywordSearchError,
    collectionSearchRequested,
    collectionSearchLoaded,
    collectionSearchError,
    isSearch
};
