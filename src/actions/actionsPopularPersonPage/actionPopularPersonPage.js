import * as actionTypes from './actionTypesPopularPersonPage';

const popularPersonRequested = () => {
    return {
        type: actionTypes.POPULAR_PERSON_REQUESTED
    }
}

const popularPersonLoaded = (payload) => {
    return {
        type: actionTypes.POPULAR_PERSON_LOADED,
        payload
    }
}

const popularPersonError = () => {
    return {
        type: actionTypes.POPULAR_PERSON_ERROR
    }
}

export {
    popularPersonRequested,
    popularPersonLoaded,
    popularPersonError,
}