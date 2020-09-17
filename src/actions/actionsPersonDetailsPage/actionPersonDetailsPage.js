import * as actionTypes from './actionTypesPersonDetailsPage';

const personBiographyRequested = () => {
    return {
        type: actionTypes.PERSON_BIOGRAPHY_REQUESTED
    }
}

const personBiographyLoaded = (payload) => {
    return {
        type: actionTypes.PERSON_BIOGRAPHY_LOADED,
        payload
    }
}

const personBiographyError = () => {
    return {
        type: actionTypes.PERSON_BIOGRAPHY_ERROR
    }
}

const personSocialLinkRequested = () => {
    return {
        type: actionTypes.PERSON_SOCIAL_LINK_REQUESTED
    }
}

const personSocialLinkLoaded = (payload) => {
    return {
        type: actionTypes.PERSON_SOCIAL_LINK_LOADED,
        payload
    }
}

const personSocialLinkError = () => {
    return {
        type: actionTypes.PERSON_SOCIAL_LINK_ERROR
    }
}

export {
    personBiographyRequested,
    personBiographyLoaded,
    personBiographyError,
    personSocialLinkRequested,
    personSocialLinkLoaded,
    personSocialLinkError
}