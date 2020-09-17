import * as actionTypes from './actionTypeHomePage';

const inTrendRequested = () => {
    return {
        type: actionTypes.IN_TREND_REQUESTED
    }
}

const inTrendLoaded = (payload) => {
    return {
        type: actionTypes.IN_TREND_LOADED,
        payload
    }
}

const inTrendError = () => {
    return {
        type: actionTypes.IN_TREND_ERROR
    }
}

export {
    inTrendRequested,
    inTrendLoaded,
    inTrendError,
}