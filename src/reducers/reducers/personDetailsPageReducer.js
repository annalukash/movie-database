import {actionTypes} from '../../actions/actionsPersonDetailsPage';

const initialState = {
    person: null,
    loading: true,
    cast: null,
    crew: null,
    socialLink: null,
    socialLinkLoading: true,
    error: false
}

const personDetailsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PERSON_BIOGRAPHY_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PERSON_BIOGRAPHY_LOADED:
            return {
                ...state,
                loading: false,
                person: action.payload.person,
                cast: action.payload.cast,
                crew: action.payload.crew
            }
        case actionTypes.PERSON_BIOGRAPHY_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actionTypes.PERSON_SOCIAL_LINK_REQUESTED:
            return {
                ...state,
                socialLinkLoading: true
            }
        case actionTypes.PERSON_SOCIAL_LINK_LOADED:
            return {
                ...state,
                socialLinkLoading: false,
                socialLink: action.payload
            }
        case actionTypes.PERSON_SOCIAL_LINK_ERROR:
            return {
                ...state,
                socialLinkLoading: false,
                error: true
            }
        default:
            return state
    }
}

export default personDetailsPageReducer;