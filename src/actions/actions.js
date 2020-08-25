import * as actionTypes from './actionTypes';

const popularMoviesRequested = () => {
    return {
        type: actionTypes.POPULAR_MOVIES_REQUESTED
    }
}

const popularMoviesLoaded = (payload) => {
    return {
        type: actionTypes.POPULAR_MOVIES_LOADED,
        payload
    }
}

const popularMoviesError = () => {
    return {
        type: actionTypes.POPULAR_MOVIES_ERROR
    }
}

const popularMoviesMoreLoaded = (payload) => {
    return {
        type: actionTypes.POPULAR_MOVIES_MORE_LOADED,
        payload
    }
}

const popularMoviesMoreRequested = () => {
    return {
        type: actionTypes.POPULAR_MOVIES_MORE_REQUESTED
    }
}

export {
    popularMoviesRequested,
    popularMoviesLoaded,
    popularMoviesError,
    popularMoviesMoreLoaded,
    popularMoviesMoreRequested
}