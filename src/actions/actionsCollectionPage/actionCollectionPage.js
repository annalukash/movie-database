import * as actionTypes from './actionTypesCollectionPage';

const collectionRequested = () => {
    return {
        type: actionTypes.COLLECTION_REQUESTED
    }
}

const collectionLoaded = (payload) => {
    return {
        type: actionTypes.COLLECTION_LOADED,
        payload
    }
}

const collectionError = () => {
    return {
        type: actionTypes.COLLECTION_ERROR
    }
}

const genresRequested = () => {
    return {
        type: actionTypes.GENRES_REQUESTED
    }
}

const genresLoaded = (payload) => {
    return {
        type: actionTypes.GENRES_LOADED,
        payload
    }
}


const collectionMovieDetailsLoaded = (payload) => {
    return {
        type: actionTypes.COLLECTION_MOVIE_DETAILS_LOADED,
        payload
    }
}


const collectionCastLoaded = (payload) => {
    return {
        type: actionTypes.COLLECTION_CAST_LOADED,
        payload
    }
}


export {
    collectionRequested,
    collectionLoaded,
    collectionError,
    genresRequested,
    genresLoaded,
    collectionMovieDetailsLoaded,
    collectionCastLoaded,
}