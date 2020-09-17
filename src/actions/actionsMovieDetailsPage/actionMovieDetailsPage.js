import * as actionTypes from './actionTypesMovieDetailsPage';


const movieDetailsRequested = () => {
    return {
        type: actionTypes.MOVIE_DETAILS_REQUESTED
    }
}

const movieDetailsLoaded = (payload) => {
    return {
        type: actionTypes.MOVIE_DETAILS_LOADED,
        payload
    }
}

const movieDetailsError = () => {
    return {
        type: actionTypes.MOVIE_DETAILS_ERROR
    }
}

const castRequested = () => {
    return {
        type: actionTypes.CAST_REQUESTED
    }  
}

const castLoaded = (payload) => {
    return {
        type: actionTypes.CAST_LOADED,
        payload
    }
}

const keywordsRequested = () => {
    return {
        type: actionTypes.KEYWORDS_REQUESTED
    }
}

const keywordsLoaded = (payload) => {
    return {
        type: actionTypes.KEYWORDS_LOADED,
        payload
    }
}

const modalWindowToggle = () => {
    return {
        type: actionTypes.MODAL_WINDOW_TOGGLE
    }
}

const videoLoaded = (payload) => {
    return {
        type: actionTypes.VIDEO_LOADED,
        payload
    }
}

const socialLinkLoaded = (payload) => {
    return {
        type: actionTypes.SOCIAL_LINK_LOADED,
        payload
    }
}

const recommendationsLoaded = (payload) => {
    return {
        type: actionTypes.RECOMMENDATIONS_LOADED,
        payload
    }
}

const ratingRequested = () => {
    return {
        type: actionTypes.RATING_REQUESTED
    }
}

const ratingLoaded = (payload) => {
    return {
        type: actionTypes.RATING_LOADED,
        payload
    }
}

const movieDetailsCollectionLoaded = (payload) => {
    return {
        type: actionTypes.MOVIE_DETAILS_COLLECTION_LOADED,
        payload
    }
}

export {
    movieDetailsRequested,
    movieDetailsLoaded,
    movieDetailsError,
    castRequested,
    castLoaded,
    keywordsRequested,
    keywordsLoaded,
    modalWindowToggle,
    videoLoaded,
    socialLinkLoaded,
    recommendationsLoaded,
    ratingRequested,
    ratingLoaded,
    movieDetailsCollectionLoaded
}