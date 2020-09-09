import {actionTypes} from '../../actions';

const initialState = {
    person: [],
    loading: true,
    page: 1,
    error: false,
    totalPages: 0
}

const popularPersonReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case actionTypes.POPULAR_PERSON_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.POPULAR_PERSON_LOADED: 
            return {
                ...state,
                loading: false,
                person: action.payload.person,
                totalPages: action.payload.totalPages,
                page: action.payload.page
            }
        case actionTypes.POPULAR_PERSON_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default popularPersonReducer;